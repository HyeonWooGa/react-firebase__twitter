import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const FactoryForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FactoryInputs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`;

const FactoryInput = styled.input`
  flex-grow: 1;
  height: 40px;
  padding: 0px 20px;
  color: white;
  border: 1px solid #04aaff;
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
`;

const FactoryArrow = styled.input`
  position: absolute;
  right: 0;
  background-color: #04aaff;
  height: 40px;
  width: 40px;
  padding: 10px 0px;
  text-align: center;
  border-radius: 20px;
  color: white;
`;

const FactoryLabel = styled.label`
  color: #04aaff;
  cursor: pointer;
  span {
    margin-left: 10px;
    font-size: 12px;
  }
`;

const FactoryAttachment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    height: 80px;
    width: 80px;
    border-radius: 40px;
  }
`;

const FactoryClear = styled.div`
  color: #04aaff;
  cursor: pointer;
  text-align: center;
  span {
    margin-left: 10px;
    font-size: 12px;
  }
`;

function TweetFactory({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");
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
      <FactoryForm onSubmit={onSubmit}>
        <FactoryInputs>
          <FactoryInput
            value={tweet}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            onChange={onChange}
          />
          <FactoryArrow type="submit" value="&rarr;" />
        </FactoryInputs>
        <FactoryLabel htmlFor="attach-file">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </FactoryLabel>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ opacity: 0 }}
        />
        {attachment && (
          <FactoryAttachment>
            <img src={attachment} style={{ backgroundImage: attachment }} />
            <FactoryClear onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </FactoryClear>
          </FactoryAttachment>
        )}
      </FactoryForm>
    </>
  );
}

export default TweetFactory;
