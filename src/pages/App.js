import React, { Component } from "react";
import "../assets/css/App.css";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BookList from "./BookList";
import Book from "./Book";
import Chapter from "./Chapter";
import PublishingMode from "./PublishingMode";

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    // const path = this.props;
    // console.log(path);
    return (
      <Router>
        <Layout>
          <Header className="header">
            <Link to={"/"}>
              <div className="logo">Dabble</div>
            </Link>
            <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
              <Menu.Item key="1">
                <Link to={"/book-publish"}>Publish a book!</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "50px 50px" }}>
            <Route path="/" exact component={BookList} />
            <Route path="/book/:id" component={Book} />
            <Route path="/chapter/:id" component={Chapter} />
            <Route path="/book-publish" component={PublishingMode} />
            <Route path="/chapter-publish" component={PublishingMode} />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Built on Matic & Ethereum with ❤
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
