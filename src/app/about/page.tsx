import Image from "next/image";

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & Editor-in-Chief",
    bio: "Content strategist with 10+ years of experience in digital media.",
    image: "/placeholder-author.jpg",
  },
  {
    name: "Jane Smith",
    role: "Senior Content Editor",
    bio: "Former journalist turned digital content expert.",
    image: "/placeholder-author.jpg",
  },
  {
    name: "Mike Johnson",
    role: "Content Marketing Manager",
    bio: "Specializes in SEO and content distribution strategies.",
    image: "/placeholder-author.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About Popular Content</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're passionate about creating and curating content that informs,
          inspires, and engages our community.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At Popular Content, we believe in the power of well-crafted content
            to educate, inspire, and connect people. Our mission is to provide
            valuable insights and engaging stories that help our readers grow
            personally and professionally.
          </p>
          <p className="text-gray-600">
            Founded in 2023, we've grown from a small blog to a comprehensive
            content platform, serving thousands of readers worldwide with
            quality articles, guides, and resources.
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-gray-600">Monthly Readers</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-600">Articles Published</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-600">Expert Contributors</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-gray-600">Content Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-500 mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Quality First</h3>
          <p className="text-gray-600">
            We prioritize high-quality, well-researched content that provides
            real value to our readers.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Community Focused</h3>
          <p className="text-gray-600">
            We build and nurture a community of engaged readers and contributors
            who share our passion for great content.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Always Learning</h3>
          <p className="text-gray-600">
            We continuously evolve and adapt to bring you the most relevant and
            up-to-date content in the digital space.
          </p>
        </div>
      </div>
    </div>
  );
}
