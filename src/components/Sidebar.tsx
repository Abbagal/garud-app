import { X, ShieldAlert, Share2, Database, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { NodeData } from '../data/mockData'
import DossierList from './DossierList'

interface SidebarProps {
  node: NodeData;
  onClose: () => void;
}

const Sidebar = ({ node, onClose }: SidebarProps) => {

  const handleExpand = () => {
    // Dispatch custom event that GraphView will listen to
    const event = new CustomEvent('graph:expand', { detail: { nodeId: node.id } });
    window.dispatchEvent(event);
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className="absolute right-0 top-16 bottom-0 w-96 glass-strong shadow-tactical-lg z-20 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-indigo-500/20 flex justify-between items-start bg-gradient-to-br from-navy-900/50 to-navy-850/50">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 text-[10px] mono-tactical text-white mb-3 classification-badge rounded-sm">
            <ShieldAlert className="w-3 h-3" />
            <span>TOP SECRET // NOFORN</span>
          </div>
          <h2 className="text-xl font-display font-bold text-slate-100 leading-tight mb-2">{node.label}</h2>
          <div className="mt-3 flex gap-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] mono-tactical font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-glow-sm">
              {node.type}
            </span>
            {node.role && (
              <span className="px-2.5 py-1 rounded-md text-[10px] mono-tactical font-semibold bg-slate-800/50 text-slate-300 border border-slate-600/50">
                {node.role}
              </span>
            )}
          </div>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors p-2 hover:bg-slate-800/30 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">

        {/* Threat Level */}
        {node.threat && (
          <div className="tactical-card rounded-lg p-5">
            <div className="text-[10px] mono-tactical text-slate-400 mb-3 uppercase tracking-wider font-semibold">Threat Probability</div>
            <div className="flex items-end gap-3 mb-3">
              <span className={`text-4xl font-black mono-tactical data-metric ${node.threat > 75 ? 'text-red-400' : 'text-orange-400'}`}>
                {node.threat}%
              </span>
              <span className="text-xs text-slate-500 mb-2 mono-tactical font-bold">CONFIRMED</span>
            </div>
            <div className="relative w-full bg-navy-900 h-2 rounded-full overflow-hidden shadow-inner border border-navy-700">
              <div
                className={`h-full transition-all duration-1000 ${node.threat > 75 ? 'bg-gradient-to-r from-red-500 to-red-400' : 'bg-gradient-to-r from-orange-500 to-orange-400'} shadow-glow-md`}
                style={{ width: `${node.threat}%` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>
          </div>
        )}

        {/* Description */}
        <div className="tactical-card rounded-lg p-5">
          <h3 className="text-sm font-bold mono-tactical text-tactical-cyan mb-4 flex items-center gap-2 uppercase tracking-wide">
            <Database className="w-4 h-4" />
            INTELLIGENCE SUMMARY
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {node.description || "No specific intelligence summary available for this entity. Cross-reference with SIGINT database required."}
          </p>
        </div>

        {/* Details Grid */}
        {node.details && (
          <div className="tactical-card rounded-lg p-5">
            <h3 className="text-sm font-bold mono-tactical text-tactical-cyan mb-4 flex items-center gap-2 uppercase tracking-wide">
              <Clock className="w-4 h-4" />
              KEY ATTRIBUTES
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(node.details).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2.5 px-3 bg-navy-900/30 rounded border border-navy-700/30 hover:border-indigo-500/30 transition-colors">
                  <span className="text-xs text-slate-400 mono-tactical uppercase tracking-wide font-semibold">{key}</span>
                  <span className="text-sm text-slate-200 mono-tactical font-bold data-metric">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dossier Files */}
        {node.dossier && node.dossier.length > 0 && (
          <DossierList items={node.dossier} />
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-indigo-500/20">
          <h3 className="text-sm font-bold mono-tactical text-slate-300 mb-4 uppercase tracking-wide">AVAILABLE ACTIONS</h3>
          <div className="space-y-3">
            <button
              onClick={handleExpand}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white py-2.5 rounded-lg text-sm font-bold mono-tactical uppercase tracking-wide transition-all shadow-glow-sm hover:shadow-glow-md transform hover:scale-[1.02]"
            >
              <Share2 className="w-4 h-4" />
              Expand Correlations
            </button>

          </div>
        </div>

      </div>
    </motion.div>
  )
}

export default Sidebar
