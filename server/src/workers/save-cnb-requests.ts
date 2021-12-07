import { TwitterApi } from 'twitter-api-v2'
import { CnbRequest } from '../entities'

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN).v2

const saveCnbRequests = async () => {
  const prevMention = await CnbRequest.findOne({ order: { createdAt: 'DESC' } })

  const mentions = await client.userTimeline('1465828136688439296', {
    exclude: 'retweets',
    since_id: prevMention?.mentionId,
    max_results: 20,
  })

  for (let i = 0; i < mentions.tweets.length; i++) {
    const mentionId = mentions.tweets[i].id

    const mention = await client.singleTweet(mentionId, {
      'tweet.fields': 'referenced_tweets',
    })

    const targetId = mention.data.referenced_tweets?.find(
      (t) => t.type === 'replied_to'
    )?.id

    if (targetId) {
      const targetTweet = await client.singleTweet(mentionId, {
        expansions: 'author_id',
        'tweet.fields': 'created_at',
        'user.fields': 'username',
      })

      CnbRequest.create({
        mentionId,
        targetId,
        authorId: targetTweet.data.author_id,
        username: targetTweet.includes?.users?.find(
          (u) => u.id === targetTweet.data.author_id
        )?.username,
        text: targetTweet.data.text,
        createdAt: targetTweet.data.created_at,
      }).save()
    }
  }
}

export default saveCnbRequests

// URL = "https://twitter.com/twitter/status/[id]"
