# Github Commits Twitter bot, with React, Express, MongoDB, Typescript

This application is compose of the frontend and the backend part.  

**Frontend:** it fetches Github pushes that were sent by Github webhook to the backend server and lists Github pushes. Developed with Typescript and React.  

**Backend:** it receives data of Github pushes that were posted by Github webhook, stores the data to MongoDB. Available endpoints of the REST API are listed below.

## Getting Started

You can run the application by doing the followings:
### Clone and Install

```bash
# Clone the repo
git clone https://github.com/youxiberlin/Github-tweets-fullstack.git

# Navigate to clonned folder and Install dependencies
cd Github-tweets-fullstack
yarn || npm i

```

## Start the application

### Frontend
```
cd client
yarn start || npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend
```
cd backend
yarn start || npm start
```
The default port for the server is `8080`.

**Environment variables**  
To allow the backend server post the new Github push to your Twitter account, please get following keys at [Twitter Developer center](https://developer.twitter.com/en).
- PORT
- MONGO_URL (required)
- TWITTER_CONSUMER_KEY (required)
- TWITTER_CONSUMER_SECRET (required)
- TWITTER_ACCESS_TOKEN_KEY (required)
- TWITTER_ACCESS_TOKEN_SECRET (required)

#### REST API Endpoints
The posted stories and comments are saved to MongoDB, and you can get the data by accessing following endpoints.

- GET: `http://localhost:8080/api/pushes` : to get the list of posted pushes
- POST: `http://localhost:8080/api/hook` : to post the webhook data

**NOTE**  
As the Github webhook can't post data to a port on localhost, you need to use a public URL to receive the webhook data.  
With [ngrok](https://ngrok.com/), you can set up a public URL while you are running the backend server at a localhost.  
After installing ngrok, you can get a public URL with this command.
```
$ ./ngrok http 8080
```
Then, at `Webhooks` setting at `Setting` page of a Github repository, enter `${ngrok_public_url}/api/hook` in the `Payload URL`.   

When you successfully set the envoironment variables and the payload URL at a Github repository, you get tweets like this when there is a new push made to the repository.  
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">New commits at Github-tweets-fullstack<br><br> 🚀 Add type check for Commit obj by youxiberlin<br><br> See more details at <a href="https://t.co/8kta9D1Tez">https://t.co/8kta9D1Tez</a></p>&mdash; node-ts-test (@node_ts) <a href="https://twitter.com/node_ts/status/1387125233375711241?ref_src=twsrc%5Etfw">April 27, 2021</a></blockquote> 
