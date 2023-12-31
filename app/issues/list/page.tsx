import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import IssueToolbar from './IssueToolbar'

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined // Prisma will ignore undefined values
  const where = { status }

  const orderBy = columnNames.includes(searchParams.orderBy) ? searchParams.orderBy : 'title' // default to title

  const sortOrder = ['asc', 'desc'].includes(searchParams.sortOrder)
    ? searchParams.sortOrder
    : 'asc' // default to ascending

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy: {
      [orderBy]: sortOrder
    },
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction='column' gap='4'>
      <IssueToolbar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Bug Vista Issue Tracker - Issue List',
  description: 'View all issues for Bug Vista Tracker',
  openGraph: {
    title: 'Bug Vista Tracker',
    description: 'Bug Vista Tracker',
    type: 'website',
    url: 'https://bug-vista.top/',
    images: 'https://bug-vista.top/og.png',
    siteName: 'Bug Vista Tracker',
    locale: 'en_US'
  },
  twitter: {
    site: '@site'
  }
}

export default IssuesPage
