function TopBar() {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">

      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
      </div>

      <div className="rounded-lg border border-white/10 bg-[#14182C] px-5 py-2 text-sm text-slate-300">
        Morph Studio Workspace
      </div>

      <div className="flex gap-2">
        <div className="h-8 w-8 rounded-lg bg-[#171B30]" />
        <div className="h-8 w-8 rounded-lg bg-[#171B30]" />
        <div className="h-8 w-8 rounded-lg bg-[#171B30]" />
      </div>

    </div>
  );
}

export default TopBar;