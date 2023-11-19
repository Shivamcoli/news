import React, { Component } from 'react'
import loading from './loading.gif'
export class Spinner extends Component {
  render() {
    return (
      <>
      <div className='text-centre'></div>
      <img src={loading} alt="loading"/>
      </>
    )
  }
}

export default Spinner