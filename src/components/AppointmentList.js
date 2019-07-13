import React from 'react';
import AppointmentStore from '../stores/AppointmentStore';
import AppointmentModal from './AppointmentModal';

class AppointmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: AppointmentStore.getAppointments(),
      showModal: false,
      currentAppointment: {time: "", name: "", phoneNumber: ""},
    };
    this._onChange = this._onChange.bind(this);
    this._handleShowModal = this._handleShowModal.bind(this);
    this._handleCloseModal = this._handleCloseModal.bind(this);
  }

  _handleShowModal(apptDetails) {
    console.log("modal hanlder ran");
    this.setState({
      showModal: true,
      currentAppointment: {time: apptDetails.time, name: apptDetails.name, phoneNumber: apptDetails.phoneNumber}
    }, () => {console.log(this.state);});
  }

  _handleCloseModal() {
    this.setState( {showModal: false,} );
  }

  _onChange() {
    this.setState({ appointments: AppointmentStore.getAppointments() });
  }

  componentWillMount() {
    AppointmentStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppointmentStore.removeChangeListener(this._onChange);
  }



  render() {

    return (
      <div>
        <ul>
          { this.state.appointments.map((appt) => {
            return (<li onClick={() => {this._handleShowModal(appt)}}><span>{ appt.time }</span></li>);
          })}
        </ul>
        <button onClick={this._handleShowModal}>click me</button>
        <AppointmentModal time={this.state.currentAppointment.time} name={this.state.currentAppointment.name} phoneNumber={this.state.currentAppointment.phoneNumber} show={this.state.showModal} onHide={this._handleCloseModal}>
        </AppointmentModal>
      </div>
  )
  }
}

export default AppointmentList;
