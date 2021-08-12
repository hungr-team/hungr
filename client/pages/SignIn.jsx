import React from 'react';
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleButton from 'react-google-button';
import '../styles/style.css';
import { useHistory } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';

const googleSignIn = {
  paddingBottom: '30px',
  height: '20px',
};

const btnDiv = {
  display: 'flex',
  flexDirection: 'row',
};

const hr = {
  width: '100%',
  height: '20px',
  borderBottom: '1px solid black',
  textAlign: 'center',
};

const innerHr = {
  fontSize: '20px',
  backgroundColor: '#F3F5F6',
};

//post req made by btn

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit'>Hungr</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  google: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [emailValue, setEmailValue] = useState('Current');
  const [passwordValue, setPasswordValue] = useState('Current');
  const [status, setMessage] = useState('');
  let history = useHistory();
  const classes = useStyles();

  const handleSubmit = (e) => {
    console.log(emailValue, passwordValue);

    fetch('/signIn', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: emailValue,
        password: passwordValue,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res === true) {
          history.push('/dashboard');
        } else {
          //let user know they fucked up
          setMessage({ msg: 'Incorrect Login', key: Math.random() });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            onChange={(e) => setEmailValue(e.target.value)}
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            onChange={(e) => setPasswordValue(e.target.value)}
            id='password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />

          <div className={btnDiv}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={() => handleSubmit()}
            >
              Sign In
            </Button>
            {status !== '' ? (
              <AlertMessage key={status.key} message={status.msg} />
            ) : null}
            <h2 className='specialH2'>
              <span className='specialSpan'>or</span>
            </h2>
            <center>
              <Link href='/google'>
                <GoogleButton className={classes.google} />
              </Link>
            </center>
            <br></br>
          </div>

          <Grid container>
            <Grid item>
              <Link href='/signUp' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
