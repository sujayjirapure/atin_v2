// Footer.jsx — edit company details / socials here.
import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logoImg from "@/assets/atinlogo.jpg";
import { BUSINESS_ADDRESS, BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_LINK } from "@/lib/business-info";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-brand text-brand-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="rounded-lg bg-white p-3 inline-block">
              <img src={logoImg} alt="Akola Telecom & IP Networks logo" className="h-14 w-auto" />
            </div>
            <p className="mt-4 text-sm opacity-80">Trusted broadband, networking and IT partner in Akola since 2004.</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Services</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/services/broadband" className="hover:opacity-100">Broadband</Link></li>
              <li><Link to="/services/networking" className="hover:opacity-100">Networking</Link></li>
              <li><Link to="/services/cctv" className="hover:opacity-100">CCTV</Link></li>
              <li><Link to="/services/it-solutions" className="hover:opacity-100">IT Solutions</Link></li>
              <li><Link to="/services/leased-line" className="hover:opacity-100">Leased Line</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/about" className="hover:opacity-100">About</Link></li>
              <li><Link to="/careers" className="hover:opacity-100">Careers</Link></li>
              <li><Link to="/contact" className="hover:opacity-100">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Reach us</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> <span>{BUSINESS_ADDRESS}</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> <a href={`tel:${BUSINESS_PHONE_LINK}`} className="hover:underline">{BUSINESS_PHONE}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:underline">{BUSINESS_EMAIL}</a></li>
              <li className="pl-6 text-xs">24×7 technical assistance</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Facebook" className="rounded-md bg-white/10 p-2 hover:bg-white/20"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram" className="rounded-md bg-white/10 p-2 hover:bg-white/20"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="LinkedIn" className="rounded-md bg-white/10 p-2 hover:bg-white/20"><Linkedin className="h-4 w-4" /></a>
            </div>
            <a href="/website-qr.png" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-3 rounded-lg bg-white p-2 text-slate-900">
              <img src="/website-qr.png" alt="QR code for the Akola Telecom website" className="h-16 w-16" />
              <span className="pr-2 text-xs font-semibold">Scan to visit our website</span>
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs opacity-70">
          © {new Date().getFullYear()} Akola Telecom & IP Networks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
