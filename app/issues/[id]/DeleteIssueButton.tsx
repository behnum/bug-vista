import { Button } from '@radix-ui/themes'
import { RiDeleteBinLine } from 'react-icons/ri'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color='red'>
      <RiDeleteBinLine /> Delete
    </Button>
  )
}

export default DeleteIssueButton
