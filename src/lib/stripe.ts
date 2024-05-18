import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

const key = "sk_test_51O8GwDEK1uKkOktfbephBDbxnyLnnUs2UzBOSsgTtJEBVsohdznmNiLaiDyYBxeQv3c5wnXkwOG1bdlemgIwUopZ00W2ryiCEs"
const stripe = new Stripe(key, {
    apiVersion: "2024-04-10",
});

export const getCustomerByEmail = async (email: string) => {
    try {
        const customers = await stripe?.customers?.list({
            email: email,
            limit: 1,
        });

        if (customers?.data.length > 0) {
            const customer = customers?.data[0];
            const subscriptions = await stripe?.subscriptions?.list({
                customer: customer?.id,
            });
            if (subscriptions?.data.length > 0) {
                if (subscriptions?.data[0]?.status == "active") {
                    // also send the subscription details
                    return {
                        active: true,
                        customerId: customer?.id,
                        plans: subscriptions?.data[0]?.items?.data[0].plan,
                        subscription_ends: subscriptions?.data[0]?.current_period_end,
                        subscriptions: subscriptions?.data[0],
                    };
                }
            } else {
                return { active: false, customerId: customer.id };
            }
        } else {
            return { active: false, customerId: null }; // No customer found
        }
    } catch (error) {
        console.error('Error:', error);
        return { active: false, customerId: null }; // Error occurred
    }
}

export const createStripeSession = async (item: any, user: any) => {

    const planID = item?.stripe_plan;

    const checkout = await stripe?.checkout.sessions.create({
        customer_email: user?.email,
        client_reference_id: user?.id.toString(),
        payment_method_types: ["card"],
        line_items: [
            {
                price: planID,
                quantity: 1,
            },
        ],
        mode: "subscription",
        metadata: {
            user_id: user?.id,
            plan_id: planID,
            plan_name: item?.name,

        },
        allow_promotion_codes: true,
        success_url: `https://find-surrogate.vercel.app/success-payment?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: "https://localhost:3050/payment-failed",
    });

    if (!checkout.url) {
        throw new Error("Checkout URL not found");
    }

    const is_subscribed = await getCustomerByEmail(user?.email);

    // if is_subscribed.active is false, then create a new customer
    if (is_subscribed && !is_subscribed.active) {
        await createStripeCustomer(user);
    }
    return checkout.url;
}

const createStripeCustomer = async (user: any) => {
    try {
        let customer;

        // Check if customer with the same email already exists
        const existingCustomer = await stripe?.customers?.list({ email: user?.email, limit: 1 });

        if (existingCustomer.data.length > 0) {
            // If customer already exists, return existing customer id
            return existingCustomer.data[0].id;
        } else {
            // If customer doesn't exist, create a new one
            customer = await stripe?.customers?.create({
                email: user?.email,
                name: user?.name,
            });

            if (!customer.id) {
                throw new Error("Customer ID not found");
            }

            return customer.id;
        }
    } catch (error) {
        console.error("Error creating or retrieving customer:", error);
        return null; // or handle the error accordingly
    }
}


export const getUSerInvoice = async (customerId: any) => {
    try {
        if (!customerId) {
            throw new Error("Customer ID is missing.");
        }

        const session = await stripe?.billingPortal.sessions.create({
            customer: customerId,
            return_url: "https://find-surrogate.vercel.app/",
        });

        return session;
    } catch (error) {
        console.error("Error retrieving user invoice:", error);
        return null; // or handle the error accordingly
    }
}

export const cancel_subscription = async (customer_id: any) => {
    try {
        if (!customer_id) {
            throw new Error("Customer ID is missing.");
        }

        const subscriptions = await stripe?.subscriptions?.list({
            customer: customer_id,
            limit: 1, // Assuming the customer has only one subscription
        });

        if (subscriptions?.data.length > 0) {
            const subscriptionId = subscriptions?.data[0].id;
            const canceledSubscription = await stripe?.subscriptions?.update(subscriptionId, {
                cancel_at_period_end: true,
            });
            return canceledSubscription;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error cancelling subscription:", error);
        return null;
    }
}
