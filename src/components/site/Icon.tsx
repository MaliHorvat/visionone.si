import type { ServiceId } from "@/site";

/** Preproste črtne ikone (24 × 24) za področja dela. */
const PATHS: Record<ServiceId, string> = {
  videonadzor: "M2.5 7.5l13-3.5 1.5 5.5-13 3.5-1.5-5.5zM17 7.2l4-1.2v5l-3.4.9M9.5 11.5l1 3.8H14M14 13v4.5M4 12.5v6",
  alarm: "M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6L12 3zM9 12l2 2 4-4",
  pozar: "M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.3-5.4 3.6-7.8.5 1.6 1.4 2.6 2.4 3.2C11.8 7 12.6 4.6 14.6 3c-.3 3.2 4 5.6 4 11.4 0 3.9-2.7 6.6-6.6 6.6zM12 21c-1.7 0-2.8-1.2-2.8-2.8 0-1.8 1.4-2.7 2.8-4.2 1.4 1.5 2.8 2.4 2.8 4.2 0 1.6-1.1 2.8-2.8 2.8z",
  domofon: "M7 3h10a1 1 0 011 1v16a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM9 6h6v5H9zM12 14.5h.01M9.5 18h5",
  mreza: "M9 3h6v5H9zM3 16h6v5H3zM15 16h6v5h-6zM12 8v4M6 16v-4h12v4",
  wifi: "M2.5 9a14 14 0 0119 0M5.5 12.5a9.5 9.5 0 0113 0M8.5 16a5 5 0 017 0M12 19.5h.01",
  servis: "M14.7 6.3a4 4 0 00-5.4 5.1L3.5 17.2a1.7 1.7 0 002.4 2.4l5.8-5.8a4 4 0 005.1-5.4l-2.6 2.6-2.3-.5-.5-2.3 2.6-2.6z",
  ostalo: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM16.5 13v7M13 16.5h7",
};

export function ServiceIcon({ id, size = 28 }: { id: ServiceId; size?: number }) {
  return (
    <svg className="s-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[id]} />
    </svg>
  );
}
