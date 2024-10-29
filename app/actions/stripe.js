"use server";
import { stripe } from "@/lib/stripe";
import { formatAmountforStripe } from "@/lib/stripe-helpers";
import { headers } from "next/headers";

const CURRENCY = "usd";
export async function createCheckoutSession(data) {
  const ui_mode = "hosted";
  const origin = headers().get("origin");

  const courseId = data?.get("courseId");
  const coursePrice = data?.get("coursePrice");

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
            name: data?.get("courseName"),
          },
          unit_amount: formatAmountforStripe(coursePrice, CURRENCY),
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,

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
    amount: formatAmountforStripe(coursePrice, CURRENCY),
    currency: CURRENCY,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    client_secret: paymentIntent.client_secret,
  };
}
