import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

function Footer() {
  return (
    <Container>
      <footer>&copy; {new Date().getFullYear()} Twitter Clone - 박연우</footer>
    </Container>
  );
}

export default Footer;
