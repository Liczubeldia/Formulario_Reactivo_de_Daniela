import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const ReactiveFormWithHTTP = () => {
  const [formData, setFormData] = useState({ name: "", correo: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.correo) errors.correo = "Correo is required";
    else if (!/\S+@\S+\.\S+/.test(formData.correo))
      errors.correo = "Correo is invalid";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post("/api/submit", formData);
        console.log("Server response:", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Formulario Reactivo de Daniela</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Correo:</label>
          <input
            type="text"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          {errors.correo && <p className="error">{errors.correo}</p>}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactiveFormWithHTTP;
