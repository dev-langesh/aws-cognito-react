import React, { useState } from "react";
import { signup } from "./services/signup";
import { confirmUser } from "./services/confirmUser";
import ConfirmRegistration from "./ConfirmRegistration";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "", phone_number: "+919677728298", name: "demo", username: "demo1"});
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Form submitted with:", formData);
      const res = await signup(formData);

      console.log(res);

      setStatus("registered");
    } catch (error) {
      console.log(error);
    }
    // You can add form validation or submission logic here
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <ConfirmRegistration email={formData.email} />
    </div>
  );
};

export default RegistrationForm;
