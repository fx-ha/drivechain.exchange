import { find as linkFind } from 'linkifyjs'
import Linkify from 'linkify-react'
import getVideoId from 'get-video-id'
import { Box } from '@chakra-ui/react'
import styles from '../styles/news.module.css'

const NewsContent = ({ text }: { text: string }) => {
  const youtubeUrl = linkFind(text).find(
    (el) => getVideoId(el.href).service === 'youtube'
  )?.href

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
        <Box mt="2" w="100%">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube-nocookie.com/embed/${
              getVideoId(youtubeUrl).id
            }`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      )}
    </Box>
  )
}

export default NewsContent
