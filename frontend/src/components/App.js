import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListPosts from './ListPosts.js';
import PostDetail from './PostDetail.js';
import ChatIcon from '../icons/chat-color.svg';

class App extends Component {

  render() {
    return (
      <div>

        <div className='title-bar'>

          <div className='logo'>
            <img className='chat-icon' src={ChatIcon} alt='chat-icon' />
            <h1 className='title'>readable</h1>
          </div>

        </div>

        <div className='container'>

          <Route exact path='/' render={() => (
              <ListPosts />
          )}/>

          <Route exact path={`/:category`} render={(props) => (
              <ListPosts
                category={props.match.params.category}
              />
          )}/>

          <Route exact path={`/:category/:id`} render={(props) => (
              <PostDetail
                id={props.match.params.id}
              />
          )}/>

          <div className='page-footer'>
            Icons made by <a 
              href='https://www.flaticon.com/authors/kirill-kazachek'
              title='Kirill Kazachek'>Kirill Kazachek
            </a> from <a
              href='https://www.flaticon.com/'
              title='Flaticon'>www.flaticon.com
            </a> is licensed by <a
              href='http://creativecommons.org/licenses/by/3.0/'
              title='Creative Commons BY 3.0'>CC 3.0 BY
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;