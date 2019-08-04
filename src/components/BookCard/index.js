import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const BookCard = ({ title }) => (
  <Card
    hoverable
    style={{ marginTop: 20 }}
    cover={
      <img
        alt="example"
        src="https://images-na.ssl-images-amazon.com/images/I/91ocU8970hL.jpg"
      />
    }
  >
    <Meta title={title} />
  </Card>
);

export default BookCard;
