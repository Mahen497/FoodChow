import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import CardBody from "react-bootstrap/esm/CardBody";
import CardHeader from "react-bootstrap/esm/CardHeader";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/esm/Container";

function MenuList({ menuData }) {

  // Separate categories and deals
  const categories = menuData.filter(item => item.CategryId);
  const deals = menuData.filter(item => item.DealId);


  return (
    <div className="parentDiv" >

      {/* Render deals if available */}

      {
        <Card style={{ marginBottom: '15px' }} id="deal">
          <CardHeader>
            <h5 style={{ fontSize: '20px', fontWeight: '700' }} className="my-2">
              Deal
              <p className="fw-normal fs-14">{deals.length} Items</p>
            </h5>
          </CardHeader>
          <CardBody className="p-0">
            {
              deals.map((data) => (
                <div 
                  className="container-fluid"
                  id={`deal-${data.DealId}`} 
                  key={data.DealId} 
                >
                  <Row className="border-bottom py-3">
                      <Col md={7}>
                        <h5 style={{fontSize:'20px', fontWeight:'700'}} className="my-2">
                            {data.DealName}
                        </h5>
                        <h6 style={{color:'#999'}}>{data.DealDesc}</h6>
                        <p className="mb-0 fs-16 fw-600" style={{color:"var(--dynamic-color)"}}>₹{data.DealPrice || "N/A"} </p> 
                      </Col>
                      <Col md={5} style={{textAlign:'right'}}> <a href="#" className="add-menu-btn">Add</a></Col>    
                  </Row>
                </div>
              ))
            }
          </CardBody>
        </Card>
      }


      {/* Render categories */}

      {
        categories.map((data) => {

          if (data.CategryId) {
            const itemCount = data.ItemListWidget?.length || 0;

            return (
              <Card
                id={`category-${data.CategryId}`}
                key={data.CategryId}
                style={{ marginBottom: '15px' }}
              >
                <CardHeader>
                  <h5 style={{ fontSize: '20px', fontWeight: '700' }} className="my-2">
                    {data.CategryName}
                    <p className="fw-500 fs-14">{itemCount} Items</p>
                  </h5>
                </CardHeader>
                <CardBody className="p-0">
                  <Container fluid>
                    {
                      data.ItemListWidget
                      && data.ItemListWidget.map((item) => (
                        <Row key={item.ItemId} className="border-bottom py-3">
                          <Col md={7}>
                            <h5 style={{ fontSize: '18px' }} className="fw-600">{item.ItemName}</h5>
                            <p className="mb-0 fs-16 fw-600" style={{ color: "var(--dynamic-color)" }}>₹{item.Price || "N/A"} </p>
                          </Col>
                          <Col md={5} style={{ textAlign: 'right' }}> <a href="#" className="add-menu-btn">Add</a></Col>
                        </Row>
                      ))
                    }
                  </Container>
                </CardBody>
              </Card>
            );
          }
        })
      }

      
    </div>
  );
}

export default MenuList;
