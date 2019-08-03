import React, { Component } from "react";

//Styling
import { Layout } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";
import { Statistic } from "antd";
import { Typography, Divider } from "antd";
import { Button } from "antd";

//Internal Components

import EnterStakingAmount from "../components/EnterStakingAmount";
import ConfirmStakeModel from "../components/ConfirmStakeModel";

//Contract
import { storyContract, web3, calculateDeadline } from "../utils/utils";

const { Paragraph, Title, Text } = Typography;
const { Countdown } = Statistic;
const ButtonGroup = Button.Group;

const MarketResolvedPanel = ({ question, resolutionDetails }) => (
  <Row gutter={16}>
    <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
      <Typography>
        <Title level={4}>{question} in the next chapter?</Title>
      </Typography>
    </Col>
    <Col span={12} style={{ marginTop: 24, textAlign: "center" }}>
      <Statistic
        title="Your Vote"
        value={resolutionDetails.yourVote ? "Yes" : "No"}
      />
    </Col>
    <Col span={12} style={{ marginTop: 24, textAlign: "center" }}>
      <Statistic
        title="Community Vote"
        value={resolutionDetails.communityVote ? "Yes" : "No"}
      />
    </Col>
    <Col span={12} style={{ marginTop: 24, textAlign: "center" }}>
      <Statistic
        title="Youe Winnings"
        value={`$${resolutionDetails.yourWinnings}`}
      />
    </Col>
    <Col span={12} style={{ marginTop: 24, textAlign: "center" }}>
      <Statistic
        title="Community Winnings"
        value={`$${resolutionDetails.communityWinnings}`}
      />
    </Col>
  </Row>
);

const StakingInterface = ({
  stakedOn,
  updateStakeStatus,
  updateStakingAmount,
  stakedAmount,
  updateReaderIncentivizationProcessStatus
}) => (
  <>
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
    <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
      <EnterStakingAmount
        updateStakingAmount={updateStakingAmount}
        stakedAmount={stakedAmount}
      />
    </Col>
    <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
      <ConfirmStakeModel
        stakedOn={stakedOn}
        stakedAmount={stakedAmount}
        updateReaderIncentivizationProcessStatus={
          updateReaderIncentivizationProcessStatus
        }
      />
    </Col>
  </>
);

const StakingFinishedInterace = () => <h1>Thank you for voting!</h1>;

const StakingPanel = ({
  question,
  stakedOn,
  updateStakeStatus,
  updateStakingAmount,
  stakedAmount,
  isReaderIncentivizationProcessFinished,
  updateReaderIncentivizationProcessStatus
}) => {
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
      {isReaderIncentivizationProcessFinished ? (
        <StakingFinishedInterace />
      ) : (
        <StakingInterface
          stakedOn={stakedOn}
          updateStakeStatus={updateStakeStatus}
          updateStakingAmount={updateStakingAmount}
          stakedAmount={stakedAmount}
          updateReaderIncentivizationProcessStatus={
            updateReaderIncentivizationProcessStatus
          }
        />
      )}
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
  deadline,
  readingStatus,
  updateReadStatus,
  question,
  stakedOn,
  updateStakeStatus,
  stakedAmount,
  updateStakingAmount,
  isReaderIncentivizationProcessFinished,
  updateReaderIncentivizationProcessStatus
}) => {
  const showReaderApproriatePanel = readingStatus ? (
    <StakingPanel
      question={question}
      stakedOn={stakedOn}
      updateStakeStatus={updateStakeStatus}
      stakedAmount={stakedAmount}
      updateStakingAmount={updateStakingAmount}
      isReaderIncentivizationProcessFinished={
        isReaderIncentivizationProcessFinished
      }
      updateReaderIncentivizationProcessStatus={
        updateReaderIncentivizationProcessStatus
      }
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

const AuthorStatusPanel = ({ deadline, question }) => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Typography style={{ textAlign: "center" }}>
          <Text strong>Voting under way!</Text>
        </Typography>
      </Col>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        <Typography>
          <Title level={4}>{question} in the next chapter?</Title>
        </Typography>
      </Col>
      <Col span={24} style={{ marginTop: 24, textAlign: "center" }}>
        <Countdown title="Time Remaining" value={deadline} />
      </Col>
    </Row>
  );
};

class SpecificChapterView extends Component {
  state = {
    book: {
      id: "",
      title: "",
      author: ""
    },
    chapter: {
      id: "",
      title: "",
      content: "",
      isResolved: false,
      question: "",
      creationTime: "",
      deadline: ""
    },
    reader: {
      account: "",
      isRead: false,
      stakedOn: true,
      stakedAmount: 0,
      incentivizingProcessFinished: false
    },
    statusCheck: {
      readCheck: false,
      votedCheck: false
    },
    resolutionDetails: {}
  };

  async getAccountDetails() {
    const address = await web3.eth.getAccounts();
    this.setState(prevState => ({
      ...prevState,
      reader: {
        ...prevState.reader,
        account: address[0]
      }
    }));
  }

  async componentDidMount() {
    //fetch Book Chapters
    const that = this;

    const chapterId = this.props.match.params.chapterId;

    await this.getAccountDetails();

    storyContract.methods
      .ChapterMapping(chapterId)
      .call()
      .then(chapter => {
        const bookDetails = {
          id: chapter.bookId
        };

        const chapterDetails = {
          id: chapterId,
          indexOfChapter: parseInt(chapterId) + 1,
          title: chapter.name,
          content: chapter.content,
          isResolved: chapter.isResolved,
          staked: web3.utils.fromWei(chapter.bounty, "ether"),
          question: chapter.question,
          creationTime: chapter.creationTime,
          deadline: calculateDeadline(chapter.creationTime)
        };

        that.setState(prevState => ({
          ...prevState,
          book: { ...bookDetails },
          chapter: { ...chapterDetails }
        }));
      });

    storyContract.methods
      .hasRead(chapterId)
      .call({ from: this.state.reader.account })
      .then(result => {
        that.setState(prevState => ({
          ...prevState,
          reader: {
            ...prevState.reader,
            isRead: result
          },
          statusCheck: {
            ...prevState.statusCheck,
            readCheck: true
          }
        }));
      });

    storyContract.methods
      .hasVoted(chapterId)
      .call({ from: this.state.reader.account })
      .then(result => {
        that.setState(prevState => ({
          ...prevState,
          reader: {
            ...prevState.reader,
            incentivizingProcessFinished: result
          },
          statusCheck: {
            ...prevState.statusCheck,
            votedCheck: true
          }
        }));
      });

    //From chapter ID fetch book details

    // let resolutionDetails;
    // if (predictionMarket === false) {
    //   //Fetch Resolution Panel Details
    //   //Fetch your vote
    //   //fetch community vote
    //   //fetch your winnings
    //   //fetch community winnings
    //   resolutionDetails = {
    //     yourVote: true,
    //     communityVote: false,
    //     yourWinnings: -5,
    //     communityWinnings: 33
    //   };
    // }

    // console.log(sampleContent);
    //from chapter Id fetch chapter details

    // this.setState({
    //   ...chapterDetails,
    //   resolutionDetails
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.book.id !== this.state.book.id) {
      const that = this;
      storyContract.methods
        .bookIdMapping(this.state.book.id)
        .call()
        .then(result => {
          // console.log(result);
          that.setState(prevState => ({
            ...prevState,
            book: {
              ...prevState.book,
              title: result.name,
              author: result.authorId
            }
          }));
        });
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  updateReadStatus = () => {
    const that = this;
    const chapterId = this.state.chapter.id;
    const userAccount = this.state.reader.account;

    storyContract.methods
      .readChapter(chapterId)
      .send({
        from: userAccount
      })
      .then(function(receipt) {
        // console.log(receipt);
        that.setState(prevState => ({
          ...prevState,
          reader: {
            ...prevState.reader,
            isRead: true
          }
        }));
      });
  };

  updateStakeStatus = clickedOn => {
    // console.log(clickedOn);
    this.setState(prevState => ({
      ...prevState,
      reader: {
        ...prevState.reader,
        stakedOn: clickedOn
      }
    }));
    // this.setState({ stakedOn: clickedOn });
  };

  updateStakingAmount = amount => {
    console.log(amount);
    this.setState(prevState => ({
      ...prevState,
      reader: {
        ...prevState.reader,
        stakedAmount: amount
      }
    }));
  };

  updateReaderIncentivizationProcessStatus = status => {
    //Do Payment

    const that = this;

    console.log(this.state);

    const chapterId = this.state.chapter.id;
    const vote = this.state.reader.stakedOn;
    const amountStakedOnVote = this.state.reader.stakedAmount;
    const userAccount = this.state.reader.account;

    console.log(amountStakedOnVote);
    storyContract.methods
      .voteForFollowup(chapterId, vote)
      .send({
        from: userAccount,
        value: web3.utils.toWei(amountStakedOnVote, "ether")
      })
      .then(function(receipt) {
        console.log(receipt);

        that.setState(prevState => ({
          ...prevState,
          reader: {
            ...prevState.reader,
            incentivizingProcessFinished: status
          }
        }));
      });
  };

  renderIncentivedReadingPanel = () => {
    if (this.state.book.author === this.state.reader.account) {
      return (
        <AuthorStatusPanel
          deadline={this.state.chapter.deadline}
          question={this.state.chapter.question}
        />
      );
    } else {
      if (
        this.state.statusCheck.readCheck === true &&
        this.state.statusCheck.votedCheck === true
      ) {
        return (
          <IncentivizeReadersPanel
            deadline={this.state.chapter.deadline}
            readingStatus={this.state.reader.isRead}
            updateReadStatus={this.updateReadStatus}
            question={this.state.chapter.question}
            stakedOn={this.state.reader.stakedOn}
            updateStakeStatus={this.updateStakeStatus} // Voted on Yes or No
            stakedAmount={this.state.reader.stakedAmount}
            updateStakingAmount={this.updateStakingAmount}
            isReaderIncentivizationProcessFinished={
              this.state.reader.incentivizingProcessFinished
            } //Has the user voted or not
            updateReaderIncentivizationProcessStatus={
              this.updateReaderIncentivizationProcessStatus
            }
          />
        );
      }
    }
  };

  render() {
    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        <Row>
          <Col span={24}>
            <PageHeader
              onBack={() => this.goBack()}
              title={this.state.book.title}
              subTitle={`Chapter ${this.state.chapter.indexOfChapter}:${
                this.state.chapter.title
              } `}
            />
          </Col>
        </Row>

        <Divider />
        <Row>
          <Col span={24} style={{ marginBottom: 20 }}>
            <Typography>
              <Paragraph>{this.state.chapter.content}</Paragraph>
            </Typography>
          </Col>
          <Divider />
        </Row>

        {/* Prediction Market True == Incentivizing Panel, False === Resolution Panel */}

        {this.state.chapter.isResolved ? (
          <MarketResolvedPanel
            question={this.state.question}
            resolutionDetails={this.state.resolutionDetails}
          />
        ) : (
          this.renderIncentivedReadingPanel()
        )}
      </Layout>
    );
  }
}

export default SpecificChapterView;
