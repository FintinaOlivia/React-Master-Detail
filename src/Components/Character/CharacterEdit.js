import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export function CharacterEdit(props) {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log(id);
    // Fetch the character data based on the ID
    fetch(`http://localhost:3005/characters/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong! >:(");
        }
        return response.json();
      })
      .then((data) => {
        // Set the form data with the fetched character data
        setFormData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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

    fetch(`http://localhost:3005/characters/${id}`, {
      method: "PATCH",
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
              Character updated successfully!
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setErrorMessage("")}
              ></button>
            </div>
          );
   
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Error updating character! Please try again.");
      });
  };

  return (
    <div className="container flex justify-content-center align-items-center vh-100">
      <h2 className="text-center mb-3">Edit Character</h2>
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
                  value={formData.name || ""}
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
                  value={formData.age || ""}
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
                  value={formData.iconicLines || ""}
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
                  value={formData.creator || ""}
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
                  className="form-control"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <button type="submit" className="btn btn-primary sm-4">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
