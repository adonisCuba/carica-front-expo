import { Alert } from "react-native";


export const integracionMP = async () => {

    const ACCESS_TOKEN = 'APP_USR-3680372407622333-011308-d094515934c83f09bb79df34ad2001a1-1253913221';

    try {
        const response = await fetch('https://api.mercadopago.com/v1/payments', {
           method: 'POST',
           headers:{
            'Content-Type': 'application/json',
            'X-Idempotency-Key': '0d5020ed-1af6-469c-ae06-c3bec19954bb',
            'Authorization': `Bearer ${ACCESS_TOKEN}` ,
           },
           body: JSON.stringify(preferencia)
        })

        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.log(error)
    }

};

const preferencia ={

    items: [
      {
        "id": "MLB2907679857",
        "title": "Point Mini",
        "description": "Point product for card payments via Bluetooth.",
        "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png",
        "category_id": "electronics",
        "quantity": 1,
        "unit_price": 58,
        "type": "electronics",
        "event_date": "2023-12-31T09:37:52.000-04:00",
        "warranty": false,
        "category_descriptor": {
          "passenger": {},
          "route": {}
        }
      }
    ]
}


const payments = {
    additional_info: {
      items: [
        {
          id: 'MLB2907679857',
          title: 'Point Mini',
          description: 'Point product for card payments via Bluetooth.',
          picture_url: 'https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png',
          category_id: 'electronics',
          quantity: 1,
          unit_price: '5800',
        }
      ],
      payer: {
        first_name: 'Test',
        last_name: 'Test',
        phone: {
          area_code: '11',
          number: '987654321'
        },
        address: {
          street_number: null
        }
      },
      shipments: {
        receiver_address: {
          zip_code: '12312-123',
          state_name: 'Rio de Janeiro',
          city_name: 'Buzios',
          street_name: 'Av das Nacoes Unidas',
          street_number: 3003
        }
      }
    },
    application_fee: null,
    binary_mode: false,
    campaign_id: null,
    capture: false,
    coupon_amount: null,
    description: 'Payment for product',
    differential_pricing_id: null,
    external_reference: 'MP0001',
    installments: 1,
    metadata: null,
    payer: {
      entity_type: 'individual',
      type: 'customer',
      email: 'test_user_123@testuser.com',
      identification: {
        type: 'CPF',
        number: '95749019047'
      }
    },
    payment_method_id: 'master',
    token: 'ff8080814c11e237014c1ff593b57b4d',
    transaction_amount: 58
}

export const createCheckoutPreference = async () => {
  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer APP_USR-3207167079503487-041620-b517574017910c308f2e947d538c840c-287455919',
      },
      body: JSON.stringify({
        items: [
          {
            title: 'Suscripción', // Un título genérico
            quantity: 1,
            unit_price: 15000, // Puedes poner un precio simbólico o dejar que el plan lo defina
            currency_id: 'ARS', // Cambia a tu moneda
          },
        ],
        plan_id: '2c938084963245b70196413ba7440903', // Especifica el ID del plan aquí
        auto_return: 'approved', // Opcional: Redirige automáticamente en caso de éxito
        back_urls: {
          success: 'TU_ESQUEMA_DE_URL://success', // Define un esquema de URL para tu app
          failure: 'TU_ESQUEMA_DE_URL://failure',
          pending: 'TU_ESQUEMA_DE_URL://pending',
        },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Preferencia creada:', data);
      return data.init_point;
    } else {
      const errorData = await response.json();
      Alert.alert('Error al crear la preferencia', errorData.message || 'Inténtalo de nuevo.');
    }
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    Alert.alert('Error', 'Ocurrió un error al comunicarse con Mercado Pago.');
  }
};