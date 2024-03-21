import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { CharacterList } from './CharacterList';
import { CharacterForm } from './CharacterForm';
import { CharacterEdit } from './CharacterEdit';

export function Characters() {
    const [content, setContent] = useState(<CharacterList displayForm={displayForm} />);
    function displayList() {
      setContent(<CharacterList displayForm={displayForm} />);
    }
    const navigate = useNavigate();
  
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
          <Route path="/edit/:id" element={<CharacterEdit displayList={displayList} />} /> 
          <Route path="/:id" element={<CharacterDetails />} />
          <Route path="*">Not Found</Route>
        </Routes>
      </div>
    );
  }


export function CharacterDetails({ match }) {
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
        <p>Name: {character.name}</p>
        <p>Age: {character.age}</p>
        <p>Iconic Lines: {character.iconicLines}</p>
        <p>Creator: {character.creator}</p>
        <p>Description: {character.description}</p>
      </div>
    );
  }
