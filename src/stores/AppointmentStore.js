import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

const CHANGE = 'CHANGE';
// Initialize appointment state
let _appointmentsState = [
  {time: "8 AM", name: "", phoneNumber: ""},
  {time: "9 AM", name: "", phoneNumber: ""},
  {time: "10 AM", name: "", phoneNumber: ""},
  {time: "11 AM", name: "", phoneNumber: ""},
  {time: "12 PM", name: "", phoneNumber: ""},
  {time: "1 PM", name: "", phoneNumber: ""},
  {time: "2 PM", name: "", phoneNumber: ""},
  {time: "3 PM", name: "", phoneNumber: ""},
  {time: "4 PM", name: "", phoneNumber: ""},
  {time: "5 PM", name: "", phoneNumber: ""},
];

class AppointmentStore extends EventEmitter {
  constructor() {
    super();

    Dispatcher.register(this._registerToActions.bind(this));
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case ActionTypes.SET_APPOINTMENT:
        this._setAppointment(action.payload);
        break

      default:
        break
    }
  }

  _setAppointment(apptDetails) {
    // find appointment matching time of appointment in payload
    let appointment = _appointmentsState.find((appt) => {
      return appt.time === apptDetails.time;
    });
    appointment.name = apptDetails.name;
    appointment.phoneNumber = apptDetails.phoneNumber;
    this.emit(CHANGE);
  }

  getAppointments() {
    return _appointmentsState;
  }

  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }


}

export default new AppointmentStore();
