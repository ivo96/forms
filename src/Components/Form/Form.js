import React, {useContext, useState, useEffect} from 'react'
import { FormsContext } from '../../context/FormsContext';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { changeInput } from '../../context/FormsActions';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


export default function Form1({formId, index}) {
    const { formsState, formsDispatch } = useContext(FormsContext);
    const { formfields } = formsState.find(item => item.id === formId);
    const [fields, setFields] = useState(formfields);
    
    const handleFieldChange = (event) => {
      changeInput(formId, event.target.id, event.target.value, formsDispatch);
    }

    useEffect(() => {
      function changeForm() {
        const { formfields } = formsState.find(item => item.id === formId);
        setFields(formfields);
      }
      changeForm()
    }, [formId, formsState])

    return (
        <form noValidate autoComplete="off">
          <Paper square>
          <Box p={5}>
            <Grid container direction="column" spacing={3}>
            {
              fields && fields.map(field => 
                (
                  <Grid container item xs={6}>
                    <TextField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        type={field.type}
                        value={field.value}
                        onChange={handleFieldChange}
                    />
                  </Grid>
                  )
                )
            }
            </Grid>
            </Box>
          </Paper>
        </form>
    )
}
