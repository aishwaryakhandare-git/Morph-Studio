function PromptCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#13182C] p-5">

      <p className="text-xs uppercase tracking-widest text-violet-400">
        AI Prompt
      </p>

      <p className="mt-4 leading-7 text-slate-300">
        Build a SaaS dashboard with a left sidebar, analytics cards,
        charts, activity feed and dark glassmorphism design.
      </p>

      <button className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-500">
        Generate UI
      </button>

    </div>
  );
}

export default PromptCard;