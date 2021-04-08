import useUploadForm from '../hooks/UploadHooks';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {
  Button,
  CircularProgress,
  Grid, Slider,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import useSlider from '../hooks/SliderHooks';
import BackButton from '../components/BackButton';


const Upload = ({history}) => {
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();

  const validators = {
    title: ['required', 'minStringLength: 3'],
    description: ['minStringLength: 5'],

  };

  const errorMessages = {
    title: ['vaadittu kenttä', 'minimissään 3 merkkiä'],
    description: ['minimissän 5 merkkiä'],

  };

  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      // kuvaus + filtterit tallennetaan descriptioniin
      const desc = {
        description: inputs.description,
        filters: sliderInputs,
      };
      fd.append('description', JSON.stringify(desc));
      fd.append('file', inputs.file);
      const token = localStorage.getItem('token');
      const result = await postMedia(fd, token);
      const tagResult = await postTag(token, result.file_id);
      console.log(result, tagResult);
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

  const [sliderInputs, handleSliderChange] = useSlider({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
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
  }, [inputs.file]);

  console.log(inputs, sliderInputs);


  return (
    <>
      <BackButton />
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
              validators={validators.title}
              errorMessages={errorMessages.title}

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
              validators={validators.description}
              errorMessages={errorMessages.description}
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
          {inputs.dataUrl?.length > 0 &&
            <>
              <Grid
                item
                xs={12}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}

              >
                <img
                  src={inputs.dataUrl}
                  style={{
                    filter: `
                    brightness(${sliderInputs.brightness}%)
                    contrast(${sliderInputs.contrast}%)
                    saturate(${sliderInputs.saturate}%)
                    sepia(${sliderInputs.sepia}%)

                    `,
                    width: 300,
                    margin: 'auto',


                  }}
                />
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Typography>Brightness</Typography>
                  <Slider
                    min={0}
                    max={200}
                    step={1}
                    name='brightness'
                    value={sliderInputs?.brightness}
                    valueLabelDisplay='on'
                    onChange={handleSliderChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Contrast</Typography>
                  <Slider
                    min={0}
                    max={200}
                    step={1}
                    name='contrast'
                    value={sliderInputs?.contrast}
                    valueLabelDisplay='on'
                    onChange={handleSliderChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Saturation</Typography>
                  <Slider
                    min={0}
                    max={200}
                    step={1}
                    name='saturate'
                    value={sliderInputs?.saturate}
                    valueLabelDisplay='on'
                    onChange={handleSliderChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Sepia</Typography>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    name='sepia'
                    value={sliderInputs?.sepia}
                    valueLabelDisplay='on'
                    onChange={handleSliderChange}
                  />
                </Grid>
              </Grid>
            </>
          }
        </Grid>
      </ValidatorForm>:
      <CircularProgress></CircularProgress>
        }
      </Grid>
    </>
  );
};

Upload.propTypes ={
  history: PropTypes.object,
};

export default Upload;
