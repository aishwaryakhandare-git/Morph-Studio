function HeroSwirls() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Purple Glow */}
      <div className="absolute left-[15%] top-[28%] h-[420px] w-[520px] rounded-full bg-fuchsia-600/20 blur-[150px]" />

      {/* Cyan Glow */}
      <div className="absolute left-[55%] top-[46%] h-[260px] w-[340px] rounded-full bg-cyan-400/20 blur-[140px]" />

      <svg
        className="absolute left-[0%] top-[10%] h-[720px] w-[1350px]"
        viewBox="0 0 1350 720"
        fill="none"
      >
        <defs>

          <linearGradient
            id="wave"
            x1="0"
            y1="0"
            x2="1350"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#F05BFF" />
            <stop offset="40%" stopColor="#22D3EE" />
            <stop offset="75%" stopColor="#F05BFF" />
            <stop offset="100%" stopColor="#4B74FF" />
          </linearGradient>

          <filter id="bigGlow">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          <filter id="smallGlow">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>

        </defs>

        {/* ================= CORE GLOW ================= */}

        <path
          d="
          M-700 420
            C-420 250 -120 250 250 410
            S700 590 980 430
            S1320 320 1700 390
          "
          stroke="#D946EF"
          strokeWidth="18"
          opacity=".16"
          filter="url(#bigGlow)"
        />

        {/* ================= MAIN RIBBON ================= */}

        <path
          d="
          M0 420
          C180 320 280 330 420 410
          S700 590 900 430
          S1140 320 1350 390
          "
          stroke="url(#wave)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#smallGlow)"
        />

        {/* ================= FLOW LINES ================= */}

        {Array.from({ length: 28 }).map((_, i) => (
          <path
            key={i}
            d={`
              M0 ${388 + i * 7}
              C180 ${300 + i * 5}
              280 ${315 + i * 4}
              420 ${396 + i * 3}
              S700 ${576 + i * 2}
              900 ${420 + i * 2}
              S1140 ${312 + i * 2}
              1350 ${382 + i * 2}
            `}
            stroke="url(#wave)"
            strokeWidth={0.8}
            opacity={0.08 + i * 0.02}
            fill="none"
          />
        ))}

      </svg>

      {/* ================= PARTICLES ================= */}

      {[
        ["48%","45%"],
        ["51%","47%"],
        ["54%","49%"],
        ["58%","51%"],
        ["63%","53%"],
        ["68%","48%"],
        ["72%","44%"],
        ["75%","55%"],
        ["80%","52%"],
        ["84%","47%"],
      ].map(([left, top], i) => (
        <div
          key={i}
          className="absolute h-[4px] w-[4px] rounded-full bg-fuchsia-300 shadow-[0_0_12px_#EC5CFF]"
          style={{ left, top }}
        />
      ))}

      {[
        ["76%","46%"],
        ["82%","51%"],
        ["86%","55%"],
        ["90%","50%"],
        ["94%","47%"],
      ].map(([left, top], i) => (
        <div
          key={i}
          className="absolute h-[4px] w-[4px] rounded-full bg-cyan-300 shadow-[0_0_16px_#38BDF8]"
          style={{ left, top }}
        />
      ))}

    </div>
  );
}

export default HeroSwirls;

