
const SourceVerifiedImage = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-t-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row gap-4 p-6 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl">
        <div className="flex-1 p-4 bg-slate-900 rounded-xl border border-slate-800">
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-xs text-slate-500">LLM Query</span>
          </div>
          <div className="text-green-400 font-mono text-sm">
            <div className="mb-2">{">"} How do I authenticate with the GitHub API v4?</div>
            <div className="mb-2">{">"} What's the syntax for K8s Deployments in v1.29?</div>
            <div>{">"} Show me some of the latest Python 3.14 features</div>
          </div>
        </div>
        
        <div className="flex-1 p-4 bg-slate-900 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-slate-500">Response</span>
          </div>
          
          <div className="mb-3">
            <div className="flex items-center">
              <div className="mr-2 bg-green-500/20 text-green-400 py-1 px-2 rounded text-xs flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                source-verified
              </div>
              <div className="mr-2 bg-green-500/20 text-green-400 py-1 px-2 rounded text-xs flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                version-correct
              </div>
              <div className="mr-2 bg-green-500/20 text-green-400 py-1 px-2 rounded text-xs flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                secure-version(CVE-Free)
              </div>
            </div>
          </div>
          
          <div className="text-sm font-mono text-slate-200">
            <p className="mb-2">To authenticate, use your API key in the header:</p>
            <pre className="bg-slate-800 p-2 rounded text-xs overflow-auto">
              {"Authorization: Bearer YOUR_API_KEY"}
            </pre>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl"></div>
    </div>
  );
};

export default SourceVerifiedImage;
