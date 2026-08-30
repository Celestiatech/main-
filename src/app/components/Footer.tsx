import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/metadata";
import styles from "./Footer.module.css";

function SocialIcon({ children }: { children: ReactNode }) {
  return <span className={styles.footerSocialIcon} aria-hidden="true">{children}</span>;
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3Zm5.31 5.5H7.25V20h3.31v-6.03c0-1.59.3-3.13 2.27-3.13 1.94 0 1.97 1.81 1.97 3.24V20h3.31v-6.6c0-3.25-.7-5.74-4.5-5.74-1.82 0-3.04 1-3.55 1.95h-.05V8.5Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.24l-4.89-7.37L5.62 22H2.5l7.24-8.27L1.8 2h6.4l4.42 6.72L18.9 2Zm-1.1 18h1.73L7.28 3.9H5.42L17.8 20Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.25-1.46 1.5-1.46h1.7V5a20.7 20.7 0 0 0-2.46-.12c-2.43 0-4.1 1.48-4.1 4.22V11H7.5v3h2.6v8h3.4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.25 1.65a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z" />
    </svg>
  );
}

function FeatureIcon({ children }: { children: ReactNode }) {
  return <span className={styles.featureIcon} aria-hidden="true">{children}</span>;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M4 12v5a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2Z" />
      <path d="M20 12v5a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z" />
      <path d="M12 19a2 2 0 0 0 2-2v-1" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l1.2 5.1L18 9l-4.8 1.9L12 16l-1.2-5.1L6 9l4.8-1.9L12 2Z" />
      <path d="M19 14l.7 3 2.3.8-2.3.8-.7 3-.7-3-2.3-.8 2.3-.8.7-3Z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerFeatures} aria-label="Highlights">
          <div className={styles.featureItem}>
            <FeatureIcon><ShieldIcon /></FeatureIcon>
            <div>
              <h3>Reliable Delivery</h3>
              <p>Clear milestones, quality checks, and predictable releases.</p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <FeatureIcon><SparkIcon /></FeatureIcon>
            <div>
              <h3>{siteConfig.company.experience} Experience</h3>
              <p>Trusted by teams across {siteConfig.company.countries}+ countries.</p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <FeatureIcon><HeadsetIcon /></FeatureIcon>
            <div>
              <h3>5‑Star Support</h3>
              <p>Fast responses, proactive updates, and dedicated assistance.</p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <FeatureIcon><CheckIcon /></FeatureIcon>
            <div>
              <h3>Customer‑First</h3>
              <p>We listen, iterate, and improve based on real feedback.</p>
            </div>
          </div>
        </div>

        <div className={styles.footerDivider} role="separator" />

        <div className={styles.footerCta}>
          <div className={styles.ctaLeft}>
            <p className={styles.ctaKicker}>Start now</p>
            <h2>Get your project right now<br />and launch faster.</h2>
            <p className={styles.ctaSubtext}>
              Fixed scope or ongoing support — choose what fits your team.
            </p>

            <div className={styles.packageGrid} aria-label="Included in package">
              <div className={styles.packageItem}>Strategy & Planning</div>
              <div className={styles.packageItem}>UI/UX Design</div>
              <div className={styles.packageItem}>Development & QA</div>
              <div className={styles.packageItem}>Performance & SEO</div>
              <div className={styles.packageItem}>Deployment Support</div>
              <div className={styles.packageItem}>Post‑launch Maintenance</div>
            </div>
          </div>

          <div className={styles.ctaMiddle} aria-label="One-time payment badge">
            <div className={styles.badge}>
              <div className={styles.badgeRing} aria-hidden="true" />
              <div className={styles.badgeLabel}>ONE‑TIME PAYMENT</div>
              <div className={styles.badgeCenter}>
                <div className={styles.badgeIcon} aria-hidden="true">₹</div>
                <div className={styles.badgeTitle}>Lifetime Updates</div>
                <div className={styles.badgeLine} />
                <div className={styles.badgeCaption}>Free improvements & fixes</div>
              </div>
            </div>
          </div>

          <div className={styles.ctaRight} aria-label="Plans">
            <div className={styles.planCard}>
              <div className={styles.planLabel}>Starter</div>
              <div className={styles.planPrice}>Request Quote</div>
              <Link href="/contact" className={styles.planButton}>Get Started</Link>
            </div>
            <div className={styles.planCard}>
              <div className={styles.planLabel}>Dedicated Team</div>
              <div className={styles.planPrice}>From Monthly</div>
              <Link href="/hire-dedicated-developers" className={styles.planButton}>
                Hire Now
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.footerDivider} role="separator" />

        <div className={styles.footerNav} aria-label="Footer navigation">
          <div className={styles.brandBlock}>
            <Link href="/" className={styles.brandName} aria-label={`${siteConfig.name} Home`}>
              {siteConfig.name}
            </Link>
            <p className={styles.brandTagline}>{siteConfig.tagline}</p>
            <p className={styles.brandText}>{siteConfig.description}</p>
            <div className={styles.brandActions}>
              <Link href="/contact" className={styles.brandPrimaryCta}>Talk to an expert</Link>
              <a href={`mailto:${siteConfig.contact.email.general}`} className={styles.brandSecondaryCta}>
                Email us
              </a>
            </div>
          </div>

          <div className={styles.navColumn} aria-label="Company">
            <h3 className={styles.navTitle}>Company</h3>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Link href="/work" className={styles.navLink}>Work</Link>
            <Link href="/clients" className={styles.navLink}>Clients</Link>
            <Link href="/career" className={styles.navLink}>Careers</Link>
          </div>

          <div className={styles.navColumn} aria-label="Services">
            <h3 className={styles.navTitle}>Services</h3>
            <Link href="/services" className={styles.navLink}>All services</Link>
            <Link href="/seo-services" className={styles.navLink}>SEO</Link>
            <Link href="/ai-development-company" className={styles.navLink}>AI development</Link>
            <Link href="/hire-dedicated-developers" className={styles.navLink}>Dedicated team</Link>
          </div>

          <div className={styles.navColumn} aria-label="Resources">
            <h3 className={styles.navTitle}>Resources</h3>
            <Link href="/blog" className={styles.navLink}>Blog</Link>
            <Link href="/pricing" className={styles.navLink}>Pricing</Link>
            <Link href="/proposal" className={styles.navLink}>Get a proposal</Link>
            <Link href="/popular-tools" className={styles.navLink}>Popular tools</Link>
          </div>

          <div className={styles.navColumn} aria-label="Contact details">
            <h3 className={styles.navTitle}>Contact</h3>
            <a className={styles.navLink} href={`mailto:${siteConfig.contact.email.general}`}>
              {siteConfig.contact.email.general}
            </a>
            <a className={styles.navLink} href={`tel:${siteConfig.contact.phone.india.replace(/\s+/g, "")}`}>
              {siteConfig.contact.phone.india}
            </a>
            <div className={styles.navMeta}>
              <p className={styles.navMetaLabel}>Office</p>
              <p className={styles.navMetaValue}>{siteConfig.contact.offices.india.fullAddress}</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomLeft}>
            <Link href="/" className={styles.bottomLogo} aria-label={`${siteConfig.name} Home`}>
              {siteConfig.shortName}
            </Link>
            <div className={styles.footerSocial}>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <SocialIcon><LinkedInIcon /></SocialIcon>
              </a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <SocialIcon><TwitterIcon /></SocialIcon>
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <SocialIcon><FacebookIcon /></SocialIcon>
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <SocialIcon><InstagramIcon /></SocialIcon>
              </a>
            </div>
          </div>

          <p className={styles.footerCopy}>© {currentYear} {siteConfig.name}. All rights reserved.</p>

          <div className={styles.footerLegal}>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-service">Terms</Link>
            <Link href="/cookie-policy">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
