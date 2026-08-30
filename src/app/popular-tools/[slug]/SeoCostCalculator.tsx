"use client";

import { useMemo, useState } from "react";
import styles from "./tool-detail.module.css";

type ProjectType = "new" | "existing";
type Competitiveness = "low" | "medium" | "high";

const RATES = {
  low: { base: 500, perHour: 45, label: "Startup / local niche" },
  medium: { base: 1200, perHour: 75, label: "Growing business" },
  high: { base: 2800, perHour: 110, label: "Competitive market" },
};

const POINTS: Record<ProjectType, number> = { new: 1.1, existing: 1.0 };

export default function SeoCostCalculator() {
  const [projectType, setProjectType] = useState<ProjectType>("new");
  const [competitiveness, setCompetitiveness] = useState<Competitiveness>("medium");
  const [hours, setHours] = useState(20);
  const [months, setMonths] = useState(6);
  const [hasContent, setHasContent] = useState(true);
  const [hasBacklinks, setHasBacklinks] = useState(false);
  const [hasLocal, setHasLocal] = useState(false);

  const estimate = useMemo(() => {
    const rate = RATES[competitiveness];
    const hoursCost = hours * rate.perHour * POINTS[projectType];
    const contentCost = hasContent ? Math.round(hoursCost * 0.18) : 0;
    const backlinkCost = hasBacklinks ? Math.round(hoursCost * 0.22) : 0;
    const localCost = hasLocal ? Math.round(hoursCost * 0.12) : 0;
    const monthlyLow = Math.round((hoursCost + contentCost + localCost) * 0.85);
    const monthlyHigh = Math.round((hoursCost + contentCost + backlinkCost + localCost) * 1.15);
    const yearlyLow = monthlyLow * months;
    const yearlyHigh = monthlyHigh * months;
    return { rate, hoursCost, contentCost, backlinkCost, localCost, monthlyLow, monthlyHigh, yearlyLow, yearlyHigh };
  }, [projectType, competitiveness, hours, months, hasContent, hasBacklinks, hasLocal]);

  return (
    <div>
      <div className={styles.twoCol}>
        <div>
          <label className={styles.label}>Project type</label>
          <select className={styles.select} value={projectType} onChange={(event) => setProjectType(event.target.value as ProjectType)}>
            <option value="new">New website / first SEO campaign</option>
            <option value="existing">Existing website with traffic</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>Competitiveness</label>
          <select className={styles.select} value={competitiveness} onChange={(event) => setCompetitiveness(event.target.value as Competitiveness)}>
            <option value="low">Low — local niche</option>
            <option value="medium">Medium — growing category</option>
            <option value="high">High — competitive keywords</option>
          </select>
        </div>
      </div>

      <label className={styles.label} style={{ marginTop: 12 }}>Hours of SEO work per month — {hours}h</label>
      <input
        type="range"
        min={5}
        max={60}
        step={5}
        value={hours}
        onChange={(event) => setHours(Number(event.target.value))}
        style={{ width: "100%" }}
      />

      <label className={styles.label} style={{ marginTop: 12 }}>Contract length — {months} months</label>
      <input
        type="range"
        min={1}
        max={12}
        value={months}
        onChange={(event) => setMonths(Number(event.target.value))}
        style={{ width: "100%" }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
        {([
          ["hasContent", "Content writing & publishing", hasContent, setHasContent],
          ["hasBacklinks", "Link building & outreach", hasBacklinks, setHasBacklinks],
          ["hasLocal", "Local SEO (Google Business, citations)", hasLocal, setHasLocal],
        ] as const).map(([key, label, value, setter]) => (
          <label key={key} className={styles.checkLabel} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={value} onChange={(event) => setter(event.target.checked)} />
            {label}
          </label>
        ))}
      </div>

      <div className={styles.metricGrid}>
        <div className={styles.metric}><span>Estimated monthly cost</span><strong>${estimate.monthlyLow.toLocaleString()} – ${estimate.monthlyHigh.toLocaleString()}</strong></div>
        <div className={styles.metric}><span>Projected total ({months} months)</span><strong>${estimate.yearlyLow.toLocaleString()} – ${estimate.yearlyHigh.toLocaleString()}</strong></div>
      </div>

      <p className={styles.helperText}>Breakdown at {estimate.rate.label} rates:</p>
      <div className={styles.metricGrid} style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
        <div className={styles.metric}><span>Core SEO work</span><strong>${estimate.hoursCost.toLocaleString()}/mo</strong></div>
        <div className={styles.metric}><span>Content writing</span><strong>{estimate.contentCost ? `+$${estimate.contentCost.toLocaleString()}/mo` : "Not included"}</strong></div>
        <div className={styles.metric}><span>Link building</span><strong>{estimate.backlinkCost ? `+$${estimate.backlinkCost.toLocaleString()}/mo` : "Not included"}</strong></div>
        <div className={styles.metric}><span>Local SEO</span><strong>{estimate.localCost ? `+$${estimate.localCost.toLocaleString()}/mo` : "Not included"}</strong></div>
      </div>

      <p className={styles.helperText}>
        Estimates are indicative for planning. Real pricing varies by agency, location, and scope — always ask for a
        proposal with a defined deliverables list.
      </p>
    </div>
  );
}