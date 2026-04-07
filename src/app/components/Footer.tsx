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

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Company Info */}
          <div className={styles.footerAbout}>
            <Link href="/" className={styles.logo} aria-label={`${siteConfig.name} Home`}>
              <div className={styles.logoIcon}>N</div>
              {siteConfig.shortName}
            </Link>
            <p className={styles.footerDescription}>
              Premium IT development company delivering innovative solutions 
              in mobile apps, web development, AI, and blockchain technologies.
            </p>
            <div className={styles.footerSocial}>
              <a 
                href={siteConfig.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <SocialIcon><LinkedInIcon /></SocialIcon>
              </a>
              <a 
                href={siteConfig.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <SocialIcon><TwitterIcon /></SocialIcon>
              </a>
              <a 
                href={siteConfig.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <SocialIcon><FacebookIcon /></SocialIcon>
              </a>
              <a 
                href={siteConfig.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <SocialIcon><InstagramIcon /></SocialIcon>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.footerColumn}>
            <h4>Services</h4>
            <ul>
              <li><Link href="/services">Mobile Development</Link></li>
              <li><Link href="/services">Web Development</Link></li>
              <li><Link href="/services">Game Development</Link></li>
              <li><Link href="/services">AI Solutions</Link></li>
              <li><Link href="/services">Blockchain</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className={styles.footerColumn}>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/career">Careers</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.footerColumn}>
            <h4>Resources</h4>
            <ul>
              <li><Link href="/portfolio">Case Studies</Link></li>
              <li><Link href="/testimonials">Testimonials</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/blog">Blog & Articles</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className={styles.footerColumn}>
            <h4>Legal & Support</h4>
            <ul>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service">Terms of Service</Link></li>
              <li><Link href="/cookie-policy">Cookie Policy</Link></li>
              <li><Link href="/accessibility">Accessibility Statement</Link></li>
              <li><Link href="/contact">Help Center</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerRowTwo}>
          {/* Offices */}
          <div className={styles.footerColumn}>
            <h4>Our Offices</h4>
            <div className={styles.officeLocation}>
              <h5>{siteConfig.contact.offices.uae.name}</h5>
              <p>{siteConfig.contact.offices.uae.fullAddress}</p>
              <p>
                <a href={`tel:${siteConfig.contact.phone.uae.replace(/\s/g, "")}`}>
                  {siteConfig.contact.phone.uae}
                </a>
              </p>
            </div>
            <div className={styles.officeLocation}>
              <h5>{siteConfig.contact.offices.india.name}</h5>
              <p>{siteConfig.contact.offices.india.fullAddress}</p>
              <p>
                <a href={`tel:${siteConfig.contact.phone.india.replace(/\s/g, "")}`}>
                  {siteConfig.contact.phone.india}
                </a>
              </p>
            </div>
            <p className={styles.footerEmail}>
              <a href={`mailto:${siteConfig.contact.email.general}`}>
                <span aria-label={siteConfig.contact.email.general}>Email us</span>
              </a>
            </p>
          </div>

          {/* Map 1 */}
          <div className={styles.footerColumn}>
            <h4>Dubai</h4>
            <div className={styles.officeMap}>
              <iframe
                title="Business Bay, Dubai"
                src="https://www.google.com/maps?q=Business%20Bay%2C%20Dubai%2C%20UAE&z=13&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Map 2 */}
          <div className={styles.footerColumn}>
            <h4>India</h4>
            <div className={styles.officeMap}>
              <iframe
                title="Mohali, Punjab"
                src="https://www.google.com/maps?q=Mohali%2C%20Punjab%2C%20India&z=12&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className={styles.footerLegal}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
