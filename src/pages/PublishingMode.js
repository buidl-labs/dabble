import React from "react";

//Styling
import { Layout } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";

import { Input, Button } from "antd";
import { Form, InputNumber } from "antd";
import { storyContract, web3, calculateDeadline } from "../utils/utils";

const { TextArea } = Input;

class PublisherMode extends React.Component {
  state = {
    author: ""
  };

  componentDidMount() {
    this.getAccountDetails();
  }

  async getAccountDetails() {
    const address = await web3.eth.getAccounts();
    this.setState({ author: address[0] });
  }

  handleSubmit = e => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // storyContract.methods
        // .createBook(chapterId, vote)
        // .send({
        //   from: userAccount,
        //   value: web3.utils.toWei(amountStakedOnVote, "ether")
        // })
        // .then(function(receipt) {
        //   console.log(receipt);
        //   that.setState(prevState => ({
        //     ...prevState,
        //     reader: {
        //       ...prevState.reader,
        //       incentivizingProcessFinished: status
        //     }
        //   }));
        // });
      }
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        <Row>
          <Col span={24}>
            <PageHeader
              onBack={() => this.goBack()}
              title="Write your next dream book!"
            />
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>
          <Form.Item label="Enter book's title: ">
            {getFieldDecorator("bookTitle", {
              rules: [
                {
                  type: "string",
                  message: ""
                },
                {
                  required: true,
                  message: "Please input your book title!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Enter chapter's title: ">
            {getFieldDecorator("chapter", {
              rules: [
                {
                  type: "string",
                  message: ""
                },
                {
                  required: true,
                  message: "Please input chapter's name!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Enter chapter's content: ">
            {getFieldDecorator("content", {
              rules: [
                {
                  type: "string",
                  message: ""
                },
                {
                  required: true,
                  message: "Please input chapter's content!"
                }
              ]
            })(<TextArea rows={4} />)}
          </Form.Item>
          <Form.Item label="Enter your followup question: ">
            {getFieldDecorator("question", {
              rules: [
                {
                  type: "string",
                  message: ""
                },
                {
                  required: true,
                  message: "Please input your followup question!"
                }
              ]
            })(
              <Input
                style={{ width: "50%", marginRight: 20 }}
                placeholder="Example: Should I kill Harry"
              />
            )}
            <span className="ant-form-text"> in the next chapter?</span>
          </Form.Item>

          <Form.Item label="Your skin in the game to incentivize feedback">
            {getFieldDecorator("input-number", {
              initialValue: 3,
              rules: [
                {
                  required: true,
                  message: "Please input staking amount. Life is no free ride!"
                }
              ]
            })(<InputNumber min={1} />)}
            <span className="ant-form-text"> ETH</span>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    );
  }
}

const WrappedPublisherMode = Form.create({ name: "register" })(PublisherMode);

export default WrappedPublisherMode;