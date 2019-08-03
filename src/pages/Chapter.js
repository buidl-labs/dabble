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
const ButtonGroup = Button.Group;

const StakingPanel = ({ question, stakedOn, updateStakeStatus }) => {
  return (
    <>
      <Col span={24}>
        <Typography style={{ textAlign: "center" }}>
          <Text strong>Enjoyed Reading? Decide what’s next</Text>
        </Typography>
      </Col>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        <Typography>
          <Title level={4}>{question} in the next chapter?</Title>
        </Typography>
      </Col>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        <ButtonGroup>
          <Button
            type={stakedOn ? "primary" : ""}
            onClick={() => updateStakeStatus(true)}
          >
            Yes
          </Button>
          <Button
            type={stakedOn ? "" : "primary"}
            onClick={() => updateStakeStatus(false)}
          >
            No
          </Button>
        </ButtonGroup>
      </Col>
    </>
  );
};

const UpdateReadingPanel = ({ updateReadStatus }) => {
  return (
    <>
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
        <Button type="primary" onClick={() => updateReadStatus()}>
          Lol, What?
        </Button>
      </Col>
    </>
  );
};

const IncentivizeReadersPanel = ({
  readingStatus,
  updateReadStatus,
  question,
  stakedOn,
  updateStakeStatus
}) => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

  const showReaderApproriatePanel = readingStatus ? (
    <StakingPanel
      question={question}
      stakedOn={stakedOn}
      updateStakeStatus={updateStakeStatus}
    />
  ) : (
    <UpdateReadingPanel updateReadStatus={updateReadStatus} />
  );

  return (
    <Row gutter={16}>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        {showReaderApproriatePanel}
      </Col>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        <Countdown title="Time Remaining" value={deadline} />
      </Col>
    </Row>
  );
};

class Book extends Component {
  state = {
    bookTitle: "",
    chapterId: "",
    content: "",
    read: false,
    predictionMarket: false,
    question: "",
    stakedOn: true
  };

  componentDidMount() {
    //fetch Book Chapters

    const chapterId = this.props.match.params.id;

    //From chapter ID fetch book details
    const chapterDetails = {
      bookTitle: "Harry Potter",
      chapterId,
      content: sampleContent,
      predictionMarket: true,
      question: "Should I kill Harry Potter"
    };

    // console.log(sampleContent);
    //from chapter Id fetch chapter details

    this.setState({ ...chapterDetails });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  updateReadStatus = () => {
    this.setState({ read: true });
  };

  updateStakeStatus = clickedOn => {
    this.setState({ stakedOn: clickedOn });
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

        {/* Prediction Market True == Incentivizing Panel, False === Resolution Panel */}

        {this.state.predictionMarket ? (
          <IncentivizeReadersPanel
            readingStatus={this.state.read}
            updateReadStatus={this.updateReadStatus}
            question={this.state.question}
            stakedOn={this.state.stakedOn}
            updateStakeStatus={this.updateStakeStatus}
          />
        ) : (
          <h1> Resolution Panel </h1>
        )}

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
