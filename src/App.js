import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './sass/app.sass';

import Navs from './components/navs';
import HomePage from './components/pages/home/home';
import SearchPage from './components/pages/search/search';


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        booksArr: [],
        booksStatus: null,
        pageCount: null,
        pageCountMax: null
    }
  }

  // Принимаем в стейт елементы DOM из функции getData.js, отправив в inputData.js этот метод
  getData = (booksArr, booksStatus) => {
    this.setState({
        booksArr,
        booksStatus,
    });
    // console.log(this.state.elemArr);
  }

  getRequestPages = (pageCount, pageCountMax) => {
    this.setState({
      pageCount,
      pageCountMax
    })
  }


  render() {
    return (
      <Router>
        <Navs getData={this.getData} getRequestPages={this.getRequestPages} />

        {/* {(this.state.pageCountMax) ? `${this.state.pageCount} - ${this.state.pageCountMax}` : 'Идет поиск...'} */}
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/search' render={() => (
              <SearchPage booksArr={this.state.booksArr} booksStatus={this.state.booksStatus} pageCount={this.state.pageCount} pageCountMax={this.state.pageCountMax} />
          )} />
        </Switch>


        {/* <Route path='/page' render={(props) => (
          <Page {...props} data={extraProps}/>
        )}/> */}
      </Router>
    )
  }
}


