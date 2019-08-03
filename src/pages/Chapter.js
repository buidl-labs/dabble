import React, { Component } from "react";

//Styling
import { Layout } from "antd";
import { Row, Col } from "antd";
import BookCard from "../components/BookCard";
import { PageHeader } from "antd";
import { List, Avatar, Icon } from "antd";
import { Statistic } from "antd";
import { Typography, Divider } from "antd";
import { Card } from "antd";
import { Button } from "antd";

import { sampleContent } from "../utils/utils";

const { Paragraph, Title, Text } = Typography;
const { Countdown } = Statistic;
const { Header, Content, Footer, Sider } = Layout;

class Book extends Component {
  state = {
    bookTitle: "",
    chapterId: "",
    content: ""
  };

  componentDidMount() {
    //fetch Book Chapters

    const chapterId = this.props.match.params.id;

    //From chapter ID fetch book details
    const bookTitle = "Harry Potter";

    // console.log(sampleContent);
    //from chapter Id fetch chapter details

    const chapterDetail = sampleContent;

    this.setState({ bookTitle, chapterId, content: chapterDetail });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        <Row>
          <Col span={24}>
            <PageHeader
              onBack={() => this.goBack()}
              title={this.state.bookTitle}
              subTitle={`Chapter: ${this.state.chapterId}`}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24} style={{ marginBottom: 20 }}>
            <Typography>
              <Paragraph>{this.state.content}</Paragraph>
            </Typography>
          </Col>
          <Divider />
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Typography style={{ textAlign: "center" }}>
              <Text strong>
                Finished reading?
                <br />
                Author is giving rewards if you confirm on chain!
              </Text>
            </Typography>
          </Col>
          <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
            <Button type="primary">Lol, What?</Button>
          </Col>
        </Row>
        <Row />/
        {/* <Typography>
          <Paragraph>{this.state.content}</Paragraph>
        </Typography> */}
        {/* <List
          itemLayout="vertical"
          dataSource={this.state.chapters}
          renderItem={item => (
            <List.Item style={{ marginLeft: 50, marginRight: 50 }}>
              <List.Item.Meta
                title={<a href="/">Chapter {item.id}</a>}
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="Prediction Market"
                    value={item.predictionMarket ? "Live" : "Passed"}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title="Staked" value={`$${item.staked}`} />
                </Col>
                <Col span={8}>
                  {item.predictionMarket ? (
                    <Countdown title="Countdown" value={deadline} />
                  ) : (
                    <Statistic title="Countdown" value={0} />
                  )}
                </Col>
              </Row>
            </List.Item>
          )}
        /> */}
      </Layout>
    );
  }
}

export default Book;
