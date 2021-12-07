import { TwitterApi } from 'twitter-api-v2'
import { CnbRequest } from '../entities'

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_OAUTH_TOKEN,
  accessSecret: process.env.TWITTER_OAUTH_TOKEN_SECRET,
}).readWrite.v2

// TODO reduce api calls

const saveCnbRequests = async () => {
  const prevMention = await CnbRequest.findOne({ order: { createdAt: 'DESC' } })

  const mentions = await client.userTimeline('1465828136688439296', {
    exclude: 'retweets',
    since_id: prevMention?.mentionId,
    max_results: 20,
  })

  for (const tweet of mentions.tweets) {
    const mentionId = tweet.id

    const mention = await client.singleTweet(mentionId, {
      'tweet.fields': 'referenced_tweets',
    })

    const targetId = mention.data.referenced_tweets?.find(
      (t) => t.type === 'replied_to'
    )?.id

    if (targetId) {
      const targetTweet = await client.singleTweet(targetId, {
        expansions: 'author_id',
        'tweet.fields': 'created_at',
        'user.fields': 'username',
      })

      await CnbRequest.create({
        mentionId,
        targetId,
        authorId: targetTweet.data.author_id,
        username: targetTweet.includes?.users?.find(
          (u) => u.id === targetTweet.data.author_id
        )?.username,
        text: targetTweet.data.text,
        createdAt: targetTweet.data.created_at,
      }).save()

      await client.like('1465828136688439296', mentionId)
    }
  }
}

export default saveCnbRequests
