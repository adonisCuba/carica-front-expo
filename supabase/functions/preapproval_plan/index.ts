serve(async (req) => {
    const planData = {
      reason: "Suscripcion a Carica",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://tuapp.com/confirmacion",
    };
  
    const response = await fetch("https://api.mercadopago.com/preapproval_plan", {
      method: "POST",
      headers: {
        Authorization: `Bearer APP_USR-3680372407622333-011308-d094515934c83f09bb79df34ad2001a1-1253913221`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(planData),
    });
  
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Error al crear el plan" }), { status: 400 });
    }
  
    const plan = await response.json();
    return new Response(JSON.stringify(plan), { status: 200 });
  });
  