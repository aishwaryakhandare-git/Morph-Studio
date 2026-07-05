import TopBar from "./TopBar";
import PromptCard from "./PromptCard";
import StatsGrid from "./StatsGrid";

function DashboardWindow() {
  return (
    <div className="overflow-hidden rounded-[30px] border border-violet-500/20 bg-[#0D1022]/90 shadow-[0_0_90px_rgba(124,58,237,.18)]">

      <TopBar />

      <div className="space-y-6 p-6">

        <PromptCard />

        <StatsGrid />

      </div>

    </div>
  );
}

export default DashboardWindow;