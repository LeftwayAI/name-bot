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
    <section className="mt-32 mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
          Trusted by founders
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-xl max-w-2xl mx-auto">
          Join hundreds of brands who found their perfect name
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="glass-card rounded-3xl p-8 hover:shadow-xl transition-all duration-300 fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Quote icon */}
            <div className="text-rose-coral text-4xl mb-4 opacity-50">"</div>

            <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base mb-6">
              {testimonial.quote}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-accent to-rose-coral flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {testimonial.initial}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-12 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Secure Payment</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">SSL encrypted</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Instant Delivery</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Email within minutes</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <span className="text-2xl">💯</span>
          </div>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Money-Back Guarantee</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">7-day refund policy</span>
        </div>
      </div>
    </section>
  );
}
