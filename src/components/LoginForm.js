import useLoginForm from '../hooks/LoginHooks';
import {useLogin} from '../hooks/ApiHooks';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {makeStyles, Button, TextField} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      maxWidth: '100%',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',

  },
  button: {
    marginTop: 25,
  },
}));


const LoginForm = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const {postLogin} = useLogin();

  const doLogin = async () => {
    try {
      const userdata = await postLogin(inputs);
      console.log('userdata', userdata);
      localStorage.setItem('token', userdata.token);
      setUser(userdata.user);
      history.push('/');
    } catch (e) {
      console.log('do login', e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useLoginForm(doLogin);

  console.log('LoginForm', inputs, user);

  const classes = useStyles();
  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}

    >
      <TextField
        name="username"
        onChange={handleInputChange}
        value={inputs.username}
        label="username"
      />
      <TextField
        name="password"
        type="password"
        onChange={handleInputChange}
        value={inputs.password}
        label="password"
      />


      <Button
        variant="contained"
        type="submit"
        className={classes.button}
      >
        Kirjaudu
      </Button>
    </form>
  );
};

LoginForm.propTypes ={
  history: PropTypes.object,
};

export default withRouter(LoginForm);
