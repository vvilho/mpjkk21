import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const MediaTable = () => {
  const picArray = useAllMedia();

  const useStyles = makeStyles({
    root: {
    },

  });
  const classes = useStyles();

  return (

    <Container className={classes.root}>

      {
        picArray.map((item, index) => (<MediaRow key={index} file={item}/>))
      }


    </Container>
  );
};


export default MediaTable;
