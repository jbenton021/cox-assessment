import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AppointmentActions from '../actions/appointmentActions';

class AppointmentModal extends React.Component {
  constructor(props) {
    super(props);

    console.log("modal constructor ran");

    this.state = {
      appointment: {time: "", name: "", phoneNumber: ""},
      showModal: this.props.show,
    }
  }

  _updateState(event) {
    // update state appropriately whenever the onChange event in either text field fires
    let field = event.target.name;
    let value = event.target.value;
    let currentAppointment = this.state.appointment

    currentAppointment[field] = value;
    this.setState({ appointment: {time: this.props.time, name: currentAppointment.name, phoneNumber: currentAppointment.phoneNumber }});
  }

  _setAppointment(event) {
    event.preventDefault();
    AppointmentActions.setAppointment(this.state.appointment);
    this.setState( { appointment: {time: "", name: "", phoneNumber: "" }, } );
    this.props.onHide();
  }

  render() {

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Body>
          <Modal.Header>
            <strong>{this.props.time} Appointment</strong>
          </Modal.Header>
          <Form onSubmit={e => this._setAppointment(e)}>
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" placeholder={this.props.name} onChange={e => this._updateState(e)}/>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control name="phoneNumber" placeholder={this.props.phoneNumber} onChange={e => this._updateState(e)}/>
            <Button type="submit" id="submitButton">
              Submit
            </Button>
            <Button variant="secondary" id="closeButton" onClick={this.props.onHide}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default AppointmentModal;
