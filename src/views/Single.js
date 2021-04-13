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
  const {getUserById} = useUsers();

  const file = location.state;

  const desc = JSON.parse(file.description);


  useEffect(() => {
    (async ()=>{
      try {
        setOwner(await getUserById(localStorage.getItem('token'),
            file.user_id));
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);


  if (file.media_type === 'image') file.media_type = 'img';


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
            component={file.media_type}
            controls
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
