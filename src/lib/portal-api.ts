/** Majhen pomočnik za klice portalnega API-ja iz brskalnika. Vrne `null` ob uspehu ali sporočilo napake. */
export async function apiSend(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  body?: unknown,
): Promise<string | null> {
  try {
    const res = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (res.ok) return null;
    if (res.status === 401) return "Seja je potekla — prijavite se znova.";
    const data = await res.json().catch(() => ({}));
    return typeof data?.error === "string" ? data.error : `Napaka strežnika (${res.status}).`;
  } catch {
    return "Povezava s strežnikom ni uspela. Preverite internetno povezavo.";
  }
}
