import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Zap, Shield, Wifi, Server, Cpu } from "lucide-react";

export const Route = createFileRoute("/services/hardware")({
  head: () => ({
    meta: [
      { title: "Networking Hardware & Products — Akola Telecom" },
      { name: "description", content: "Enterprise-grade networking hardware, switches, routers, and connectivity products for your business needs." },
    ],
  }),
  component: HardwarePage,
});

const products = [
  {
    id: 1,
    name: "Enterprise Managed Switch",
    category: "Network Switch",
    price: "₹15,000",
    icon: Wifi,
    description: "High-performance 48-port managed switch with VLAN support and redundancy features for enterprise networks.",
    features: ["48 Gigabit ports", "VLAN & QoS", "Stackable", "Redundancy support"],
  },
  {
    id: 2,
    name: "Industrial Grade Router",
    category: "Router",
    price: "₹12,500",
    icon: Server,
    description: "Rugged, industrial-grade router designed for harsh environments with multiple WAN ports and failover capability.",
    features: ["Dual SIM", "Multi-WAN", "4G/LTE support", "Wide temp range"],
  },
  {
    id: 3,
    name: "PoE Power Injector",
    category: "Power Management",
    price: "₹3,200",
    icon: Zap,
    description: "Reliable PoE injector to power IP cameras, access points, and other PoE devices over single Ethernet cable.",
    features: ["96W output", "Multiple ports", "Compact design", "Overcurrent protection"],
  },
  {
    id: 4,
    name: "Fiber Media Converter",
    category: "Connectivity",
    price: "₹4,800",
    icon: Package,
    description: "Convert between fiber and copper connections seamlessly for extended network reach and noise immunity.",
    features: ["Single/Multi-mode", "10/100 Mbps", "Hot-swappable", "Compact form"],
  },
  {
    id: 5,
    name: "Network Security Appliance",
    category: "Security",
    price: "₹22,000",
    icon: Shield,
    description: "Advanced security gateway with firewall, IDS/IPS, and VPN capabilities to protect your network from threats.",
    features: ["Firewall engine", "IDS/IPS", "VPN support", "Threat detection"],
  },
  {
    id: 6,
    name: "Access Point Bundle",
    category: "Wireless",
    price: "₹8,500",
    icon: Cpu,
    description: "Enterprise WiFi 6 access points with mesh capability for seamless coverage across your premises.",
    features: ["WiFi 6 (802.11ax)", "Mesh ready", "PoE powered", "Multi-SSID"],
  },
];

function HardwarePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-visible bg-gradient-to-r from-brand to-brand/80 text-brand-foreground py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-foreground/70">Enterprise Equipment</span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              Networking Hardware & Products
            </h1>
            <p className="mt-4 text-lg opacity-90">
              Premium-quality networking equipment for enterprises. From switches to security appliances, we offer proven solutions built for reliability and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-elegant"
              >
                {/* Icon & Category */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {product.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-xl font-bold text-foreground">{product.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>

                {/* Features */}
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 group-hover:shadow-elegant"
                  >
                    Contact to Buy
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="rounded-xl border border-border bg-gradient-to-r from-brand/5 to-primary/5 p-8 text-center md:p-12">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Don't see what you need?
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              We can source and configure custom hardware solutions for your specific requirements.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-smooth hover:bg-primary/90"
            >
              Get a Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
