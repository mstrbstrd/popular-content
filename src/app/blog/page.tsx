import Link from "next/link";

export default function BlogPage() {
  // Mock data for blog posts
  const posts = [
    {
      id: 1,
      title: "Getting Started with Content Creation",
      excerpt:
        "Learn the fundamentals of creating engaging content that resonates with your audience.",
      date: "2023-11-28",
      readTime: "5 min read",
      category: "Content Creation",
    },
    {
      id: 2,
      title: "The Art of Storytelling",
      excerpt:
        "Discover how to craft compelling narratives that capture your readers' attention.",
      date: "2023-11-27",
      readTime: "7 min read",
      category: "Writing",
    },
    {
      id: 3,
      title: "Content Strategy 101",
      excerpt:
        "Build a robust content strategy that drives engagement and growth.",
      date: "2023-11-26",
      readTime: "6 min read",
      category: "Strategy",
    },
    {
      id: 4,
      title: "SEO Best Practices for Content Creators",
      excerpt:
        "Learn how to optimize your content for search engines while maintaining quality.",
      date: "2023-11-25",
      readTime: "8 min read",
      category: "SEO",
    },
    {
      id: 5,
      title: "Building Your Personal Brand",
      excerpt:
        "Establish your unique voice and presence in the digital landscape.",
      date: "2023-11-24",
      readTime: "6 min read",
      category: "Branding",
    },
    {
      id: 6,
      title: "Content Marketing Trends 2024",
      excerpt:
        "Stay ahead of the curve with these emerging content marketing trends.",
      date: "2023-11-23",
      readTime: "7 min read",
      category: "Marketing",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our latest articles, guides, and insights about content
          creation, marketing, and digital strategy.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {Array.from(new Set(posts.map((post) => post.category))).map(
          (category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full border hover:bg-black hover:text-white transition-colors"
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="mx-2">•</span>
                <time>{post.date}</time>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.id}`} className="hover:text-gray-600">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <Link
                  href={`/blog/${post.id}`}
                  className="text-black font-medium hover:text-gray-600"
                >
                  Read More →
                </Link>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-2">
        <button className="px-4 py-2 border rounded hover:bg-black hover:text-white transition-colors">
          Previous
        </button>
        <button className="px-4 py-2 border rounded hover:bg-black hover:text-white transition-colors">
          Next
        </button>
      </div>
    </div>
  );
}
