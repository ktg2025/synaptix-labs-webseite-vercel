import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Streamdown } from "streamdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hallo! 👋 Ich bin der Synaptix Labs KI-Assistant. Ich kann dir über unsere Produkte, Services und Lösungen berichten. Wie kann ich dir heute helfen?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Call the tRPC chat API
      const response = await fetch("/api/trpc/chat.send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          json: {
            messages: newMessages,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const result = data?.result?.data?.json;

      if (result?.content) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: result.content },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es später erneut.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl h-[600px] flex flex-col rounded-2xl border border-cyan-500/20 bg-background/40 backdrop-blur-xl overflow-hidden glow-cyan">
          {/* Chat Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-background"
          >
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-cyan-500/20 border border-cyan-500/30 text-foreground"
                      : "bg-blue-600/10 border border-blue-500/20 text-foreground/90"
                  }`}
                >
                  <Streamdown>{msg.content}</Streamdown>
                </div>
              </motion.div>
            ))}

            {/* Loading Indicator with Pulsing Sphere */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600/10 border border-blue-500/20">
                  {/* Pulsing Sphere */}
                  <div className="relative w-8 h-8">
                    {/* Outer pulsing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 0.3, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Middle rotating ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-300"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Inner sphere with glow */}
                    <motion.div
                      className="absolute inset-1 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg"
                      animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 0 10px rgba(0, 217, 255, 0.5)",
                          "0 0 30px rgba(0, 217, 255, 0.8)",
                          "0 0 10px rgba(0, 217, 255, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Floating particles around sphere */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-cyan-300"
                        animate={{
                          x: [0, Math.cos((i * 2 * Math.PI) / 3) * 15],
                          y: [0, Math.sin((i * 2 * Math.PI) / 3) * 15],
                          opacity: [0.8, 0.3, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }}
                        style={{
                          left: "50%",
                          top: "50%",
                          marginLeft: "-2px",
                          marginTop: "-2px",
                        }}
                      />
                    ))}
                  </div>

                  <span className="text-sm text-cyan-300 font-medium">
                    KI denkt nach...
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-cyan-500/10 p-4 bg-background/60 backdrop-blur-sm">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Fragen Sie mich über Synaptix Labs, MTI-26, Trading Bot oder unsere Services..."
                className="flex-1 resize-none rounded-lg border border-cyan-500/20 bg-background/40 px-4 py-3 text-foreground placeholder-foreground/40 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 backdrop-blur-sm max-h-24"
                disabled={isLoading}
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold hover:shadow-glow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
