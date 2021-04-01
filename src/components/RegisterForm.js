import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';
import {makeStyles, Button} from '@material-ui/core';
// import {useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      maxWidth: '100%',
    },
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


  console.log('RegisterForm', inputs);
  const classes = useStyles();

  return (
    <ValidatorForm
      className={classes.root}
      noValidate autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextValidator
        name="username"
        onChange={handleInputChange}
        value={inputs.username}
        label="username"
        validators={validators.username}
        errorMessages={errorMessages.username}
      />

      <TextValidator
        name="password"
        type="password"
        onChange={handleInputChange}
        value={inputs.password}
        label="password"
        validators={validators.password}
        errorMessages={errorMessages.password}
      />
      <TextValidator
        name="repeatPassword"
        type="password"
        onChange={handleInputChange}
        value={inputs.repeatPassword}
        label="repeat password"
        validators={validators.repeatPassword}
        errorMessages={errorMessages.repeatPassword}
      />

      <TextValidator
        name="email"
        type="email"
        onChange={handleInputChange}
        value={inputs.email}
        label="email"
        validators={validators.email}
        errorMessages={errorMessages.email}
      />

      <TextValidator
        name="full_name"
        onChange={handleInputChange}
        value={inputs.full_name}
        label="full name"
        validators={validators.full_name}
        errorMessages={errorMessages.full_name}
      />

      <Button
        variant="contained"
        type="submit"
      >
        Rekisteröidy
      </Button>    </ValidatorForm>
  );
};

RegisterForm.propTypes ={
  setToggle: PropTypes.func,
};

export default RegisterForm;
