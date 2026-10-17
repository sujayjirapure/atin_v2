import { createFileRoute } from "@tanstack/react-router";

const INQUIRY_API_URL = "https://atipn-backend.onrender.com/api/inquiry";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_REQUEST_SIZE = MAX_IMAGE_SIZE + 1024 * 1024;

export const Route = createFileRoute("/api/inquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const contentLength = Number(request.headers.get("content-length"));
        if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_SIZE) {
          return Response.json({ error: "The submission is too large." }, { status: 413 });
        }

        let formData: FormData;
        try {
          formData = await request.formData();
        } catch {
          return Response.json({ error: "Invalid form submission." }, { status: 400 });
        }

        const image = formData.get("image");
        if (image instanceof File && image.size > MAX_IMAGE_SIZE) {
          return Response.json({ error: "The image must be 5 MB or smaller." }, { status: 413 });
        }

        try {
          const response = await fetch(INQUIRY_API_URL, {
            method: "POST",
            body: formData,
          });
          const headers = new Headers();
          const contentType = response.headers.get("content-type");
          if (contentType) headers.set("content-type", contentType);

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        } catch (error) {
          console.error("Inquiry backend request failed:", error);
          return Response.json(
            { error: "The inquiry service is temporarily unavailable. Please try again." },
            { status: 502 },
          );
        }
      },
    },
  },
});
