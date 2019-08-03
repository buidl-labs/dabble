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
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

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

class Book extends Component {
  state = {
    bookTitle: "",
    chapterId: "",
    content: "",
    read: false,
    predictionMarket: false,
    question: "",
    stakedOn: true,
    stakingAmount: "",
    isReaderIncentivizationProcessFinished: false,
    resolutionDetails: {}
  };

  componentDidMount() {
    //fetch Book Chapters

    const chapterId = this.props.match.params.id;

    const predictionMarket = false;

    //From chapter ID fetch book details
    const chapterDetails = {
      bookTitle: "Harry Potter",
      chapterId,
      content: sampleContent,
      predictionMarket,
      question: "Should I kill Harry Potter"
    };

    let resolutionDetails;
    if (predictionMarket === false) {
      //Fetch Resolution Panel Details
      //Fetch your vote
      //fetch community vote
      //fetch your winnings
      //fetch community winnings
      resolutionDetails = {
        yourVote: true,
        communityVote: false,
        yourWinnings: -5,
        communityWinnings: 33
      };
    }

    // console.log(sampleContent);
    //from chapter Id fetch chapter details

    this.setState({
      ...chapterDetails,
      resolutionDetails
    });
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

  updateStakingAmount = amount => {
    console.log(amount);
    this.setState({ stakingAmount: amount });
  };

  updateReaderIncentivizationProcessStatus = status => {
    this.setState({ isReaderIncentivizationProcessFinished: status });
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
            updateStakeStatus={this.updateStakeStatus} // Voted on Yes or No
            stakedAmount={this.state.stakingAmount}
            updateStakingAmount={this.updateStakingAmount}
            isReaderIncentivizationProcessFinished={
              this.state.isReaderIncentivizationProcessFinished
            } //Has the user voted or not
            updateReaderIncentivizationProcessStatus={
              this.updateReaderIncentivizationProcessStatus
            }
          />
        ) : (
          <MarketResolvedPanel
            question={this.state.question}
            resolutionDetails={this.state.resolutionDetails}
          />
        )}
      </Layout>
    );
  }
}

export default Book;
