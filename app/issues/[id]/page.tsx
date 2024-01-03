import authOptions from '@/app/auth/authOptions'
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import AssigneeSelect from './AssigneeSelect'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import StatusSelect from './StatusSelect'

interface Props {
  params: { id: string }
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }))

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)
  if (isNaN(parseInt(params.id))) {
    notFound()
  }

  const issue = await fetchUser(parseInt(params.id))

  if (!issue) {
    notFound()
  }

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='6'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session ? (
        <Box>
          <Flex direction='column' gap='4'>
            <AssigneeSelect issue={issue} />
            <StatusSelect status={issue.status} issueId={issue.id} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      ) : null}
    </Grid>
  )
}

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id))

  return {
    title: `Bug Vista Issue Tracker - ${issue?.title}`,
    description: `Details for issue ${issue?.id}`,
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
}

export default IssueDetailPage
