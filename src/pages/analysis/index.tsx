import { Header, ViewButtons } from '@/components/common'
import Head from 'next/head'
import { center, hstack, vstack } from '../../../styled-system/patterns'
import { css } from '../../../styled-system/css'
import { Analyzing, Card } from '@/components/analysis'
import { useState } from 'react'

export default function Analysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const handleAnalyze = () => {
    setIsAnalyzing(true)
  }
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

        <ViewButtons />

        <div
          className={css({
            w: '720px',
            h: '480px',
            mx: 'auto',
            px: '40px',
            py: '24px',
            bg: 'white',
            rounded: '14px',
            shadow: 'xl',
          })}
        >
          <div className={hstack({ justify: 'space-between' })}>
            <div
              className={css({
                minW: '360px',
                p: '24px',
                shadow: 'xl',
                rounded: '3xl',
                bg: 'slate.100',
              })}
            >
              <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>タイトルです</h2>
              <p className={css({ fontSize: 'xl', mt: '8px' })}>xxxxxxxxxxxxxxxxxxxxxxxxx</p>
              {/* <div className={hstack({ gap: "16px" })}>
              <div className={css({ px: "12px", py: "4px", bg: "blue.200", rounded: "xl" })}>Tag</div>
              <div className={css({ px: "12px", py: "4px", bg: "blue.200", rounded: "xl" })}>Tag</div>
            </div> */}
            </div>
            <div className={vstack({ alignItems: 'start' })}>
              <p className={css({ fontSize: '2xl', fontWeight: 'bold' })}>について</p>
              <button
                className={css({
                  bg: 'dimBlue',
                  fontWeight: 'medium',
                  fontSize: '20px',
                  color: 'white',
                  p: '12px',
                  rounded: '12px',
                  cursor: 'pointer',
                })}
                onClick={handleAnalyze}
              >
                AIで自己の特性を知る!
              </button>
            </div>
          </div>
          <div
            className={css({ w: 'full', h: '4px', bg: 'slate.200', mt: '24px', rounded: 'full' })}
          />
          <div className={center({ w: 'full', h: '280px' })}>
            {isAnalyzing ? <Analyzing /> : ''}
          </div>
        </div>

        <div
          className={hstack({
            w: '1200px',
            h: '320px',
            mx: 'auto',
            mt: '24px',
            gap: '32px',
            overflowX: 'auto',
          })}
        >
          <Card />
        </div>
      </main>
    </>
  )
}
