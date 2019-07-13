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
    let field = event.target.name;
    let value = event.target.value;
    let currentAppointment = this.state.appointment

    currentAppointment[field] = value;
    this.setState({ appointment: {time: this.props.time, name: currentAppointment.name, phoneNumber: currentAppointment.phoneNumber }}, () => {console.log(this.state.appointment)});
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
          <Form onSubmit={e => this._setAppointment(e)}>
            <Form.Control name="name" placeholder={this.props.name} value={this.state.appointment.name} onChange={e => this._updateState(e)}/>
            <Form.Control name="phoneNumber" placeholder={this.props.phoneNumber} value={this.state.appointment.phoneNumber} onChange={e => this._updateState(e)}/>
            <Button type="submit">
              Submit
            </Button>

          </Form>
          {this.props.time}, {this.props.name}, {this.props.phoneNumber}
        </Modal.Body>
      </Modal>
    )
  }
}

export default AppointmentModal;
