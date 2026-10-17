import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Code2,
  Headset,
  Hotel,
  ReceiptText,
  Sparkles,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/services/it-solutions")({
  head: () => ({
    meta: [
      { title: "IT Services & Business Software — Akola Telecom" },
      { name: "description", content: "Website development, CMMS, hotel management and billing systems tailored to businesses in Akola." },
    ],
  }),
  component: ITServices,
});

const imageUrl = (photoId: string, width: number) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=85`;

const solutions = [
  {
    number: "01",
    icon: Code2,
    title: "Websites & web applications",
    description: "Showcase your business with a fast, mobile-friendly website, or build a web application around the way your team works.",
    image: imageUrl("photo-1460925895917-afdab827c52f", 1000),
    imageAlt: "Business analytics displayed on a laptop",
    tags: ["Business websites", "Web applications", "Mobile friendly"],
  },
  {
    number: "02",
    icon: Wrench,
    title: "CMMS & maintenance management",
    description: "Keep assets, planned maintenance, service requests and work orders organized in one place.",
    image: imageUrl("photo-1581091226825-a6a2a5aee158", 1000),
    imageAlt: "Engineer working with industrial technology",
    tags: ["Asset tracking", "Preventive maintenance", "Work orders"],
  },
  {
    number: "03",
    icon: Hotel,
    title: "Hotel management systems",
    description: "Make everyday hotel operations easier, from room availability and reservations to guest check-in and billing.",
    image: imageUrl("photo-1566073771259-6a8506099945", 1000),
    imageAlt: "Modern hotel with a swimming pool",
    tags: ["Reservations", "Room management", "Guest records"],
  },
  {
    number: "04",
    icon: ReceiptText,
    title: "Billing & point-of-sale systems",
    description: "Manage sales, invoices and payment records with a billing workflow suited to your business.",
    image: imageUrl("photo-1554224155-6726b3ff858f", 1000),
    imageAlt: "Person reviewing business accounts and financial documents",
    tags: ["Invoicing", "Sales & payments", "Business reports"],
  },
];

const deliverySteps = [
  { number: "01", title: "Understand your workflow", description: "We start with your goals, current process and the problems you want to solve." },
  { number: "02", title: "Shape the right solution", description: "We agree on the features and approach before moving into design and development." },
  { number: "03", title: "Build, launch & support", description: "We help you get started and can continue improving the system as your needs grow." },
];

function ITServices() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 -z-10 opacity-20">
          <img
            src={imageUrl("photo-1497366754035-f200968a6e72", 1800)}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand via-brand/95 to-primary/70" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-6 md:py-28 lg:items-start lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> IT services for growing businesses
            </span>
            <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              <span className="block">Make your business</span>
              <span className="block text-accent">work smarter.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/80">
              Websites and business systems designed around your real workflows — from maintenance and hotel operations to everyday billing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-elegant transition-smooth hover:opacity-90"
              >
                Discuss your project <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition-smooth hover:bg-white/15"
              >
                Explore solutions
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary-foreground/80">
              {["Built for your workflow", "Mobile-friendly", "Local support"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" /> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-8 w-full max-w-xl lg:mt-[4.5rem]">
            <div className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
              <img
                src={imageUrl("photo-1498050108023-c5249f4df085", 1200)}
                alt="Laptop displaying a software development workspace"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-border/60 bg-card p-4 text-card-foreground shadow-elegant sm:-left-7 sm:right-12 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Code2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display font-semibold">One solution, shaped around you</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">Plan · Build · Improve</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="mx-auto max-w-7xl scroll-mt-8 px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What we build</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            The right tools for the way you work
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Start with one focused solution or bring multiple parts of your business together.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {solutions.map((solution) => (
            <article
              key={solution.number}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="relative overflow-hidden">
                <img
                  src={solution.image}
                  alt={solution.imageAlt}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-brand/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {solution.number} / 04
                </span>
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <solution.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">{solution.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{solution.description}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {solution.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">A clear process</span>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                From your idea to everyday use.
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                No one-size-fits-all software. We work with you to make sure the result solves a real problem for your team.
              </p>
            </div>
            <div className="space-y-4">
              {deliverySteps.map((step) => (
                <div key={step.number} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
                  <span className="font-display text-lg font-bold text-primary">{step.number}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero px-6 py-12 text-primary-foreground md:px-12 md:py-16">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-primary-glow/20 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/70">
                <Headset className="h-4 w-4" /> Let's plan your next step
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Tell us what your business needs.</h2>
              <p className="mt-3 leading-7 text-primary-foreground/80">
                Share the process you want to improve, and we’ll help you explore a solution that fits.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-smooth hover:opacity-90"
            >
              Talk to our team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
