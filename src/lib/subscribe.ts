import { trackEvent } from "./meta-pixel";

export type WebinarDateSlot = "2026-07-21" | "2026-07-28";

export interface SubscribePayload {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  birthDate?: string;
  webinarDate?: WebinarDateSlot;
  listType: "pattern-code" | "webinar";
  source?: string;
}

export async function subscribeToAC(payload: SubscribePayload): Promise<boolean> {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[subscribe] non-2xx", res.status, text);
      return false;
    }

    const eventName = payload.listType === "webinar" ? "CompleteRegistration" : "Lead";
    trackEvent(eventName, {
      content_name: payload.source ?? payload.listType,
      content_category: payload.listType,
    });

    return true;
  } catch (err) {
    console.error("[subscribe] network error", err);
    return false;
  }
}
