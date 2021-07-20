import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import HeartIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles((theme) => ({
  signatureBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
    padding: 10,
    margin: 10, 
    textAlign: 'center'
  },
  linkStyle: {
      padding: 5,
      fontSize: 20,
      textDecoration: 'none',
      color: 'gray'
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid className={classes.signatureBox}>
      <Link to='/' style={{textDecoration: 'none'}}>
        <p className={classes.linkStyle}>Made with <HeartIcon style={{color: 'red'}}/> in OnePage</p>
      </Link>
      </Grid>
  );
}