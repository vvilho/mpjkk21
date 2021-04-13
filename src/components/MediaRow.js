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
import {useMedia} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';

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


const MediaRow = ({file, ownFiles, history}) => {
  const classes = useStyles();
  const {deleteMedia} = useMedia();

  const desc = JSON.parse(file.description);
  console.log(typeof(ownFiles));

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={file.thumbnails ? uploadsUrl + file.thumbnails.w160: '#'}
        alt={file.title}
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
        <Typography variant="h5" component="h2">
          {file.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {desc.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={{pathname: '/single/', state: file}}>View</Link>
        </Button>

        {ownFiles &&

          <div>
            <Button size="small" color="primary">
              <Link to={{
                pathname: '/modify/',
                state: file,
              }}>
            Modify</Link>
            </Button>

            <Button
              size="small"
              color="secondary"
              variant={'contained'}
              onClick={() => {
                try {
                  const confirmation = window.confirm('sure to delete?');
                  if (confirmation) {
                    deleteMedia(file.file_id, localStorage.getItem('token'));
                    history.push('/profile');
                  }
                } catch (e) {
                  console.log(e.message);
                }
              }}>Delete
            </Button>
          </div>
        }

      </CardActions>
    </Card>
  );
};

MediaRow.propTypes ={
  file: PropTypes.object,
  history: PropTypes.object,
  ownFiles: PropTypes.bool,
};

export default withRouter(MediaRow);
