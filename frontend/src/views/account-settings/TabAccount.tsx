// ** React Imports
import { useState, ElementType, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button, { ButtonProps } from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import { editUserRequest, getUserRequest } from 'src/requests/users.request'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

interface State {
  username: string;
  email: string;
}

const TabAccount = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [values, setValues] = useState<State>({
    username: '',
    email: '',
  })

  useEffect(() => {
		const getUser = async () => {
			const token = localStorage.getItem('token') as string;
      const response = await getUserRequest(token);

			if (response.user) {
				const { user: { username, email} } = response;
				setValues({ ...values, username, email });
			};
		};

		getUser();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    const newValues = { ...values, [prop]: event.target.value };

    setValues(newValues);
  }

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  const resetFields = () => {
    setValues({
      username: '',
      email: '',
    });
  }

  const saveChanges = async () => {
    const token = localStorage.getItem('token') as string;
    const { username, email } = values;

    const response = await editUserRequest(token, { username, email });

    alert(response.message);

    if (response.status === 200) {
      localStorage.setItem('token', response.token);
    } else {
      resetFields();
    };
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField value={values.username} onChange={handleChange('username')} fullWidth label='Username' placeholder='johnDoe' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={values.email}
              onChange={handleChange('email')}
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button onClick={saveChanges} variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button onClick={resetFields} type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
