import { FadeInWrapper } from '@/components/common/framer-motion/FadeInWrapper'
import Head from 'next/head'
import { vstack } from '../../../styled-system/patterns'
import { ViewButtons } from '@/components/views'

export default function ChronologicalOrder() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <ViewButtons />
        <FadeInWrapper>
          <p className={vstack()}>こんにちは</p>
        </FadeInWrapper>
      </main>
    </>
  )
}
