import MenuList from './MenuList';
import CategrySidebar from './CategrySidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./App.css";

import React, { useEffect, useState } from "react";


function App() {

   const [menuData, setMenuData] = useState(null);

   useEffect(() => {
      fetch("https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null")
         .then((res) => res.json())
         .then((data) => {
            console.log("Full API response:", data);
            console.log("typeof data.data:", typeof data.data);

            let menuArray = data.data;

            // Step 1: Parse string if needed
            if (typeof menuArray === "string") {
               try {
                  menuArray = JSON.parse(menuArray);
               } catch (err) {
                  console.error("❌ JSON parse error:", err);
                  return;
               }
            }

            // Step 2: Convert object-of-arrays to single array
            if (!Array.isArray(menuArray)) {
               menuArray = Object.values(menuArray).flat();
            }

            // console.log("✅ Final menuArray:", menuArray);

            setMenuData(menuArray);
         })
         .catch((error) => console.error("Error fetching data:", error));
   }, []);

   console.log(menuData)

   if (!menuData) {
      return <p>Loading menu...</p>;
   }


   return (
      <>
         <Container>
            <Row>
               <Col md={3}><CategrySidebar menuData={menuData}/></Col>
               <Col md={6}><MenuList menuData={menuData} /></Col>
               <Col md={3}>
                  {/* Optional right sidebar */}
               </Col>
            </Row>
         </Container>
      </>
   )
}

export default App
