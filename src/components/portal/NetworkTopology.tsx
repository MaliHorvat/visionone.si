import { Share2 } from "lucide-react";
import type { TopologyEdge, TopologyNode } from "@/lib/types";
import { Card, CardHeader } from "./ui";

type Props = { nodes: TopologyNode[]; edges: TopologyEdge[] };

const NODE_STYLE: Record<TopologyNode["type"], { color: string; label: string }> = {
  internet: { color: "#64748b", label: "Internet" },
  router: { color: "#2dd4bf", label: "Usmerjevalnik" },
  switch: { color: "#60a5fa", label: "Stikalo" },
  nvr: { color: "#a78bfa", label: "Snemalnik" },
  camera: { color: "#fbbf24", label: "Kamera" },
};

export function NetworkTopology({ nodes, edges }: Props) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const types = Array.from(new Set(nodes.map((n) => n.type)));

  return (
    <Card className="overflow-hidden">
      <CardHeader title="Omrežna topologija" icon={Share2} description="Povezave med napravami na objektu (demo)." />
      <div className="p-4">
        <svg viewBox="0 0 760 240" className="h-auto w-full max-w-full" role="img" aria-label="Diagram omrežne topologije">
          {edges.map((e) => {
            const a = byId[e.from];
            const b = byId[e.to];
            if (!a || !b) return null;
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--vo-border-strong)"
                strokeWidth={2}
              />
            );
          })}
          {nodes.map((n) => {
            const s = NODE_STYLE[n.type];
            const r = n.type === "internet" ? 16 : 13;
            return (
              <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                <circle r={r + 5} fill={s.color} opacity={0.15} />
                <circle r={r} fill="var(--vo-surface)" stroke={s.color} strokeWidth={2.5} />
                <circle r={4} fill={s.color} />
                <text textAnchor="middle" y={r + 18} fill="var(--vo-muted)" style={{ fontSize: 11 }}>
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--vo-muted)]">
          {types.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: NODE_STYLE[t].color }} aria-hidden />
              {NODE_STYLE[t].label}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
