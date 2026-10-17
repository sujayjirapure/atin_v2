import { createFileRoute } from "@tanstack/react-router";
import ServiceLayout from "../components/site/ServiceLayout";

export const Route = createFileRoute("/services/broadband")({
  head: () => ({
    meta: [
      { title: "Fiber Broadband in Akola | Home & Business Internet Plans" },
      { name: "description", content: "Explore fiber broadband internet for homes and businesses in Akola. Ask Akola Telecom about available plans, installation and local technical support." },
      { property: "og:title", content: "Fiber Broadband in Akola | Akola Telecom" },
      { property: "og:description", content: "Fiber internet plans for homes and businesses in Akola, with local installation and technical assistance." },
      { property: "og:url", content: "https://www.akolatelecomandipnetworks.com/services/broadband" },
    ],
    links: [{ rel: "canonical", href: "https://www.akolatelecomandipnetworks.com/services/broadband" }],
  }),
  component: () => (
    <ServiceLayout
      eyebrow="Flagship service"
      title="Fiber broadband internet in Akola"
      tagline="High-speed fiber internet for Akola homes and businesses, with local installation and technical support."
      ctaText="Get connected"
      features={[
        { title: "Fiber-to-the-home", desc: "Pure fiber straight to your router — no copper bottlenecks." },
        { title: "99.9% uptime", desc: "Redundant links monitored round-the-clock from our Akola NOC." },
        { title: "Unlimited data", desc: "Stream, game, work — no fair-usage speed drops." },
        { title: "Free installation", desc: "Same-week setup by our own field engineers." },
      ]}
      plans={[
        { name: "Home Starter", price: "₹499", period: "/ month", perks: ["100 Mbps", "Unlimited data", "Free router", "24/7 support"] },
        { name: "Home Pro", price: "₹799", period: "/ month", featured: true, perks: ["300 Mbps", "Unlimited data", "Free OTT bundle", "Priority support"] },
        { name: "Business", price: "₹1,499", period: "/ month", perks: ["1 Gbps symmetric", "Static IP available", "SLA-backed", "Dedicated manager"] },
      ]}
    />
  ),
});
