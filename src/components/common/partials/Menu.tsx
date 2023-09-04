import Link from 'next/link'
import { FC, useState } from 'react'
import { css } from '../../../../styled-system/css'
import { center } from '../../../../styled-system/patterns'
import { motion } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faCompass, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

export const Menu: FC = () => {
  const [active, setActive] = useState(false)
  const handleMenu = () => {
    setActive(prev => !prev)
  }
  return (
    <div className={css({
      pos: "fixed",
      right: "70px",
      bottom: "70px",
    })}>
      <div className={css({
        pos: "relative",
        w: '80px',
        h: '80px',
      })}>
        <motion.div
          className={center({
            pos: "absolute",
            zIndex: 1000,
            w: '80px',
            h: '80px',
            bg: 'dimBlue',
            rounded: 'full',
            shadow: 'xl',
            cursor: 'pointer'
          })}
          whileTap={{ scale: 0.9 }}
          onClick={handleMenu}
        >
          <FontAwesomeIcon icon={faCompass} style={{ width: "42px", height: "42px", color: "white" }} />
        </motion.div>
        <Link href={'/'} title='自分史を作成'>
          <motion.li className={center({
            pos: "absolute",
            top: 1,
            left: 1,
            w: '72px',
            h: '72px',
            bg: 'white',
            rounded: 'full',
            listStyle: 'none',
            shadow: 'xl'
          })}
            whileTap={{ scale: 0.9 }}
            animate={active ? {
              x: -0,
              y: -140
            } : {
              x: 0,
              y: 0
            }}
          >
            <FontAwesomeIcon icon={faPlus} style={{ width: "32px", height: "32px", color: "#0C4C97" }} />
          </motion.li>
        </Link>
        <Link href={'/'} title='自分史を編集'>
          <motion.li className={center({
            pos: "absolute",
            top: 1,
            left: 1,
            w: '72px',
            h: '72px',
            bg: 'white',
            rounded: 'full',
            listStyle: 'none',
            shadow: 'xl'
          })}
            whileTap={{ scale: 0.9 }}
            animate={active ? {
              x: -100,
              y: -100
            } : {
              x: 0,
              y: 0
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} style={{ width: "32px", height: "32px", color: "#0C4C97" }} />
          </motion.li>
        </Link>
        <Link href={'/'} title='ログアウト'>
          <motion.li
            className={center({
              pos: "absolute",
              top: 1,
              left: 1,
              w: '72px',
              h: '72px',
              bg: 'white',
              rounded: 'full',
              listStyle: 'none',
              shadow: 'xl'
            })}
            whileTap={{ scale: 0.9 }}
            animate={active ? {
              x: -140
            } : {
              x: 0
            }}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ width: "32px", height: "32px", color: "#0C4C97" }} />
          </motion.li>
        </Link>
      </div>
    </div>
  )
}