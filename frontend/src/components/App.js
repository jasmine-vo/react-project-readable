import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListPosts from './ListPosts.js';
import PostDetail from './PostDetail.js';

class App extends Component {
   	
  render() {
    return (
      <div>
        <h1>Readable</h1>
        <Route exact path="/" render={() => (
          <div>
            <ListPosts />
          </div>
        )}/>
        <Route exact path={`/:category`} render={(props) => (
          <div>
            <ListPosts
              category={props.match.params.category}
            />
          </div>
        )}/>
        <Route exact path={`/:category/:id`} render={(props) => (
          <div>
            <PostDetail
              id={props.match.params.id}
            />
          </div>
        )}/>
      </div>
    );
  }
}

export default App;