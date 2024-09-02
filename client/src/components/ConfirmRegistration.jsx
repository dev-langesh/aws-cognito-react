import React, { useState } from "react";
import { authenticate } from "./services/authenticate";
import { confirmUser } from "./services/confirmUser";
import { resendConfirmationCode } from "./services/resendConfirmationCode";

const ConfirmRegistration = ({ email }) => {
  const [formData, setFormData] = useState({ code: "", email: email });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmUser(formData.email, formData.code);
    console.log("Form submitted with:", formData);
    // You can add form validation or login logic here
  };

  const resendCode = () => {
    // You can add logic to resend the confirmation code here
    resendConfirmationCode(formData.email);
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        {!email && (
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <label>
          Confirmation Code:
          <input
            type="number"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Confirm</button>
        <button onClick={resendCode} type="button">
          Resend code
        </button>
      </form>
    </div>
  );
};

export default ConfirmRegistration;
