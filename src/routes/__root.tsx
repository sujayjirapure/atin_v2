import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import Header from "../components/site/Header";
import Footer from "../components/site/Footer";
import WhatsAppFloat from "../components/site/WhatsAppFloat";
import { BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_STREET_ADDRESS } from "../lib/business-info";

const SITE_URL = "https://www.akolatelecomandipnetworks.com";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Broadband Internet in Akola | Akola Telecom & IP Networks" },
      { name: "description", content: "Looking for broadband in Akola? Akola Telecom & IP Networks provides fiber internet for homes and businesses, local installation and 24×7 technical assistance." },
      { name: "keywords", content: "broadband in Akola, broadband Akola, fiber internet Akola, fiber broadband Akola, internet service provider Akola, home broadband Akola, business internet Akola, Akola Telecom, ATIN" },
      { name: "author", content: "Akola Telecom & IP Networks Pvt Ltd" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Akola Telecom & IP Networks" },
      { property: "og:title", content: "Broadband Internet in Akola | Akola Telecom" },
      { property: "og:description", content: "Fiber broadband for homes and businesses in Akola, with local installation and 24×7 technical assistance." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Broadband Internet in Akola | Akola Telecom" },
      { name: "twitter:description", content: "Fiber broadband for homes and businesses in Akola, with local installation and 24×7 technical assistance." },
      { name: "theme-color", content: "#0f2a5f" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/jpeg", href: "/__l5e/assets-v1/f59eae30-5379-4b78-9f62-74000b071bd9/atinlogo.jpg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Akola Telecom & IP Networks Pvt Ltd",
          alternateName: "ATIN",
          url: SITE_URL,
          logo: `${SITE_URL}/__l5e/assets-v1/f59eae30-5379-4b78-9f62-74000b071bd9/atinlogo.jpg`,
          image: `${SITE_URL}/__l5e/assets-v1/f59eae30-5379-4b78-9f62-74000b071bd9/atinlogo.jpg`,
          description: "Fiber broadband internet, business connectivity, networking and IT services in Akola, Maharashtra.",
          telephone: BUSINESS_PHONE,
          email: BUSINESS_EMAIL,
          address: {
            "@type": "PostalAddress",
            streetAddress: BUSINESS_STREET_ADDRESS,
            addressLocality: "Akola",
            addressRegion: "Maharashtra",
            postalCode: "444001",
            addressCountry: "IN",
          },
          areaServed: {
            "@type": "City",
            name: "Akola",
            containedInPlace: {
              "@type": "State",
              name: "Maharashtra",
            },
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: BUSINESS_PHONE,
            email: BUSINESS_EMAIL,
            contactType: "customer support",
            areaServed: "Akola, Maharashtra, India",
          },
          foundingDate: "2004",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </QueryClientProvider>
  );
}
