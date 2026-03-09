"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";

type HeaderProps = {
    navAction: {
        label: string;
        href: string;
    };
    navActionIsExternal: boolean;
};

export default function SiteHeader({ navAction, navActionIsExternal }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = "";
    };

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        closeMobileMenu();
        window.history.pushState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <header className="site-header">
            <nav className="nav-row container">
                <Link href="/" className="logo-wrap" aria-label="Orbit Sling Home" onClick={handleLogoClick}>
                    <Image
                        src="/assets/brand/logo-horizontal.svg"
                        alt="Orbit Sling"
                        width={240}
                        height={75}
                        priority
                        className="logo-image"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-links desktop-only">
                    <Link href="/team/" className="muted">
                        Our Team
                    </Link>
                    <Link href="/our-philosophy/" className="muted">
                        Our Philosophy
                    </Link>
                    <Link href="/how-it-works/" className="muted">
                        How It Works
                    </Link>
                    <a
                        href={navAction.href}
                        className="btn-primary"
                        target={navActionIsExternal ? "_blank" : undefined}
                        rel={navActionIsExternal ? "noreferrer" : undefined}
                    >
                        {navAction.label}
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-toggle mobile-only"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <span className={`hamburger ${isMobileMenuOpen ? "is-active" : ""}`}></span>
                </button>

                {isMobileMenuOpen &&
                    createPortal(
                        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? "is-open" : ""}`}>
                            <button
                                className="mobile-nav-close"
                                onClick={closeMobileMenu}
                                aria-label="Close menu"
                            >
                                <span className="hamburger is-active"></span>
                            </button>
                            <div className="mobile-nav-content">
                                <Link href="/team/" className="mobile-nav-link" onClick={closeMobileMenu}>
                                    Our Team
                                </Link>
                                <Link href="/our-philosophy/" className="mobile-nav-link" onClick={closeMobileMenu}>
                                    Our Philosophy
                                </Link>
                                <Link href="/how-it-works/" className="mobile-nav-link" onClick={closeMobileMenu}>
                                    How It Works
                                </Link>
                                <a
                                    href={navAction.href}
                                    className="btn-primary mobile-nav-cta"
                                    target={navActionIsExternal ? "_blank" : undefined}
                                    rel={navActionIsExternal ? "noreferrer" : undefined}
                                    onClick={closeMobileMenu}
                                >
                                    {navAction.label}
                                </a>
                            </div>
                        </div>,
                        document.body
                    )}
            </nav>
        </header>
    );
}
