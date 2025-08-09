import MenuList from './MenuList';
import CategrySidebar from './CategrySidebar'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function App() {
   return (
      <>
      <Container>
         <Row>
            <Col md={3}><CategrySidebar /></Col>
            <Col md={6}><MenuList/></Col>  
            <Col md={3}><CategrySidebar /></Col>
         </Row>
      </Container>
      </>
   )
}

export default App
