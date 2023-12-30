import prisma from '@/prisma/client'
import { Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'
import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'

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

export const metadata: Metadata = {
  title: 'Bug Vista Issue Tracker - Dashboard',
  description: 'View the latest issues and charts for Bug Vista Tracker',
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
