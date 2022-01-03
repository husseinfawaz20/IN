import React, { useState } from "react";
import "./App.css";
import { Layout, Breadcrumb, Button } from "antd";
import { Player, Career, TestCareer } from "./Player";
import CareerDetails from "./CareerDetails";
import { Statistic, Row, Col } from "antd";
import { LikeOutlined } from "@ant-design/icons";

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 500; // Moment is also OK

function onFinish() {
  console.log("Time Finished");
}

const { Content } = Layout;

function Dashboard() {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [visible, setVisible] = useState(false);

  const onSelect = (name) => {
    setSelectedPlayer(name);
    setVisible(true);
  };
  const ViewProfileButton = ({ name }) => {
    return (
      <Button
        type="dashed"
        style={{ float: "right" }}
        onClick={() => onSelect(name)}
      >
        View Full Profile
      </Button>
    );
  };

  const onClose = () => setVisible(false);

  return (
    <>
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 580 }}>
            <Player name="Steph Curry" team="US" avatarSrc="../vk.jpg">
              <Career matches="939"></Career>
              <TestCareer
                points=" 7902"
                lvalue="83.2"
                hvalue="32.1"
              ></TestCareer>
              <ViewProfileButton name="Steph Curry" />
            </Player>

            <Player name="Louis Tomlinson" team="UK" avatarSrc="../jb.jpg">
              <Career matches="19"></Career>
              <TestCareer points="12" hvalue="14.1" lvalue="25.9"></TestCareer>
              <ViewProfileButton name="Louis Tomlinson" />
            </Player>

            <Row gutter={24}>
              <Col span={8}>
                <Statistic title="Active Users" value={6} />
              </Col>
              <Col span={12}>
                <Statistic title="Total Users" value={10} />

                <Statistic
                  title="User Feedback"
                  value={128}
                  prefix={<LikeOutlined />}
                />
              </Col>
              <Col span={4}>
                <Statistic title="Offline Users" value={4} />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Countdown
                  title="Countdown"
                  value={deadline}
                  onFinish={onFinish}
                />
              </Col>
            </Row>
          </div>
        </Content>

        <CareerDetails
          player={selectedPlayer}
          visible={visible}
          onClose={onClose}
        />
      </Layout>
    </>
  );
}

export default Dashboard;
