import React, { Component } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';
import Image from 'react-bootstrap/lib/Image';
import 'font-awesome/css/font-awesome.css';
import '../App.css';

export default class App extends Component {
  state = {
    top100Days: [],
    top100AllTime: [],
    current: true
  }
  getFCCData(url, stateName) {
    axios.get(url)
      .then(({data}) => {
        this.setState({ [stateName]: data })
      });
  }

  pointChange(current) {
    if (this.state.current !== current) {
      this.setState({ current })
    }
  }

  componentDidMount() {
    this.getFCCData('https://fcctop100.herokuapp.com/api/fccusers/top/recent', 'top100Days');
    this.getFCCData('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', 'top100AllTime')
  }

  render() {
    const { top100Days, top100AllTime, current } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className="container">
          <h2 className='colorBlack'>
            <a href='https://www.freecodecamp.org'><i className='fa fa-free-code-camp fa-lg'></i></a> Free Code Camp Data Visualization - React Project
          </h2>
          <h3 className='colorBlack'>Build A Camper Leaderboard</h3>
          <Table striped bordered condensed hover className='colorBlack'>
            <thead>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th className='pointer' onClick={(e)=>this.pointChange(true)}>Points in 30 Days {current && (<i className='fa fa-caret-down'></i>)}</th>
                <th className='pointer' onClick={(e)=>this.pointChange(false)}>All Time Points {current===false && (<i className='fa fa-caret-down'></i>)}</th>
              </tr>
            </thead>
            <tbody>
              {current && (top100Days.map( (row,index) => (
                <tr key={row.username}>
                  <td>{index+1}</td>
                  <td>
                    <a href={`https://www.freecodecamp.org/${row.username}`} target='_blank'>
                      <Image src={row.img} className='imgHeight' circle/>
                      {row.username}
                    </a>
                  </td>
                  <td>{row.recent}</td>
                  <td>{row.alltime}</td>
                </tr>
                )
              ))}

              {current ===false && (top100AllTime.map( (row,index) => (
                <tr key={row.username}>
                  <td>{index+1}</td>
                  <td>
                    <a href={`https://www.freecodecamp.org/${row.username}`} target='_blank'>
                      <Image src={row.img} className='imgHeight' circle/>
                      {row.username}
                    </a>
                  </td>
                  <td>{row.recent}</td>
                  <td>{row.alltime}</td>
                </tr>
                )
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
