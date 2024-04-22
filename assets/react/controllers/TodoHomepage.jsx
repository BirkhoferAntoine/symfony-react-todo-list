import React, { Component } from 'react';
import TodoContextProvider from '../contexts/TodoContext'
import TodoTable from "../components/TodoTable";
import AppSnackBar from "../components/AppSnackBar";

class TodoHomepage extends Component {
    render() {
        return (
            <TodoContextProvider>
                <TodoTable/>
                <AppSnackBar/>
            </TodoContextProvider>
        );
    }
}

export default TodoHomepage;