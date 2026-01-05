type SampleNamesProps = {
  industry: string;
  examples: { name: string; style: string }[];
};

export default function SampleNames({ industry, examples }: SampleNamesProps) {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-10 mb-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          See What Our AI Can Create
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Real examples generated for {industry}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {examples.map((example, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-5 hover:scale-105 transition-transform duration-200"
          >
            <p className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              {example.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {example.style}
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-500 mt-6 text-center">
        These are just examples - your results will be uniquely tailored to your specific business description
      </p>
    </div>
  );
}
