import React from "react";

export default function Form(props) {
  const { values, update, submit, disabled, errors } = props;

  const onChange = (evt) => {
    // passes in the name of the form, and the value of the form
    const target = evt.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    update(name, value); // function from parent component App.js
    // debugger;
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  return (
    <form className="form container" onSubmit={onSubmit}>
      <div className="form-group inputs">
        <label>
          {" "}
          Name
          <input
            type="text"
            name="name"
            onChange={onChange}
            value={values.name}
            placeholder="Enter Name"
            maxLength="30"
          />
        </label>
        <label>
          {" "}
          Email
          <input
            type="email"
            name="email"
            onChange={onChange}
            value={values.email}
            placeholder="Enter Email"
            maxLength="30"
          />
        </label>
        <label>
          {" "}
          Password
          <input
            type="text"
            name="password"
            onChange={onChange}
            value={values.password}
            placeholder="Enter Password"
            maxLength="30"
          />
        </label>
        <label>
          {" "}
          Terms of Service
          <input
            type="checkbox"
            name="terms"
            checked={values.terms}
            onChange={onChange}
          />
        </label>

        <div className="errors">
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div>

        <div className="submit">
          <button disabled={disabled}>Submit!</button>
        </div>
      </div>
    </form>
  );
}
