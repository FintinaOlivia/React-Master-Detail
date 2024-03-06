import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";

export function Characters() {
  const [content, setContent] = useState(<CharacterList displayForm={displayForm} />);
  const navigate = useNavigate();

  function displayList() {
    setContent(<CharacterList displayForm={displayForm} />);
  }


  function displayForm(character) {
    // Redirect to the add character page
    if (character){
        navigate(`/characters/edit/${character.id}`, { state: { character } });
    }else{
        navigate('/characters/add', { state: { character } });
    }
  }

    
  return (
    <div className="container my-5">
      <Routes>
        <Route path="/" element={content} />
        <Route path="/add" element={<CharacterForm displayList={displayList} />} />
        <Route path="/edit/:id" element={<CharacterForm displayList={displayList} />} /> 
        <Route path="/:id" element={<CharacterDetails />} />
        <Route path="*">Not Found</Route>
      </Routes>
    </div>
  );
}

function CharacterDetails({ match }) {
    const [character, setCharacter] = useState(null);
    const { id } = useParams();
  
    useEffect(() => {
      fetch(`http://localhost:3005/characters/${id}`)
        .then((response) => response.json())
        .then((data) => setCharacter(data))
        .catch((error) => console.log(error));
    }, [id]);
  
    if (!character) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Character Details</h2>
        <p>ID: {character.id}</p>
        <p>Name: {character.name}</p>
        <p>Age: {character.age}</p>
        <p>Iconic Lines: {character.iconicLines}</p>
        <p>Creator: {character.creator}</p>
        <p>Description: {character.description}</p>
      </div>
    );
  }
  

export function CharacterList(props){
    const [content, setContent] = useState([]);

    function fetchCharacters(){
        fetch("http://localhost:3005/characters")
        .then((response) => {
            if(!response.ok){
                throw new Error("Something went wrong! >:(");
            }
            return response.json()})
        .then((data) => {
            // console.log(data))
            setContent(data);
        })
        .catch(error => console.log(error));
    }


    useEffect(() => fetchCharacters(), []);

    function deleteCharacter(id){
        fetch(`http://localhost:3005/characters/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Something went wrong! >:(");
            }
            return response.json();
        })  
        .then(data => {
            // console.log(data);
            fetchCharacters();
        })
        .catch(error => console.log(error));
    }

    return(
        <>
            {/* <h2 className="text-center mb-3">List of Characters</h2> */}
            <Typography variant="h2" align="center" gutterBottom> List of Characters </Typography>

            <Link to="/characters/add" className="btn btn-primary me-2">
                Add
            </Link>
            <button onClick={() => fetchCharacters()} className="btn btn-outline-primary me-2">
                Refresh
            </button>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Iconic Line</th>
                        <th>Creator</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {content.map((character, index) => (
                        // <Link key={index} to={`/characters/${character.id}`}>
                            <tr>
                                <td>{character.id}</td>
                                {/* <td>{character.name}</td> */}
                                <td>
                                    <Link to={`/characters/${character.id}`}>{character.name}</Link>
                                </td>
                                <td>{character.age}</td>
                                <td>{character.iconicLines}</td>
                                <td>{character.creator}</td>
                                <td style={{width: "3px", whiteSpace: "nowrap"}}>
                                    <button onClick={() => props.displayForm(character)} className="btn btn-primary btn-sm me-2">Edit</button>
                                    <button onClick={() => deleteCharacter(character.id)} type="button" className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        // </Link>
                    ))}
                </tbody>
            </table>
        </>
    );
}


export function CharacterForm(props){
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({});
    console.log(formData);

    const { state } = useLocation();
    const character = state && state.character;
    console.log(character);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}))
      }


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const character = Object.fromEntries(formData.entries());
    
        if(!character.name|| !character.age|| !character.iconicLines || !character.creator){
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
    

        if(character.id){
            fetch(`http://localhost:3005/characters/${character.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(character)
            })
            .then(response => {
                if(!response.ok){
                    throw new Error("Something went wrong! >:(");
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                props.displayList();
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
            .catch(error => {
                console.log(error)
            });
            return;
        }
            else {
            fetch("http://localhost:3005/characters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(character)
            })
            .then(response => {
                if(!response.ok){
                    throw new Error("Something went wrong! >:(");
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                props.displayList();
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
            })
            .catch(error => {
                console.log(error)
            });
            
        }
    }

    return(
        <>
            <h2 className="text-center mb-3">
                {character ? "Edit " : "Add"} Character
            </h2>
            <Link to="/characters" className="btn btn-secondary">Cancel</Link>
            
            <div className="row mt-3">
                <div className="col-md-6">
                    {successMessage} 
                    {errorMessage && errorMessage}
                    <form onSubmit={(event) => handleSubmit(event)}>
                        {character && <div className="mb-3">
                            <label className="col-sm-4 col-form-label">ID</label>
                            <div className="mb-3">
                                <input 
                                    readOnly className="form-control-plaintext" name="id"
                                    defaultValue={character.id}
                                />
                            </div>
                        </div>}
                        <div className="mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="mb-3">
                                <input 
                                    type="text" className="form-control" name="name" 
                                    placeholder={character ? character.name : "Enter name...."}
                                    defaultValue={character ? character.name : ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="mb-3">
                            <label className="col-sm-4 col-form-label">Age</label>
                            <div className="mb-3">
                                <input 
                                    type="text" className="form-control" name="age" 
                                    placeholder={character ? character.age : "Enter age...."}
                                    defaultValue={character ? character.age : ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="col-sm-4 col-form-label">Iconic Lines</label>
                            <div className="mb-3">
                                <textarea 
                                    type="text" className="form-control" name="iconicLines" 
                                    placeholder={character ? character.iconicLines : "Enter iconic lines...."}
                                    defaultValue={character ? character.iconicLines : ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="col-sm-4 col-form-label">Creator</label>
                            <div className="mb-3">
                                <input 
                                    type="text" className="form-control" name="creator" 
                                    placeholder={character ? character.creator : "Enter creator...."}
                                    defaultValue={character ? character.creator : ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="mb-3">
                                <textarea 
                                    style={{height: "120px"}}
                                    type="text" className="form-control" name="iconicLines" 
                                    placeholder={character ? character.description : "Enter description...."}
                                    defaultValue={character ? character.description : " "}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <button type="submit" className="btn btn-primary sm-4">Save</button>
                        {/* <Link to="/characters" className="btn btn-primary sm-4" onClick={() => props.displayList()}>Save</Link> */}
                        
                    </form>
                </div>
            </div>
        </>
    );
}