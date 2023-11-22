import { m } from 'framer-motion'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { css } from '../../../styled-system/css'
import { useRouter } from 'next/router'
import { Period as TPeriod } from '@/api/models/card.model'
import { useMutateCard } from '@/api/hooks/card/useMutateCard'
import useStore from '@/store'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { GetServerSideProps } from 'next'
import { Session, getServerSession } from 'next-auth'

type Card = {
  period: TPeriod
  title: string
  content: string
}

type TutorialToHistoryButtonProps = {
  content: {
    cardList: Card[]
    cardPosition: number
    progressStepSize: number
    setCurrentValue: Dispatch<SetStateAction<number>>
    handleValidate: () => boolean
  },
  user: Session['user']
}
export const TutorialToHistoryButton: FC<TutorialToHistoryButtonProps> = ({ content, user }) => {
  const router = useRouter()
  const store = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const { createCardsMutation } = useMutateCard()

  const handleSubmit = async () => {
    if (content.handleValidate()) return
    content.setCurrentValue((prevValue) => Math.min(prevValue + content.progressStepSize, 100))
    setIsLoading(true)
    try {
      const res = await createCardsMutation.mutateAsync({
        cardData: content.cardList,
        accessToken: user.access_token || '',
      })
      if (res) {
        store.show('カードを作成しました', 'success')
        setTimeout(() => {
          store.hide()
        }, 2000)
      }
    } catch (error) {
      store.show('カードの作成に失敗しました', 'error')
      setTimeout(() => {
        store.hide()
      }, 2000)
    } finally {
      setIsLoading(false)
      router.push('/history') // TODO:成功失敗関わらず、historyへ送るようにしておく。
    }
  }

  return (
    <m.button
      className={css({
        w: '200px',
        color: 'white',
        bg: isLoading ? 'dimGray' : 'dimBlue',
        rounded: 'lg',
        p: '10px',
        cursor: 'pointer',
        fontSize: '20px',
        fontWeight: 'bold',
        mt: '20px',
        visibility: content.cardPosition === 4 ? 'visible' : 'hidden',
      })}
      disabled={isLoading}
      onClick={() => handleSubmit()}
      whileTap={{ scale: isLoading ? 1 : 0.9 }}
    >
      {isLoading ? '読み込み中...' : '自分史を見る！'}
    </m.button>
  )
}
