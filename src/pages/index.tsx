import Head from 'next/head'
import { Footer, Header } from '@/components/common'
import { Hero } from '@/components/entrance'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Header />
        <Hero />
        <Footer />
      </main>
    </>
  )
}
