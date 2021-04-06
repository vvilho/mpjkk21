import React from 'react';
import MediaTable from '../components/MediaTable';
import {Typography} from '@material-ui/core';

const Home = () => {
  return (
    <>
      <Typography
        component='h1'
        variant='h2'
        align={'center'}
        gutterBottom
      >
        Home
      </Typography>
      <MediaTable />
    </>
  );
};

export default Home;
