import React from "react";

/** Fixed full-canvas tech backdrop — stagnant; sketch mask reveals it */
const BuildSideDeco: React.FC = () => (
  <div className="split-hero-tech-canvas" aria-hidden>
    <div className="split-hero-tech-grid" />
    <div className="split-hero-tech-vignette" />

    {/* Ambient corner marks */}
    <svg className="tech-ambient" viewBox="0 0 1440 900" preserveAspectRatio="none">
      <path d="M1180 80 L1280 80 M1230 30 L1230 130" stroke="rgba(138,180,255,0.12)" strokeWidth="1" />
      <path d="M920 780 L1020 780 M970 730 L970 830" stroke="rgba(138,180,255,0.1)" strokeWidth="1" />
      <path d="M180 520 L280 480 M220 620 L320 580" stroke="rgba(138,180,255,0.14)" strokeWidth="1" strokeDasharray="4 5" />
      <path d="M380 340 C420 360 460 320 520 350" stroke="rgba(138,180,255,0.12)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
      <circle cx="1100" cy="620" r="2" fill="rgba(138,180,255,0.25)" />
      <circle cx="860" cy="180" r="2" fill="rgba(138,180,255,0.2)" />
      <circle cx="240" cy="640" r="2" fill="rgba(138,180,255,0.22)" />
      <circle cx="420" cy="380" r="2" fill="rgba(138,180,255,0.18)" />
    </svg>

    {/* —— Left of portrait: revealed when slider uncovers build layer —— */}

    <div className="tech-wire tech-wire--arch">
      <span className="tech-wire-label">SYSTEM MAP</span>
      <svg viewBox="0 0 200 130" fill="none" className="tech-wire-svg">
        <rect x="8" y="10" width="52" height="34" rx="2" stroke="rgba(138,180,255,0.35)" strokeWidth="1" fill="rgba(138,180,255,0.04)" />
        <rect x="74" y="48" width="52" height="34" rx="2" stroke="rgba(138,180,255,0.35)" strokeWidth="1" fill="rgba(138,180,255,0.04)" />
        <rect x="140" y="10" width="52" height="34" rx="2" stroke="rgba(138,180,255,0.35)" strokeWidth="1" fill="rgba(138,180,255,0.04)" />
        <rect x="74" y="92" width="52" height="28" rx="2" stroke="rgba(138,180,255,0.28)" strokeWidth="1" fill="rgba(138,180,255,0.03)" />
        <path d="M60 27 H74 M100 48 V42 M126 27 H140 M100 82 V92" stroke="rgba(138,180,255,0.3)" strokeWidth="1" />
        <text x="34" y="31" fill="rgba(138,180,255,0.5)" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          API
        </text>
        <text x="100" y="69" fill="rgba(138,180,255,0.5)" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          svc
        </text>
        <text x="166" y="31" fill="rgba(138,180,255,0.5)" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          DB
        </text>
        <text x="100" y="110" fill="rgba(138,180,255,0.45)" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          queue
        </text>
      </svg>
    </div>

    <div className="tech-code tech-code--handler">
      <pre>
        <code>
          <span className="tech-kw">async function</span> <span className="tech-fn">settle</span>(batch) {"{"}
          {"\n"}
          {"  "}
          <span className="tech-kw">await</span> ledger.<span className="tech-fn">lock</span>(batch.id);
          {"\n"}
          {"  "}
          <span className="tech-kw">return</span> queue.<span className="tech-fn">emit</span>({"{"} ok: <span className="tech-lit">true</span> {"}"});
          {"\n"}
          {"}"}
        </code>
      </pre>
    </div>

    <div className="tech-wire tech-wire--state">
      <span className="tech-wire-label">STATE</span>
      <svg viewBox="0 0 240 72" fill="none" className="tech-wire-svg">
        <rect x="4" y="22" width="68" height="28" rx="14" stroke="rgba(138,180,255,0.32)" strokeWidth="1" />
        <rect x="86" y="22" width="68" height="28" rx="14" stroke="rgba(138,180,255,0.32)" strokeWidth="1" />
        <rect x="168" y="22" width="68" height="28" rx="14" stroke="rgba(138,180,255,0.32)" strokeWidth="1" />
        <path d="M72 36 H86 M154 36 H168" stroke="rgba(138,180,255,0.28)" strokeWidth="1" markerEnd="url(#state-arrow)" />
        <path d="M120 50 C120 62 104 62 104 50" stroke="rgba(255,159,118,0.4)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <text x="38" y="40" fill="rgba(138,180,255,0.5)" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          pending
        </text>
        <text x="120" y="40" fill="rgba(138,180,255,0.5)" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          valid
        </text>
        <text x="202" y="40" fill="rgba(138,180,255,0.5)" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          settled
        </text>
        <text x="108" y="66" fill="rgba(255,159,118,0.55)" fontSize="7" fontFamily="JetBrains Mono, monospace">
          retry
        </text>
        <defs>
          <marker id="state-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="rgba(138,180,255,0.35)" />
          </marker>
        </defs>
      </svg>
    </div>

    <div className="tech-code tech-code--log">
      <span className="tech-code-label">trace · 03:14</span>
      <pre>
        <code>
          <span className="tech-log-dim">&gt;</span> batch_lock <span className="tech-log-ok">ok</span>
          {"\n"}
          <span className="tech-log-dim">&gt;</span> emit_event <span className="tech-log-ok">ok</span>
          {"\n"}
          <span className="tech-log-dim">&gt;</span> p99 <span className="tech-lit">42ms</span>
        </code>
      </pre>
    </div>

    {/* —— Right of portrait —— */}
    <div className="tech-wire tech-wire--dashboard">
      <span className="tech-wire-label">DASHBOARD</span>
      <svg viewBox="0 0 320 200" fill="none" className="tech-wire-svg">
        <rect x="1" y="1" width="318" height="198" rx="3" stroke="rgba(138,180,255,0.22)" strokeWidth="1" />
        <rect x="12" y="12" width="296" height="22" rx="1" stroke="rgba(138,180,255,0.18)" strokeWidth="0.8" />
        <rect x="12" y="44" width="72" height="144" rx="1" stroke="rgba(138,180,255,0.15)" strokeWidth="0.8" />
        <rect x="92" y="44" width="216" height="68" rx="1" stroke="rgba(138,180,255,0.15)" strokeWidth="0.8" />
        <rect x="92" y="120" width="104" height="68" rx="1" stroke="rgba(138,180,255,0.15)" strokeWidth="0.8" />
        <rect x="204" y="120" width="104" height="68" rx="1" stroke="rgba(138,180,255,0.15)" strokeWidth="0.8" />
        <path d="M108 160 L132 148 L156 152 L180 134 L204 140 L228 126 L252 130" stroke="rgba(138,180,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>

    {/* Large faint USER FLOW */}
    <div className="tech-wire tech-wire--flow">
      <span className="tech-wire-label">USER FLOW</span>
      <svg viewBox="0 0 340 120" fill="none" className="tech-wire-svg">
        <path d="M52 60 H108 M232 60 H288" stroke="rgba(138,180,255,0.28)" strokeWidth="1" markerEnd="url(#flow-arrow)" />
        <circle cx="40" cy="60" r="28" stroke="rgba(138,180,255,0.35)" strokeWidth="1" />
        <circle cx="170" cy="60" r="28" stroke="rgba(138,180,255,0.35)" strokeWidth="1" />
        <circle cx="300" cy="60" r="28" stroke="rgba(138,180,255,0.35)" strokeWidth="1" />
        <text x="40" y="65" textAnchor="middle" fill="rgba(138,180,255,0.55)" fontSize="14" fontFamily="JetBrains Mono, monospace">
          A
        </text>
        <text x="170" y="65" textAnchor="middle" fill="rgba(138,180,255,0.55)" fontSize="14" fontFamily="JetBrains Mono, monospace">
          B
        </text>
        <text x="300" y="65" textAnchor="middle" fill="rgba(138,180,255,0.55)" fontSize="14" fontFamily="JetBrains Mono, monospace">
          C
        </text>
        <defs>
          <marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="rgba(138,180,255,0.35)" />
          </marker>
        </defs>
      </svg>
    </div>

    {/* Solution — dark code panel */}
    <div className="tech-code tech-code--solution">
      <pre>
        <code>
          <span className="tech-kw">const</span> <span className="tech-fn">Solution</span> = {"({ problem, users })"} =&gt; {"{"}
          {"\n"}
          {"  "}
          <span className="tech-kw">const</span> impact = {"{"}
          {"\n"}
          {"    "}reliability: <span className="tech-str">&quot;high&quot;</span>,{"\n"}
          {"    "}scale: <span className="tech-str">&quot;enterprise&quot;</span>,{"\n"}
          {"  }"};
          {"\n"}
          {"  "}
          <span className="tech-kw">return</span> <span className="tech-fn">build</span>(impact);
          {"\n"}
          {"};"}
        </code>
      </pre>
    </div>

    {/* Payment type — dark code panel */}
    <div className="tech-code tech-code--payment">
      <pre>
        <code>
          <span className="tech-kw">type</span> <span className="tech-type">Payment</span> = {"{"}
          {"\n"}
          {"  "}id: <span className="tech-type">string</span>;{"\n"}
          {"  "}amount: <span className="tech-type">number</span>;{"\n"}
          {"  "}status: <span className="tech-str">&quot;pending&quot;</span>
          {"\n"}
          {"         | "}
          <span className="tech-str">&quot;settled&quot;</span>;
          {"\n"}
          {"};"}
        </code>
      </pre>
    </div>
  </div>
);

export default BuildSideDeco;
