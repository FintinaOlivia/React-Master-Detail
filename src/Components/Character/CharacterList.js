import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import { fetchCharacters } from "../Service";
import { deleteCharacter } from "../Service";


export function CharacterList(props){
    const [content, setContent] = useState([]);
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    useEffect(() => {
        handleFetchCharacters();
    }, []);
    
    function handleFetchCharacters() {
        fetchCharacters()
        .then((data) => {
            setContent(data);
        })
        .catch(error => console.log(error));
    }

    function handleSortCharacters() {
        const sortedContent = content.sort((a, b) => a.name.localeCompare(b.name));
        setContent([...sortedContent]);
    }

   function handleDelete(id) {
        deleteCharacter(id)
            .then(() => handleFetchCharacters())
            .catch(error => console.log(error));
    }

    function handleDeleteConfirmation(id) {
        setSelectedCharacterId(id);
        setDeleteConfirmationOpen(true);
    }

    const handleDeleteConfirmed = () => {
        handleDelete(selectedCharacterId);
        setDeleteConfirmationOpen(false);
    };

    const handleDeleteCancelled = () => {
        setDeleteConfirmationOpen(false);
    };

    return(
        <>
            {/* <h2 className="text-center mb-3">List of Characters</h2> */}
            <Typography variant="h2" align="center" gutterBottom> List of Characters </Typography>

            <Link to="/characters/add" className="btn btn-primary me-2">
                Add
            </Link>
            <button onClick={() => handleFetchCharacters()} className="btn btn-outline-primary me-2">
                Refresh
            </button>
            <button onClick={() => handleSortCharacters()} className="btn btn-outline-primary me-2">
                Sort
            </button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Iconic Line</TableCell>
                        <TableCell>Creator</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {content.map((character, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Link to={`/characters/${character.id}`}>{character.name}</Link>
                            </TableCell>
                            <TableCell>{character.age}</TableCell>
                            <TableCell>{character.iconicLines}</TableCell>
                            <TableCell>{character.creator}</TableCell>
                            <TableCell style={{ width: "3px", whiteSpace: "nowrap" }}>
                            <Button
                                    component={Link}
                                    to={`/characters/edit/${character.id}`}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className="me-2"
                                    >
                                    Edit
                            </Button>
                            <Button onClick={() => handleDeleteConfirmation(character.id)} variant="contained" color="secondary" size="small">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCancelled}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this character?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancelled} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteConfirmed} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
