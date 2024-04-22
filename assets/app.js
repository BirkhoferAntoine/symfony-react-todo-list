/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './styles/app.css';

// start the Stimulus application
//import './bootstrap';

import {registerReactControllerComponents} from '@symfony/ux-react';

// Registers React controller components to allow loading them from Twig
//
// React controller components are components that are meant to be rendered
// from Twig. These component then rely on other components that won't be called
// directly from Twig.
//
// By putting only controller components in `react/controllers`, you ensure that
// internal components won't be automatically included in your JS built file if
// they are not necessary.
registerReactControllerComponents(require.context('./react/controllers', true, /\.(j|t)sx?$/));

import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import cx from 'classnames';
import {CSSTransition} from 'react-transition-group';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "../src/dev";
import {CssBaseline} from "@mui/material";
import {DefaultThemeProvider} from "./react/themes/DefaultThemeProvider";
import {Router} from "./react/Router";


class App extends Component {

    render() {
        return (
            <Router/>
        )
    }
}

ReactDOM.createRoot(document.getElementById('root'))
    .render(
        <DevSupport
            ComponentPreviews={ComponentPreviews}
            useInitialHook={useInitial}
        >
            <DefaultThemeProvider>
                <CssBaseline/>
                <App/>
            </DefaultThemeProvider>
        </DevSupport>
    )
//ReactDOM.render(<App/>, document.getElementById('root'));
