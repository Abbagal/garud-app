import { useState } from 'react'
import { Search, Shield, Bell, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import GraphView from './components/GraphView'
import Sidebar from './components/Sidebar'
import { NodeData, searchNodes } from './data/mockData'

function App() {
  const [viewState, setViewState] = useState<'START' | 'LOADING' | 'GRAPH'>('START');
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Close any open sidebar
    setSelectedNode(null);
    setViewState('LOADING');
    
    // Perform search
    const results = searchNodes(searchQuery);
    
    // Fake loading simulation
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setSearchResults(results);
          setViewState('GRAPH');
        }, 500);
      }
      setLoadingProgress(progress);
    }, 200);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative tactical-grid scanline-overlay">

      {/* Top Navigation Bar (Always visible but styled differently) */}
      <nav className={`z-50 glass-strong shadow-tactical-lg flex items-center justify-between px-6 transition-all duration-500 corner-ornament ${viewState === 'START' ? 'h-0 opacity-0 overflow-hidden' : 'h-16 opacity-100'}`}>
        <div className="flex items-center gap-4">
          <Shield className="text-indigo-500 w-8 h-8 drop-shadow-glow-md" />
          <div className="font-display font-bold text-xl tracking-wider">
            <span className="heading-tactical">GARUD</span>
            <span className="text-indigo-400 text-xs align-top ml-1 font-mono">INTEL</span>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-12">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full premium-input rounded-md py-2 pl-10 pr-16 text-sm mono-tactical text-slate-300"
              placeholder="SEARCH ENTITY / ID..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e as any);
                }
              }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors font-mono font-bold"
            >
              GO
            </button>
          </div>
        </form>

        <div className="flex items-center gap-6 text-slate-400">
          <div className="flex items-center gap-2 text-xs mono-tactical font-semibold text-red-400 border border-red-500/30 bg-red-950/30 px-3 py-1.5 rounded backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 pulse-ring"></span>
            LIVE FEED
          </div>
          <Bell className="w-5 h-5 hover:text-indigo-400 cursor-pointer transition-colors" />
          <User className="w-5 h-5 hover:text-indigo-400 cursor-pointer transition-colors" />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative">

        {/* START SCREEN */}
        <AnimatePresence>
          {viewState === 'START' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-navy-950"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-2xl px-6"
              >
                <div className="flex flex-col items-center mb-12">
                  <Shield className="w-24 h-24 text-indigo-500 mb-6 drop-shadow-glow-lg animate-pulse-slow" />
                  <h1 className="text-6xl font-display font-black tracking-tight mb-3 text-center">
                    <span className="heading-tactical">PROJECT GARUD</span>
                  </h1>
                  <p className="mono-tactical text-tactical-cyan text-sm font-medium tracking-[0.3em] mb-3">STRATEGIC INTELLIGENCE PLATFORM</p>
                  <div className="flex justify-center">
                    <div className="px-3 py-1 classification-badge rounded text-white">
                      TOP SECRET // SI / TK // NOFORN
                    </div>
                  </div>

                  {/* Access Code Verification Animation */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-3 text-xs mono-tactical text-emerald-400">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="animate-pulse">ACCESS LEVEL: CLASSIFIED</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs mono-tactical text-tactical-cyan">
                      <div className="w-2 h-2 rounded-full bg-tactical-cyan animate-pulse"></div>
                      <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>ENCRYPTION: AES-256</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs mono-tactical text-indigo-400">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                      <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>NETWORK: SECURE</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSearch} className="relative w-full">
                  <div className="relative group glow-border rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Search className="h-6 w-6 text-slate-500 group-focus-within:text-tactical-cyan transition-colors" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-12 pr-24 py-4 glass-panel rounded-lg text-lg mono-tactical text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 outline-none transition-all shadow-tactical-lg"
                      placeholder="Enter target name, ID, or keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center z-10">
                      <span className="text-tactical-cyan mono-tactical text-xs border border-tactical-cyan/30 bg-tactical-cyan/10 rounded px-2 py-1 font-semibold">RETURN ⏎</span>
                    </div>
                  </div>
                </form>

                <div className="mt-8 flex justify-center gap-8 text-sm mono-tactical">
                  <span className="text-slate-500">SYSTEM: <span className="text-emerald-400 font-semibold">ONLINE</span></span>
                  <span className="text-slate-500">DB: <span className="text-emerald-400 font-semibold">CONNECTED</span></span>
                  <span className="text-slate-500">NODES: <span className="gradient-text-cyan font-semibold">14.2M</span></span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LOADING SCREEN */}
        <AnimatePresence>
          {viewState === 'LOADING' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center glass"
            >
              <div className="w-96 tactical-card rounded-lg p-6">
                <div className="flex justify-between text-xs mono-tactical text-tactical-cyan mb-3">
                  <span className="font-semibold">INITIATING SEARCH PROTOCOL...</span>
                  <span className="data-metric font-bold">{Math.round(loadingProgress)}%</span>
                </div>
                <div className="h-2 bg-navy-800 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-tactical-cyan shadow-glow-md"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <div className="mt-4 space-y-1.5">
                  {loadingProgress > 20 && <div className="text-xs mono-tactical text-slate-400 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse"></span>Scanning databases for "{searchQuery}"...</div>}
                  {loadingProgress > 50 && <div className="text-xs mono-tactical text-slate-400 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse"></span>Correlating entities...</div>}
                  {loadingProgress > 80 && <div className="text-xs mono-tactical text-slate-400 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse"></span>Building filtered topology...</div>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GRAPH VIEW */}
        {viewState === 'GRAPH' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-navy-950"
          >
            <GraphView 
              onNodeSelect={setSelectedNode} 
              searchResults={searchResults}
            />
          </motion.div>
        )}

      </main>

      {/* SIDEBAR */}
      <AnimatePresence>
        {selectedNode && (
          <Sidebar
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </AnimatePresence>

    </div>
  )
}

export default App
