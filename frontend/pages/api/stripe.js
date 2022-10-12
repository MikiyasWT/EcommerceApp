import Stripe from "stripe"
import { getSession, GetSession } from "@auth0/nextjs-auth0";

const birr="name";
const fname="nabe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req,res){
 const session = getSession(req,res);
 const user = session?.user;
  if(user){
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
  else {
    if(req.method === "POST"){
        try {
         
         //create a checkout session
         const session = await stripe.checkout.sessions.create({
             submit_type: 'pay',
             mode:'payment',
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
 
}






//use this code to connect Auth0 to Stripe to beable to retrieve previous purchase details or log a new one
//up on login in with Auth0 a new customer will be created on stripe with email the user used to google sign in and name 
// auth0 will pass email and email owner name to stripe then stripe will add it as a new customer
//copy this code by going to Auth0 Auth pipeline rules
//replace both stripe secret key and  your stripe id mine is http://localhost:3000/stripe_customer_id
//save changes and rerun project


// function(user,context,callback){
//     user.app_metadata = user.app_metadata || {};
 
//     if('stripe_customer_id' in user.app_metadata){
//         context.idToken['http://localhost:3000/stripe_customer_id'] = user.app_metadata.stripe_customer_id;
//         return callback(null,user,context);
//      }
 
//       const stripe = require('stripe')('sk_test_51LdULGDnTD1VFJ2sMtmknSUTGCpyjQxttSmuFxe5uv41lCcpmawn71tbIeyBGsby7eVjYggG5eaAHjL1zI8C17Qh00PPt3Lhsx');
 
//      const customer = {
//          email:user.email,
//          description:user.name
//        };
//  stripe.customers.create(customer, function(err,customer) {
 
//      if(err){
//        return callback(err);
//        }
 
//  user.app_metadata.stripe_customer_id = customer.id;
 
//  auth0.users.updateAppMetadata(user.user_id,user.app_metadata)
//     .then(function() {
//        context.idToken['http://localhost:3000/stripe_customer_id'] = 
//         user.app_metadata.stripe_customer_id;
//          callback(null,user,context);
//       })
//       .catch(function(err) {
//           callback(err);
//        });
//  });
//  }