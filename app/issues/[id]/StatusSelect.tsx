'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const statusMap: Record<Status, { label: string }> = {
  OPEN: { label: 'Open' },
  IN_PROGRESS: { label: 'In Progress' },
  CLOSED: { label: 'Closed' }
}

const StatusSelect = ({ status, issueId }: { status: Status; issueId: number }) => {
  const router = useRouter()

  const handleStatusChange = (status: Status) => {
    axios
      .patch(`/api/issues/${issueId}`, {
        status: status || 'OPEN'
      })
      .catch(() => {
        toast.error('Failed to update issue.')
      })
      .finally(() => {
        toast.success('Status updated.')
        router.refresh() // refresh the page to get the latest data
      })
  }

  return (
    <>
      <Select.Root defaultValue={status || ''} onValueChange={handleStatusChange}>
        <Select.Trigger placeholder='Status...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions...</Select.Label>
            {Object.entries(statusMap).map(([statusKey, { label }]) => (
              <Select.Item key={statusKey} value={statusKey}>
                {label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  )
}

export default StatusSelect
