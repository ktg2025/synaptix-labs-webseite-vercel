import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Volume2, VolumeX, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
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

const detectLanguage = (text: string): string => {
  const lowerText = text.toLowerCase();

  if (
    lowerText.includes("hallo") ||
    lowerText.includes("guten") ||
    lowerText.includes("wie") ||
    lowerText.includes("können") ||
    lowerText.includes("danke")
  ) {
    return "de";
  }

  if (
    lowerText.includes("bonjour") ||
    lowerText.includes("comment") ||
    lowerText.includes("merci")
  ) {
    return "fr";
  }

  if (
    lowerText.includes("ciao") ||
    lowerText.includes("come") ||
    lowerText.includes("grazie")
  ) {
    return "it";
  }

  if (
    lowerText.includes("hola") ||
    lowerText.includes("cómo") ||
    lowerText.includes("gracias")
  ) {
    return "es";
  }

  return "en";
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm Synaps. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = trpc.chat.send.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayMessages]);

  const speakText = (text: string, messageId: string, language: string = "en") => {
    window.speechSynthesis.cancel();
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
          voice.name.includes("Woman")) &&
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
      setSpeakingMessageId(messageId);
    };
    utterance.onend = () => {
      setSpeakingMessageId(null);
    };
    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeakingMessageId(null);
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

      setTimeout(() => {
        speakText(responseContent, synapsMessage.id, lang);
      }, 300);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: DisplayMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setDisplayMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
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
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-96 max-w-[calc(100vw-2rem)] bg-background border border-accent/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-accent/20 p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Synaps</h3>
                <p className="text-xs text-foreground/60">AI Assistant</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto h-96 p-4 space-y-3 bg-background/50">
              {displayMessages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs ${
                      msg.role === "user"
                        ? "bg-accent/20 border border-accent/30 text-foreground"
                        : "bg-blue-500/10 border border-blue-400/30 text-foreground"
                    } p-3 rounded-lg text-sm`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="space-y-2">
                        <Streamdown>{typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}</Streamdown>
                        <button
                          onClick={() => speakText(typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content), msg.id, detectedLanguage)}
                          className="p-1 hover:bg-foreground/10 rounded transition-colors"
                        >
                          {speakingMessageId === msg.id ? (
                            <VolumeX className="w-3 h-3 text-cyan-400" />
                          ) : (
                            <Volume2 className="w-3 h-3 text-foreground/60" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <p>{msg.content}</p>
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
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600"
                  />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-accent/20 p-3 bg-background">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-background/50 border border-accent/20 rounded-lg px-3 py-2 text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent/50 resize-none"
                  rows={2}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-400 text-background shadow-lg hover:shadow-glow-lg transition-all flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
