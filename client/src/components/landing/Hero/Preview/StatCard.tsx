type Props = {
  title: string;
  value: string;
};

function StatCard({ title, value }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#151A31] p-5">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-bold text-white">
        {value}
      </h3>

    </div>
  );
}

export default StatCard;