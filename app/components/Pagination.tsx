'use client'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter() // use this for updating the URL
  const searchParams = useSearchParams() // use this to access the URL query params

  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) return null // hide pagination if there is only one page

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push('?' + params.toString())
  }

  return (
    <Flex align='center' gap='3'>
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  )
}
export default Pagination
