import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Span = styled.span`
  margin-top: 10px;
`;

function Navigation({ userObj }) {
  return (
    <nav>
      <Ul>
        <Link
          to="/"
          style={{
            marginRight: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          <Span>Home</Span>
        </Link>
        <Link
          to="/profile"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <Span style={{ marginTop: 10 }}>
            {userObj.displayName
              ? `${userObj.displayName}의 Profile`
              : "Profile"}
          </Span>
        </Link>
      </Ul>
    </nav>
  );
}

export default Navigation;
