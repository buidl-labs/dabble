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

//Internal Components
import { sampleContent } from "../utils/utils";
import EnterStakingAmount from "../components/EnterStakingAmount";
import ConfirmStakeModel from "../components/ConfirmStakeModel";

//Contract
import { storyContract, web3, calculateDeadline } from "../utils/utils";

const { Paragraph, Title, Text } = Typography;
const { Countdown } = Statistic;
const { Header, Content, Footer, Sider } = Layout;
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

class SpecificChapterView extends Component {
  state = {
    book: {
      id: "",
      title: ""
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

  componentDidMount() {
    //fetch Book Chapters
    const that = this;
    const chapterId = this.props.match.params.id;

    this.getAccountDetails();

    storyContract.methods
      .ChapterMapping(chapterId)
      .call()
      .then(chapter => {
        console.log(chapter);

        const bookDetails = {
          id: chapter.bookId
        };

        const chapterDetails = {
          id: chapterId,
          indexOfChapter: chapterId + 1,
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

  goBack = () => {
    this.props.history.goBack();
  };

  updateReadStatus = () => {
    this.setState(prevState => ({
      ...prevState,
      reader: {
        ...prevState.reader,
        isRead: true
      }
    }));
  };

  updateStakeStatus = clickedOn => {
    console.log(clickedOn);
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

    // storyContract.methods
    //   .voteForFollowup(chapterId, vote)
    //   .send({
    //     from: userAccount,
    //     value: web3.utils.toWei(amountStakedOnVote, "ether")
    //   })
    //   .then(function(receipt) {
    //     console.log(receipt);

    //   });

    this.setState(prevState => ({
      ...prevState,
      reader: {
        ...prevState.reader,
        incentivizingProcessFinished: status
      }
    }));
  };

  render() {
    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        <Row>
          <Col span={24}>
            <PageHeader
              onBack={() => this.goBack()}
              title={this.state.book.title}
              subTitle={`Chapter: ${this.state.chapter.indexOfChapter}`}
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
        )}
      </Layout>
    );
  }
}

export default SpecificChapterView;
