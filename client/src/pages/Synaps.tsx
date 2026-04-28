import { motion } from "framer-motion";
import { Send, Volume2, VolumeX, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { sanitizeForSpeech } from "@/lib/utils";
import { Streamdown } from "streamdown";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface DisplayMessage extends Message {
  id: string;
  timestamp: Date;
}

// Simple language detection based on keywords
const detectLanguage = (text: string): string => {
  const lowerText = text.toLowerCase();

  if (
    lowerText.includes("hallo") ||
    lowerText.includes("guten") ||
    lowerText.includes("wie") ||
    lowerText.includes("was") ||
    lowerText.includes("können") ||
    lowerText.includes("möchte") ||
    lowerText.includes("danke") ||
    lowerText.includes("ja") ||
    lowerText.includes("nein") ||
    lowerText.includes("bitte")
  ) {
    return "de";
  }

  if (
    lowerText.includes("bonjour") ||
    lowerText.includes("salut") ||
    lowerText.includes("comment") ||
    lowerText.includes("quoi") ||
    lowerText.includes("pouvez") ||
    lowerText.includes("merci") ||
    lowerText.includes("oui") ||
    lowerText.includes("non")
  ) {
    return "fr";
  }

  if (
    lowerText.includes("ciao") ||
    lowerText.includes("buongiorno") ||
    lowerText.includes("come") ||
    lowerText.includes("cosa") ||
    lowerText.includes("grazie")
  ) {
    return "it";
  }

  if (
    lowerText.includes("hola") ||
    lowerText.includes("buenos") ||
    lowerText.includes("cómo") ||
    lowerText.includes("gracias")
  ) {
    return "es";
  }

  return "en";
};

// =============================================================================
// Dynamic Brain Avatar — organic, layered neural network visualization
// =============================================================================
//
// Idle:      sanftes "Atmen", langsame Drift, dezentes Glow-Pulsieren der Nodes.
// Responding: Energiestöße wandern entlang der Verbindungen, Nodes feuern in
//             Wellen, Funken-Partikel sprühen aus dem Zentrum, mehrere
//             rotierende Ringe in unterschiedlichen Geschwindigkeiten.
//
// Aufbau:
// - Procedural generierte Nodes (3 Tiefenebenen für Parallax-Effekt)
// - Verbindungen werden aus räumlicher Nähe zwischen Nodes berechnet
// - Energy pulses sind separate, animierte Linien die entlang einer Verbindung laufen
// - Alles deterministisch via seeded random, damit die Form stabil bleibt
// =============================================================================

type BrainNode = {
  id: number;
  x: number;
  y: number;
  depth: number; // 0 = vorne, 1 = mitte, 2 = hinten
  baseR: number;
  phase: number; // Pulsphase-Offset
};

type BrainEdge = {
  id: string;
  a: BrainNode;
  b: BrainNode;
  delay: number;
};

// Deterministischer PRNG, damit das Hirn jeden Render gleich aussieht
const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

// Knoten innerhalb einer Hirn-Silhouette platzieren (Ellipse mit zwei "Lappen")
const buildBrainGraph = (): { nodes: BrainNode[]; edges: BrainEdge[] } => {
  const rand = seededRandom(42);
  const nodes: BrainNode[] = [];
  const cx = 150;
  const cy = 150;
  const NODE_COUNT = 26;

  for (let i = 0; i < NODE_COUNT; i++) {
    // Zwei Hemisphären
    const hemisphere = i < NODE_COUNT / 2 ? -1 : 1;
    const localCx = cx + hemisphere * 30;

    // Polarkoordinaten innerhalb einer Ellipse
    const angle = rand() * Math.PI * 2;
    const radius = 30 + rand() * 70;
    const x = localCx + Math.cos(angle) * radius * 0.9;
    const y = cy + Math.sin(angle) * radius * 1.1;

    nodes.push({
      id: i,
      x,
      y,
      depth: Math.floor(rand() * 3),
      baseR: 3 + rand() * 3,
      phase: rand() * Math.PI * 2,
    });
  }

  // Verbindungen: jeder Knoten zu seinen 2-3 nächsten Nachbarn
  const edges: BrainEdge[] = [];
  const seen = new Set<string>();
  nodes.forEach(a => {
    const dists = nodes
      .filter(b => b.id !== a.id)
      .map(b => ({ b, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .sort((p, q) => p.d - q.d)
      .slice(0, 3);

    dists.forEach(({ b }) => {
      const key = a.id < b.id ? `${a.id}-${b.id}` : `${b.id}-${a.id}`;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push({
        id: key,
        a,
        b,
        delay: (a.id + b.id) * 0.04,
      });
    });
  });

  return { nodes, edges };
};

const BRAIN_GRAPH = buildBrainGraph();

const DynamicBrainAvatar = ({
  isResponding,
  size = "large",
}: {
  isResponding: boolean;
  size?: "large" | "small";
}) => {
  const sizeMap = {
    large: { container: "w-56 h-56" },
    small: { container: "w-32 h-32" },
  };

  const colors = ["#00D9FF", "#0066CC", "#00B8E6", "#0099FF", "#00FFFF", "#7DF9FF"];
  const { nodes, edges } = BRAIN_GRAPH;

  // Während der Antwort werden 3 Verbindungen zufällig zu "Energie-Pulsen"
  const pulseEdges = isResponding ? edges.slice(0, Math.min(8, edges.length)) : [];

  return (
    <div className={`relative ${sizeMap[size].container} flex items-center justify-center`}>
      {/* Aussenringe — drei Schichten in unterschiedlichen Geschwindigkeiten */}
      <motion.div
        animate={{
          scale: isResponding ? [1, 1.15, 0.95, 1.1, 1] : [1, 1.04, 1],
          opacity: isResponding ? [0.3, 0.9, 0.4, 0.8, 0.3] : [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: isResponding ? 1.6 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
        style={{ filter: "blur(0.3px)" }}
      />
      <motion.div
        animate={{
          scale: isResponding ? [1, 1.08, 0.96, 1.06, 1] : [1, 1.02, 1],
          opacity: isResponding ? [0.4, 0.85, 0.3, 0.7, 0.4] : [0.2, 0.35, 0.2],
          rotate: isResponding ? 360 : 0,
        }}
        transition={{
          duration: isResponding ? 6 : 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-3 rounded-full border border-cyan-300/40 border-t-cyan-300/90 border-r-cyan-300/70"
      />
      <motion.div
        animate={{
          rotate: isResponding ? -360 : 0,
        }}
        transition={{
          duration: isResponding ? 4 : 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-6 rounded-full border border-blue-400/30 border-b-cyan-400/80"
      />

      {/* Glow-Aura — wächst und atmet */}
      <motion.div
        animate={{
          scale: isResponding ? [1, 1.3, 1.1, 1.25, 1] : [1, 1.08, 1],
          opacity: isResponding ? [0.4, 0.8, 0.3, 0.7, 0.4] : [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: isResponding ? 1.4 : 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-4 rounded-full bg-cyan-500/20 blur-2xl"
      />

      {/* Hauptcontainer mit organischer Drift */}
      <motion.div
        animate={
          isResponding
            ? {
                scale: [1, 1.06, 0.98, 1.04, 1],
                y: [0, -4, 3, -2, 0],
                x: [0, 3, -2, 2, 0],
                rotateZ: [0, 2, -2, 1.5, 0],
              }
            : {
                y: [0, -2, 0, 2, 0],
                x: [0, 1, 0, -1, 0],
                rotateZ: [0, 0.8, 0, -0.8, 0],
              }
        }
        transition={{
          duration: isResponding ? 2.2 : 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-44 h-44 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="brainGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="brainGlowStrong" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="coreGradient">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%" stopColor="#00FFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0066CC" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Verbindungen — Tiefe via Opazität, organisches Flackern */}
          {edges.map(edge => {
            const avgDepth = (edge.a.depth + edge.b.depth) / 2;
            const baseOpacity = 0.85 - avgDepth * 0.25;
            return (
              <motion.line
                key={edge.id}
                x1={edge.a.x}
                y1={edge.a.y}
                x2={edge.b.x}
                y2={edge.b.y}
                stroke="#00D9FF"
                strokeWidth={1.5 + (2 - avgDepth) * 0.5}
                strokeLinecap="round"
                filter="url(#brainGlow)"
                animate={
                  isResponding
                    ? {
                        opacity: [baseOpacity * 0.4, baseOpacity, baseOpacity * 0.5, baseOpacity * 0.9, baseOpacity * 0.4],
                        stroke: colors,
                      }
                    : {
                        opacity: [baseOpacity * 0.5, baseOpacity * 0.85, baseOpacity * 0.5],
                      }
                }
                transition={{
                  duration: isResponding ? 0.9 + (edge.a.id % 5) * 0.1 : 3 + (edge.a.id % 4) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: edge.delay,
                }}
              />
            );
          })}

          {/* Energiepulse — kleine Punkte, die entlang einer Verbindung laufen */}
          {pulseEdges.map(edge => (
            <motion.circle
              key={`pulse-${edge.id}`}
              r="2.5"
              fill="#FFFFFF"
              filter="url(#brainGlowStrong)"
              animate={{
                cx: [edge.a.x, edge.b.x],
                cy: [edge.a.y, edge.b.y],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.2, 1.2, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: edge.delay * 2,
              }}
            />
          ))}

          {/* Knoten — Tiefen-Layering, individuelles Pulsieren */}
          {nodes.map(node => {
            const depthOpacity = 1 - node.depth * 0.25;
            const depthScale = 1 - node.depth * 0.15;
            return (
              <motion.circle
                key={`node-${node.id}`}
                cx={node.x}
                cy={node.y}
                r={node.baseR * depthScale}
                fill="#00D9FF"
                filter="url(#brainGlow)"
                animate={
                  isResponding
                    ? {
                        r: [
                          node.baseR * depthScale,
                          node.baseR * depthScale * 1.8,
                          node.baseR * depthScale * 0.7,
                          node.baseR * depthScale * 1.5,
                          node.baseR * depthScale,
                        ],
                        fill: colors,
                        opacity: [
                          depthOpacity,
                          depthOpacity,
                          depthOpacity * 0.5,
                          depthOpacity,
                          depthOpacity,
                        ],
                      }
                    : {
                        r: [
                          node.baseR * depthScale,
                          node.baseR * depthScale * 1.25,
                          node.baseR * depthScale,
                        ],
                        opacity: [depthOpacity * 0.7, depthOpacity, depthOpacity * 0.7],
                      }
                }
                transition={{
                  duration: isResponding ? 0.7 + (node.id % 4) * 0.15 : 2.5 + (node.id % 5) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: node.phase * 0.3,
                }}
              />
            );
          })}

          {/* Zentraler Kern — der "Verstand" pulsiert immer, im Antwort-Modus stärker */}
          <motion.circle
            cx="150"
            cy="150"
            r="14"
            fill="url(#coreGradient)"
            filter="url(#brainGlowStrong)"
            animate={{
              r: isResponding ? [14, 22, 12, 20, 14] : [12, 16, 12],
              opacity: isResponding ? [0.9, 1, 0.7, 1, 0.9] : [0.7, 0.95, 0.7],
            }}
            transition={{
              duration: isResponding ? 0.9 : 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Funken-Partikel — nur beim Antworten */}
      {isResponding && (
        <>
          {[...Array(10)].map((_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            const distance = 60 + (i % 3) * 20;
            return (
              <motion.div
                key={`spark-${i}`}
                animate={{
                  x: [0, Math.cos(angle) * distance, Math.cos(angle) * distance * 1.4],
                  y: [0, Math.sin(angle) * distance, Math.sin(angle) * distance * 1.4],
                  opacity: [0, 1, 0],
                  scale: [0.2, 1.2, 0.1],
                }}
                transition={{
                  duration: 0.9 + (i % 4) * 0.15,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.07,
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300"
                style={{ boxShadow: "0 0 8px #00FFFF" }}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default function Synaps() {
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm Synaps, your AI assistant. I'm here to answer questions about Synaptix Labs, our AI solutions, and the innovative programs we can build for you. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [lastAssistantMessageId, setLastAssistantMessageId] = useState<string | null>(null);

  const chatMutation = trpc.chat.send.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayMessages]);

  const speakText = (text: string, messageId: string, language: string = "en") => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSpeakingMessageId(null);

    // Sonderzeichen, Markdown-Symbole und Emojis vor TTS entfernen
    const cleanText = sanitizeForSpeech(text);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.3;
    utterance.volume = 1;
    utterance.lang = language;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) =>
        (voice.name.includes("female") ||
          voice.name.includes("Female") ||
          voice.name.includes("woman") ||
          voice.name.includes("Woman") ||
          voice.name.includes("Zira") ||
          voice.name.includes("Samantha") ||
          voice.name.includes("Victoria")) &&
        voice.lang.startsWith(language)
    ) || voices.find(
      (voice) =>
        voice.name.includes("female") ||
        voice.name.includes("Female") ||
        voice.name.includes("woman") ||
        voice.name.includes("Woman")
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingMessageId(messageId);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: DisplayMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setDisplayMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const lang = detectLanguage(input);
    setDetectedLanguage(lang);

    const messages: Message[] = displayMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
    messages.push({ role: "user", content: input });

    try {
      const response = await chatMutation.mutateAsync({ messages });

      const responseContent = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);

      const synapsMessage: DisplayMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };

      setDisplayMessages((prev) => [...prev, synapsMessage]);
      setLastAssistantMessageId(synapsMessage.id);
      setIsLoading(false);

      setTimeout(() => {
        speakText(responseContent, synapsMessage.id, lang);
      }, 300);
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
      const errorMessage: DisplayMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error processing your message. Please try again.",
        timestamp: new Date(),
      };
      setDisplayMessages((prev) => [...prev, errorMessage]);
      setLastAssistantMessageId(errorMessage.id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const languageNames: Record<string, string> = {
    en: "English",
    de: "Deutsch",
    fr: "Français",
    it: "Italiano",
    es: "Español",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col container max-w-5xl mx-auto w-full py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
              Synaps
            </h1>
            <p className="text-lg text-foreground/60">
              Your AI Assistant
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Globe className="w-4 h-4 text-cyan-400" />
              <p className="text-sm text-foreground/50">
                {languageNames[detectedLanguage]}
              </p>
            </div>
          </motion.div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-4">
            {displayMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-2xl ${
                    msg.role === "user"
                      ? "glasmorph-card bg-accent/10 border-accent/30 text-foreground"
                      : "glasmorph-card bg-blue-500/5 border-blue-400/30 text-foreground"
                  } p-4 rounded-lg`}
                >
                  {msg.role === "assistant" ? (
                    <div className="space-y-3">
                      <Streamdown>{typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}</Streamdown>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-foreground/10">
                        <button
                          onClick={() => speakText(typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content), msg.id, detectedLanguage)}
                          className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
                          title="Speak"
                        >
                          {speakingMessageId === msg.id ? (
                            <VolumeX className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-foreground/60 hover:text-cyan-400" />
                          )}
                        </button>
                        <span className="text-xs text-foreground/50">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p>{msg.content}</p>
                      <span className="text-xs text-foreground/50 mt-2 block">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="glasmorph-card bg-blue-500/5 border-blue-400/30 p-4 rounded-lg">
                  <div className="flex gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                      className="w-3 h-3 rounded-full bg-cyan-400"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                      className="w-3 h-3 rounded-full bg-cyan-400"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                      className="w-3 h-3 rounded-full bg-cyan-400"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Synaps Avatar - Bottom as buddy when responding */}
          {(isLoading || lastAssistantMessageId) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center mb-6"
            >
              <div className="flex flex-col items-center gap-2">
                <DynamicBrainAvatar isResponding={isLoading} size="small" />
                <p className="text-xs text-foreground/50">Synaps is thinking...</p>
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div className="glasmorph-card p-4 border border-accent/30">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Synaptix Labs, AI solutions, trading bots..."
                className="flex-1 bg-background/50 border border-accent/20 rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 resize-none"
                rows={3}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
