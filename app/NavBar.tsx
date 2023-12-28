'use client'

import { Box } from '@radix-ui/themes'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoIssueTracks } from 'react-icons/go'

const NavBar = () => {
  const currentPath = usePathname()
  const { status, data: session } = useSession()

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
          <li key={link.href}>
            <Link
              className={classNames({
                'text-emerald-800': currentPath === link.href,
                'text-emerald-500': currentPath !== link.href,
                'hover:text-emerald-800 transition-colord': true
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' ? (
          <Link href='/api/auth/signout'>Sign out</Link>
        ) : (
          <Link href='/api/auth/signin'>Sign in</Link>
        )}
      </Box>
    </nav>
  )
}
export default NavBar
