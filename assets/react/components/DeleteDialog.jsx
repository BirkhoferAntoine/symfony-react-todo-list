import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {TodoContext} from "../contexts/TodoContext";
import React, {useContext} from "react";

DeleteDialog.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        task: PropTypes.string.isRequired,

    }),
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
}

export function DeleteDialog(props) {
    const context = useContext(TodoContext);
    const hide = () => props.setDeleteConfirmationIsShown(false);
    return (
        <Dialog open={props.open} onClose={hide} fullWidth maxWidth={'sm'}>
            <DialogTitle>Êtes vous sûr de vouloir supprimer cette tâche ?</DialogTitle>
            <DialogContent>
                {props.todo.task}
            </DialogContent>
            <DialogActions>
                <Button onClick={hide}>Annuler</Button>
                <Button onClick={() => {
                    context.deleteTodo(props.todo);
                    hide();
                }}>Supprimer</Button>
            </DialogActions>

        </Dialog>
    );
}