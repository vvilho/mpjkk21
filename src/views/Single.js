import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Typography,
  Paper,
  Card,
  makeStyles, CardMedia, CardContent,
} from '@material-ui/core';
import {useUsers} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import BackButton from '../components/BackButton';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: '50vh',
  },
});

const Single = ({location}) => {
  const [owner, setOwner] = useState(null);
  const classes = useStyles();
  console.log('match', location.state);

  const {getUserById} = useUsers();

  const file = location.state;
  console.log(uploadsUrl + file.filename);

  const desc = JSON.parse(file.description);


  useEffect(() => {
    (async ()=>{
      setOwner(await getUserById(localStorage.getItem('token'), file.user_id));
    })();
  }, []);


  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom
      >
        {file.title}
      </Typography>
      <Paper elevation="3">
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={uploadsUrl + file.filename}
            title={file.title}
            style={{
              filter: `
                    brightness(${desc.filters.brightness}%)
                    contrast(${desc.filters.contrast}%)
                    saturate(${desc.filters.saturate}%)
                    sepia(${desc.filters.sepia}%)
                    `,

            }}
          />
          <CardContent>
            <Typography gutterBottom>{desc.description}</Typography>
            <Typography variant="subtitle2">{owner?.username}</Typography>

          </CardContent>
        </Card>

      </Paper>
    </>
  );
};

Single.propTypes = {
  location: PropTypes.object,
};

export default Single;
