// CharacterForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function CharacterForm(props) {
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
    <>
      <h2 className="text-center mb-3">Add Character</h2>
      <Link to="/characters" className="btn btn-secondary">
        Cancel
      </Link>

      <div className="row mt-3">
        <div className="col-md-6">
          {successMessage}
          {errorMessage && errorMessage}
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="mb-3">
              <label htmlFor="name" className="col-sm-4 col-form-label">
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
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="col-sm-4 col-form-label">
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
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="iconicLines" className="col-sm-4 col-form-label">
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
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="creator" className="col-sm-4 col-form-label">
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
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="col-sm-4 col-form-label">
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
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary sm-4">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
