import { Grid } from "@mui/material";

import Tweet from "./Tweet";

import "./ListTweets.scss"


export default function ListTweets({
  allTweetsStorage, deleteTweet
}) {

  if(!allTweetsStorage || allTweetsStorage.length == 0) {
    return (
      <div className="list-tweets-empty">
        <h2>No hay tweets</h2>
      </div>
    )
  }
  // Aqui no hace falta poner else
  
  return (
    <Grid 
      className="list-tweets"
      container
      spacing={3}
    >
      {allTweetsStorage.map((tweet, index)=>  
        <Grid
          key={index}
          item
          xs={3}
        >
          <Tweet 
            tweet={tweet}
            index={index}
            deleteTweet={deleteTweet}
          />
        </Grid>
      )}
    </Grid>
  )
}