  import React, {useState} from "react";
  import { useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { Modal, Menu, message, Form, Input } from "antd";
  import axios from "axios";
  function DefaultLayout(props) {
    const { employee } = useSelector((state) => state.employee);
    const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [menu, setMenu] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const handleMenuToggle = () => {
      setMenu(!menu);
      console.log('menu clicked');
    }
    const handleMenuClick = (e) => {
      if (e.key === 'changePassword') {
        setChangePasswordModalVisible(true);
      } else if (e.key === 'logout') {
        setLogoutModalVisible(true);
      }
    };
    const handlePasswordChange = async() => {
      try{
        const response = await axios.post('https://rms-backend-1rd9.onrender.com/api/employee/changepass', {  newPassword: newPassword,
        }); 
        if (response.data.success) {
          message.success(response.data.message);
          setChangePasswordModalVisible(false);
        }
        else{
          message.error(response.data.message);
        }
      }
      catch(error){
        message.error(error.message);
      }
    };
    const handleLogoutConfirm = () => {
      // Logic to handle logout
      message.success('Logged out successfully');
      setLogoutModalVisible(false);
      localStorage.removeItem("token");
      navigate("/login");
    };
    const navigate = useNavigate();
    return (
      <div className="layout w-100vh overflow-hidden">
        <div className="header d-flex justify-content-between align-items-center">
        <div className="image-box-overlay">
          <h1 className="text-white">
            <b className="secondary-text">R M S</b>
          </h1>
          <div className="d-flex align-items-center gap-4">
          <h2 className="text-gray-900 bg-transparent border border-gray-800 hover:bg-white-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center text-white me-2 mb-2 cursor-pointer"
              onClick={() => {
                handleMenuToggle();
              }}
            >
              ADMIN
            </h2>
              {menu && (
                <Menu mode="inline" className="menu position-absolute top-50 mt-4 overflow-hidden scrollbar-hidden" color="indigo" onClick={handleMenuClick}>
                  <Menu.Item key="changePassword" >Change Password</Menu.Item>
                  <Menu.Item key="logout">Logout</Menu.Item>
                </Menu>
              )}
          </div>
        </div>
        </div>
        <div className="content">{props.children}</div>
        <Modal
          title="Change Password"
          visible={changePasswordModalVisible}
          onOk={handlePasswordChange}
          onCancel={() => setChangePasswordModalVisible(false)}
        >
          <Form>
          <Form.Item
                  name="password"
                  label="New Password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password",
                    },
                  ]}
                >
                  <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Confirm Logout"
          visible={logoutModalVisible}
          onOk={handleLogoutConfirm}
          onCancel={() => setLogoutModalVisible(false)}>
          <p>Are you sure you want to logout?</p>
        </Modal>
      </div>
    );
  }
  export default DefaultLayout;