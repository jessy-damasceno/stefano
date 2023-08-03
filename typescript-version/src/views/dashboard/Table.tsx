import { useState, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { getContactsRequest, addNewContact, removeContactRequest, IContact, editContactRequest } from 'src/requests/contacts.request'
import { IconButton } from '@material-ui/core'

interface State {
  contactName: string
  email: string
  id: number | null
}

const DashboardTable = () => {
  // ** State
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')
  const [contacts, setContacts] = useState<IContact[]>([])
  const [values, setValues] = useState<State>({
    contactName: '',
    email: '',
    id: null,
  })

  useEffect(() => {
    const getContacts = async () => {
      const tokenToSave = localStorage.getItem('token') as string
      setToken(tokenToSave)
      const response = await getContactsRequest(tokenToSave)

      setContacts(response.contacts)
    }

    getContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetFields = () => {
    setIsEdit(false);
    setValues({
      contactName: '',
      email: '',
      id: null,
    });
  }

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    const newValues = { ...values, [prop]: event.target.value }

    setValues(newValues)
  }

  const handleClick = async () => {
    const response = await addNewContact(token, {
      contactName: values.contactName,
      email: values.email
    })

    console.log(response.status)

    if (response.status === 201) {
      setContacts([...contacts, response.contact as IContact])
    }

    console.log(contacts)

    alert(response.message)
    resetFields()
  }

  const removeContact = async (id: string | number) => {
    const response = await removeContactRequest(token, id)

    if (response.status === 200) {
      const newContacts = contacts.filter(contact => contact.id != id)
      setContacts(newContacts)
    }

    alert(response.message)
  }

  const startEdit = (id: number) => {
    const contactToEdit = contacts.find(contact => contact.id === id) as IContact;

    setValues({
      contactName: contactToEdit.contactName,
      email: contactToEdit.email,
      id
    })

    setIsEdit(true)
  };

  const editContact = async () => {
    const { contactName, email, id } = values;
    const response = await editContactRequest(token, id as number, {
      contactName,
      email
    });

    if (response.status === 200) {
      const newContacts = contacts.map(contact => contact.id === id? {...contact, contactName, email } : contact)
      setContacts(newContacts);
    };

    alert(response.message);
    setIsEdit(false);
  };

  console.log(isEdit)

  return (
    <Card>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Contact Name'
                placeholder='Leonard Carter'
                value={values.contactName}
                onChange={handleChange('contactName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                placeholder='carterleonard@gmail.com'
                value={values.email}
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button fullWidth onClick={() => !isEdit ? handleClick() : editContact()} variant='contained' size='large'>
                {!isEdit ? 'ADD NEW CONTACT' : 'EDIT CONTACT'}
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button fullWidth onClick={resetFields} color='error' variant='outlined' size='large'>
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>

      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Contact Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact: IContact) => (
              <TableRow hover key={contact.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{contact.id}</TableCell>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                      {contact.contactName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => startEdit(contact.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => removeContact(contact.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
