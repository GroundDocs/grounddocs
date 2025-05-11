const FeatureList = () => {
  const features = [
    { 
      title: "Reliable K8s Knowledge", 
      description: "LLM answers built from official Kubernetes documentation, not unverified web content—say goodbye to hallucinations." 
      // "Every response is traced to the exact Kubernetes doc line or manifest snippet that backs it—no hallucinations, guaranteed."

    },
    { 
      title: "Version-Perfect Precision", 
      description: "AI assistance that always uses the documentation matching your <strong>exact</strong> Kubernetes version, ensuring every answer is contextually accurate for your cluster." 
      // We auto-detect your cluster version and validate every YAML, flagging deprecated APIs and config drift before they hit prod.
    },
    { 
      title: "Upgrade-Diff Intelligence (Coming Soon)", 
      description: "Planning a 1.29 → 1.31 jump? Get a one-click diff of breaking changes plus AI-generated migration tips—so you can upgrade with confidence, not guesswork." 
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
            <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: feature.description }}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureList;
