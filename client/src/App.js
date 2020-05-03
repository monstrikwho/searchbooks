import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./sass/app.sass";

import Navs from "./components/navs";
import HomePage from "./components/pages/home/home";
import SearchPage from "./components/pages/search/search";
import ReadPage from "./components/pages/read/read";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      booksArr: [],
      booksStatus: null,
      pageCount: null,
      pageCountMax: null,
      bookText: null,
      bookUrl: null,
      bookMaxCountPages: null,
      navBarTitle: "#НАЙДИКНИГУ",
      pageName: "home",
    };
  }

  // Принимаем в стейт елементы DOM из функции handleSearch.js, отправив в search.js этот метод
  getData = (booksArr, booksStatus) => {
    this.setState({
      booksArr,
      booksStatus,
    });
  };

  // **********************************
  getResTextBook = (bookText) => {
    this.setState({
      bookText,
    });
  };

  getBookUrl = (bookUrl) => {
    this.setState({
      bookUrl,
    });
  };

  getBookMaxCountPages = (bookMaxCountPages) => {
    this.setState({
      bookMaxCountPages,
    });
  };
  // **********************************

  getRequestPages = (pageCount, pageCountMax) => {
    this.setState({
      pageCount,
      pageCountMax,
    });
  };

  renameNavbar = (navBarTitle, pageName) => {
    this.setState({
      navBarTitle,
      pageName,
    });
  };

  render() {
    return (
      <Router>
        <Navs
          getData={this.getData}
          getRequestPages={this.getRequestPages}
          getResTextBook={this.getResTextBook}
          pageName={this.state.pageName}
          navBarTitle={this.state.navBarTitle}
          renameNavbar={this.renameNavbar}
        />

        <div className="content">
          <Switch>
            <Route
              path={process.env.PUBLIC_URL + "/"}
              exact
              render={() => (
                <HomePage
                  getBookUrl={this.getBookUrl}
                  getBookMaxCountPages={this.getBookMaxCountPages}
                  renameNavbar={this.renameNavbar}
                  getResTextBook={this.getResTextBook}
                />
              )}
            />
            <Route
              path={process.env.PUBLIC_URL + "/search"}
              render={() => (
                <SearchPage
                  booksArr={this.state.booksArr}
                  booksStatus={this.state.booksStatus}
                  pageCount={this.state.pageCount}
                  pageCountMax={this.state.pageCountMax}
                  getResTextBook={this.getResTextBook}
                  getBookUrl={this.getBookUrl}
                  getBookMaxCountPages={this.getBookMaxCountPages}
                  renameNavbar={this.renameNavbar}
                />
              )}
            />
            <Route
              path={process.env.PUBLIC_URL + "/read"}
              render={() => (
                <ReadPage
                  bookText={this.state.bookText}
                  bookUrl={this.state.bookUrl}
                  bookMaxCountPages={this.state.bookMaxCountPages}
                  getResTextBook={this.getResTextBook}
                />
              )}
            />
            <Redirect to={process.env.PUBLIC_URL + "/"} />
          </Switch>
        </div>
      </Router>
    );
  }
}
