import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 20px;
  background-color: white;
  width: 100%;
  max-width: 320px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.8);
  h4 {
    font-size: 14px;
  }
  img {
    right: -10px;
    top: 20px;
    position: absolute;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid black;
  text-align: center;
  background-color: white;
  color: black;
`;

const FormBtn = styled.input`
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const CancelBtn = styled.span`
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 5px;
  background-color: tomato;
`;

const TweetActions = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  span {
    cursor: pointer;
  }
  span:first-child {
    margin-right: 10px;
  }
`;

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
    <Container>
      {editing ? (
        <>
          {isOwner && (
            <>
              <Form onSubmit={onSubmit}>
                <FormInput
                  type="text"
                  placeholder="Edit your tweet"
                  value={newTweet}
                  required
                  onChange={onChange}
                  autoFocus
                />
                <FormBtn type="submit" value="제출" />
              </Form>
              <CancelBtn onClick={toggleEditing}>취소</CancelBtn>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
          {isOwner && (
            <TweetActions>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={onClickDelete}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </TweetActions>
          )}
        </>
      )}
    </Container>
  );
}

export default Tweet;
