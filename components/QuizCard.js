import React from "react";
import { Card, Image } from "antd";
const { Meta } = Card;
export const QuizCard = ({ item }) => {
  return (
    <Card
      hoverable
      height={200}
      cover={
        <img
          alt={item.title}
          src={item.logo}
          style={{ width: 320, height: 320, margin: "0 auto" }}
        />
      }
    >
      <Meta
        title={<h2>{item.title}</h2>}
        description={<p>{item.description}</p>}
      />
    </Card>
  );
};
