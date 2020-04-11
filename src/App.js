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
        pageCountMax: null,
        pageName: '#НАЙДИКНИГУ'
    }
  }

  // Принимаем в стейт елементы DOM из функции handleSearch.js, отправив в search.js этот метод
  getData = (booksArr, booksStatus, pageName) => {
    this.setState({
        booksArr,
        booksStatus,
        pageName
    });
  }

  getRequestPages = (pageCount, pageCountMax) => {
    this.setState({
      pageCount,
      pageCountMax
    })
  }

  renameNavbar = pageName => {
    this.setState({
      pageName
    })
  }


  render() {
    return (
      <Router>
        <Navs 
          getData={this.getData} 
          getRequestPages={this.getRequestPages} 
          pageName={this.state.pageName} 
          renameNavbar={this.renameNavbar}
        />

        <div className="content">
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/search' render={() => (
                <SearchPage 
                  booksArr={this.state.booksArr} 
                  booksStatus={this.state.booksStatus} 
                  pageCount={this.state.pageCount} 
                  pageCountMax={this.state.pageCountMax} 
                />
            )} />
          </Switch>
        </div>

        {/* <Route path='/page' render={(props) => (
          <Page {...props} data={extraProps}/>
        )}/> */}
      </Router>
    )
  }
}


