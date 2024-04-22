import React, {Component, Fragment, useContext} from 'react';
import {Button, Snackbar, SnackbarContent} from "@mui/material";
import {TodoContext} from "../contexts/TodoContext";

function checkLevel(level) {
    switch (level) {
        case 'success':
            return 'green';
        case 'error':
            return 'red';
        default:
            return 'white';
    }
}

function AppSnackBar() {
    const context = useContext(TodoContext);
    return (
        <Snackbar open={context.message.text !== undefined} autoHideDuration={6000}>
            {context.message.text && (
                <SnackbarContent style={{background: checkLevel(context.message.level), whiteSpace: 'pre'}}
                                 message={context.message.text
                                 /*message={context.message.text.map((text, index) => (
                    <Fragment key={index+'_'+text}>
                        <span>{text}</span>
                        <br/>
                    </Fragment>))*/
                } action={[
                    <Button key={'dismiss'}
                            onClick={() => {
                                context.setMessage({});
                            }}
                            color={'inherit'}
                    >dismiss</Button>,
                ]}/>
            )}

        </Snackbar>
    );
}

export default AppSnackBar;