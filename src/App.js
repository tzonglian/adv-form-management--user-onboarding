import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

import "./App.css";
import Form from "./Form";
import User from "./User";
import schema from "./validation/formSchema";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  terms: false,
};

const initialFormErrors = {
  username: "",
  email: "",
  password: "",
  // terms: false,
};

const initialUsers = [];
const initialDisabled = true;

function App() {
  // SLICES OF STATES
  const [users, setUsers] = useState(initialUsers); // array of user objects
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean

  // HELPER FUNCTIONS
  // const getUsers = () => {
  //   axios
  //     .get("https://reqres.in/api/users")
  //     .then((res) => {
  //       // console.log(res.data);
  //       setUsers(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([...users, newUser]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const validate = (name, value) => {
    // Find schema, then test each key/pair (eg, name/value)
    yup
      .reach(schema, name)
      .validate(value)
      // If validation successful, clear error message
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      // If validation unsuccessful, set the error message to the message from the formSchema.js file
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  };

  // EVENT HANDLERS
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const submitForm = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      terms: formValues.terms,
    };
    // if (
    //   !newUser.name ||
    //   !newUser.email ||
    //   !newUser.password ||
    //   !newUser.terms
    // ) {
    //   return;
    // }
    postNewUser(newUser);
  };

  // SIDE EFFECTS

  //Initial Run
  // useEffect(() => {
  //   getUsers();
  // }, []);

  //Adjust status of 'disabled' every time 'formValues' changes
  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid); // turn disabled to false
    });
  }, [formValues]);

  // RETURN

  return (
    <div className="container">
      <h1>Create User</h1>
      <Form
        values={formValues}
        update={inputChange}
        submit={submitForm}
        disabled={disabled}
        errors={formErrors}
      />

      <h1> Current Users </h1>
      {users.map((usr) => {
        return <User key={usr.id} details={usr} />;
      })}
    </div>
  );
}

export default App;
