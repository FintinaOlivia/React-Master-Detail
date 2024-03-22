// CharacterForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function CharacterForm(props) {
    // Styling
    const formStyle = {
        backgroundColor: "#9dd0f5",
        color: "#ffffff",
        padding: "20px",    
        borderRadius: "20px" 
      };
      
    const inputStyle = {
        backgroundColor: "#FFFFFF",
        color:"#00ff00" ,
        marginLeft:"55%"
    };

    const buttonStyle = {
        marginLeft: "90%"
    };

    const labelStyle = {
        marginLeft: "55%"
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({ name: "", age: "", iconicLines: "", creator: "", description: "" });


    const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const character = { ...formData };

    if (!character.name || !character.age || !character.iconicLines || !character.creator) {
      setErrorMessage(
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          Please fill in all the fields!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setErrorMessage("")}
          ></button>
        </div>
      );
      return;
    }

    fetch("http://localhost:3005/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong! >:(");
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage(
          <div className="alert alert-success alert-dismissible p-3 m-3" role="alert">
            Character added successfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setErrorMessage("")}
            ></button>
          </div>
        );
        setFormData({ name: "", age: "", iconicLines: "", creator: "", description: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card" style={formStyle}>
            <h2 className="card-header text-center mb-3">Add Character</h2>
            <div className="card-body">
            <Link to="/characters" className="btn btn-primary">
                Cancel
            </Link>

            <div className="row mt-3">
                <div className="col-md-6">
                {successMessage}
                {errorMessage && errorMessage}
                <form onSubmit={(event) => handleSubmit(event)} style={formStyle}>
                    <div className="mb-3">
                    <label htmlFor="name" className="form-label" style={labelStyle}>
                        Name
                    </label>
                    <div className="mb-3">
                        <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter name...."
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyle} 
                        />
                    </div>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="age" className="form-label" style={labelStyle}>
                        Age
                    </label>
                <div className="mb-3">
                    <input
                    id="age"
                    type="text"
                    className="form-control"
                    name="age"
                    placeholder="Enter age...."
                    value={formData.age}
                    onChange={handleChange}
                    style={inputStyle} 
                    />
                </div>
                </div>
                <div className="mb-3">
                <label htmlFor="iconicLines" className="form-label" style={labelStyle}>
                    Iconic Lines
                </label>
                <div className="mb-3">
                    <input
                    id="iconicLines"
                    type="text"
                    className="form-control"
                    name="iconicLines"
                    placeholder="Enter iconic lines...."
                    value={formData.iconicLines}
                    onChange={handleChange}
                    style={inputStyle} 
                    />
                </div>
                </div>
                <div className="mb-3">
                <label htmlFor="creator" className="form-label" style={labelStyle}>
                    Creator
                </label>
                <div className="mb-3">
                    <input
                    id="creator"
                    type="text"
                    className="form-control"
                    name="creator"
                    placeholder="Enter creator...."
                    value={formData.creator}
                    onChange={handleChange}
                    style={inputStyle} 
                    />
                </div>
                </div>
                <div className="mb-3">
                <label htmlFor="description" className="form-label" style={labelStyle}>
                    Description
                </label>
                <div className="mb-3">
                    <textarea
                    id="description"
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Enter description...."
                    value={formData.description}
                    onChange={handleChange}
                    style={inputStyle} 
                    />
                </div>
                </div>
                <button type="submit" className="btn btn-primary sm-4" style={buttonStyle}>
                Save
                </button>
                </form>
                </div>
            </div>
          </div>
      </div>
    </div>
    </div>
  );
}
