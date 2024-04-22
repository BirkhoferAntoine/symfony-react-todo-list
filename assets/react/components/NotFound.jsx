import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <Box textAlign={'center'}>
            <Typography variant={'h1'}>Page introuvable 404</Typography>
            <Link style={{textDecoration: 'none'}} to={'/'}>
                <Button color={'primary'} variant={'contained'} size={'large'}>
                    Retourner à la page d'accueil
                </Button>
            </Link>
        </Box>
    );
}