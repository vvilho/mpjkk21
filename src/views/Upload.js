import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';


const Upload = ({history}) => {
  const {postMedia, loading} = useMedia();

  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      fd.append('description', inputs.description);
      fd.append('file', inputs.file);
      const token = localStorage.getItem('token');
      const result = await postMedia(fd, token);
      console.log(result);
    } catch (e) {
      console.log(e.message);
    } finally {
      history.push('/');
    }
  };
  const {inputs, handleInputChange, handleSubmit, handleFileChange, setInputs} =
    useUploadForm(doUpload, {
      title: '',
      description: '',
      file: null,
    });

  useEffect(()=>{
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setInputs((inputs)=>({
        ...inputs,
        dataUrl: reader.result,
      }));
    });
    if (inputs.file!== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs)=>({
          ...inputs,
          dataUrl: 'logo512.png',
        }));
      }
    }
  }, [inputs]);


  return (
    <Grid
      container
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Grid item xs={12}>
        <Typography
          component='h1'
          variant='h2'
          align={'center'}
          gutterBottom
        >
          Upload
        </Typography>
      </Grid>
      {inputs.dataUrl?.length > 0 &&
      <Grid item xs={12}>
        <img src={inputs.dataUrl}/>
      </Grid>
      }
      {!loading ?
      <ValidatorForm
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container

        >
          <Grid
            style={{
              width: '100%',
            }}>
            <TextValidator

              fullWidth
              name="title"
              label='Title'
              value={inputs.title}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid
            style={{
              width: '100%',
            }}>
            <TextValidator
              fullWidth
              name="description"
              label='Description'
              value={inputs.description}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid
            style={{
              width: '100%',
              marginBottom: 15,
            }}>
            <TextValidator
              fullWidth
              type="file"
              name="file"
              accept="image/*, audio/*, video/*"
              onChange={handleFileChange}
              required

            />
          </Grid>

          <Grid container item>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              fullWidth
            >Lähetä</Button>
          </Grid>
        </Grid>

      </ValidatorForm>:
      <CircularProgress></CircularProgress>
      }
    </Grid>
  );
};

Upload.propTypes ={
  history: PropTypes.object,
};

export default Upload;
