import { getOffices } from "@/lib/queries";
import { mergeOffices, officeKey } from "@/lib/offices";

const responseHeaders = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" };

export async function POST(request: Request) {
  const input = await request.json().catch(() => null);
  if (typeof input?.office !== "string" || input.office.length > 100) {
    return Response.json({ error: "Invalid office" }, { status: 400, headers: responseHeaders });
  }

  const offices = await getOffices();
  const email = mergeOffices(offices).find((office) => officeKey(office.city) === input.office)?.email?.trim();
  if (!email || !/^[\w.+-]+@[a-z\d-]+(?:\.[a-z\d-]+)+$/i.test(email)) {
    return Response.json({ error: "Email unavailable" }, { status: 404, headers: responseHeaders });
  }

  return Response.json({ email }, { headers: responseHeaders });
}
