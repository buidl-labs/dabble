import React, { Component } from "react";
import "../assets/css/App.css";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BookList from "./BookList";
import Book from "./Book";
import Chapter from "./Chapter";

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    // const path = this.props;
    // console.log(path);
    return (
      <Router>
        <Layout>
          <Header className="header">
            <Link to="/">
              <h1 style={{ color: "white" }}> Dabble </h1>
            </Link>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            />
          </Header>
          <Content style={{ padding: "50px 50px" }}>
            <Route path="/" exact component={BookList} />
            <Route path="/book/:id" component={Book} />
            <Route path="/chapter/:id" component={Chapter} />
          </Content>
          <Footer style={{ textAlign: "center" }}>Built with ♥</Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
