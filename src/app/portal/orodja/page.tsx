"use client";

import { useState } from "react";
import { Image as ImageIcon, Power, ScanSearch } from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  Field,
  Notice,
  PageHeader,
  inputClass,
} from "@/components/portal/ui";

const IPV4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
const MAC = /^([0-9a-f]{2}[:-]){5}[0-9a-f]{2}$/i;

function mockScan(start: string) {
  const base = start.replace(/\.\d+$/, "");
  return [
    { ip: `${base}.1`, mac: "00:11:22:33:44:01", host: "Usmerjevalnik" },
    { ip: `${base}.10`, mac: "aa:bb:cc:dd:ee:ff", host: "NVR" },
    { ip: `${base}.50`, mac: "de:ad:be:ef:00:01", host: "Kamera — vhod" },
  ];
}

export default function OrodjaPage() {
  const [startIp, setStartIp] = useState("192.168.1.1");
  const [endIp, setEndIp] = useState("192.168.1.30");
  const [scanResult, setScanResult] = useState<ReturnType<typeof mockScan> | null>(null);
  const [scanning, setScanning] = useState(false);
  const [mac, setMac] = useState("aa:bb:cc:dd:ee:ff");
  const [wolMsg, setWolMsg] = useState<string | null>(null);

  const ipError =
    !IPV4.test(startIp) || !IPV4.test(endIp)
      ? "Vnesite veljaven IPv4 naslov."
      : startIp.replace(/\.\d+$/, "") !== endIp.replace(/\.\d+$/, "")
        ? "Začetni in končni IP morata biti v istem /24 omrežju."
        : null;
  const macValid = MAC.test(mac.trim());

  function runScan() {
    if (ipError) return;
    setScanning(true);
    setScanResult(null);
    window.setTimeout(() => {
      setScanResult(mockScan(startIp));
      setScanning(false);
    }, 600);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Orodja" subtitle="Diagnostika omrežja na objektu." />

      <Notice tone="accent">
        Orodja delujejo v demo načinu — prava diagnostika teče prek namizne aplikacije VisionOne na objektu.
      </Notice>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="IP skeniranje" icon={ScanSearch} description="Poišče naprave v lokalnem omrežju." />
          <div className="space-y-4 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Začetni IP">
                <input value={startIp} onChange={(e) => setStartIp(e.target.value.trim())} className={`${inputClass} font-mono`} />
              </Field>
              <Field label="Končni IP">
                <input value={endIp} onChange={(e) => setEndIp(e.target.value.trim())} className={`${inputClass} font-mono`} />
              </Field>
            </div>
            {ipError ? <p className="text-xs text-[var(--vo-danger)]">{ipError}</p> : null}
            <Button variant="primary" onClick={runScan} disabled={Boolean(ipError) || scanning}>
              {scanning ? "Skeniram …" : "Zaženi sken"}
            </Button>
            {scanResult ? (
              <div className="overflow-x-auto rounded-md border border-[var(--vo-border)]">
                <table className="w-full min-w-[360px] text-left text-sm">
                  <thead className="bg-[var(--vo-surface-2)] text-xs uppercase tracking-wide text-[var(--vo-muted)]">
                    <tr>
                      <th className="px-3 py-2 font-medium">IP</th>
                      <th className="px-3 py-2 font-medium">MAC</th>
                      <th className="px-3 py-2 font-medium">Naprava</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scanResult.map((r) => (
                      <tr key={r.ip} className="border-t border-[var(--vo-border)]">
                        <td className="px-3 py-2 font-mono text-xs text-[var(--vo-fg)]">{r.ip}</td>
                        <td className="px-3 py-2 font-mono text-xs text-[var(--vo-muted)]">{r.mac}</td>
                        <td className="px-3 py-2 text-[var(--vo-fg)]">{r.host}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </Card>

        <Card>
          <CardHeader title="Wake-on-LAN" icon={Power} description="Prebudi napravo na daljavo." />
          <div className="space-y-4 p-4">
            <Field label="MAC naslov">
              <input
                value={mac}
                onChange={(e) => {
                  setMac(e.target.value);
                  setWolMsg(null);
                }}
                className={`${inputClass} font-mono ${macValid ? "" : "border-[var(--vo-danger)]"}`}
                aria-invalid={!macValid}
              />
            </Field>
            {!macValid ? <p className="text-xs text-[var(--vo-danger)]">Oblika: aa:bb:cc:dd:ee:ff</p> : null}
            <Button onClick={() => setWolMsg(`Paket za prebujanje poslan na ${mac.trim()}.`)} disabled={!macValid}>
              Pošlji WoL
            </Button>
            {wolMsg ? <Notice tone="ok">{wolMsg}</Notice> : null}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Zadnji posnetek kamere" icon={ImageIcon} />
        <div className="p-4">
          <div className="flex aspect-video max-w-xl items-center justify-center rounded-md border border-dashed border-[var(--vo-border-strong)] bg-[var(--vo-bg)]">
            <div className="text-center">
              <ImageIcon className="mx-auto h-8 w-8 text-[var(--vo-subtle)]" aria-hidden />
              <p className="mt-2 text-sm text-[var(--vo-muted)]">Posnetek ni na voljo</p>
              <p className="text-xs text-[var(--vo-subtle)]">Prikaz se vklopi, ko je kamera povezana s portalom.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
