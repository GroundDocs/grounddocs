
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
            <div className="mb-2">{">"} Which version of PyTorch supports CUDA 12.1??</div> <br />
            <div className="mb-2">{">"} What's the syntax for K8s Deployments in v1.29?</div> <br />
            <div className="mb-2">{">"} Show me some of the latest Pandas features</div> <br />
            

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
                environment-aware
              </div>
            </div>
          </div>
          
          <div className="text-xs font-mono text-slate-200 bg-slate-800 p-4 rounded-md space-y-4">
            <div>
              <p className="text-slate-400 font-semibold mb-1"># Metadata</p>
              <p><span className="text-slate-400">source_type:</span> changelog</p>
              <p><span className="text-slate-400">version:</span> v1.28</p>
              <p><span className="text-slate-400">url:</span> <a href="https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.28.md" className="underline text-blue-400" target="_blank">View on GitHub</a></p>
            </div>

            <div>
              <p className="text-slate-400 font-semibold mb-1"># Changelog</p>
              <p>• Fix OpenAPI v3 not being cleaned up after deleting APIServices<br />
                <span className="text-slate-400">(#120108, @tnqn) [SIG API Machinery and Testing]</span>
              </p>

              <p>• Fix a 1.28 scheduler regression: pods with concurrent events could be incorrectly moved to the unschedulable queue, getting stuck until the next purge after 5 minutes if no new events occurred.<br />
                <span className="text-slate-400">(#120445, @pohly) [SIG Scheduling]</span>
              </p>

              <p>• Fix concurrent map access in TopologyCache’s <code>HasPopulatedHints</code> method.<br />
                <span className="text-slate-400">(#120372, @Miciah) [SIG Network]</span>
              </p>

              <p>• Fix 1.26 regression: ensure preemption is skipped when PreFilter returns <code>UnschedulableAndUnresolvable</code>.<br />
                <span className="text-slate-400">(#119951, @sanposhiho) [SIG Scheduling]</span>
              </p>
            </div>
            </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl"></div>
    </div>
  );
};

export default SourceVerifiedImage;
