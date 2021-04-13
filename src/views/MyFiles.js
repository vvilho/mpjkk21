import React from 'react';
import MediaTable from '../components/MediaTable';
import {Typography} from '@material-ui/core';
import BackButton from '../components/BackButton';

const MyFiles = () => {
  return (
    <>
      <BackButton />
      <Typography
        component='h1'
        variant='h2'
        align={'center'}
        gutterBottom
      >My Files
      </Typography>
      <MediaTable ownFiles={true}/>
    </>
  );
};

export default MyFiles;
