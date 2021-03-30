import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const RegisterForm = () => {
  const {register, getUserAvailable} = useUsers();

  const doRegister = async () => {
    try {
      console.log('register lomake lähtee');
      const available = await getUserAvailable(inputs.username);
      console.log(available);
      if (available) {
        register(inputs);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);


  // console.log('RegisterForm', inputs);
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate autoComplete="off"
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

      <TextField
        name="email"
        type="email"
        onChange={handleInputChange}
        value={inputs.email}
        label="email"

      />

      <TextField
        name="full_name"
        onChange={handleInputChange}
        value={inputs.full_name}
        label="full name"

      />

      <Button
        variant="contained"
        type="submit"
      >
        Tallenna
      </Button>    </form>
  );
};

export default RegisterForm;
