import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import { dbService } from "../fbase";
import TweetFactory from "../components/TweetFactory";
import styled from "styled-components";
import Footer from "../components/Footer";

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

function Home({ userObj }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "tweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <>
      <Container>
        <TweetFactory userObj={userObj} />
        <div style={{ marginTop: 30 }}>
          {tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === userObj.uid}
            />
          ))}
        </div>
        <Footer />
      </Container>
    </>
  );
}

export default Home;
