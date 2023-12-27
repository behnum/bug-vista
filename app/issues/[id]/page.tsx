import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) {
    notFound()
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  await delay(2000)

  if (!issue) {
    notFound()
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap='3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  )
}
export default IssueDetailPage
