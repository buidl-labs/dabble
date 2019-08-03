import React from "react";
import { Card } from "antd";

const BookCard = ({ title }) => (
  <Card
    style={{ marginTop: 16 }}
    title={title}
    bordered={true}
    hoverable={true}
  >
    Card content
  </Card>
);

export default BookCard;
