import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";

function Home({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");

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

  const onSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      fileUrl = await getDownloadURL(fileRef);
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl: fileUrl,
    };
    try {
      const docRef = await addDoc(collection(dbService, "tweets"), tweetObj);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setTweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment("");
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Cancle Upload</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
