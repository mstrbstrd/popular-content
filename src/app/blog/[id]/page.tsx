import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - in a real app, this would come from a database or API
const posts = [
  {
    id: 1,
    title: "Getting Started with Content Creation",
    content: `
      Content creation is an essential skill in today's digital landscape. Whether you're a business owner, marketer, or aspiring influencer, understanding how to create engaging content is crucial for success.

      ## Why Content Creation Matters

      In the digital age, content is king. It's how we communicate, engage, and build relationships with our audience. Good content can:
      
      - Build trust with your audience
      - Establish your expertise
      - Drive engagement and conversions
      - Create lasting relationships

      ## Getting Started

      1. **Know Your Audience**
         Understanding who you're creating content for is the first step to success.

      2. **Choose Your Medium**
         Whether it's writing, video, or podcasting, pick the medium that best suits your message.

      3. **Create a Content Calendar**
         Consistency is key in content creation. Plan your content in advance.

      4. **Focus on Quality**
         It's better to create less content of higher quality than to flood your channels with mediocre content.

      ## Best Practices

      - Research your topics thoroughly
      - Use a consistent voice and style
      - Engage with your audience
      - Monitor and analyze your results
      - Stay up to date with trends

      Remember, content creation is a journey, not a destination. Keep learning, experimenting, and refining your approach.
    `,
    date: "2023-11-28",
    readTime: "5 min read",
    category: "Content Creation",
    author: {
      name: "John Doe",
      role: "Content Strategist",
      image: "/placeholder-author.jpg",
    },
  },
  // Add more posts as needed
];

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === parseInt(params.id));

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
          </li>
          <li>→</li>
          <li>
            <Link href="/blog" className="hover:text-gray-900">
              Blog
            </Link>
          </li>
          <li>→</li>
          <li className="text-gray-900">{post.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span className="bg-gray-100 px-2 py-1 rounded">{post.category}</span>
          <span>•</span>
          <time>{post.date}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-sm text-gray-500">{post.author.role}</div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {post.content.split("\n").map((paragraph, index) => {
          if (paragraph.trim().startsWith("#")) {
            const match = paragraph.match(/^#+/);
            if (!match) return null;
            const level = match[0].length;
            const text = paragraph.replace(/^#+\s/, "");
            const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag key={index} className="font-bold my-4">
                {text}
              </HeadingTag>
            );
          }
          if (paragraph.trim().startsWith("-")) {
            return (
              <ul key={index} className="list-disc ml-6 my-4">
                <li>{paragraph.replace(/^-\s/, "")}</li>
              </ul>
            );
          }
          if (paragraph.trim().startsWith("1.")) {
            return (
              <ol key={index} className="list-decimal ml-6 my-4">
                <li>{paragraph.replace(/^\d+\.\s/, "")}</li>
              </ol>
            );
          }
          if (paragraph.trim().startsWith("**")) {
            const text = paragraph.replace(/\*\*/g, "");
            return (
              <strong key={index} className="font-bold">
                {text}
              </strong>
            );
          }
          return (
            paragraph.trim() && (
              <p key={index} className="my-4">
                {paragraph}
              </p>
            )
          );
        })}
      </div>

      {/* Share and Navigation */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button className="text-gray-500 hover:text-gray-900">
              Share on Twitter
            </button>
            <button className="text-gray-500 hover:text-gray-900">
              Share on LinkedIn
            </button>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 border rounded hover:bg-black hover:text-white transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
