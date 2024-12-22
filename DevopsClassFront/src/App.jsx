import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { initializeApp } from "firebase/app";
function App() {

  const [name, setName] = useState('');
  const [savedNames, setSavedNames] = useState([]);

  useEffect(() => {
    fetchSavedNames();
  }, []);

  const fetchSavedNames = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/saved_names');
      console.log('Fetched names:', response.data.data);
      setSavedNames(response.data.data);
    } catch (error) {
      console.error('Error fetching saved names:', error);
    }
  };

  const handleAddName = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/add_name/', { name });
      console.log('Name added:', name);
      setName('');
      fetchSavedNames();
    } catch (error) {
      console.error('Error adding name:', error);
    }
  };

  const checkName = (nameToCheck) => {
    let substring = "The Today New Student Name is: ";
    if (nameToCheck.includes(substring)) {
      return nameToCheck.replace(substring, "");
    } else {
      return nameToCheck;
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h2>Add a new to-do item</h2>
        <form onSubmit={handleAddName}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
          <button type="submit">Add Item</button>
        </form>
      </div>
      <div className="table-container">
        <h2>Saved To-Do Items</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>To-Do Item</th>
            </tr>
          </thead>
          <tbody>
            {savedNames.length > 0 ? (
              savedNames.map((name) => (
                <tr key={name.id}>
                  <td>{name.id}</td>
                  <td>{checkName(name.saved_names)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No names saved</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer>
        <hr />
        @AquaOps
      </footer>
    </div>

  );
}

export default App;