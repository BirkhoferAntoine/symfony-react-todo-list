import {Navigation} from "./Navigation";
import React, {Fragment} from "react";
import {styled} from "@mui/material";
import {Outlet} from "react-router-dom";


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
export const DefaultLayout = () => {
    return (
        <Fragment>
            <Navigation/>
            <Offset/>
            <main>
                <Outlet/>
            </main>
        </Fragment>
    );
}