import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';
import {makeStyles, Button, Grid} from '@material-ui/core';
// import {useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      Width: '100%',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: 25,
  },
  TextValidator: {
    width: '100%',
  },
}));

const RegisterForm = ({setToggle}) => {
  const {register, getUserAvailable} = useUsers();
  const validators = {
    username: ['required', 'minStringLength: 3', 'isAvailable'],
    password: ['required', 'minStringLength: 5'],
    repeatPassword: ['required', 'isPasswordMatch'],
    email: ['required', 'isEmail'],
    full_name: ['required', 'isString'],
  };

  const errorMessages = {
    username: ['vaadittu kenttä', 'vähintään 3 merkkiä', 'tunnus ei ole vapaa'],
    password: ['vaadittu kenttä', 'vähintään 5 merkkiä'],
    repeatPassword: ['vaadittu kenttä', 'salasanat ei täsmää'],
    email: ['vaadittu kenttä', 'sähköposti väärää muotoa'],
    full_name: ['vaadittu kenttä', 'vain kirjaimia nimeen'],
  };

  const doRegister = async () => {
    try {
      console.log('register lomake lähtee');
      const available = await getUserAvailable(inputs.username);
      if (available) {
        delete inputs.repeatPassword;
        const result = await register(inputs);
        console.log(result);
        if (result.message.length > 0) {
          alert(result.message);
          setToggle(true);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);

  useEffect(() => {
    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      if (value.length > 2) {
        try {
          const available = await getUserAvailable(value);
          console.log('onks vapaana?', available);
          return available;
        } catch (e) {
          console.log(e.message);
          return true;
        }
      }
    });

    ValidatorForm.addValidationRule('isPasswordMatch',
        (value) => (value === inputs.password),
    );
  }, [inputs]);


  const classes = useStyles();

  return (
    <ValidatorForm
      noValidate
      autoComplete="new-password"
      onSubmit={handleSubmit}

    >
      <Grid className={classes.form}>
        <TextValidator
          className={classes.TextValidator}
          name="username"
          label="username"
          onChange={handleInputChange}
          value={inputs.username}
          validators={validators.username}
          errorMessages={errorMessages.username}
        />

        <TextValidator
          className={classes.TextValidator}
          name="password"
          type="password"
          label="password"
          onChange={handleInputChange}
          value={inputs.password}
          validators={validators.password}
          errorMessages={errorMessages.password}
        />
        <TextValidator
          className={classes.TextValidator}
          name="repeatPassword"
          type="password"
          label="repeat password"
          onChange={handleInputChange}
          value={inputs.repeatPassword}
          validators={validators.repeatPassword}
          errorMessages={errorMessages.repeatPassword}
        />

        <TextValidator
          className={classes.TextValidator}
          name="email"
          type="email"
          label="email"
          placeholder="email@email.com"
          onChange={handleInputChange}
          value={inputs.email}
          validators={validators.email}
          errorMessages={errorMessages.email}
        />

        <TextValidator
          className={classes.TextValidator}
          name="full_name"
          label="full name"
          onChange={handleInputChange}
          value={inputs.full_name}
          validators={validators.full_name}
          errorMessages={errorMessages.full_name}
        />

        <Button
          variant="contained"
          type="submit"
          className={classes.button}
        >
          Rekisteröidy
        </Button>
      </Grid>
    </ValidatorForm>
  );
};

RegisterForm.propTypes ={
  setToggle: PropTypes.func,
};

export default RegisterForm;
