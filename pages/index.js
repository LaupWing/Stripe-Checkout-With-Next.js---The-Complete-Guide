import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Home() {
   const router = useRouter()
   const { status } = router.query

   const [item, setItem] = useState({
      name: 'Apple AirPods',
      description: 'Latest Apple AirPods.',
      image:
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
      quantity: 0,
      price: 999,
   })
   const [loading, setLoading] = useState(false)
   const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   const stripePromise = loadStripe(publishableKey)

   const changeQuantity = (value) => {
      setItem({ ...item, quantity: Math.max(0, value) })
   }
    
   const onQuantityPlus = () => {
      changeQuantity(item.quantity + 1)
   }
    
   const onQuantityMinus = () => {
      changeQuantity(item.quantity - 1)
   }
   const onInputChange = (e) => {
      changeQuantity(parseInt(e.target.value));
   }

   const createCheckOutSession = async () => {
      setLoading(true)
      const stripe = await stripePromise
      const checkoutSession = await axios.post('/api/create-stripe-session', {
         item: item,
      })
      const result = await stripe.redirectToCheckout({
         sessionId: checkoutSession.data.id,
      })
      if (result.error) {
         alert(result.error.message)
      }
      setLoading(false)
    }

   return (
      <div className={styles.container}>
         <Head>
            <title>Stripe Checkout with Next.js</title>
            <meta name="description" content="Complete Step by Step Tutorial" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            {status && status === 'success' && (
               <div className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>
                  Payment Successful
               </div>
            )}
            {status && status === 'cancel' && (
               <div className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'>
                  Payment Unsuccessful
               </div>
            )}
            <div className='shadow-lg border rounded p-2 '>
               <Image src={item.image} width={300} height={150} alt={item.name} />
               <h2 className='text-2xl'>$ {item.price}</h2>
               <h3 className='text-xl'>{item.name}</h3>
               <p className='text-gray-500'>{item.description}</p>
               <p className='text-sm text-gray-600 mt-1'>Quantity:</p>
               <div className='border rounded'>
                  <button
                     className='bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600'
                     onClick={onQuantityMinus}
                     >
                  -
                  </button>
                  <input
                     type='number'
                     className='p-2'
                     value={item.quantity}
                     onChange={onInputChange}
                  />
                  <button
                     className='bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600'
                     onClick={onQuantityPlus}
                  >
                  +
                  </button>
               </div>
               <p>Total: ${item.quantity * item.price}</p>
               <button
                  disabled={item.quantity === 0 || loading}
                  className='bg-blue-500 hover:bg-blue-600 text-white block w-full py-2 rounded mt-2 disabled:cursor-not-allowed disabled:bg-blue-100'
                  onClick={createCheckOutSession}
               >
                  {loading ? 'Processing...' : 'Buy'}
               </button>
            </div>
         </main>
      </div>
   )
}
