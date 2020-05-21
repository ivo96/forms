import React, {useContext, useState, useEffect} from 'react'
import { FormsContext } from '../../context/FormsContext';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { changeInput } from '../../context/FormsActions';

export default function Form1({formId, index}) {
    console.log(formId)
    const { formsState, formsDispatch } = useContext(FormsContext);
    const { formfields } = formsState.find(item => item.id === formId);
    console.log('formfields form1', formfields)
    const [fields, setFields] = useState(formfields);
    console.log('fields', fields);
    const handleFieldChange = (event) => {
      console.log('====================')
      console.log('id', event.target.id)
      console.log('formId', formId)
      console.log('value', event.target.value)
      console.log('====================')
      // console.log(getArr(event.target.id, event.target.value));
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
          <Grid container spacing={3}>
          {
            fields && fields.map(field => 
              (
                <Grid item xs={12}>
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
        </form>
    )
}
