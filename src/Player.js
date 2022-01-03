import React from "react";
import { Card, Avatar , Statistic} from "antd";
import Meta from "antd/lib/card/Meta";
import Title from "antd/lib/typography/Title";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';


export const Player = ({ name, team, avatarSrc, children }) => (

  <Card bordered style={{ width: 300, float: "left", margin: 10 , border: "lightgray solid"}}>
    <Meta avatar={<Avatar src={avatarSrc} />} title={name} />
    <hr></hr>
    Team : {team}
    <br></br>
    {children}
  </Card>
);
export const Career = ({ matches, value }) => (
  <Card.Grid bordered style={{ width: "100%" }}>
    <	Title level={4}>  Matches : {matches}</Title>
          
  </Card.Grid>
);
export const TestCareer = ({ points, hvalue , lvalue}) => (
  <Card.Grid style={{ width: "100%" }}>
    <Title level={4}> Points : {points}</Title>
    <Statistic
            title="Idle"
            value={hvalue}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
           <Statistic
            title="Active"
            value={lvalue}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
    
  </Card.Grid>
);
 
