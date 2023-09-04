import { FadeInWrapper } from '@/components/common/framer-motion/FadeInWrapper'
import { Board, Button } from '@/components/analysis'
import { hstack } from '../../../styled-system/patterns'
import { useState } from 'react'
import MainLayout from '@/components/layouts/MainLayout'
import { CommonMeta } from '@/components/common/meta/CommonMeta'

const mock_data = [
  {
    title: '開発インターン',
    subTitle: '実務を通して、様々な学びを得た話',
    content: 'xxxxx',
  },
  {
    title: 'サークル',
    subTitle: '秋の新歓活動を頑張った話',
    content: 'xxxxx',
  },
  {
    title: '高校生',
    subTitle: '文系でも化学部が楽しかった話！',
    content:
      '毎週、教科書で出てくるような有名な実験から面白い実験まで色々なことをしていました。やはり化学実験ではあるので、部員としっかりと協力して取り組んでいました。色々な事象を目の当たりにするたびにわくわくを沢山感じていました。さらに、文化祭準備期間では自分たちで何をするか考え、じっくりと時間をかけて楽しく取り組んでいました。',
  },
]

export default function Analysis() {
  const [index, setIndex] = useState(0)

  const prev = () => {
    const prevPos = index - 1
    if (prevPos < 0) {
      setIndex(mock_data.length - 1)
    } else {
      setIndex(prevPos)
    }
  }

  const next = () => {
    const nextPos = index + 1
    if (mock_data.length - 1 < nextPos) {
      setIndex(0)
    } else {
      setIndex(nextPos)
    }
  }
  // const [isAnalyzing, setIsAnalyzing] = useState(false)
  // const handleAnalyze = () => {
  //   setIsAnalyzing(true)
  // }
  return (
    <>
      <CommonMeta
        title={'Recollect - AI分析'}
        description={'Aiを利用することで、自分史カードから自分の特性を知ることができます。'}
      />
      <MainLayout>
        <FadeInWrapper>
          <div
            className={hstack({
              gap: '60px',
              w: 'fit',
              mx: 'auto',
            })}
          >
            <Button content={{ movement: 'prev', onClick: prev }} />
            <Board content={mock_data[index]} />
            <Button content={{ movement: 'next', onClick: next }} />
          </div>
        </FadeInWrapper>
      </MainLayout>
    </>
  )
}
