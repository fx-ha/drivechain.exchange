import { useState } from 'react'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { AiOutlineYoutube } from 'react-icons/ai'
import getVideoId from 'get-video-id'

// TODO add support for vimeo, dailymotion, ...

const VideoEmbed = ({ url }: { url: string }) => {
  const [loadIframe, setLoadIframe] = useState(false)

  if (loadIframe) {
    const youtubeId = getVideoId(url).id

    if (!youtubeId) {
      return <Text>Video not found</Text>
    }

    return (
      <iframe
        loading="lazy"
        width="100%"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      backgroundColor="black"
      w="100%"
      height="315"
      cursor="pointer"
      onClick={() => setLoadIframe(true)}
      title="Load Youtube Video"
    >
      <Icon as={AiOutlineYoutube} color="white" boxSize="20" />
    </Flex>
  )
}

export default VideoEmbed
