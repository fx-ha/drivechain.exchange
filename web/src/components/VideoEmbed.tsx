import getVideoId from 'get-video-id'

// TODO add support for vimeo, dailymotion, ...

const VideoEmbed = ({ url }: { url: string }) => {
  const youtubeId = getVideoId(url).id

  if (!youtubeId) {
    return <></>
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

export default VideoEmbed
