import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
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
    this.setState({
      showModal: true,
      currentAppointment: {time: apptDetails.time, name: apptDetails.name, phoneNumber: apptDetails.phoneNumber}
    });
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
        <ListGroup>
          { this.state.appointments.map((appt) => {
            return (<ListGroup.Item action variant={
              // switch list item variant to "danger" if either the name or phone number is filled out, set to default otherwise
              appt.name === "" && appt.phoneNumber === "" ? "" : "danger"
            } onClick={() => {this._handleShowModal(appt)}}><span>{ appt.time }</span></ListGroup.Item>);
          })}
        </ListGroup>
        <AppointmentModal
          time={this.state.currentAppointment.time}
          name={this.state.currentAppointment.name}
          phoneNumber={this.state.currentAppointment.phoneNumber}
          show={this.state.showModal}
          onHide={this._handleCloseModal}>
        </AppointmentModal>
      </div>
  )
  }
}

export default AppointmentList;
