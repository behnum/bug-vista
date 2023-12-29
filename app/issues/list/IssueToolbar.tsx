'use client'

import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter'

const IssueToolbar = () => {
  return (
    <Flex mb='5' justify={'between'}>
      <IssueStatusFilter />
      <Button variant='classic'>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </Flex>
  )
}
export default IssueToolbar
