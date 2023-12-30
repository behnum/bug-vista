import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import IssueToolbar from './IssueToolbar'

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined // Prisma will ignore undefined values
  const where = { status }
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined // Prisma will ignore undefined values

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <div>
      <IssueToolbar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default IssuesPage
