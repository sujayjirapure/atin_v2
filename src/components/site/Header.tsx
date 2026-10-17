import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImg from "@/assets/atinlogo.jpg";

const SERVICES = [
  { to: "/services/broadband", label: "Broadband Internet", desc: "High-speed fiber for home & business" },
  { to: "/services/it-solutions", label: "IT Services & Business Software", desc: "Websites, CMMS, hotel & billing systems" },
  { to: "/services/networking", label: "Networking Solutions", desc: "LAN, WAN & Wi-Fi setup" },
  { to: "/services/cctv", label: "CCTV & Surveillance", desc: "HD security camera systems" },
  { to: "/services/leased-line", label: "Leased Line & ISP", desc: "Dedicated enterprise connectivity" },
  { to: "/services/hardware", label: "Networking Hardware", desc: "Enterprise-grade networking products" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);

  return (
    <header className="relative z-[9998] w-full border-b border-border bg-background/80 backdrop-blur-lg overflow-visible">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 overflow-visible">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="Akola Telecom & IP Networks Pvt Ltd logo"
            width={160}
            height={56}
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-1 overflow-visible md:flex relative">
          <NavLink to="/">Home</NavLink>
          <div className="relative group">
            <button 
              onClick={() => setSvcOpen(!svcOpen)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-smooth hover:text-primary group-hover:text-primary"
            >
              Services <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full z-[9999] w-80 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-80 rounded-xl border border-border bg-popover p-2 shadow-elegant">
                {SERVICES.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="block rounded-lg px-3 py-2.5 transition-smooth hover:bg-secondary"
                  >
                    <div className="text-sm font-semibold text-foreground">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/careers">Careers</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Link
            to="/contact"
            className="ml-3 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant transition-smooth hover:opacity-90"
          >
            Get Connected
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 py-3">
            <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>
            <div className="pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Services</div>
            {SERVICES.map((s) => (
              <MobileLink key={s.to} to={s.to} onClick={() => setOpen(false)}>{s.label}</MobileLink>
            ))}
            <div className="border-t border-border pt-2" />
            <MobileLink to="/about" onClick={() => setOpen(false)}>About</MobileLink>
            <MobileLink to="/careers" onClick={() => setOpen(false)}>Careers</MobileLink>
            <MobileLink to="/contact" onClick={() => setOpen(false)}>Contact</MobileLink>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-smooth hover:text-primary"
      activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary" }}
    >
      {children}
    </Link>
  );
}

function MobileLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block rounded-md px-3 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-secondary"
    >
      {children}
    </Link>
  );
}
