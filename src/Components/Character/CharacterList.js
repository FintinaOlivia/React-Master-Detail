import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { TablePagination } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { fetchCharacters } from "../Service";
import { deleteCharacter } from "../Service";

import { PieChart, Pie, Cell } from "recharts";

export function CharacterList(props) {
    const [content, setContent] = useState([]);
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        handleFetchCharacters();
    }, []);

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleFetchCharacters() {
        fetchCharacters()
            .then((data) => {
                const sortedContent = data.sort((a, b) => a.name.localeCompare(b.name));
                setContent([...sortedContent]);
            })
            .catch(error => console.log(error));
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

    const data = [
        { name: "Series A", value: 400 },
        { name: "Series B", value: 300 },
        { name: "Series C", value: 300 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

   
    return (
        <>
            <Typography variant="h2" align="center" gutterBottom> List of Characters </Typography>

            <Link to="/characters/add" className="btn btn-primary me-2">
                Add
            </Link>
            <button onClick={() => handleFetchCharacters()} className="btn btn-outline-primary me-2">
                Refresh
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
                    {(rowsPerPage > 0
                        ? content.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : content
                    ).map((character, index) => (
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
                                <Button
                                    onClick={() => handleDeleteConfirmation(character.id)}
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                component="div"
                count={content.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

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


            <Button
                component={Link}
                to={`/characters/chart`}
                variant="contained"
                color="primary"
                size="small"
                className="me-2"
            >
                Chart
            </Button>
        </>
    );
}
