import React, {useState} from 'react';
import * as Yup from "yup";

import './App.css';
import Form from './Form'
import User from './User'

const initialFormValues = {
  name: '', email: '', password: '', terms: '',
}

function App() {
  const [user, setUser] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)

  const updateForm = (inputName, inputValue) => {
    setFormValues({ ...formValues, [inputName]: inputValue})
  }

  const submitForm = () =>{
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      terms: formValues.terms,
    }
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.terms) {
      return
    }

    setUser([...user, newUser])
    setFormValues(initialFormValues)
  }

  return (
    <div className="container">
      <h1>Create User</h1>
      <Form
        values={formValues}
        update={updateForm}
        submit={submitForm}
      />

      {
        user.map(usr => {
          return (
            <User key={usr.id} details={usr} />
          )
        })
      }
        
    </div>
  );
}

export default App;
