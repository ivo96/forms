import React, { useContext } from 'react'
import Button from '@material-ui/core/Button';
import { FormsContext } from '../../context/FormsContext';
import { addForm } from '../../context/FormsActions';

export default function FormButton({formSchema, buttonName}) {
    const { formsDispatch } = useContext(FormsContext);
    const handleButtonClick = (e) => {
        addForm(formSchema, formsDispatch);
    };
    return (
        <Button onClick={handleButtonClick}>
            {buttonName}
        </Button>
    )
}
