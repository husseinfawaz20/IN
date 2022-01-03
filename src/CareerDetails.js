import React from "react";
import { Drawer, Skeleton } from "antd";
import useFetch from "./service";

const CareerDetails = ({ player, visible, onClose }) => {
  const [loading, data] = useFetch("../" + player.replace(" ", "_") + ".json");
  const { name, team, age, born, img } = data;

  return (
    <Drawer
      destroyOnClose
      title={player}
      visible={visible}
      width={640}
      onClose={onClose}
    >
      <Skeleton active loading={loading} paragraph={{ rows: 4 }}>
        <div style={{ padding: 10 }}>
          <p>Team : {team}</p>
          <p>age : {age}</p>
          <p>born : {born}</p>
          <p>
            Photo : <img alt={name} width="100%" src={img} />
          </p>
        </div>
      </Skeleton>
    </Drawer>
  );
};

export default CareerDetails;
