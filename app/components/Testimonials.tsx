export default function Testimonials() {
  const testimonials = [
    {
      quote: "Found the perfect name in minutes. The AI suggestions were spot-on and the domain was available!",
      author: "Sarah Chen",
      role: "Founder, Luminaire Beauty",
      initial: "S"
    },
    {
      quote: "Worth every penny. The brand strategy guide alone would cost hundreds from an agency.",
      author: "Marcus Rodriguez",
      role: "CEO, Vibe Studios",
      initial: "M"
    },
    {
      quote: "Saved weeks of brainstorming. The names felt premium and actually captured our vision.",
      author: "Emma Thompson",
      role: "Co-founder, Nested Home",
      initial: "E"
    }
  ];

  return (
    <section className="mt-24 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 dark:text-gray-100">
          Trusted by founders
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Join hundreds of brands who found their perfect name
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-rose-accent flex items-center justify-center text-white font-bold text-lg">
                {testimonial.initial}
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
              "{testimonial.quote}"
            </p>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <span className="text-2xl">🔒</span>
          <span className="text-sm font-medium">Secure Payment</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <span className="text-2xl">⚡</span>
          <span className="text-sm font-medium">Instant Delivery</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <span className="text-2xl">💯</span>
          <span className="text-sm font-medium">Satisfaction Guaranteed</span>
        </div>
      </div>
    </section>
  );
}
