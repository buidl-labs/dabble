import React, { Component } from "react";
import { Layout } from "antd";
import { Row } from "antd";
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";
import Web3 from "web3";
import storyContractABI from "../utils/story";


let storyContractAddress =  '0x7307fa44848f9282954fd1bd04f3eef26afe52c9';

var web3 = new Web3(new Web3.providers.HttpProvider('https://testnet2.matic.network'));
var storyContract = new web3.eth.Contract(storyContractABI.abi, storyContractAddress);


class BookList extends Component {
  state = {
    listOfBooks: []
  };

  async componentDidMount() {
    let self = this;
    // var listOfBooks = [
    //   {
    //     id: 1,
    //     title: "Harry Potter"
    //   },
    //   { id: 2, title: "Sapiens" },
    //   { id: 3, title: "How to win friends!" }
    // ];

     storyContract.methods.getAllBooks().call().then(function(result) {
      // console.log(result);
      self.listOfBooks = [{
        id: 1,
        title: "Harry Potter"
      }]
      for(let i=0, len=result.length; i< len; i++)
        self.listOfBooks.push({
          id: i+1,
          title: result[i]
        })
        console.log(self.listOfBooks);
      self.setState(self.listOfBooks);
    })
    
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
