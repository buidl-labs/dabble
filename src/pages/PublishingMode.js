import React, { Component } from "react";
import { Link } from "react-router-dom";

//Styling
import { Layout } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";
import { List, Avatar, Icon } from "antd";
import { Statistic } from "antd";
import { Typography, Divider } from "antd";
import { Input, Button } from "antd";

import EnterStakingAmount from "../components/EnterStakingAmount";

const { Countdown } = Statistic;
const { TextArea } = Input;

class PublishingMode extends Component {
  state = {
    writingABook: false,
    bookTitle: "",
    chapterTitle: "",
    chapterId: 0,
    content: "",
    question: "",
    stakedAmount: ""
  };

  componentDidMount() {
    //check for new book or new chapter

    const bookId = this.props.match.params.id;

    const writingABook = this.props.location.pathname === "/book-publish";

    //send this Id to backend to fetch book details;
    const title = "Harry Potter";

    //got chapters for this particular id

    // const chapters = [
    //   {
    //     id: 1,
    //     predictionMarket: false,
    //     staked: 1000,
    //     timeLeft: 0
    //   },
    //   {
    //     id: 2,
    //     predictionMarket: true,
    //     staked: 1000,
    //     timeLeft: 300
    //   }
    // ];

    this.setState({ writingABook });
    // this.setState({ title, chapters });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  setTitle = e => {
    const { value } = e.target;
    this.setState({ bookTitle: value });
  };

  setChapterTitle = e => {
    const { value } = e.target;
    this.setState({ chapterTitle: value });
  };

  setContent = e => {
    const { value } = e.target;
    this.setState({ content: value });
  };

  setQuestion = e => {
    const { value } = e.target;
    this.setState({ question: value });
  };

  setStakingAmount = value => {
    this.setState({ stakedAmount: value });
  };

  submit = value => {
    console.log(this.state);
  };

  render() {
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

    // console.log(this.state);

    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        <PageHeader
          onBack={() => this.goBack()}
          title={
            this.state.writingABook
              ? "Create the book of your dreams"
              : "Write the next chapter"
          }
        />
        <Row gutter={16}>
          <Col span={12} style={{ marginTop: 24, textAlign: "center" }}>
            <Input
              placeholder="Input Book Title"
              onChange={this.setTitle}
              value={this.state.bookTitle}
            />
          </Col>
          <Col span={12} style={{ marginTop: 24, textAlign: "center" }}>
            <Input
              placeholder="Input Chapter Title"
              onChange={this.setChapterTitle}
              value={this.state.chapterTitle}
            />
          </Col>
        </Row>
        <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
          <TextArea
            placeholder="Input Chapter Content"
            rows={4}
            onChange={this.setContent}
            value={this.state.content}
          />
        </Col>
        <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
          <Input
            placeholder="Enter followup question! Example: Should I kill Harry in the next chapter?"
            onChange={this.setQuestion}
            value={this.state.question}
          />
        </Col>
        <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
          <EnterStakingAmount
            updateStakingAmount={this.setStakingAmount}
            stakedAmount={this.state.stakedAmount}
          />
        </Col>
        <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
          <Button type="primary" onClick={this.submit}>
            Submit
          </Button>
        </Col>

        {/* <Col span={6} style={{ marginTop: 24, textAlign: "center" }} /> */}
      </Layout>
    );
  }
}

export default PublishingMode;
