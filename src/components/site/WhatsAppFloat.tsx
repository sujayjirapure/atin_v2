import { BUSINESS_WHATSAPP_URL } from "@/lib/business-info";

export default function WhatsAppFloat() {
  return (
    <a
      href={BUSINESS_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Akola Telecom on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt=""
        aria-hidden="true"
        className="h-8 w-8"
      />
    </a>
  );
}
