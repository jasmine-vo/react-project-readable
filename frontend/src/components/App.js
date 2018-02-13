import React, { Component } from 'react';
import * as API from '../utils/api';

class App extends Component {
  state = {
    categories: []
  }

// load categories from API after component is mounted
  componentDidMount() {
    API.getCategories().then((data) => {
      this.setState({ categories:data})
    })
  }

  render() {
    return (
      <div>
        <h1>Readable</h1>
        {this.state.categories.map((category) => (
        <button key={category}>
          {category}
        </button>
        ))}
      </div>
    );
  }
}

export default App;
