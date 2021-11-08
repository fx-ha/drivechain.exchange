import { Flex, HStack, Text, Tooltip, useToast, VStack } from '@chakra-ui/react'
import { NewsContent } from '.'
import { NewsItem } from '../generated/graphql'
import { formatDistance, truncateMiddle } from '../utils'

const NewsCard = ({ item, index }: { item: NewsItem; index: number }) => {
  const toast = useToast()

  return (
    <Flex
      p="5"
      borderWidth={`${index === 0 ? '0' : '1px'} 0 0 0`}
      overflowX="auto"
    >
      <VStack spacing="2" alignItems="start" w="100%">
        <HStack fontSize="xs">
          <Tooltip label="Copy transaction id" placement="top">
            <Text
              onClick={() => {
                navigator.clipboard.writeText(item.txid)
                toast({
                  title: 'Copied.',
                  duration: 4000,
                  isClosable: true,
                })
              }}
              _hover={{
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              @{truncateMiddle(item.txid)}
            </Text>
          </Tooltip>

          <Text>
            {Number(item.fee).toLocaleString('en-US', {
              minimumFractionDigits: 4,
              maximumFractionDigits: 4,
            })}{' '}
            ₿
          </Text>

          <Tooltip
            label={new Date(Number(item.block.createdAt)).toLocaleString()}
            placement="top"
          >
            <Text>
              {formatDistance(new Date(Number(item.block.createdAt)))}
            </Text>
          </Tooltip>
        </HStack>

        <NewsContent text={item.content} />
      </VStack>
    </Flex>
  )
}

export default NewsCard
