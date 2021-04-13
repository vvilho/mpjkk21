import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import {
  Button,
  CircularProgress,
  Grid, Slider,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useSlider from '../hooks/SliderHooks';
import BackButton from '../components/BackButton';
import {uploadsUrl} from '../utils/variables';


const Modify = ({history, location}) => {
  const {putMedia, loading} = useMedia();
  const file = location.state;

  const desc = JSON.parse(file.description);

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
      const data = {
        title: inputs.title,
        description: JSON.stringify({
          description: inputs.description,
          filters: sliderInputs,
        }),
      };
      const token = localStorage.getItem('token');
      const result = await putMedia(data, file.file_id, token);
      console.log('doUpload', result);
    } catch (e) {
      console.log(e.message);
    } finally {
      history.push('/myfiles');
    }
  };
  const {inputs, handleInputChange, handleSubmit} =
    useUploadForm(doUpload, {
      title: file.title,
      description: desc.description,

    });

  const [sliderInputs, handleSliderChange] = useSlider(desc.filters);

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
            Modify
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


              <Grid container item>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  fullWidth
                >Lähetä</Button>
              </Grid>

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
                    src={uploadsUrl + file.filename}
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
            </Grid>
          </ValidatorForm>:
          <CircularProgress></CircularProgress>
        }
      </Grid>
    </>
  );
};

Modify.propTypes ={
  history: PropTypes.object,
  location: PropTypes.object,
};

export default Modify;
