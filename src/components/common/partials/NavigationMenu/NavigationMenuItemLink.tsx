import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { hstack } from '../../../../../styled-system/patterns'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type NavigationMenuItemLinkProps = {
  title: string
  link: string
  icon: IconDefinition
}
export const NavigationMenuItemLink: FC<NavigationMenuItemLinkProps> = (props) => {
  const { title, link, icon } = props
  const router = useRouter()

  return (
    <li>
      <Link href={link}>
        <span
          className={hstack({
            fontWeight: 'bold',
            p: '12px',
            rounded: 'xl',
            bg: router.pathname === link ? 'white' : 'transparent',
            shadow: router.pathname === link ? 'lg' : 'none',
          })}
        >
          <FontAwesomeIcon
            icon={icon}
            style={{ width: '24px', height: '24px', color: '#0C4C97' }}
          />
          {title}
        </span>
      </Link>
    </li>
  )
}
