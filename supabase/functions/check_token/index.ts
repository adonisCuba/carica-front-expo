
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { access_token } = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN") || "";

  if (!access_token) {
    return new Response("Missing access token", { status: 400 });
  }

  // Ejemplo de cómo interactuar con la API de Mercado Pago
  const response = await fetch("https://api.mercadopago.com/v1/payments", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transaction_amount: 100, // Monto de la transacción
      token: req.body.token, // Token del pago
      description: "Test payment",
      payment_method_id: req.body.payment_method_id, // ID del método de pago
      payer: {
        email: req.body.payer_email, // Correo del pagador
      },
    }),
  });

  const data = await response.json();

  if (response.ok) {
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  }

  return new Response(JSON.stringify(data), { status: 500 });
});
