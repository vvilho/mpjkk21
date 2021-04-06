import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Typography} from '@material-ui/core';

const Profile = () => {
  const [user] = useContext(MediaContext);

  return (
    <>
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
      </div>
      }
    </>
  );
};

export default Profile;
