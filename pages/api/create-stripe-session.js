const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req,res)=>{
   const {item} = req.body

   const stripe_object = {
      price_data:{
         currency: 'usd',
         product_data:{
            images: [item.image],
            name: item.name
         },
         unit_amount: item.price * 100
      }
   }
}