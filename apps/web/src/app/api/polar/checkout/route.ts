import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = process.env.POLAR_ACCESS_TOKEN;
  const productId = process.env.POLAR_PRODUCT_ID;
  const body = await req.json().catch(() => ({}));

  if (!token || !productId) {
    return NextResponse.json({
      ok: false,
      mode: "scaffold",
      message:
        "Polar not configured. Set POLAR_ACCESS_TOKEN and POLAR_PRODUCT_ID. See docs/PAYMENTS.md",
      setup: {
        github: "https://github.com/polarsource/polar",
        docs: "https://polar.sh/docs",
        steps: [
          "1. Create account at polar.sh",
          "2. Create Product Helix Pro",
          "3. Create Access Token",
          "4. Add POLAR_ACCESS_TOKEN and POLAR_PRODUCT_ID to .env.local",
        ],
      },
      checkoutUrl: null,
    });
  }

  try {
    const res = await fetch("https://api.polar.sh/v1/checkouts/custom/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        success_url:
          body.successUrl ||
          (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000") +
            "/pricing?success=1",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data, message: "Polar API error" }, { status: 502 });
    }
    return NextResponse.json({
      ok: true,
      checkoutUrl: data.url || data.checkout_url || data.id,
      raw: data,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Polar request failed" }, { status: 500 });
  }
}
