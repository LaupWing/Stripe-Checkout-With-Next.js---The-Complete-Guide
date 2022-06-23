const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function CreateStripeSession (req,res){
   const {item} = req.body

   const redirectURL = process.env.NODE_ENV === 'development' ?
      'http://localhost:3000' : 
      'https://stripe-checkout-next-js-demo.vercel.app'

   const stripe_object = {
      price_data:{
         currency: 'eur',
         product_data:{
            images: [item.image],
            name: item.name
         },
         unit_amount: item.price * 100
      },
      description: item.description,
      quantity: item.quantity
   }

   const session = await stripe.checkout.sessions.create({
      payment_method_types: ['ideal'],
      line_items: [stripe_object],
      mode: 'payment',
      success_url: `${redirectURL}?status=success`,
      cancel_url: `${redirectURL}?status=cancel`,
      metadata:{
         images: item.image
      }
   })

   res.json({id:session.id})
}