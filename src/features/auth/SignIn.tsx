import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import { BasicAuth } from '../../model';

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link component={RouterLink} color="inherit" to="/">
        My Content Client
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

interface SignInProps {
  authenticate: (basicAuth: BasicAuth) => void;
}

export default function SignIn (props: SignInProps) {
  const { authenticate } = props;
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formValid, setFormValid] = useState(false);

  const checkUsername = (username: string) => {
    if (username.length < 3) {
      setUsernameError('Wpisz co najmniej 3 znaki');
    } else if (username.length > 20) {
      setUsernameError('Wpisz nie więcej niż 20 znaków');
    } else {
      setUsernameError('');
    }
  };

  const checkPassword = (password: string) => {
    if (password.length < 6) {
      setPasswordError('Wpisz co najmniej 6 znaków');
    } else if (password.length > 20) {
      setPasswordError('Wpisz nie więcej niż 20 znaków');
    } else {
      setPasswordError('');
    }
  };

  useEffect(() => {
    username && checkUsername(username);
    password && checkPassword(password);
    setFormValid(!!(username && password) && !(usernameError || passwordError));
  }, [
    username,
    password,
    usernameError,
    passwordError
  ]);

  const updateUsername = (evt: ChangeEvent<HTMLInputElement>) => {
    setUsername(evt.target.value);
  };
  const updatePassword = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    authenticate({ username, password });
    evt.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logowanie
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate data-testid="signin-form">
          <TextField
            inputProps={{ type: 'text', name: 'username' }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nazwa użytkownika"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={updateUsername}
            error={!!(username && usernameError)}
            helperText={usernameError}
          />
          <TextField
            inputProps={{ type: 'text', name: 'username' }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={updatePassword}
            error={!!(password && passwordError)}
            helperText={passwordError}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Zapamiętaj mnie"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formValid}
          >
            Zaloguj
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/" variant="body2">
                Nie pamiętasz hasła?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/sign-up" variant="body2">
                {'Nie masz konta? Załóż'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
