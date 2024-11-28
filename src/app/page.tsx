"use client";

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Link from "next/link";

export default function Home() {
  // Mock data for featured posts
  const featuredPosts = [
    {
      id: 1,
      title: "Getting Started with Content Creation",
      excerpt:
        "Learn the fundamentals of creating engaging content that resonates with your audience.",
      date: "2023-11-28",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Art of Storytelling",
      excerpt:
        "Discover how to craft compelling narratives that capture your readers' attention.",
      date: "2023-11-27",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Content Strategy 101",
      excerpt:
        "Build a robust content strategy that drives engagement and growth.",
      date: "2023-11-26",
      readTime: "6 min read",
    },
  ];

  return (
    <main className="flex flex-col items-center">
      <div className="w-full h-[60vh] relative overflow-hidden">
        <BackgroundGradientAnimation containerClassName="absolute inset-0">
          <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl -mt-64">
            <div className="flex flex-col items-center gap-4">
              <h1 className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                Popular Content
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/80">
                Discover and share the most engaging content
              </p>
              <Link
                href="/blog"
                className="mt-6 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg font-semibold transition-all pointer-events-auto"
              >
                Explore Blog
              </Link>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </div>

      {/* Featured Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <time>{post.date}</time>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/blog/${post.id}`}
                    className="hover:text-gray-600"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-black font-medium hover:text-gray-600"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full relative overflow-hidden mb-16 min-h-[400px]">
        <BackgroundGradientAnimation
          containerClassName="absolute inset-0"
          gradientBackgroundStart="rgb(0, 0, 0)"
          gradientBackgroundEnd="rgb(17, 24, 39)"
          firstColor="18, 113, 255"
          secondColor="221, 74, 255"
          thirdColor="100, 220, 255"
          fourthColor="100, 100, 255"
          fifthColor="180, 180, 255"
          pointerColor="140, 100, 255"
          size="70%"
          blendingValue="soft-light"
        >
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center relative z-20">
              <h2 className="text-4xl font-bold mb-4 text-white">
                Stay Updated
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
                Subscribe to our newsletter to receive the latest content, news,
                and insights.
              </p>
              <form className="max-w-md mx-auto">
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border-0 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </section>
    </main>
  );
}
