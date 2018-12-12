import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Modal from 'react-modal';
import DisplayEvents from './all-events-component';
import axios from 'axios';

class DateSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      time: '12:00',
      title: '',
      modalIsOpen: false
    };
    this.addNewEvent = this.addNewEvent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onDateChange = date => this.setState({ date })
  onTimeChange = time => this.setState({ time })

  openModal(){
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal(e){
    this.setState({
      modalIsOpen: false,
      title: '',
      date: new Date(),
      time: '12:00'
    });
  }

  onChange(e) {
    if (e.target.name === "title") {
      this.setState({
        title: e.target.value
      });
    }
  }

  onClick(e){
    this.addNewEvent(e);
    this.closeModal(e);
  }

  addNewEvent(e) {
    axios.post('api/addEvent',
      JSON.stringify({
        title: this.state.title,
        date: this.state.date,
        time: this.state.time
      }), {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response) {
        console.log(response.data)
    });
  }


  render() {
    return (
      <div>
        <input type="button" onClick={this.openModal} value="Add Event" />
        <Modal isOpen={this.state.modalIsOpen} onRequesatClose={this.closeModal} className="modal">
          <input type="button" onClick={this.closeModal} value="x" className="close-btn" />
          <div className="modal-container">
            <div>
              <label>
                Event Title:
              </label>
              <input className="input-field" type="text" name="title" value={this.state.title} onChange={this.onChange} />
            </div>
            <div>
              <label>
                Select date of event:
              </label>
              <DatePicker
                className="input-field"
                name="date"
                dateFormat="MM/DD/YYYY"
                minDate={new Date()}
                onChange={this.onDateChange}
                value={this.state.date}  />
            </div>
            <div>
              <label>
                Select time event starts:
              </label>
              <TimePicker
                className="input-field"
                name="time"
                onChange={this.onTimeChange}
                value={this.state.time}
              />
            </div>
          </div>
          <input className="add-button" type="button" value="Submit" onClick={this.onClick} />
        </Modal>
        <div>
          <DisplayEvents />
        </div>
      </div>
    );
  }
}

export default DateSelect;
