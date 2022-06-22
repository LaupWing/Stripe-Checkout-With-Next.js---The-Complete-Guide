import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
   const [item, setItem] = useState({
      name: 'Apple AirPods',
      description: 'Latest Apple AirPods.',
      image:
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
      quantity: 0,
      price: 999,
   })
   return (
      <div className={styles.container}>
         <Head>
            <title>Stripe Checkout with Next.js</title>
            <meta name="description" content="Complete Step by Step Tutorial" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
      </div>
   )
}
