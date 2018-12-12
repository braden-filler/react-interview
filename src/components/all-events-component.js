import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import moment from 'moment';
import "react-table/react-table.css";

class DisplayEvents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    this.onClick = this.onClick.bind(this);

  }

  componentDidMount(){
    this.getData();
  }

  componentWillReceiveProps(nextProps){
    this.getData();
  }


  getData(){
    axios.get('/api/getEvents')
      .then(res => {
        this.setState({ events: res.data });
      });
  }

  onClick(){
    axios.get('/api/getEvents/older')
      .then(res => {
        this.setState({ events: res.data });
      })
  }

  render() {
    const columns = [
      {Header: 'Title', accessor: 'title'},
      {Header: 'Date', accessor: 'date', Cell: props => {return moment(props.value).format('MM/DD/YYYY')}},
      {Header: 'Time', accessor: 'time'},
    ]
    return (
      <div>
        <div>
          <input type="button" value="Show Older Events" onClick={this.onClick} />
          <ReactTable data={this.state.events} columns={columns}  />
        </div>
        {
        // <table>
        //   <thead>
        //     <tr>
        //       <th>Title</th>
        //       <th>Date</th>
        //       <th>Time</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {this.state.events.map(function(event){
        //       return <tr>
        //         <td>{event.title}</td>
        //         <td>{event.date}</td>
        //         <td>{event.time}</td>
        //       </tr>
        //     })}
        //
        //   </tbody>
        // </table>
      }
      </div>
    );
  }
}

export default DisplayEvents;
