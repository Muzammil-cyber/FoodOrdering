
import { stripe } from "./stripe.ts";
// Import Supabase client
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

// WARNING: The service role key has admin priviliges and should only be used in secure server environments!
const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

export const createOrRetrieveCustomer = async (authHeader: string) => {
    // Get JWT from auth header
    const jwt = authHeader.replace("Bearer ", "");
    // Get the user object
    const {
        data: { user },
    } = await supabaseAdmin.auth.getUser(jwt);
    console.log(user.id);

    if (!user) throw new Error("No user found for JWT!");

    // Check if the user already has a Stripe customer ID in the Database.
    const { data: { stripe_customer_id }, error } = await supabaseAdmin
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user?.id).single();
    // console.log(data?.length, data, error);
    if (error) throw error;
    if (stripe_customer_id) {
        console.log(`Found customer id: ${stripe_customer_id}`);
        return stripe_customer_id;

    }
    // if (data?.length === 1) {
    //     // Exactly one customer found, return it.
    //     const customer = data[0].stripe_customer_id;
    //     console.log(`Found customer id: ${customer}`);
    //     return customer;
    // }
    // if (data?.length === 0) {
    // Create customer object in Stripe.
    const customer = await stripe.customers.create({
        email: user.email,
        metadata: { uid: user.id },
    });
    console.log(`New customer "${customer.id}" created for user "${user.id}"`);
    // Insert new customer into DB
    await supabaseAdmin
        .from("profiles")
        .update({ stripe_customer_id: customer.id }).eq("id", user.id)
        .throwOnError();
    return customer.id;
    // } else throw new Error(`Unexpected count of customer rows: ${data?.length}`);
};