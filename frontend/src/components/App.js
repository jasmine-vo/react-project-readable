import React, { Component } from 'react';
import * as API from '../utils/api';

class App extends Component {
  state = {
      categories: []
    }

  componentDidMount() {
    API.getCategories().then((data) => {
      this.setState({ categories:data})
    })
  }
  
  render() {
    return (
      <div>
        <ul>
          {this.state.categories.map((category) => (
            <li key={category}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
