"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/metadata";
import styles from "./Footer.module.css";

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
                <i className="fab fa-linkedin" aria-hidden="true"></i>
              </a>
              <a 
                href={siteConfig.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter" aria-hidden="true"></i>
              </a>
              <a 
                href={siteConfig.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook" aria-hidden="true"></i>
              </a>
              <a 
                href={siteConfig.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" aria-hidden="true"></i>
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

          {/* Office Locations */}
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
                {siteConfig.contact.email.general}
              </a>
            </p>
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
