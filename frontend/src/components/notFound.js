import React from 'react'
import { Card, Container, Grid, Typography, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Container>
            <Grid container
                justify="center">
                <Grid item xs={12} sm={6}>
                    <Card style={{ marginTop: 50, padding: 20, textAlign: 'center' }}>
                        <Typography variant="h1" component="h2" gutterBottom color="secondary">
                            404
                    </Typography>
                        <Typography variant="h3" gutterBottom>
                            Not Found
                    </Typography>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary">
                                <HomeIcon /> Back to HomePage
                            </Button>
                        </Link>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NotFound
