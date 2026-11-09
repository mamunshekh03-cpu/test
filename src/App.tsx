import React from 'react';
import { Sparkles, Code2, Rocket, Palette, ArrowRight } from 'lucide-react';

export default function App() {
  const suggestions = [
    {
      icon: Sparkles,
      title: 'AI Productivity Suite',
      desc: 'Document intelligence, smart note-taking, or contextual assistants.',
      tag: 'AI & Tools'
    },
    {
      icon: Palette,
      title: 'Interactive Dashboard',
      desc: 'Real-time analytics, financial trackers, or rich data visualizations.',
      tag: 'Analytics'
    },
    {
      icon: Rocket,
      title: 'SaaS or Commerce Hub',
      desc: 'Feature-rich web app with workflows, catalogs, and customer portals.',
      tag: 'Full Application'
    },
    {
      icon: Code2,
      title: 'Creative Playground',
      desc: 'Canvas studio, interactive audio-visualizer, or game experience.',
      tag: 'Interactive'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-sky-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-indigo-900/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/80 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight text-slate-100 text-base">App Studio</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Environment Ready</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ready to build your vision</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
          What would you like to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400">
            create today?
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Tell me what you have in mind—from web applications, interactive dashboards, and AI tools
          to creative games and workflows. I will design and build it for you.
        </p>

        {/* Suggestion Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {suggestions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-800/80 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider bg-slate-800/40 px-2.5 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-100 group-hover:text-white text-base mb-1 flex items-center justify-between">
                  {item.title}
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </h3>
                <p className="text-sm text-slate-400 leading-snug">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 py-4 px-6 text-center text-xs text-slate-400">
        Type your idea in chat to get started
      </footer>
    </div>
  );
}
