import Twitter from 'twitter';

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY!,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY!,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

export const postTweet = async (message: string): Promise<any> => {
  return client.post('statuses/update', { status: message });
};
