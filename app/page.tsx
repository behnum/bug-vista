import prisma from '@/prisma/client'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import IssueChart from './IssueChart'
import { Flex, Grid } from '@radix-ui/themes'

export default async function Home() {
  const issueCountes = {
    open: await prisma.issue.count({ where: { status: 'OPEN' } }),
    inProgress: await prisma.issue.count({ where: { status: 'IN_PROGRESS' } }),
    closed: await prisma.issue.count({ where: { status: 'CLOSED' } })
  }

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary {...issueCountes} />
        <IssueChart {...issueCountes} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
