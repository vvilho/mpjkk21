/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: '50vw',
    margin: 'auto',
    marginBottom: 20,

  },
  media: {
    height: 100,
    width: 100,
  },
});


const MediaRow = ({file}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={file.thumbnails ? uploadsUrl + file.thumbnails.w160: '#'} alt={file.title}
        title={file.title}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {file.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {file.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={{pathname: '/single/', state: file}}>View</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

MediaRow.propTypes ={
  file: PropTypes.object,
};

export default MediaRow;
