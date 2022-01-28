import './App.css';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function App() {

const [lights, setLights] = useState([]);

const socket = io('http://localhost:8000');


useEffect(() => {
  socket.on('lights', (data) => {
    setLights(data.lights);
  });
}, []);


const lightSwitch = (id) => {
    socket.emit('switchId', {id: id});
    setLights(lights.map(light => {
      if (light.id === id) {
        light.status = !light.status;
      }
      return light;
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Lights
        </h1>
        <div className="status-container">
        {lights ? lights?.map((light, index) => {
            return (
                <div key={index} style={light.status ? {backgroundColor: 'green'} : {backgroundColor: 'red'}} className="light">
                    <div className="light-status">
                        <div className="light-status-switch" onClick={() => {
                          lightSwitch(light.id);
                        }}>
                          {light.id}
                        </div>
                    </div>
                </div>
            )
        }) : null}
        </div>
        </header>
    </div>
  );
}

export default App;
