import { FC } from 'react'
import { css } from '../../../styled-system/css'
import { hstack, vstack } from '../../../styled-system/patterns'

type TutorialProgressBarProps = {
  currentValue: number
}

export const TutorialProgressBar: FC<TutorialProgressBarProps> = ({ currentValue }) => {
  const progressValue = `${currentValue}%`
  return (
    <div className={vstack({ mt: '30px' })}>
      <div
        className={hstack({
          gap: '20',
          fontWeight: 'bold',
          display: 'none',
          md: { display: 'flex' },
        })}
      >
        <p>幼少期</p>
        <p>小学生</p>
        <p>中学生</p>
        <p>高校生</p>
        <p>現在まで</p>
      </div>
      <div
        className={css({
          width: 'full',
          border: 'solid 3px',
          borderColor: 'lightGreen',
          borderRadius: '20px',
        })}
      >
        <div
          style={{ width: progressValue }}
          className={css({
            backgroundColor: 'lightGreen',
            padding: '15px 0',
            borderRadius: '16px',
            transition: '0.5s ease-in-out',
          })}
        ></div>
      </div>
    </div>
  )
}
