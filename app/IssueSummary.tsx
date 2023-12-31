'use client'

import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import CountUp from 'react-countup'

interface Props {
  open: number
  inProgress: number
  closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string
    value: number
    status: Status // the enum from Prisma to the rescue
  }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' }
  ]
  return (
    <Flex gap='3'>
      {containers.map(container => (
        <Card key={container.label}>
          <Flex direction='column' gap='1'>
            <Link className='text-sm font-medium' href={`/issues/list?status=${container.status}`}>
              {container.label}
            </Link>
            <Text size='4' className='font-bold'>
              <CountUp duration={3} end={container.value} />
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}
export default IssueSummary
