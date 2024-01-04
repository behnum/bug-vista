'use client'

import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers()
  const router = useRouter()

  if (isLoading) return <Skeleton />

  if (error) return null

  const handleAssigneeChange = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId || null
      })
      .catch(() => {
        toast.error('Failed to update issue.')
      })
      .finally(() => {
        toast.success('Issue updated.')
        router.refresh() // refresh the page to get the latest data
      })
  }

  return (
    <>
      <Select.Root defaultValue={issue.assignedToUserId || ''} onValueChange={handleAssigneeChange}>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value=''>Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })

export default AsigneeSelect
