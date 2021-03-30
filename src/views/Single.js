import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Typography,
  Paper,
  Card,
  makeStyles, CardMedia, CardContent,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: '50vh',
  },
});

const Single = ({location}) => {
  const classes = useStyles();
  console.log('match', location.state);
  const file = location.state;
  console.log(uploadsUrl + file.filename);


  return (
    <>
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
          />
          <CardContent>
            <Typography gutterBottom>{file.description}</Typography>
            <Typography variant="subtitle2">{file.user_id}</Typography>

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
