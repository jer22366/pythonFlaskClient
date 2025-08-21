import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  console.log("ECPay OrderResultURL Data:", data);
  console.log("NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return NextResponse.redirect(
    `${siteUrl}/paySuccessful?orderId=${data.MerchantTradeNo}`
  );
}
