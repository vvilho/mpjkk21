import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';
import {makeStyles, Button, Grid, Typography} from '@material-ui/core';
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

const ProfileForm = ({user}) => {
  const {putUser} = useUsers();
  const validators = {
    repeatPassword: ['isPasswordMatch'],
    email: ['required', 'isEmail'],
    full_name: ['isString'],
  };

  const errorMessages = {
    repeatPassword: ['salasanat ei täsmää'],
    email: ['vaadittu kenttä', 'sähköposti väärää muotoa'],
    full_name: ['vain kirjaimia nimeen'],
  };

  const doRegister = async () => {
    try {
      console.log('user muokkaus lomake lähtee');


      delete inputs.repeatPassword;
      const result = await putUser(inputs, localStorage.getItem('token'));
      console.log(result);

      if (result.message.length > 0) {
        alert(result.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} =
    useSignUpForm(doRegister, user);

  useEffect(() => {
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
      <Typography
        component={'h1'}
        variant={'h4'}
        gutterBottom
        align={'center'}

      >
        Change user info
      </Typography>
      <Grid className={classes.form}>
        <TextValidator
          className={classes.TextValidator}
          name="password"
          type="password"
          label="password"
          onChange={handleInputChange}
          validators={validators.password}
          errorMessages={errorMessages.password}
        />
        <TextValidator
          className={classes.TextValidator}
          name="repeatPassword"
          type="password"
          label="repeat password"
          onChange={handleInputChange}
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
          value={inputs?.email}
          validators={validators.email}
          errorMessages={errorMessages.email}
        />

        <TextValidator
          className={classes.TextValidator}
          name="full_name"
          label="full name"
          onChange={handleInputChange}
          value={inputs?.full_name}
          validators={validators.full_name}
          errorMessages={errorMessages.full_name}
        />

        <Button
          variant="contained"
          type="submit"
          className={classes.button}
        >
          Save new data
        </Button>
      </Grid>
    </ValidatorForm>
  );
};

ProfileForm.propTypes ={
  user: PropTypes.object,
};

export default ProfileForm;
