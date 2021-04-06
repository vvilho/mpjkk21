/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const Logout = ({history}) => {
  const [user, setUser] = useContext(MediaContext);

  useEffect(() => {
    setUser(null);
    localStorage.clear();

    // history.push('/');
  }, []);

  return (
    <>
      <Redirect to={'/login'} />
    </>
  );
};

Logout.propTypes ={
  history: PropTypes.object,
};

export default Logout;
