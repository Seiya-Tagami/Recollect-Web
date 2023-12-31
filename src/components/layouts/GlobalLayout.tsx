import { Header } from '@/components/common'
import { Noto_Sans_JP } from 'next/font/google'
import { FC, ReactNode } from 'react'
import { css } from '../../../styled-system/css'

const notesansjp = Noto_Sans_JP({ subsets: ['latin'] })

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={notesansjp.className}>
      <Header />
      <main className={css({ mt: '80px', md: { mt: '100px' } })}>{children}</main>
    </div>
  )
}

export default GlobalLayout
