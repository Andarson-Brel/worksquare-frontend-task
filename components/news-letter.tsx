import React, { useState } from "react";

interface NewsletterProps {}

const NewsletterSection: React.FC<NewsletterProps> = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = () => {
    // Handle the subscription logic here
    console.log(`Subscribed with email: ${email}`);
  };

  return (
    <section className="py-16 mt-16 container m-auto px-4 rounded-[50px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Heading and description */}
        <div className="flex flex-col justify-center text-left text-gray-900">
          <h2 className="text-2xl font-bold mb-2">Sign up for our Newsletter</h2>
          <p className="mb-6 opacity-90">
            Stay informed about the latest properties at DreamDwell Estates by subscribing to regular updates directly
            to your inbox.
          </p>
        </div>

        {/* Right side: Input and button */}
        <div className="flex flex-col gap-4">
          <div className="border border-gray-300 rounded-lg">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 text-gray-900 border-none focus:outline-none rounded-lg"
            />
          </div>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
