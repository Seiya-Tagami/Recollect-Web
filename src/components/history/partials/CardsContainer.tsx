import { Card as TCard } from '@/api/models'
import { vstack } from '../../../../styled-system/patterns'
import { CardsSection } from './CardsSection'
import { CardNotRegistered } from './CardNotRegistered'
import { Card } from './Card'

const period_with_number = {
  現在まで: 0,
  高校生: 1,
  中学生: 2,
  小学生: 3,
  幼少期: 4,
}

const sortCardsByPeriod = (data: TCard[]) => {
  const results = []
  for (let i = 0; i < Object.keys(period_with_number).length; i++) {
    const arr = []
    for (const d of data) {
      if (period_with_number[d.period] === i) {
        arr.push(d)
      }
    }
    results.push(arr)
  }

  return results
}

export const CardsContainer = (props: { data: TCard[] }) => {
  const { data } = props
  const allCards = data ? sortCardsByPeriod(data) : []
  return (
    <>
      <div
        className={vstack({
          w: 'full',
          h: '640px',
          gap: '32px',
          overflowY: 'auto',
          mt: '24px',
          mx: 'auto',
          p: '24px',
          _scrollbar: { w: '10px' },
          _scrollbarTrack: { bg: 'slate.300' },
          _scrollbarThumb: { bg: 'dimBlue', borderRadius: 'md' },
          rounded: 'xl',
        })}
      >
        {allCards.map((cards, index) => {
          const period = Object.keys(period_with_number)[index]
          return (
            <CardsSection key={index} period={period}>
              {cards.length ? (
                cards.map((card) => {
                  return <Card data={card} key={card.id} />
                })
              ) : (
                <CardNotRegistered />
              )}
            </CardsSection>
          )
        })}
      </div>
    </>
  )
}