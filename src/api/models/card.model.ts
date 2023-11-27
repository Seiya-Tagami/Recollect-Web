import { cardRepository } from '../repositories/card.repository'

export type Period = '0' | '1' | '2' | '3' | '4'
export type Card = {
  id: string
  period: Period
  title: string
  content: string
  tags: string[]
  analysisResult: string
  createdAt: string
  updatedAt: string
}

export const cardFactory = () => {
  const repository = cardRepository

  return {
    list: async (accessToken: string): Promise<Card[]> => {
      const data = await repository.listCards(accessToken)
      const cards = data.map((card) => {
        return {
          id: card.card_id,
          title: card.title,
          period: card.period,
          content: card.content ? card.content : '',
          tags: card.tags ?? [],
          analysisResult: card.analysis_result ? card.analysis_result : '',
          createdAt: card.created_at,
          updatedAt: card.updated_at,
        }
      })
      return cards
    },
    post: async (
      cardData: Pick<Card, 'title' | 'content' | 'period'>,
      accessToken: string,
    ): Promise<Card> => {
      const data = await repository.createCard(cardData, accessToken)
      const card = {
        id: data.card_id,
        title: data.title,
        period: data.period,
        content: data.content ? data.content : '',
        tags: data.tags ?? [],
        analysisResult: data.analysis_result ? data.analysis_result : '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
      return card
    },
    batchPost: async (
      cardListData: Pick<Card, 'title' | 'content' | 'period'>[],
      accessToken: string,
    ): Promise<Card[]> => {
      const data = await repository.createCards(cardListData, accessToken)
      const cards = data.map((card) => {
        return {
          id: card.card_id,
          title: card.title,
          period: card.period,
          content: card.content ? card.content : '',
          tags: card.tags ?? [],
          analysisResult: card.analysis_result ? card.analysis_result : '',
          createdAt: card.created_at,
          updatedAt: card.updated_at,
        }
      })
      return cards
    },
    update: async (cardData: Partial<Card>, accessToken: string): Promise<Card> => {
      const data = await repository.updateCard(cardData, accessToken)
      const card = {
        id: data.card_id,
        title: data.title,
        period: data.period,
        content: data.content ? data.content : '',
        tags: data.tags ?? [],
        analysisResult: data.analysis_result ? data.analysis_result : '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
      return card
    },
    delete: async (cardData: Pick<Card, 'id'>, accessToken: string) =>
      repository.deleteCard(cardData, accessToken),
  }
}
