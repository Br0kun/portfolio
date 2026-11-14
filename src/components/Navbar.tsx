"use client";

import { useState } from "react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Menu, X, Shield, Terminal, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Skills & Security", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#090A0F]/80 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-[#FF4B2B]/10 border border-[#FF4B2B]/30 flex items-center justify-center text-[#FF4B2B] group-hover:scale-105 transition-all">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-wide flex items-center gap-2">
              <span>Ilyas Dahbi</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-[11px] font-mono text-zinc-400">
              Security Researcher • Developer
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/Br0kun"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:border-[#FF4B2B]/50 transition-all"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#FF4B2B] text-black hover:bg-[#ff6446] transition-all flex items-center gap-1.5 shadow-md shadow-[#FF4B2B]/20"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090A0F] border-b border-white/[0.08] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/[0.05]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/[0.08] flex items-center gap-3">
            <a
              href="https://github.com/Br0kun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center rounded-lg border border-white/[0.08] text-xs font-medium text-zinc-300"
            >
              GitHub
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center rounded-lg bg-[#FF4B2B] text-black font-semibold text-xs"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
