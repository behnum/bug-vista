'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoIssueTracks } from 'react-icons/go'
import classNames from 'classnames'

const NavBar = () => {
  const currentPath = usePathname()

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues/list', label: 'Issues' }
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <GoIssueTracks />
      </Link>
      <ul className='flex space-x-6'>
        {links.map(link => (
          <Link
            key={link.href}
            className={classNames({
              'text-emerald-800': currentPath === link.href,
              'text-emerald-500': currentPath !== link.href,
              'hover:text-emerald-800 transition-colord': true
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  )
}
export default NavBar
