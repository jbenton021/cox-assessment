import React from 'react';
import AppointmentList from './AppointmentList';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppointmentList />
        </header>
      </div>
    );
  }
}

export default App;
