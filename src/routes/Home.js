import React, { useState } from "react";

function Home() {
  const [tweet, setTweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
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
