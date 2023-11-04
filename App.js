
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [repositoryName, setRepositoryName] = useState('');
  const [repositoryPath, setRepositoryPath] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskSpecification, setTaskSpecification] = useState('');
  const [message, setMessage] = useState('');

  const loadRepository = async () => {
    try {
      const response = await axios.post('/api/loadRepository', { name: repositoryName, path: repositoryPath });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    try {
      const response = await axios.post('/api/createTask', { name: taskName, taskSpecification });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTask = async () => {
    try {
      const response = await axios.post('/api/handleTask', { name: taskName });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>OpenAgent Architecture</h1>
      <div>
        <input type="text" placeholder="Repository Name" onChange={e => setRepositoryName(e.target.value)} />
        <input type="text" placeholder="Repository Path" onChange={e => setRepositoryPath(e.target.value)} />
        <button onClick={loadRepository}>Load Repository</button>
      </div>
      <div>
        <input type="text" placeholder="Task Name" onChange={e => setTaskName(e.target.value)} />
        <input type="text" placeholder="Task Specification" onChange={e => setTaskSpecification(e.target.value)} />
        <button onClick={createTask}>Create Task</button>
      </div>
      <div>
        <button onClick={handleTask}>Handle Task</button>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
