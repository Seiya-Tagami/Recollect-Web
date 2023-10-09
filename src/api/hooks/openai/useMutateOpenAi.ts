import { useMutation } from '@tanstack/react-query'
import { useError } from '../utils/useError'
import { OpenAICredential, openaiFactory } from '@/api/models/openai.model'
import { useMutateCard } from '../card/useMutateCard'

/**
 * 正規表現を使って、マークダウンからタグを抽出する処理
 */
const generateNewTags = (markdownString: string): string[] => {
  const regex = /\*\*(.*?)\*\*/g
  const newTags = markdownString.match(regex)?.map((v) => v.slice(2, v.length - 2))
  if (newTags === undefined) return []
  return newTags
}

export const useMutateOpenAIResponse = () => {
  const { switchErrorHandling } = useError()
  const { updateCardMutation } = useMutateCard()
  const openaiResponseMutation = useMutation(
    async (credential: OpenAICredential) => await openaiFactory().getOpenAIResponse(credential),
    {
      onSuccess: (res, variables: OpenAICredential) => {
        if (res) {
          const newTags = generateNewTags(res)
          updateCardMutation.mutate({
            id: variables.id,
            analysisResult: res,
            tags: newTags,
          })
        }
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    },
  )
  return {
    openaiResponseMutation,
  }
}
