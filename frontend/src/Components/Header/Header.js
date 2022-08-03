import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Grid from '@mui/material/Grid';

const Header = () => {
    return (
        <div className="header">
            <Grid container>
                <Grid item xs={6}>
                    <h1>INFOGAIN</h1>
                </Grid>
                <Grid item xs={6} className="menu">
                    <Link to="/">Home Page</Link>
                    <Link to="/add-transaction">Add Transaction</Link>
                </Grid>
            </Grid>


        </div>
    )
}

export default Header