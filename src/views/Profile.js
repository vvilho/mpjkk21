import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Typography, Button, Grid, CardMedia} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {Link} from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';


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

      <Grid item container
        direction='row'
        style={{
          width: '100%',
        }}
      >
        <Grid
          item
          container
          direction={'column'}
          alignContent={'center'}
          xs={6}
          justify={'center'}
        >
          <p>{user.full_name}</p>
          <p>{user.email}</p>
          <p>{user.username}</p>

          <Button
            component={Link}
            to={{pathname: '/myfiles/'}}
            variant={'contained'}
          >My files</Button>
        </Grid>
        <Grid
          item
          container
          direction={'column'}
          alignContent={'center'}
          xs={6}
          justify={'center'}

        >
          <CardMedia
            style={{
              height: 175,
              width: 175,
            }}
            image={'/avatar.png'}
          >

          </CardMedia>
        </Grid>

      </Grid>
      }
      <Grid>
        <ProfileForm user={user}/>
      </Grid>
    </>
  );
};

export default Profile;
