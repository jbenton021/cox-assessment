import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

class AppointmentActions {

  setAppointment(apptDetails) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SET_APPOINTMENT,
      payload: apptDetails
    });
  }
}

export default new AppointmentActions();
