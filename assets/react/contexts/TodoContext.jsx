import React, {Component, createContext, useState} from 'react';
import axios from "axios";

export const TodoContext = createContext();

class TodoContextProvider extends Component {
constructor(props) {
    super(props);
    this.state = {
        todos:      [],
        message:    {},
        addTodoTask:            '',
        addTodoDescription:     '',
        editTodoTask:           '',
        editTodoDescription:    '',
    };

    this.readTodo();
}

    // create
    createTodo(data) {
        axios.post('/api/todo/create', data)
            .then(response => {
                const {message} = response.data;
                console.log("-> message", message);
                if (message.level === 'error') {
                    return this.setState({message});
                }
                const todos = [...this.state.todos];
                todos.push(response.data.todo);
                this.setState({
                    todos,
                    message,
                });
            })
            .catch(error => {
                console.error("-> error", error);
                //throw new Error(error);
            });
    }
    // read
    readTodo() {
        axios.get('/api/todo/read')
            .then(response => {
                this.setState({
                    todos: response.data,
                })
            })
            .catch(error => {
                console.error("-> error", error);
                //throw new Error(error);
            });
    }
    // update
    updateTodo(data) {
        axios.put('/api/todo/update/'+data.id , data)
            .then(response => {
                const {todo, message} = response.data;

                if (message.level === 'error') {
                    this.setState({message});
                } else {
                    const todos         = [...this.state.todos];
                    const stateTodo     = todos.find((todo) => {
                        return todo.id === data.id
                    });
                    stateTodo.task           = todo.task;
                    stateTodo.description    = todo.description;

                    this.setState({
                        todos,
                        message,
                    });
                }
            })
            .catch(error => {
                console.error("-> error", error);
                //throw new Error(error);
            });
    }
    // delete
    deleteTodo(data) {
    axios.delete('/api/todo/delete/'+data.id)
        .then(response => {
            const {message} = response.data;
            if (message.level === 'error') {
                return this.setState({message});
            }
            const {todos}   = this.state;
            const todoIndex = todos.findIndex(todo => {
                return todo.id === data.id;
            });
            if (todoIndex>-1) {
                todos.splice(todoIndex, 1);
                this.setState({
                    todos,
                    message,
                });
            }
        })
        .catch(error => {
            console.error("-> error", error);
            //throw new Error(error);
        });
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
                setMessage: (message) => {
                    this.setState({message});
                },
                setAddTodoTask: (addTodoTask) => {
                    this.setState({addTodoTask});
                    console.log("-> this.state", this.state);
                },
                setAddTodoDescription: (addTodoDescription) => {
                    this.setState({addTodoDescription});
                    console.log("-> this.state", this.state);
                },
                setEditTodoTask: (editTodoTask) => {
                    this.setState({editTodoTask});
                    console.log("-> this.state", this.state);
                },
                setEditTodoDescription: (editTodoDescription) => {
                    this.setState({editTodoDescription});
                    console.log("-> this.state", this.state);
                },
            }}>
                {this.props.children}
            </TodoContext.Provider>

        );
    }
}

export default TodoContextProvider;