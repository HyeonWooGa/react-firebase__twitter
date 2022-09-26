import React from "react";

function Tweet({ tweetObj, isOwner }) {
  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      )}
    </div>
  );
}

export default Tweet;
