import { FC } from 'react'
import { m } from 'framer-motion'
import { css } from '../../../styled-system/css'
import { center, hstack, vstack } from '../../../styled-system/patterns'
import ReactMarkdown from 'react-markdown'
import { useMutateOpenAIResponse } from '@/api/hooks/openai/useMutateOpenAi'
import { FeatureTag } from '@/components/common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlassChart,
} from '@fortawesome/free-solid-svg-icons'
import { IsAnalyzingIcon } from './IsAnalyzingIcon'
import { SwitchButton2 } from './SwitchButton2'

type AnalysisBoardProps = {
  content: {
    id: string
    period: string
    title: string
    content: string
    analysisResult: string
    tags: string[]
    createdAt: string
    updatedAt: string
  }
  next: () => void
  prev: () => void
}

const makePrompt = (content: string): string => {
  return `
    下記文章を読み、その人の特性を分析し、マークダウン形式で出力してください。
    なお、文章のフォーマットは以下のようなものとします。

    フォーマット例:「
        - **責任感**: 美化委員として学校清掃に取り組み、地域ボランティアに自発的に参加する姿勢から、責任感が強いことが分かります。\n- **努力家**: 自由研究での入賞や清掃活動での頑張りから、努力を惜しまない姿勢が伺えます。\n
    」

    文章:「
      ${content}
    」
  `
}

export const AnalysisBoard: FC<AnalysisBoardProps> = (props) => {
  const { content, next, prev } = props
  const { openaiResponseMutation } = useMutateOpenAIResponse()

  const handleAnalyze = () =>
    openaiResponseMutation.mutate({ id: content.id, prompt: makePrompt(content.content) })

  return (
    <div
      className={css({
        w: 'full',
        maxW: '780px',
        p: '14px',
        bg: 'blue.200',
        rounded: '3xl',
        shadow: 'xl',
        md: { p: '24px' },
      })}
    >
      <div className={hstack({ justify: 'space-between', minH: '48px' })}>
        <h2
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            px: '12px',
          })}
        >
          {content.period}
        </h2>
        <div
          className={hstack({
            px: '20px',
            display: openaiResponseMutation.isLoading ? 'none' : 'flex',
          })}
        >
          <SwitchButton2 icon={faChevronLeft} onClick={prev} />
          <SwitchButton2 icon={faChevronRight} onClick={next} />
        </div>
      </div>
      <div
        className={css({
          w: 'full',
          maxW: '780px',
          mt: '12px',
          px: '16px',
          py: '20px',
          bg: 'white',
          rounded: '14px',
          shadow: 'xl',
          md: {
            p: '24px',
          },
        })}
      >
        <div className={vstack({ gap: '8px', alignItems: 'start', overflow: 'hidden' })}>
          <h2 className={css({ fontSize: 'xl', fontWeight: 'bold', md: { fontSize: '2xl' } })}>
            {content.title}
          </h2>
          <div className={hstack({ gap: '24px' })}>
            {content.tags.length > 0 ? (
              <div className={hstack({ flexWrap: 'wrap' })}>
                {content.tags.map((tag, index) => (
                  <FeatureTag key={index} name={tag} />
                ))}
              </div>
            ) : (
              <p className={css({ fontSize: 'sm', color: 'dimBlue', md: { fontSize: 'md' } })}>
                分析をするとあなたの特性が表示されます。
              </p>
            )}
          </div>
        </div>

        <div
          className={css({
            h: '248px',
            mt: '16px',
            bg: 'slate.100',
            rounded: 'xl',
            overflow: 'auto',
          })}
        >
          {openaiResponseMutation.isLoading ? (
            <IsAnalyzingIcon />
          ) : content.analysisResult ? (
            <ReactMarkdown className={css({ p: '16px', fontSize: 'sm', md: { fontSize: 'md' } })}>
              {content.analysisResult}
            </ReactMarkdown>
          ) : (
            <div className={center({ w: 'full', h: '240px', p: '12px' })}>
              <p className={css({ fontSize: 'sm', color: 'dimGray', md: { fontSize: 'md' } })}>
                AIで自分の特性を分析することができます。
              </p>
            </div>
          )}
        </div>

        <m.button
          className={hstack({
            maxW: '280px',
            w: 'full',
            mx: 'auto',
            mt: '16px',
            px: '20px',
            py: '12px',
            bg: 'dimBlue',
            fontSize: 'md',
            fontWeight: 'bold',
            color: 'white',
            rounded: 'xl',
            cursor: 'pointer',
            justify: 'center',
            _disabled: {
              opacity: '0.8',
              cursor: 'default',
            },
            md: {
              fontSize: 'lg',
            },
          })}
          disabled={openaiResponseMutation.isLoading ? true : false}
          onClick={handleAnalyze}
          whileTap={openaiResponseMutation.isLoading ? { scale: 1 } : { scale: 0.9 }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlassChart}
            style={{ width: '24px', height: '24px', color: 'white' }}
          />
          {content.analysisResult ? 'もう一度分析してみる' : '分析してみる'}
        </m.button>
      </div>
    </div>
  )
}