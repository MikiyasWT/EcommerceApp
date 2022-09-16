import Stripe from "stripe"
import { getSession, GetSession } from "@auth0/nextjs-auth0";

const birr="name";
const fname="nabe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req,res){
 const session = getSession(req,res);
 const user = session?.user;
 //stripeId is used to see if user has previously purchased if so he is going to have an stripeId
 //the next time he comes back to purchase more no need to assign or create new Id
 //we can use the previous strioed id as customer
 const stripeId = user['http://localhost:3000/stripe_customer_id'];

if(req.method === "POST"){
   try {
    
    //create a checkout session
    const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode:'payment',
        customer:stripeId,
        payment_method_types:['card'],
        shipping_address_collection:{
            allowed_countries:['US','CA','GB','DE']
        },
        allow_promotion_codes:true,
        shipping_options:[{shipping_rate:'shr_1LdXTHDnTD1VFJ2sNAR8esy7'},{shipping_rate:'shr_1LdYfPDnTD1VFJ2svwujwMYU'}],
        line_items:req.body.map(item => {
            return {
                price_data:{
                    currency:'usd',
                
                    product_data:{
                        name:item.title,
                        images:[item.image.data.attributes.formats.thumbnail.url],
                    },
                    unit_amount:item.price * 100,
                },
                adjustable_quantity:{
                   enabled:true,
                   minimum: 1
                },
                quantity:item.quantity
            }
        }),

        //redirect to success or failed page
        success_url:`${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${req.headers.origin}/canceled`,

    });

    res.status(200).json(session);

   } catch (error) {
    res.status(error.statusCode || 500).json(error.message);
   }
}
}