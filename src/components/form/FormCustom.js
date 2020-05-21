import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
// import { useForm } from '../../hooks/useForm';

export default function FormCustom({ fieldsInitial, id }) {
    const [fields, setValues] = useState(fieldsInitial);
    const handleFieldChange = (event) => {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
    console.log(id)
    console.log(fields);
    return (
      <form noValidate autoComplete="off">
        {
          fields.map(field => (
              <TextField
                  id={field.id}
                  label={field.label}
                  type={field.type}
                  value={field.value}
                  onChange={handleFieldChange}
              />
            )
          )
        }
      </form>
    )
}
