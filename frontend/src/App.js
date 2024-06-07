// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';
// import backgroundImage from './background.jpg';

// function App() {
//   const [pet, setPet] = useState({ name: '', age: '', ageUnit: 'Years', breed: '' });
//   const [dogWalker, setDogWalker] = useState({ name: '', experience: '', available: false });
//   const [pets, setPets] = useState([]);
//   const [dogWalkers, setDogWalkers] = useState([]);
//   const [message, setMessage] = useState('');
//   const [submittedPets, setSubmittedPets] = useState([]);
//   const [submittedDogWalkers, setSubmittedDogWalkers] = useState([]);

//   useEffect(() => {
//     fetchData('pets', setPets);
//     fetchData('dogwalkers', setDogWalkers);
//   }, []);

//   const fetchData = async (endpoint, setter) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/${endpoint}`);
//       setter(response.data);
//     } catch (error) {
//       console.error(`Error fetching ${endpoint}:`, error);
//     }
//   };

//   const registerItem = async (item, setSubmittedItems, submittedItems, endpoint, setMessage, setter) => {
//     if (endpoint === 'pets') {
//       if (!item.name || !item.age || !item.breed || !item.ageUnit) {
//         setMessage(`Please fill in all the fields for pet registration.`);
//         return;
//       }
//     } else if (endpoint === 'dogwalkers') {
//       if (!item.name || !item.experience || item.available === undefined) {
//         setMessage(`Please fill in all the fields for dog walker registration.`);
//         return;
//       }
//     }

//     if (submittedItems.some(submittedItem => JSON.stringify(submittedItem) === JSON.stringify(item))) {
//       setMessage(`This ${endpoint} information has already been submitted.`);
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:5000/${endpoint}`, item);
//       setMessage(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} registered successfully!`);
//       setSubmittedItems([...submittedItems, item]);

//       if (endpoint === 'pets') {
//         setPet({ name: '', age: '', ageUnit: 'Years', breed: '' });
//       } else if (endpoint === 'dogwalkers') {
//         setDogWalker({ name: '', experience: '', available: false });
//       }

//       fetchData(endpoint, setter);
//     } catch (error) {
//       console.error(`Error registering ${endpoint}:`, error);
//       setMessage(`Error registering ${endpoint}.`);
//     }
//   };

//   const deleteItem = async (id, endpoint) => {
//     try {
//       await axios.delete(`http://localhost:5000/${endpoint}/${id}`);
//       setMessage(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} deleted successfully!`);
//       fetchData(endpoint, endpoint === 'pets' ? setPets : setDogWalkers);
//     } catch (error) {
//       console.error(`Error deleting ${endpoint}:`, error);
//       setMessage(`Error deleting ${endpoint}.`);
//     }
//   };

//   const registerPet = () => registerItem(pet, setSubmittedPets, submittedPets, 'pets', setMessage, setPets);
//   const registerDogWalker = () => registerItem(dogWalker, setSubmittedDogWalkers, submittedDogWalkers, 'dogwalkers', setMessage, setDogWalkers);
//   const closeNotification = () => setMessage('');
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import backgroundImage from './background.jpg';

const BASE_URL = 'http://localhost:5000';

function App() {
  const [pet, setPet] = useState({ name: '', age: '', ageUnit: 'Years', breed: '' });
  const [dogWalker, setDogWalker] = useState({ name: '', experience: '', available: false });
  const [pets, setPets] = useState([]);
  const [dogWalkers, setDogWalkers] = useState([]);
  const [message, setMessage] = useState('');
  const [submittedPets, setSubmittedPets] = useState([]);
  const [submittedDogWalkers, setSubmittedDogWalkers] = useState([]);

  useEffect(() => {
    fetchData('pets', setPets);
    fetchData('dogwalkers', setDogWalkers);
  }, []);

  const fetchData = async (endpoint, setter) => {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`);
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  const registerItem = async (item, setSubmittedItems, submittedItems, endpoint, setMessage, setter) => {
    if (endpoint === 'pets') {
      if (!item.name || !item.age || !item.breed || !item.ageUnit) {
        setMessage(`Please fill in all the fields for pet registration.`);
        return;
      }
    } else if (endpoint === 'dogwalkers') {
      if (!item.name || !item.experience || item.available === undefined) {
        setMessage(`Please fill in all the fields for dog walker registration.`);
        return;
      }
    }

    if (submittedItems.some(submittedItem => JSON.stringify(submittedItem) === JSON.stringify(item))) {
      setMessage(`This ${endpoint} information has already been submitted.`);
      return;
    }

    try {
      await axios.post(`${BASE_URL}/${endpoint}`, item);
      setMessage(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} registered successfully!`);
      setSubmittedItems([...submittedItems, item]);

      if (endpoint === 'pets') {
        setPet({ name: '', age: '', ageUnit: 'Years', breed: '' });
      } else if (endpoint === 'dogwalkers') {
        setDogWalker({ name: '', experience: '', available: false });
      }

      fetchData(endpoint, setter);
    } catch (error) {
      console.error(`Error registering ${endpoint}:`, error);
      setMessage(`Error registering ${endpoint}.`);
    }
  };

  const deleteItem = async (id, endpoint) => {
    try {
      await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
      setMessage(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} deleted successfully!`);
      fetchData(endpoint, endpoint === 'pets' ? setPets : setDogWalkers);
    } catch (error) {
      console.error(`Error deleting ${endpoint}:`, error);
      setMessage(`Error deleting ${endpoint}.`);
    }
  };

  const registerPet = () => registerItem(pet, setSubmittedPets, submittedPets, 'pets', setMessage, setPets);
  const registerDogWalker = () => registerItem(dogWalker, setSubmittedDogWalkers, submittedDogWalkers, 'dogwalkers', setMessage, setDogWalkers);
  const closeNotification = () => setMessage('');

  return (
    <div>
      <div className="banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <span className="bannerText">Waqqly</span>
      </div>
      {message && (
        <div className="notification">
          <span>{message}</span>
          <button onClick={closeNotification}>Close</button>
        </div>
      )}
      <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h1 className="header">Register Pet</h1>
        <input
          className="input"
          type="text"
          placeholder="Name"
          value={pet.name}
          onChange={(e) => {
            const inputText = e.target.value.replace(/[^a-zA-Z]/g, '');
            setPet({ ...pet, name: inputText });
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            className="input"
            type="number"
            placeholder="Age"
            value={pet.age}
            onChange={(e) => setPet({ ...pet, age: Math.max(0, e.target.value) })}
            style={{ flex: 1, marginRight: '10px' }}
          />
          <select
            className="input"
            value={pet.ageUnit}
            onChange={(e) => setPet({ ...pet, ageUnit: e.target.value })}
            style={{ width: 'auto' }}
          >
            <option value="Years">Years</option>
            <option value="Months">Months</option>
          </select>
        </div>
        <input
          className="input"
          type="text"
          placeholder="Breed"
          value={pet.breed}
          onChange={(e) => {
            const inputText = e.target.value.replace(/[^a-zA-Z]/g, '');
            setPet({ ...pet, breed: inputText });
          }}
        />
        <button className="button" onClick={registerPet}>
          Register Pet
        </button>
        <h1 className="header">Register Dog Walker</h1>
        <input
          className="input"
          type="text"
          placeholder="Name"
          value={dogWalker.name}
          onChange={(e) => {
            const inputText = e.target.value.replace(/[^a-zA-Z]/g, '');
            setDogWalker({ ...dogWalker, name: inputText });
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} className="checkboxContainer">
          <input
            type="number"
            className="input"
            placeholder="Years Experience"
            value={dogWalker.experience}
            onChange={(e) => setDogWalker({ ...dogWalker, experience: Math.max(0, e.target.value) })}
          />
          <input
            type="checkbox"
            className="checkbox"
            checked={dogWalker.available}
            onChange={(e) => setDogWalker({ ...dogWalker, available: e.target.checked })}
          />
          <label className="label">Available</label>
        </div>
        <button className="button" onClick={registerDogWalker}>
          Register Dog Walker
        </button>
        {pets.length > 0 && <h2 className="header">Registered Pets</h2>}
        <ul className="list">
          {pets.map((pet, index) => (
            <li key={index} className="list-item">
              Name: {pet.name} | Age: {pet.age} {pet.ageUnit} | Dog Breed: {pet.breed}
              <button className="delete-button" onClick={() => deleteItem(pet._id, 'pets')} style={{ marginLeft: '10px' }}>❌</button>
            </li>
          ))}
        </ul>
        {dogWalkers.length > 0 && <h2 className="header">Registered Dog Walkers</h2>}
        <ul className="list">
          {dogWalkers.map((walker, index) => (
            <li key={index} className="list-item">
              Name: {walker.name} | {walker.experience} Years Experience | Availability: {walker.available ? 'Available' : 'Not Available'}
              <button className="delete-button" onClick={() => deleteItem(walker._id, 'dogwalkers')} style={{ marginLeft: '10px' }}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;