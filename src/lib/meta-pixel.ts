declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

type StandardEvent =
  | "PageView"
  | "Lead"
  | "CompleteRegistration"
  | "Subscribe"
  | "ViewContent"
  | "InitiateCheckout"
  | "Purchase";

export function trackEvent(
  event: StandardEvent,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (options?.eventID) {
    window.fbq("track", event, params ?? {}, { eventID: options.eventID });
  } else {
    window.fbq("track", event, params ?? {});
  }
}

export function trackCustom(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", event, params ?? {});
}
