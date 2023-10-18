import styled from  "styled-components"
import Add from "./components/Add";
import Table from "./components/Table";

function App() {
  return (
   <Container>
    <h1>DAILY RUN RATE REPORT</h1>
    <Table/>
    <Add/>
   </Container>
  );
}

export default App;

const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
gap: 20px;
align-items: center;
justify-content: center;
overflow: hidden;
&>h1{
  @media screen and (max-width:768px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
`
