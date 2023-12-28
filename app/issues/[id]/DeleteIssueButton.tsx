'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation' // ! next/link is for client-side navigation
import { RiDeleteBinLine } from 'react-icons/ri'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant='classic' color='red'>
          <RiDeleteBinLine /> Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Are you sure?</AlertDialog.Title>
        <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
        <Flex gap='3' mt='4'>
          <AlertDialog.Cancel>
            <Button color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant='classic'
              color='red'
              onClick={async () => {
                await axios.delete(`/api/issues/${issueId}`)
                router.push('/issues')
                router.refresh()
              }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton
