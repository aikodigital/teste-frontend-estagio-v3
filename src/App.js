import styled from "styled-components";
import Map from "./components/Map";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
function App() {
  return (
    <Container>
      <Map />
    </Container>
  );
}

export default App;
