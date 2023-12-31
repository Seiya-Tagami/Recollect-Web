import { CommonMeta } from '@/components/common/meta'
import { ContentsWrapper, Footer } from '@/components/common'
import { signIn } from 'next-auth/react'
import { css } from '../../../styled-system/css'
import { hstack, vstack } from '../../../styled-system/patterns'
import Image from 'next/image'
import { apiClient } from '@/api/clients/apiClient'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

const Signin = () => {
  return (
    <>
      <CommonMeta title={'Recollect - サインイン'} description={'Recollectにサインインする'} />
      <ContentsWrapper>
        <div
          className={css({
            w: 'full',
            maxW: '500px',
            mx: 'auto',
            mt: '90px',
            rounded: '2xl',
          })}
        >
          <div className={vstack({ alignItems: 'start', w: 'full' })}>
            <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>サインイン</h2>
            <div className={vstack({ alignItems: 'center', gap: '18px', w: 'full' })}>
              <p>サインインすることで、Recollectのサービスを利用することができます。</p>
              <div
                className={css({
                  p: '24px',
                })}
              >
                <button
                  className={hstack({
                    w: '320px',
                    px: '18px',
                    py: '16px',
                    bg: 'white',
                    fontWeight: 'bold',
                    color: 'black',
                    rounded: 'md',
                    shadow: 'md',
                    cursor: 'pointer',
                    justify: 'center',
                    gap: '16px',
                  })}
                  onClick={() => signIn('google')}
                >
                  <Image src='/img/google.png' width={20} height={20} alt='googleのアイコン' />
                  Googleでサインインする
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </ContentsWrapper>
    </>
  )
}

export default Signin

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user) {
    return {
      props: {},
    }
  }

  const isExistUser = await apiClient.post(
    '/users/email-duplicate-check',
    {
      accessToken: session.user.access_token || '',
    },
    {
      email: session?.user.email,
    },
  )

  if (isExistUser) {
    return {
      redirect: {
        destination: '/history',
        permanent: false,
      },
    }
  } else {
    return {
      redirect: {
        destination: '/signup',
        permanent: false,
      },
    }
  }
}
