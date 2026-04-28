import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Brain, BarChart3, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

type Category = "ai" | "trading" | "market" | "technology";

const categories = [
  { id: "ai", label: "AI & Machine Learning", icon: Brain },
  { id: "trading", label: "Trading & Crypto", icon: TrendingUp },
  { id: "market", label: "Market News", icon: BarChart3 },
  { id: "technology", label: "Technology", icon: Zap },
] as const;

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");

  // Hole Blog Posts
  const { data: allPosts, isLoading: isLoadingAll } = trpc.blog.getPosts.useQuery({
    limit: 12,
  });

  const { data: categoryPosts, isLoading: isLoadingCategory } = trpc.blog.getByCategory.useQuery(
    selectedCategory as Category,
    { enabled: selectedCategory !== "all" }
  );

  const { data: featuredPosts } = trpc.blog.getFeatured.useQuery();

  const posts = selectedCategory === "all" ? allPosts : categoryPosts;
  const isLoading = selectedCategory === "all" ? isLoadingAll : isLoadingCategory;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 tech-grid">
          <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-20" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Latest Insights</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-display font-bold text-foreground mb-6">
                Blog & Insights
              </h1>
              <p className="text-xl text-foreground/70 mb-8 max-w-2xl">
                Stay updated with the latest AI trends, trading strategies, and market insights. 
                Automatically curated from trusted sources worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts && featuredPosts.length > 0 && (
          <section className="py-20 bg-background/50 backdrop-blur-xl border-t border-accent/10">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl font-display font-bold text-foreground mb-2">
                  Featured Stories
                </h2>
                <p className="text-foreground/60">
                  Top stories from this week
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredPosts.slice(0, 3).map((post, index) => (
                  <motion.a
                    key={post.id}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="glasmorph-card p-6 group hover:border-accent/50 transition-all cursor-pointer"
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                      />
                    )}
                    <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/30 rounded-full mb-3">
                      <span className="text-xs font-medium text-accent capitalize">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-3 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-foreground/50">
                      <span>{post.source}</span>
                      <span>{new Date(post.pubDate).toLocaleDateString()}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-12 bg-background border-t border-accent/10">
          <div className="container">
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-background shadow-glow-lg"
                    : "border border-accent/30 text-foreground/80 hover:border-accent/50 hover:text-accent"
                }`}
              >
                All Posts
              </motion.button>

              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id as Category)}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-background shadow-glow-lg"
                        : "border border-accent/30 text-foreground/80 hover:border-accent/50 hover:text-accent"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-background/50 backdrop-blur-xl border-t border-accent/10">
          <div className="container">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glasmorph-card p-6 animate-pulse">
                    <div className="h-40 bg-accent/10 rounded-lg mb-4" />
                    <div className="h-4 bg-accent/10 rounded mb-2" />
                    <div className="h-4 bg-accent/10 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <motion.a
                    key={post.id}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="glasmorph-card p-6 group hover:border-accent/50 transition-all cursor-pointer h-full flex flex-col"
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                      />
                    )}
                    <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/30 rounded-full mb-3 w-fit">
                      <span className="text-xs font-medium text-accent capitalize">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors flex-grow">
                      {post.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-foreground/50 mt-auto pt-4 border-t border-accent/10">
                      <span className="truncate">{post.source}</span>
                      <span className="flex-shrink-0 ml-2">
                        {new Date(post.pubDate).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/60 text-lg">
                  No posts available for this category. Please try another one.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background border-t border-accent/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glasmorph-card p-12 md:p-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Ready to Build Your Custom Solution?
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
                Get expert insights from our team on how to implement these trends in your business
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Get Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
                <Link href="/synaps">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border border-accent/30 text-foreground font-semibold rounded-lg hover:bg-accent/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Ask Synaps AI
                    <Brain className="w-5 h-5" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
