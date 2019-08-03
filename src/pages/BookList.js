import React, { Component } from "react";
import { Layout } from "antd";
import { Row } from "antd";
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";
import { PageHeader } from "antd";

class BookList extends Component {
  state = {
    listOfBooks: []
  };

  componentDidMount() {
    const listOfBooks = [
      {
        id: 1,
        title: "Harry Potter"
      },
      { id: 2, title: "Sapiens" },
      { id: 3, title: "How to win friends!" }
    ];

    this.setState({ listOfBooks });
  }

  render() {
    console.log(this.state.listOfBooks);
    return (
      <Layout style={{ padding: "24px 20px", background: "#fff" }}>
        <PageHeader
          title="Book List 📚"
          // subTitle="This is a subtitle"
        />
        <Row gutter={8}>
          {this.state.listOfBooks.length === 0 ? (
            <h1>No Books found</h1>
          ) : (
            this.state.listOfBooks.map(book => (
              <Link key={book.id} to={`/book/${book.id}`}>
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
