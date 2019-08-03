import React, { Component } from "react";
import { Link } from "react-router-dom";
//Styling
import { Layout } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";
import { List, Avatar, Icon } from "antd";
import { Statistic } from "antd";

import { storyContract, web3 } from "../utils/utils";

const { Countdown } = Statistic;

class ChapterList extends Component {
  state = {
    title: "",
    listofChapters: []
  };

  componentDidMount() {
    //fetch Book Chapters

    const that = this;

    const bookId = this.props.match.params.id;

    storyContract.methods
      .bookIdMapping(bookId)
      .call()
      .then(result => that.setState({ title: result.name }));

    storyContract.methods
      .getAllChapterBooks(bookId)
      .call()
      .then(function(result) {
        console.log(result);

        const listofChapters = result.map((chapter, index) => {
          return {
            id: index,
            indexOfChapter: index + 1,
            chapterName: chapter.name,
            isResolved: chapter.isResolved,
            staked: web3.utils.fromWei(chapter.bounty, "ether"),
            creationDate: chapter.creationDate
          };
        });

        that.setState({ listofChapters });
      });

    // console.log(this.props);

    //send this Id to backend to fetch book details;
    // const title = "Harry Potter";

    // //got chapters for this particular id

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
    // this.setState({ title, chapters });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        <PageHeader
          onBack={() => this.goBack()}
          title={this.state.title}
          //   subTitle="This is a subtitle"
        />
        <List
          itemLayout="vertical"
          dataSource={this.state.listofChapters}
          renderItem={chapter => (
            <List.Item style={{ marginLeft: 50, marginRight: 50 }}>
              <List.Item.Meta
                title={
                  <Link to={`/chapter/${chapter.id}`}>
                    Chapter {chapter.indexOfChapter}
                  </Link>
                }
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="Prediction Market"
                    value={chapter.isResolved ? "Passed" : "Live"}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title="Staked" value={`♦ ${chapter.staked}`} />
                </Col>
                <Col span={8}>
                  {chapter.predictionMarket ? (
                    <Countdown title="Countdown" value={deadline} />
                  ) : (
                    <Statistic title="Countdown" value={0} />
                  )}
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Layout>
    );
  }
}

export default ChapterList;
