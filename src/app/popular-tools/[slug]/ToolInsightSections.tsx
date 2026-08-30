import { getToolInsights } from "@/lib/tool-insights";
import type { ToolItem } from "@/lib/tools-catalog";
import styles from "./tool-insights.module.css";

interface ToolInsightSectionsProps {
  tool: ToolItem;
}

export default function ToolInsightSections({ tool }: ToolInsightSectionsProps) {
  const { insights, base } = getToolInsights(tool);

  return (
    <>
      {/* ===== Tool Insights: what is the tool, how to use, what results it gives ===== */}
      <section className={styles.section} id="tool-insights">
        <div className={styles.eyebrow}>Tool Insights</div>
        <h2 className={styles.title}>
          All about the <em>{tool.title}</em>
        </h2>
        <div className={styles.prose}>
          {insights.whatIs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h3 className={styles.blockTitle}>How to use it</h3>
        <ol className={styles.stepsGrid}>
          {insights.howToUse.map((step, index) => (
            <li key={step.title} className={styles.stepCard}>
              <span className={styles.stepNum}>{index + 1}</span>
              <strong>{step.title}</strong>
              <p>{step.desc}</p>
            </li>
          ))}
        </ol>

        <h3 className={styles.blockTitle}>What results you get</h3>
        <ul className={styles.checkList}>
          {insights.results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </section>

      {/* ===== Why Professionals Trust this Tool ===== */}
      <section className={styles.section} id="why-trust">
        <div className={styles.eyebrow}>Why Professionals Trust This Tool</div>
        <h2 className={styles.title}>
          Why professionals trust the <em>{tool.title}</em>
        </h2>
        <p className={styles.lead}>
          Built and maintained by the W3Tech team that ships production websites
          and SEO campaigns every week, this tool is held to the same standard we
          use on our own client work.
        </p>

        <h3 className={styles.blockTitle}>Why it&apos;s verified</h3>
        <ul className={styles.trustList}>
          {base.verified.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>

        <h3 className={styles.blockTitle}>Features that matter</h3>
        <div className={styles.featureGrid}>
          {base.features.map((item) => (
            <article key={item.title} className={styles.featureCard}>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Tool speed and scale ===== */}
      <section className={styles.section} id="speed-scale">
        <div className={styles.eyebrow}>Tool Speed &amp; Scale</div>
        <h2 className={styles.title}>
          Built for speed, <em>built for scale</em>
        </h2>
        <div className={styles.speedGrid}>
          {base.speedScale.map((item, index) => (
            <article key={item.title} className={styles.speedCard}>
              <span className={styles.speedNum}>{String(index + 1).padStart(2, "0")}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Technical & creative factors: Ranking, Beat Your Competitors, Our Mission ===== */}
      <section className={styles.section} id="factors">
        <div className={styles.eyebrow}>Technical &amp; Creative Factors</div>
        <h2 className={styles.title}>
          The thinking behind the <em>{tool.title}</em>
        </h2>

        <div className={styles.factorBlock}>
          <h3 className={styles.factorTitle}>Ranking</h3>
          <div className={styles.prose}>
            {base.ranking.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className={styles.factorBlock}>
          <h3 className={styles.factorTitle}>Beat Your Competitors</h3>
          <ol className={styles.stepsGrid}>
            {base.beatCompetitors.map((step, index) => (
              <li key={step.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{index + 1}</span>
                <strong>{step.title}</strong>
                <p>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.factorBlock}>
          <h3 className={styles.factorTitle}>Our Mission</h3>
          <div className={styles.prose}>
            {base.mission.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQs ===== */}
      <section className={styles.section} id="faqs">
        <div className={styles.eyebrow}>FAQs</div>
        <h2 className={styles.title}>
          Frequently asked <em>questions</em>
        </h2>
        <div className={styles.faqGrid}>
          {insights.faqs.map((faq) => (
            <details key={faq.q} className={styles.faqItem}>
              <summary>
                {faq.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}