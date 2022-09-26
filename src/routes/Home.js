import { addDoc, getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

function Home() {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    const dbTweets = await getDocs(collection(dbService, "tweets"));

    dbTweets.forEach((doc) => {
      const tweetObject = {
        ...doc.data(),
        id: doc.id,
      };

      setTweets((prev) => [tweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getTweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        tweet,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  console.log(tweets);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => {
          return (
            <div key={tweet.id}>
              <h4>{tweet.tweet}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
