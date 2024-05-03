import { Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import SideNavBar from "./SideNavBar";

function EmployeeHome() {
  const navigate = useNavigate();
  return (
    <div className="admin d-flex flex-row">
    <SideNavBar className='d-flex flex-grow-1'></SideNavBar>
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Row gutter={[20, 20]}>
          <div
            className="p-5  card w-300 cursor-pointer align-items-center justify-content-center gap-3"
          >
            <h1>Dashboard Content</h1>
          </div>
        
      </Row>
    </div>
    </div>
  );
}

export default EmployeeHome;
