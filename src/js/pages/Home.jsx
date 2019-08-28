import React, { Component } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer'
import PerformantList from './performatList/PerformantList'
// import Img from '../../img/react.png';

export default class App extends Component {

  constructor() {
    super()

    this.state = {
      _data: []
    }
  }


  
  componentDidMount() {
    document.title = "Hi there"

    const x = []
    for(let i = 0; i < 150; i++) x.push(i)

    this.setState({ _data: x })

  }
  

  render() {
    const { _data: _dataArr } = this.state

    return (
      <div className="center">
        {/* <img src={Img} alt=""/>
        <h1>React Js Boilerplate</h1>
        <p>Here is a simple boilerpate for React Js. it is simple to start.</p> */}

        <div className="app">

          <PerformantList 
            supplier={_dataArr}
            itemHeight={125}
            itemsDistance={10}
            overIndexThreshold={3}
          />
        </div>

      </div>
    )
  }
}
