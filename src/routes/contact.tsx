import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, AlertTriangle, CheckCircle2, Upload, X, Clock } from "lucide-react";
import { BUSINESS_ADDRESS, BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_LINK } from "@/lib/business-info";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Complaints — Akola Telecom & IP Networks Pvt Ltd" },
      { name: "description", content: "Contact Akola Telecom for new broadband connections, enterprise networking, CCTV or IT solutions. File a service complaint with photo attachments and get a quick resolution." },
      { property: "og:title", content: "Contact Akola Telecom & IP Networks" },
      { property: "og:description", content: "New connection enquiries and 24/7 complaint support for broadband, networking, CCTV and IT solutions in Akola." },
      { property: "og:url", content: "https://www.akolatelecomandipnetworks.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.akolatelecomandipnetworks.com/contact" }],
  }),
  component: Contact,
});

type Status = { ok: boolean; msg: string } | null;

const INQUIRY_API_URL = "/api/inquiry";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function Contact() {
  const [mode, setMode] = useState<"connection" | "complaint">("connection");
  const [status, setStatus] = useState<Status>(null);
  const [image, setImage] = useState<{ file: File; preview: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInput = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", message: "",
    accountId: "", issueType: "internet-down", priority: "normal",
  });

  useEffect(() => () => {
    if (image) URL.revokeObjectURL(image.preview);
  }, [image]);

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > MAX_IMAGE_SIZE) {
      setStatus({ ok: false, msg: "Choose an image up to 5 MB." });
      e.target.value = "";
      return;
    }
    setImage({ file, preview: URL.createObjectURL(file) });
    setStatus(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const removeImage = () => {
    setImage(null);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const detail = mode === "connection" ? form.address : form.message;
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !detail.trim()) {
      setStatus({ ok: false, msg: "Please complete all required fields." });
      return;
    }
    if (form.name.length > 100 || form.email.length > 255 || detail.length > 1000) {
      setStatus({ ok: false, msg: "Some fields are too long." });
      return;
    }
    if (form.phone.length > 20 || form.address.length > 1000 || form.message.length > 1000) {
      setStatus({ ok: false, msg: "Some fields are too long." });
      return;
    }

    const data = new FormData();
    data.append("type", mode);
    data.append("name", form.name.trim());
    data.append("mobile", form.phone.trim());
    data.append("email", form.email.trim());
    if (mode === "connection") {
      data.append("address", form.address.trim());
    } else {
      data.append("issue", form.message.trim());
      data.append("accountId", form.accountId.trim());
      data.append("issueType", form.issueType);
      data.append("priority", form.priority);
      if (image) data.append("image", image.file, image.file.name);
    }

    const xhr = new XMLHttpRequest();
    setLoading(true);
    setUploadProgress(0);
    setStatus(null);
    xhr.open("POST", INQUIRY_API_URL);
    xhr.timeout = 120000;
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setUploadProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      setLoading(false);
      setUploadProgress(0);
      if (xhr.status >= 200 && xhr.status < 300) {
        setStatus({
          ok: true,
          msg: mode === "connection"
            ? "Your connection enquiry has been submitted. Our team will contact you shortly."
            : "Your complaint has been submitted. Our support team will contact you shortly.",
        });
        setForm({ name: "", email: "", phone: "", address: "", message: "", accountId: "", issueType: "internet-down", priority: "normal" });
        removeImage();
        return;
      }

      let message = "Submission failed. Please try again.";
      try {
        const response = JSON.parse(xhr.responseText) as { message?: unknown; error?: unknown };
        if (typeof response.message === "string") message = response.message;
        else if (typeof response.error === "string") message = response.error;
      } catch {
        // Use the generic message when the server response is not JSON.
      }
      setStatus({ ok: false, msg: message });
    };
    xhr.onerror = () => {
      setLoading(false);
      setUploadProgress(0);
      setStatus({ ok: false, msg: "Unable to reach the server. Please check your connection and try again." });
    };
    xhr.ontimeout = () => {
      setLoading(false);
      setUploadProgress(0);
      setStatus({ ok: false, msg: "The request timed out. Please try again." });
    };
    xhr.send(data);
  };

  return (
    <>
      <section className="bg-gradient-hero py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <Clock className="h-3.5 w-3.5" /> Typical response within 1 hour
          </span>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Let's talk</h1>
          <p className="mx-auto mt-4 max-w-2xl opacity-90">
            Whether you want a new connection or need to report a service issue —
            our Akola team is here and we respond fast.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Info column */}
          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Visit us", value: BUSINESS_ADDRESS },
              { icon: Phone, label: "Call us", value: BUSINESS_PHONE },
              { icon: Mail, label: "Email us", value: BUSINESS_EMAIL },
              { icon: Clock, label: "Support", value: "24×7 technical assistance" },
            ].map((c) => (
              <div key={c.label} className="flex gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  {c.label === "Call us" ? (
                    <a href={`tel:${BUSINESS_PHONE_LINK}`} className="mt-0.5 block text-sm font-medium text-foreground hover:text-primary">{c.value}</a>
                  ) : c.label === "Email us" ? (
                    <a href={`mailto:${BUSINESS_EMAIL}`} className="mt-0.5 block break-all text-sm font-medium text-foreground hover:text-primary">{c.value}</a>
                  ) : (
                    <div className="mt-0.5 text-sm font-medium text-foreground">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form column */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
              {/* Toggle */}
              <div className="mb-6 inline-flex rounded-xl bg-secondary p-1">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => { setMode("connection"); setStatus(null); }}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-smooth ${mode === "connection" ? "bg-gradient-brand text-primary-foreground shadow-elegant" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <MessageSquare className="h-4 w-4" /> New Connection
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => { setMode("complaint"); setStatus(null); }}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-smooth ${mode === "complaint" ? "bg-gradient-brand text-primary-foreground shadow-elegant" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <AlertTriangle className="h-4 w-4" /> Complaint
                </button>
              </div>

              <h2 className="font-display text-2xl font-bold">
                {mode === "connection" ? "Request a new connection" : "File a service complaint"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {mode === "connection"
                  ? "Share your details and address, and our team will get back to you shortly."
                  : "Give us your account details so we can resolve your issue quickly."}
              </p>

              <form onSubmit={submit} className="mt-6 grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full name *" value={form.name} onChange={update("name")} maxLength={100} required disabled={loading} />
                  <Field label="Email *" type="email" value={form.email} onChange={update("email")} maxLength={255} required disabled={loading} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Phone *" type="tel" value={form.phone} onChange={update("phone")} maxLength={20} required disabled={loading} />
                  {mode === "complaint" && (
                    <Field label="Account / Customer ID" value={form.accountId} onChange={update("accountId")} maxLength={50} disabled={loading} />
                  )}
                </div>

                {mode === "complaint" ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <Select label="Issue type" value={form.issueType} onChange={update("issueType")} disabled={loading}>
                      <option value="internet-down">Internet is down</option>
                      <option value="slow-speed">Slow speed</option>
                      <option value="billing">Billing issue</option>
                      <option value="cctv">CCTV / hardware issue</option>
                      <option value="other">Other</option>
                    </Select>
                    <Select label="Priority" value={form.priority} onChange={update("priority")} disabled={loading}>
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </Select>
                  </div>
                ) : (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Installation address *</label>
                    <textarea
                      required
                      disabled={loading}
                      rows={3}
                      maxLength={1000}
                      value={form.address}
                      onChange={update("address")}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-ring/40"
                      placeholder="Enter the address where you need the connection"
                    />
                  </div>
                )}

                {mode === "complaint" && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Describe the problem *
                    </label>
                    <textarea
                      required
                      disabled={loading}
                      rows={5}
                      maxLength={1000}
                      value={form.message}
                      onChange={update("message")}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-ring/40"
                      placeholder="When did it start? What have you tried?"
                    />
                    <div className="mt-1 text-right text-xs text-muted-foreground">{form.message.length}/1000</div>
                  </div>
                )}

                {mode === "complaint" && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Attach a photo <span className="text-muted-foreground">(optional, up to 5 MB)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {image && (
                        <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
                          <img src={image.preview} alt="Complaint attachment preview" className="h-full w-full object-cover" />
                          <button
                            type="button"
                            disabled={loading}
                            onClick={removeImage}
                            aria-label="Remove image"
                            className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                      {!image && (
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => fileInput.current?.click()}
                          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-secondary/40 text-xs font-medium text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
                        >
                          <Upload className="h-5 w-5" />
                          Upload photo
                        </button>
                      )}
                    </div>
                    <input
                      ref={fileInput}
                      type="file"
                      accept="image/*"
                      disabled={loading}
                      onChange={onFiles}
                      className="hidden"
                    />
                    {uploadProgress > 0 && loading && (
                      <div
                        className="mt-3 h-2 overflow-hidden rounded-full bg-secondary"
                        role="progressbar"
                        aria-label="Submission upload progress"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={uploadProgress}
                      >
                        <div className="h-full bg-primary transition-all" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    )}
                  </div>
                )}

                {status && (
                  <div className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${status.ok ? "border-primary/30 bg-primary/5 text-primary" : "border-destructive/30 bg-destructive/5 text-destructive"}`}>
                    {status.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4" /> : <AlertTriangle className="mt-0.5 h-4 w-4" />}
                    <span>{status.msg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition-smooth hover:opacity-90"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Submitting..." : mode === "connection" ? "Request connection" : "Submit complaint"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Visit our Akola office</h2>
          <p className="mt-1 text-sm text-muted-foreground">{BUSINESS_ADDRESS}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="min-h-[360px] overflow-hidden rounded-2xl border border-border shadow-card">
            <iframe
              title="Akola Telecom office location at Daryav Heights, MG Road, Akola"
              src="https://www.google.com/maps?q=T-13%2C%203rd%20Floor%2C%20Daryav%20Heights%2C%20MG%20Road%2C%20Akola%20444001&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-full min-h-[360px] w-full border-0"
            />
          </div>
          <aside className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 text-center shadow-card">
            <img src="/website-qr.png" alt="QR code to visit the Akola Telecom website" className="h-48 w-48 rounded-lg bg-white p-2" />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Scan to visit our website</h3>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">Save our website for quick access to services and support.</p>
            <a href="/website-qr.png" target="_blank" rel="noopener noreferrer" className="mt-4 text-sm font-semibold text-primary hover:underline">
              Open QR image
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text", maxLength, required = false, disabled = false }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; maxLength?: number; required?: boolean; disabled?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}

function Select({ label, value, onChange, children, disabled = false }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-ring/40"
      >
        {children}
      </select>
    </div>
  );
}
