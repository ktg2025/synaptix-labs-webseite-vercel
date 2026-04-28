import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import Parser from "rss-parser";

const parser = new Parser();

// RSS Feed URLs für KI-Trends und Trading-Tipps
const RSS_FEEDS = [
  "https://feeds.bloomberg.com/markets/news.rss", // Bloomberg Markets
  "https://feeds.techcrunch.com/", // TechCrunch
  "https://www.cnbc.com/id/100003114/device/rss/rss.html", // CNBC
  "https://feeds.bloomberg.com/technology/news.rss", // Bloomberg Technology
];

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category: "ai" | "trading" | "market" | "technology";
  image?: string;
}

// Kategorisiere Posts basierend auf Keywords
function categorizePost(title: string, description: string): "ai" | "trading" | "market" | "technology" {
  const content = `${title} ${description}`.toLowerCase();

  if (content.includes("ai") || content.includes("artificial intelligence") || content.includes("machine learning")) {
    return "ai";
  }
  if (content.includes("trading") || content.includes("crypto") || content.includes("bitcoin") || content.includes("ethereum")) {
    return "trading";
  }
  if (content.includes("market") || content.includes("stock") || content.includes("price")) {
    return "market";
  }
  return "technology";
}

// Aggregiere RSS Feeds
async function aggregateFeeds(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);

      feed.items.slice(0, 5).forEach((item: any, index: number) => {
        if (item.title && item.link) {
          const post: BlogPost = {
            id: `${feed.title}-${index}-${Date.now()}`,
            title: item.title,
            description: item.contentSnippet || item.content || "Klicken Sie für mehr Informationen",
            link: item.link,
            pubDate: item.pubDate || new Date().toISOString(),
            source: feed.title || "Unknown Source",
            category: categorizePost(item.title, item.contentSnippet || ""),
            image: item.enclosure?.url,
          };
          posts.push(post);
        }
      });
    } catch (error) {
      console.error(`Failed to fetch RSS feed from ${feedUrl}:`, error);
    }
  }

  // Sortiere nach Veröffentlichungsdatum (neueste zuerst)
  return posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

// Filter Posts nach Kategorie
function filterByCategory(posts: BlogPost[], category?: string): BlogPost[] {
  if (!category) return posts;
  return posts.filter((post) => post.category === category);
}

export const blogRouter = router({
  // Hole alle aggregierten Blog-Posts
  getPosts: publicProcedure
    .input(
      z.object({
        category: z.enum(["ai", "trading", "market", "technology"]).optional(),
        limit: z.number().default(12),
      })
    )
    .query(async ({ input }) => {
      try {
        const posts = await aggregateFeeds();
        const filtered = filterByCategory(posts, input.category);
        return filtered.slice(0, input.limit);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        return [];
      }
    }),

  // Hole Posts einer spezifischen Kategorie
  getByCategory: publicProcedure
    .input(z.enum(["ai", "trading", "market", "technology"]))
    .query(async ({ input }) => {
      try {
        const posts = await aggregateFeeds();
        return filterByCategory(posts, input).slice(0, 6);
      } catch (error) {
        console.error("Error fetching blog posts by category:", error);
        return [];
      }
    }),

  // Hole Featured Posts (Top 3)
  getFeatured: publicProcedure.query(async () => {
    try {
      const posts = await aggregateFeeds();
      return posts.slice(0, 3);
    } catch (error) {
      console.error("Error fetching featured posts:", error);
      return [];
    }
  }),
});
