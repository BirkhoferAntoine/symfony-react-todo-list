import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography, styled, useTheme
} from "@mui/material";
import EditIcon     from '@mui/icons-material/Edit';
import DeleteIcon   from '@mui/icons-material/Delete';
import AddIcon      from '@mui/icons-material/Add';
import DoneIcon     from '@mui/icons-material/Done';
import CloseIcon    from '@mui/icons-material/Close';
import {DeleteDialog} from "./DeleteDialog";


function TodoTable() {
    const context = useContext(TodoContext);
    const {
        addTodoTask, setAddTodoTask,
        addTodoDescription, setAddTodoDescription,
        editTodoTask, setEditTodoTask,
        editTodoDescription, setEditTodoDescription
    } = context;

    const [editIsShown, setEditIsShown]                 = useState(false);
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToDelete, setTodoToDelete]               = useState(null);

    //const theme = useTheme();

    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo({task: addTodoTask, description: addTodoDescription});
        setAddTodoTask('');
        setAddTodoDescription('');
    }

    const onEditSubmit = (event, todo) => {
        event.preventDefault();
        context.updateTodo({id: todo.id, task: editTodoTask, description: editTodoDescription});
        setEditIsShown(false);
    }

    /*    const sxStyles = (theme) => ({
            thead: {
                backgroundColor: 'primary.main',
                transition:  theme.transitions.create(['background-color', 'transform']),
                '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    //transform: scale(1.3)
                }
            }
        });    */
    /*const sxStyles = theme => ({

                backgroundColor: 'primary.main',
                transition: theme.transitions.create(['background-color', 'transform']),
                '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    //transform: scale(1.3)
                }

        }
    );*/
    /*const StyledTHead = styled(TableHead)(({theme}) => ({
        backgroundColor: theme.palette.primary.main,
        '&:hover': {backgroundColor: 'red'}
    }))*/

    const sxStyles = {
        thead: {
            backgroundColor: 'primary.main'
        }
    }


    return (
        <Fragment>
            <Table>
                {/*HEAD*/}
                <TableHead>
                    {/*ADD*/}
                    <TableRow>
                        <TableCell>
                            <form onSubmit={onCreateSubmit}>
                                <TextField label={"New Task"}
                                           type={'text'}
                                           value={addTodoTask}
                                           onChange={(event) => {
                                               setAddTodoTask(event.target.value)
                                           }}
                                           fullWidth variant={'outlined'}
                                ></TextField>
                            </form>
                        </TableCell>
                        <TableCell>
                            <form>
                                <TextField label={"Description"}
                                           type={'text'}
                                           value={addTodoDescription}
                                           onChange={(event) => {
                                               setAddTodoDescription(event.target.value)
                                           }}
                                           fullWidth multiline variant={'outlined'}
                                ></TextField>
                            </form>
                        </TableCell>
                        <TableCell align={'right'}>
                            <IconButton color={'primary'} onClick={onCreateSubmit}><AddIcon/></IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={sxStyles.thead}>
                        <TableCell>Task</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>

                {/*BODY*/}
                <TableBody>

                    {// Pour faire une copie de l'array et éviter les conflits
                        context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={'todo' + todo.id}>
                                {/*DATA*/}
                                {editIsShown === todo.id
                                    ?

                                    <Fragment>
                                        {/*EDIT*/}

                                        <TableCell>
                                            <form>{/*onSubmit={onEditSubmit}*/}
                                                <TextField fullWidth autoFocus
                                                           type={'text'}
                                                           value={editTodoTask}
                                                           onChange={(event) => {
                                                               setEditTodoTask(event.target.value)
                                                           }}
                                                    /*InputProps={{
                                                        endAdornment:
                                                            <Fragment>
                                                                <IconButton type={'submit'}><DoneIcon/></IconButton>
                                                                <IconButton onClick={() => {
                                                                    setEditIsShown(false);
                                                                }}>
                                                                    <CloseIcon/></IconButton>
                                                            </Fragment>
                                                    }}*/
                                                />
                                            </form>
                                        </TableCell>
                                        <TableCell>
                                            <form>
                                                <TextField fullWidth multiline
                                                           type={'text'}
                                                           value={editTodoDescription}
                                                           onChange={(event) => {
                                                               setEditTodoDescription(event.target.value);
                                                           }}

                                                />
                                            </form>
                                        </TableCell>

                                        <TableCell align={'right'}>
                                            <Fragment>
                                                <IconButton color={'primary'} onClick={(event) => {onEditSubmit(event, todo)}}>
                                                    <DoneIcon/>
                                                </IconButton>
                                                <IconButton color={'secondary'} onClick={() => {setEditIsShown(false);}}>
                                                    <CloseIcon/>
                                                </IconButton>
                                            </Fragment>
                                        </TableCell>

                                    </Fragment>

                                    :

                                    <Fragment>

                                        {/*READ*/}
                                        <TableCell>
                                            <Typography>{todo.task}</Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                        </TableCell>

                                        <TableCell align={'right'}>

                                            <IconButton color={'primary'} onClick={() => {
                                                setEditIsShown(todo.id);
                                                setEditTodoTask(todo.task);
                                                setEditTodoDescription(todo.description);
                                            }}>
                                                <EditIcon/>
                                            </IconButton>

                                            <IconButton color={'secondary'} onClick={() => {
                                                setDeleteConfirmationIsShown(true);
                                                setTodoToDelete(todo);
                                            }}>
                                                <DeleteIcon/>
                                            </IconButton>

                                        </TableCell>

                                    </Fragment>

                                }

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

            {deleteConfirmationIsShown && (
                <DeleteDialog
                    todo={todoToDelete}
                    open={deleteConfirmationIsShown}
                    setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                />
            )}

        </Fragment>
    );
}

export default TodoTable;