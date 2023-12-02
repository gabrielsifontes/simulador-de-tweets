import "./Tweet.scss"

import { Card, CardContent } from "@mui/material"
import { DeleteTwoTone } from "@mui/icons-material"
import moment from "moment"


export default function Tweet({
  tweet, index, deleteTweet
}) {
  
  return (
    <Card className='tweet'>
      <CardContent>
        <div className="tweet__header">
          <h5>{tweet.username}</h5>
          <DeleteTwoTone onClick={function() {
            console.log("Tweet eliminado")
            deleteTweet(index)
          }} />
        </div>

        <p>{tweet.tweet}</p>

        <div className="tweet__date-add-tweet">
          {moment(tweet.time).format("DD/MM/YYYY - HH:mm a")}
        </div>
      </CardContent>
    </Card>
  )
}
