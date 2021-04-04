/* eslint-disable max-len */
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button, Container, Grid} from '@material-ui/core';
import {useState} from 'react';


const Login = () => {
  const [toggle, setToggle] = useState(true);

  const showHide = () => {
    setToggle(!toggle);
  };


  return (
    <Container

    >
      <Grid align="center">
        { toggle ? <LoginForm/> : <RegisterForm setToggle={setToggle}/> }
        <Button
          onClick={showHide}

        >{toggle ? 'or register' : 'or login'}</Button>
      </Grid>


    </Container>
  );
};

export default Login;
