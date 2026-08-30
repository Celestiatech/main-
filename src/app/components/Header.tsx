"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/metadata";
import { trackCTAClick } from "@/lib/analytics";
import { NAV_MENUS } from "@/lib/site-navigation";
import styles from "./Header.module.css";

// Debug mode - set to false to disable all console logs
const DEBUG = false;

const debugLog = (message: string, data?: unknown) => {
  if (DEBUG) {
    if (data) {
      console.log(`[Header Debug] ${message}`, data);
    } else {
      console.log(`[Header Debug] ${message}`);
    }
  }
};

function HeaderInlineIcon({ children }: { children: ReactNode }) {
  return <span className={styles.headerInlineIcon} aria-hidden="true">{children}</span>;
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72l.33 2.57a2 2 0 0 1-.57 1.74l-1.2 1.2a16 16 0 0 0 7.2 7.2l1.2-1.2a2 2 0 0 1 1.74-.57l2.57.33A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [suppressHeaderMotion, setSuppressHeaderMotion] = useState(false);
  const [prevScrolled, setPrevScrolled] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  // Which mega menu is open, and which group its rail is pointing at.
  // A missing group id means "the first one".
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<Record<string, string>>({});
  const [mobileMenuSection, setMobileMenuSection] = useState<string | null>(null);

  const selectGroup = (menuId: string, groupId: string) =>
    setActiveGroup((current) => ({ ...current, [menuId]: groupId }));
  const [navIndicatorStyle, setNavIndicatorStyle] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const lastScrollYRef = useRef(0);
  const scrollTickingRef = useRef(false);

  const updateNavIndicator = useCallback((el: HTMLElement | null) => {
    if (!el || !navRef.current) {
      setNavIndicatorStyle(null);
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    // A hidden item measures zero. Without this the indicator would keep its
    // last position — or collapse to a stray dark dot at the left of the bar —
    // when the active menu is dropped from the compact header.
    if (elRect.width === 0) {
      setNavIndicatorStyle(null);
      return;
    }

    setNavIndicatorStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
  }, []);

  /** Puts the indicator back on the current page's nav item, if it is visible. */
  const resetNavIndicator = useCallback(() => {
    const activeEl = navRef.current?.querySelector(
      `.${styles.navLink}.${styles.active}`
    ) as HTMLElement | null;
    updateNavIndicator(activeEl);
  }, [updateNavIndicator]);

  // The compact header drops menus, so the current page's item can disappear
  // from the bar. Re-measure after the layout settles and clear the indicator
  // when its target is gone, rather than leaving it stranded.
  useEffect(() => {
    const frame = window.requestAnimationFrame(resetNavIndicator);
    return () => window.cancelAnimationFrame(frame);
  }, [isScrolled, pathname, resetNavIndicator]);

  const popularToolsButton = (
    <>
      <span className={styles.gooFilter} aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="header-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </span>
      <span className={styles.popularToolsWrap}>
        <Link href="/popular-tools" className={`btn btn-sm ${styles.popularToolsButton}`}>
          See Popular Tools
        </Link>
        <span className={styles.popularToolsEffect} aria-hidden="true">
          <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
          <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
          <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
          <span className={styles.popularToolsBlob}></span>
          <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
          <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
          <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
        </span>
      </span>
    </>
  );

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Debug state changes
  useEffect(() => {
    debugLog("State changed", {
      isMobileMenuOpen,
      isScrolled,
      openMenu,
      mobileMenuSection,
    });
  }, [isMobileMenuOpen, isScrolled, openMenu, mobileMenuSection]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTickingRef.current) return;
      scrollTickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrolled = currentScrollY > 20;
        if (scrolled !== isScrolled) {
          debugLog("Scroll state changed", { scrolled, scrollY: currentScrollY });
          setIsScrolled(scrolled);
        }

        lastScrollYRef.current = currentScrollY;
        scrollTickingRef.current = false;
      });
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.navItem}`) && !target.closest(`.${styles.navDropdown}`)) {
        debugLog("Click outside dropdown - closing");
        setOpenMenu(null);
        setIsMoreMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setIsMoreMenuOpen(false);
    };

    if (openMenu || isMoreMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMenu, isMoreMenuOpen]);

  // When the header switches between states, avoid showing intermediate
  // transitions. Setting this during render (rather than in an effect) keeps
  // the suppression in the same commit as the state change it is hiding.
  if (prevScrolled !== isScrolled) {
    setPrevScrolled(isScrolled);
    setSuppressHeaderMotion(true);
  }

  useEffect(() => {
    if (!suppressHeaderMotion) return;
    const t = window.setTimeout(() => setSuppressHeaderMotion(false), 220);
    return () => window.clearTimeout(t);
  }, [suppressHeaderMotion]);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    debugLog("Toggle mobile menu", { newState });
    setIsMobileMenuOpen(newState);
  };

  const closeMobileMenu = () => {
    debugLog("Close mobile menu");
    setIsMobileMenuOpen(false);
    setMobileMenuSection(null);
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${suppressHeaderMotion ? styles.motionOff : ""}`}
      >
        {/* Top Bar */}
        <div className={styles.headerTop}>
          <div className={styles.headerTopInner}>
            <div className={styles.headerTopContent}>
              <div className={styles.headerTopBadge}>
                🏆 Digital Agency of the Year 2024, 25
                <span className={styles.headerTopBadgeSep}>|</span>
                Free Website &amp; SEO Audit
              </div>
              <div className={styles.headerTopContact}>
                <a href={`mailto:${siteConfig.contact.email.general}`}>
                  <HeaderInlineIcon><MailIcon /></HeaderInlineIcon>
                  {siteConfig.contact.email.general}
                </a>
                <span className={styles.headerTopSep}>|</span>
                <a href={`tel:${siteConfig.contact.phone.india.replace(/\s/g, "")}`}>
                  <HeaderInlineIcon><SmartphoneIcon /></HeaderInlineIcon>
                  {siteConfig.contact.phone.india}
                </a>
                <a href={`https://wa.me/${siteConfig.contact.phone.india.replace(/[\s+]/g, "")}`} target="_blank" rel="noopener noreferrer" className={styles.headerTopWhatsapp}>
                  <HeaderInlineIcon><WhatsAppIcon /></HeaderInlineIcon>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={styles.headerInner}>
          <div className={styles.headerMain}>
            <Link href="/" className={styles.logo} aria-label={`${siteConfig.name} Home`}>
              <span className={styles.logoIcon} aria-hidden="true">
                  <Image
                  src="/logos/w3tech.png"
                  alt=""
                  width={112}
                  height={112}
                  className={styles.logoImage}
                  sizes="(max-width: 768px) 56px, 102px"
                  priority
                />
              </span>
              <span className={styles.logoText}>
                <span className={styles.logoName}>W3TECH</span>
                <span className={styles.logoSub}>
                  <GoogleIcon />
                  Google Partner
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.nav} ref={navRef} role="navigation" aria-label="Main navigation"
              onMouseLeave={resetNavIndicator}
            >
              {navIndicatorStyle && (
                <span className={styles.navIndicator} style={{ left: navIndicatorStyle.left, width: navIndicatorStyle.width }} aria-hidden="true" />
              )}

              <Link href="/" className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`} onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}>
                Home
              </Link>

              {/* Every public page lives in one of these panels, and every panel
                  stays mounted, so the whole site is internally linked from the
                  header of every page. Inactive panels are hidden with CSS
                  rather than unmounted, which keeps the links crawlable. */}
              {NAV_MENUS.map((menu) => {
                const isOpen = openMenu === menu.id;
                const menuActive = menu.groups.some((group) =>
                  group.items.some((item) => isActive(item.href))
                );
                const activeGroupId = activeGroup[menu.id] ?? menu.groups[0].id;

                return (
                  <div
                    key={menu.id}
                    className={`${styles.navItem} ${
                      isScrolled && !menu.keepWhenCompact ? styles.navItemCompactHidden : ""
                    }`}
                    onMouseEnter={(e) => {
                      setOpenMenu(menu.id);
                      const btn = e.currentTarget.querySelector(`.${styles.navLink}`) as HTMLElement | null;
                      if (btn) updateNavIndicator(btn);
                    }}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      className={`${styles.navLink} ${menuActive ? styles.active : ""}`}
                      onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
                      aria-expanded={isOpen}
                      onClick={() => setOpenMenu(isOpen ? null : menu.id)}
                    >
                      {menu.label} <span aria-hidden="true">▼</span>
                    </button>

                    <div className={`${styles.navDropdown} ${isOpen ? styles.navDropdownOpen : ""}`}>
                      <div className={styles.megaWrap}>
                        <div className={styles.megaRail} role="tablist" aria-label={`${menu.label} sections`}>
                          <p className={styles.megaRailTitle}>{menu.label}</p>
                          <p className={styles.megaRailBlurb}>{menu.blurb}</p>

                          {menu.groups.map((group) => (
                            <button
                              key={group.id}
                              type="button"
                              role="tab"
                              id={`${menu.id}-tab-${group.id}`}
                              aria-selected={activeGroupId === group.id}
                              aria-controls={`${menu.id}-pane-${group.id}`}
                              className={styles.megaRailButton}
                              onMouseEnter={() => selectGroup(menu.id, group.id)}
                              onFocus={() => selectGroup(menu.id, group.id)}
                              onClick={() => selectGroup(menu.id, group.id)}
                            >
                              <span>{group.title}</span>
                              <small>{group.items.length}</small>
                            </button>
                          ))}

                          <Link href={menu.href} className={styles.megaRailAll} onClick={() => setOpenMenu(null)}>
                            Go to {menu.label} <span aria-hidden="true">→</span>
                          </Link>
                        </div>

                        <div className={styles.megaPanes}>
                          {menu.groups.map((group) => (
                            <div
                              key={group.id}
                              id={`${menu.id}-pane-${group.id}`}
                              role="tabpanel"
                              aria-labelledby={`${menu.id}-tab-${group.id}`}
                              className={styles.megaPane}
                              hidden={activeGroupId !== group.id}
                            >
                              <p className={styles.megaPaneTitle}>{group.title}</p>
                              <div className={styles.megaPaneItems}>
                                {group.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    className={styles.megaLink}
                                    onClick={() => setOpenMenu(null)}
                                  >
                                    <span className={styles.megaLinkLabel}>{item.label}</span>
                                    {item.description && (
                                      <span className={styles.megaLinkDesc}>{item.description}</span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <Link
                href="/contact"
                className={`${styles.navLink} ${isActive("/contact") ? styles.active : ""} ${
                  isScrolled ? styles.navItemCompactHidden : ""
                }`}
                onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
              >
                Contact Us
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className={styles.headerActions}>
              <span className={`${styles.popularToolsWrap} ${isScrolled ? styles.hideQuote : ""}`}>
                <Link href="/contact" className={`btn btn-sm ${styles.popularToolsButton}`}>
                  Get a Quote
                </Link>
                <span className={styles.popularToolsEffect} aria-hidden="true">
                  <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
                  <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
                  <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
                  <span className={styles.popularToolsBlob}></span>
                  <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
                  <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
                  <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
                </span>
              </span>
              {popularToolsButton}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuBtn}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu} aria-hidden="true">
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileMenuHeader}>
              <Link href="/" className={styles.mobileLogo} onClick={closeMobileMenu}>
                <span className={styles.logoIcon} aria-hidden="true">
	                  <Image
	                    src="/logos/w3tech.png"
	                    alt=""
	                    width={112}
	                    height={112}
	                    className={styles.logoImage}
	                    sizes="56px"
	                  />
                </span>
                <span>{siteConfig.shortName}</span>
              </Link>
              <button
                className={styles.mobileMenuClose}
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                ✕
              </button>
            </div>
            <nav className={styles.mobileNav}>
              <Link href="/" className={`${styles.mobileNavLink} ${isActive("/") ? styles.active : ""}`} onClick={closeMobileMenu}>
                Home
              </Link>
              
              {/* Same navigation tree as the desktop mega menus, as accordions. */}
              {NAV_MENUS.map((menu) => {
                const isOpen = mobileMenuSection === menu.id;

                return (
                  <div key={menu.id} className={styles.mobileNavItem}>
                    <button
                      className={styles.mobileNavLink}
                      aria-expanded={isOpen}
                      onClick={() => setMobileMenuSection(isOpen ? null : menu.id)}
                    >
                      {menu.label} <span aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
                    </button>

                    {isOpen && (
                      <div className={styles.mobileDropdown}>
                        {menu.groups.map((group) => (
                          <div key={group.id} className={styles.mobileGroup}>
                            <p className={styles.mobileGroupTitle}>{group.title}</p>
                            {group.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={styles.mobileServiceLink}
                                onClick={closeMobileMenu}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ))}

                        <Link href={menu.href} className={styles.mobileGroupAll} onClick={closeMobileMenu}>
                          Go to {menu.label} →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}

              <Link href="/contact" className={`${styles.mobileNavLink} ${isActive("/contact") ? styles.active : ""}`} onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </nav>
            <div className={styles.mobileMenuActions}>
              <Link 
                href="/contact" 
                className="btn" 
                style={{ background: '#ff8c00', color: '#fff', border: 'none', borderRadius: '999px', fontWeight: 600, padding: '10px 24px' }}
                onClick={() => {
                  trackCTAClick("Get a Quote", "mobile_menu", pathname);
                  closeMobileMenu();
                }}
              >
                Get a Quote
              </Link>
            </div>
            <div className={styles.mobileMenuFooter}>
              <div className={styles.mobileContactInfo}>
                <p>
                  <HeaderInlineIcon><SmartphoneIcon /></HeaderInlineIcon>
                  {siteConfig.contact.phone.india}
                </p>
                <p>
                  <HeaderInlineIcon><MailIcon /></HeaderInlineIcon>
                  <span aria-label={siteConfig.contact.email.general}>Email us</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
