import React, {Fragment} from "react";
import TodoHomepage from "./controllers/TodoHomepage";
import {
    BrowserRouter,
    createBrowserRouter,
    createRoutesFromElements,
    Navigate, Outlet,
    Route,
    RouterProvider,
    Routes
} from "react-router-dom";
import {NotFound} from "./components/NotFound";
import {DefaultLayout} from "./components/DefaultLayout";

/*const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound/>,
    },
    {
        path: "todo-list",
        element: <TodoHomepage/>,
    },
    {
        path: "tag-list",
        element: null,
    },
]);*/


export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout/>}
                       errorElement={<NotFound/>}
                >
                    <Route exact path={'/'}
                           element={<Navigate to={'todo-list'}/>}
                           errorElement={<NotFound/>}
                    />
                    <Route exact path={'todo-list'}
                           element={<TodoHomepage/>}
                    />
                    <Route path={'*'}
                           element={<NotFound/>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};


    {/*<Routes>
        <Route exact path={'/'}
        element={
        <Navigate  to={'todo-list'}/>
    }
        errorElement={<NotFound/>}
        />
        <Route exact path={'todo-list'}
        element={<TodoHomepage/>}
        />
        <Route path={'*'}
        element={<NotFound/>}
        />
        </Routes>*/}