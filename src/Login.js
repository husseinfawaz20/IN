import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Layout, Avatar } from "antd";
import Title from "antd/lib/typography/Title";
const { Header, Footer, Sider, Content } = Layout;

const Login = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const url = "https://jsonplaceholder.typicode.com/users";

  //Nodejs server
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  const onFinish = async (v) => {
    var response = await fetch(url);
    var body = await response.json();
    console.log(body);
    for (let k in body) {
      if (v.email === body[k].email && v.password === body[k].username) {
        console.log(v);
        navigate("app/db/");
      }
    }
  };

  return (
    <Layout>
      <Header
        style={{
          padding: 70,
          backgroundColor: "#002140",
        }}
      >
        <Avatar style={{ float: "right" }} src="./logo192.png" />

        <Title
          style={{
            color: "white",
            float: "left",
            marginLeft: "100px",
            fontFamily: "cursive",
          }}
          level={1}
          italic
        >
          CRUD APP
        </Title>
      </Header>
      <Layout>
        <Sider
          style={{
            padding: 170,
            backgroundColor: "#002140",
          }}
        ></Sider>
        <Layout>
          <Content>
            <div style={{ padding: 24, minHeight: 568 }}>
              <div>
                <div className="bd" align="center">
                  <h1 style={{ marginBottom: "100px", fontFamily: "verdan" }}>
                    {" "}
                    Login{" "}
                  </h1>
                  {/* <p  style={{ float: "right" }}>{!data ? "Loading..." : data}</p> */}
                  <div>
                    <Form
                      form={form}
                      name="register"
                      onFinish={onFinish}
                      scrollToFirstError
                    >
                      <Form.Item
                        name="email"
                        label="E-mail"
                        hasFeedback
                        style={{ width: "400px" }}
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "this email is not valid",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        label="Password"
                        hasFeedback
                        style={{ width: "400px" }}
                        rules={[
                          {
                            required: true,
                            message: "this password is not valid",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>

                      {/* <Form.Item
          name="confirm"
          dependencies={["password"]}
          label="Confirm Password"
          hasFeedback //gives success
          style={{ width: "400px" }}
          rules={[
            { required: true, message: "please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item> */}

                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember Me</Checkbox>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Login
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </Content>

          <Footer
            style={{
              padding: 50,
              textAlign: "center",
              backgroundColor: "#002140",
            }}
          >
            <Title style={{ color: "white" }} level={5}>
              <p>Ant Design Layout CRUD app Created by Hussein</p>
              using Json Placeholder API
            </Title>
          </Footer>
        </Layout>
        <Sider
          style={{
            padding: 170,
            backgroundColor: "#002140",
          }}
        ></Sider>
      </Layout>
    </Layout>
  );
};

export default Login;
