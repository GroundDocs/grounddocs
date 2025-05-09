
const FeatureList = () => {
  const features = [
    { 
      title: "Source-Verified", 
      description: "Every response backed by live, real documentation — not hallucinations." 
    },
    { 
      title: "Version-Correct", 
      description: "Answers always match the right version of your code, library, or API." 
    },
    { 
      title: "Environment-Aware (Coming Soon)", 
      description: "Tailor answers based on your actual project and system setup." 
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureList;
