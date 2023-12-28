'use client'

import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation' // ! next/link is for client-side navigation
import { useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteIssue = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/issues/${issueId}`)
      router.push('/issues')
      router.refresh()
    } catch (error) {
      setIsDeleting(false)
      setError(true)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant='classic' color='red' disabled={isDeleting}>
            <RiDeleteBinLine /> Delete
            {isDeleting ? <Spinner /> : null}
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
              <Button variant='classic' color='red' onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>There was an error deleting the issue.</AlertDialog.Description>
          <Button color='gray' variant='classic' mt='3' onClick={() => setError(false)}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
