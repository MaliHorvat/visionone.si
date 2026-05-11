import { PortalForceLightDocument } from "@/components/portal/PortalForceLightDocument";

export default function PortalLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PortalForceLightDocument />
      {children}
    </>
  );
}
