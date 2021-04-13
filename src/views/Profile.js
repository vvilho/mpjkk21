import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Typography, Button} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {Link} from 'react-router-dom';


const Profile = () => {
  const [user] = useContext(MediaContext);

  return (
    <>
      <BackButton />

      <Typography
        component='h1'
        variant='h2'
        align={'center'}
        gutterBottom
      >
        Profile
      </Typography>
      {user &&
      <div>
        <p>{user.full_name}</p>
        <p>{user.email}</p>
        <p>{user.username}</p>
        <Button
          component={Link}
          to={{pathname: '/myfiles/'}}
          variant={'contained'}
        >My files</Button>
      </div>
      }
    </>
  );
};

export default Profile;
