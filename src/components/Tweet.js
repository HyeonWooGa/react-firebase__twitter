import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

function Tweet({ tweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onClickDelete = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      // delete tweet
      await deleteDoc(doc(dbService, `tweets/${tweetObj.id}`));
      await deleteObject(ref(storageService, tweetObj.attachmentUrl));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, `tweets/${tweetObj.id}`), {
      text: newTweet,
    });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your tweet"
                  value={newTweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="제출" />
              </form>
              <button onClick={toggleEditing}>취소</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <>
              <img src={tweetObj.attachmentUrl} width="50px" height="50px" />
            </>
          )}
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit</button>
              <button onClick={onClickDelete}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
