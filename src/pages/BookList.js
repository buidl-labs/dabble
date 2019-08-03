import React, { Component } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";

//Styling
import { Layout } from "antd";
import { Row } from "antd";

//Custom Customponents
import BookCard from "../components/BookCard";

//Contracts
import storyContractABI from "../utils/story";

const storyContractAddress = "0x7307fa44848f9282954fd1bd04f3eef26afe52c9";

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://testnet2.matic.network")
);
const storyContract = new web3.eth.Contract(
  storyContractABI.abi,
  storyContractAddress
);

class BookList extends Component {
  state = {
    listOfBooks: []
  };

  componentDidMount() {
    const that = this;

    storyContract.methods
      .getAllBooks()
      .call()
      .then(function(result) {
        // console.log(result);
        const listOfBooks = result.map((item, index) => {
          return {
            id: index,
            title: item
          };
        });

        that.setState({ listOfBooks });
      });

    // this.setState({ listOfBooks });
  }

  render() {
    console.log(this.state.listOfBooks);
    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        <Row gutter={16}>
          {console.log(this)}
          {this.state.listOfBooks.length === 0 ? (
            <h1>No Books found</h1>
          ) : (
            this.state.listOfBooks.map(book => (
              <Link key={book.id} to={`/book/:${book.id}`}>
                <BookCard title={book.title} />
              </Link>
            ))
          )}
        </Row>
      </Layout>
    );
  }
}

export default BookList;
