import StatCard from "./StatCard";

function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">

      <StatCard
        title="Projects"
        value="128"
      />

      <StatCard
        title="Components"
        value="842"
      />

      <StatCard
        title="Users"
        value="2.4k"
      />

      <StatCard
        title="Deploys"
        value="98"
      />

    </div>
  );
}

export default StatsGrid;