import React, { Component } from 'react';
import * as K from 'kefir'
import connect from './lib/connect'

class App extends Component {

  clickCounter = (value) => () =>
    poolClick$.plug(K.constant(value))

  render() {
    return (
      <div>
        <h1 >{this.props.counter}</h1>
        <button onClick={this.clickCounter(1)}>+</button>
        <button onClick={this.clickCounter(-1)}>-</button>
      </div>
    );
  }
}

const poolClick$ = K.pool()
const state$ = poolClick$.scan((prev, curr) => prev + curr)
poolClick$.plug(K.constant(0))

export default connect({ counter: state$ }, App);
// export default App