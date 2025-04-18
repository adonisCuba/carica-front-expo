// supabase/functions/create_preference.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const accessToken = Deno.env.get("MERCADOPAGO_ACCESS_TOKEN") || "";

  if (!accessToken) {
    return new Response("Access token is missing", { status: 400 });
  }

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Authorization": `Bearer APP_USR-3680372407622333-011308-d094515934c83f09bb79df34ad2001a1-1253913221`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          title: "Pago único",
          unit_price: 10, // Precio fijo del producto
          quantity: 1,
        },
      ],
    }),
  });

  const preferenceData = await response.json();

  if (response.ok) {
    return new Response(JSON.stringify(preferenceData), { status: 200 });
  }

  return new Response(JSON.stringify(preferenceData), { status: 500 });
});
