import { useMemo } from 'react'
import { find as linkFind } from 'linkifyjs'
import Linkify from 'linkify-react'
import getVideoId from 'get-video-id'
import { Box } from '@chakra-ui/react'
import styles from '../styles/news.module.css'
import { VideoEmbed } from '.'

const NewsContent = ({ text }: { text: string }) => {
  const youtubeUrl = useMemo(
    () =>
      linkFind(text).find((el) => getVideoId(el.href).service === 'youtube')
        ?.href,
    [text]
  )

  return (
    <Box w="100%">
      <Linkify
        tagName="p"
        options={{
          attributes: {
            rel: 'noopener noreferrer',
            target: '_blank',
          },
        }}
        className={styles.newslink}
      >
        {text}
      </Linkify>

      {youtubeUrl !== undefined && (
        <Box mt="2">
          <VideoEmbed url={youtubeUrl} />
        </Box>
      )}
    </Box>
  )
}

export default NewsContent
