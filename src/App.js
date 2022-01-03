import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

import "./App.css";
import { Layout, Avatar, Menu } from "antd";
import Title from "antd/lib/typography/Title";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <>
      <>
        <Layout>
          <Header style={{ padding: 10 }}>
            <Avatar style={{ float: "right" }} src="../jb.jpg" />

            <Title
              style={{ color: "white", float: "left", marginRight: "20px" }}
              level={3}
            >
              <Link
                style={{ color: "white", float: "left", marginLeft: "25px" }}
                level={1}
                to="db"
              >
                Home
              </Link>
              <Link
                style={{ color: "white", float: "left", marginLeft: "30px" }}
                level={3}
                to="db"
              >
                Dashboard
              </Link>

              <Link
                style={{ color: "white", float: "left", marginLeft: "30px" }}
                level={3}
                to="users"
              >
                Users
              </Link>
              <Link
                style={{ color: "white", float: "left", marginLeft: "30px" }}
                level={3}
                to="comments"
              >
                Comments
              </Link>
              <Link
                style={{
                  color: "white",
                  float: "left",
                  marginLeft: "1100px",
                }}
                level={1}
                to="/"
              >
                Logout
              </Link>
            </Title>
          </Header>
          <Layout>
            <Sider>
              <Menu defaultSelectedKeys={["Dashboard"]} mode="inline">
                <Menu.Item key="Dashboard">
                  <Link to="db">Dashboard</Link>
                </Menu.Item>

                <SubMenu
                  title={
                    <span>
                      <span>About US</span>
                    </span>
                  }
                >
                  <Menu.ItemGroup key="AboutUS" title="Country 1">
                    <Menu.Item key="location1"> US</Menu.Item>
                    <Menu.Item key="location2"> Uk </Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ padding: "0 50px" }}>
                <div
                  style={{ background: "#fff", padding: 24, minHeight: 768 }}
                >
                  <div>
                    {/* <Routes>
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/" element={<Dashboard />} />
                        <Route exact path="/users" element={<Users />} />
                        <Route exact path="/comments" element={<Comments />} />
                      </Routes> */}
                    <Outlet />
                  </div>
                </div>
              </Content>

              <Footer style={{ textAlign: "center" }}>
                Ant Design Layout example Created by Hussein
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </>
    </>
  );
}

export default App;
