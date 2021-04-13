import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const MediaTable = ({ownFiles}) => {
  const picArray = useAllMedia(ownFiles);

  const useStyles = makeStyles({
    root: {
    },

  });
  const classes = useStyles();

  return (

    <Container className={classes.root}>

      {
        picArray.map((item, index) =>
          (<MediaRow key={index} file={item} ownFiles={ownFiles}/>))
      }


    </Container>
  );
};


MediaTable.propTypes = {
  ownFiles: PropTypes.bool,
};

export default MediaTable;
