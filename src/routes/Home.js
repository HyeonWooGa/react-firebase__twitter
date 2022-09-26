import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../fbase";

function Home() {
  const [tweet, setTweet] = useState("");
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
    </>
  );
}

export default Home;
