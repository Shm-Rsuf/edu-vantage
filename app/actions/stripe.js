"use server";
import { stripe } from "@/lib/stripe";
import { formatAmountforStripe } from "@/lib/stripe-helpers";
import { headers } from "next/headers";

const CURRENCY = "usd";
export async function createCheckoutSession(data) {
  const ui_mode = "hosted";
  const origin = headers().get("origin");

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: "data.name",
            // images: [data.image],
          },
          unit_amount: formatAmountforStripe(1000, CURRENCY),
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=12445`,

      cancel_url: `${origin}/courses`,
    }),

    ui_mode,
  });

  return {
    url: checkoutSession.url,
    client_secret: checkoutSession.client_secret,
  };
}

export async function createPaymentIntent(data) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountforStripe(1000, CURRENCY),
    currency: CURRENCY,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    client_secret: paymentIntent.client_secret,
  };
}
