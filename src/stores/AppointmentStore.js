import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

const CHANGE = 'CHANGE';
let _appointmentsState = [{time: "8 AM", name: "asdf", phoneNumber: "574-9083"}, {time: "8 AM", name: "", phoneNumber: ""}, {time: "8 AM", name: "", phoneNumber: ""},];

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
    }
  }

  _setAppointment(apptDetails) {
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
