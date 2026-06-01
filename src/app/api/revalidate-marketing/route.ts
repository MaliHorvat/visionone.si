import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/** Po shranjevanju v portalu pokličite ta endpoint za takojšnjo osvežitev. */
export async function POST(request: Request) {
  const secret = process.env.MARKETING_REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "MARKETING_REVALIDATE_SECRET ni nastavljen." }, { status: 503 });
  }
  const provided = request.headers.get("x-revalidate-secret") ?? "";
  if (provided !== secret) {
    return NextResponse.json({ error: "Neveljavna avtentikacija." }, { status: 401 });
  }
  revalidateTag("marketing-site");
  revalidatePath("/", "layout");
  revalidatePath("/storitve", "page");
  revalidatePath("/produkti", "page");
  revalidatePath("/kontakt", "page");
  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
