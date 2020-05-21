import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SerratedTabs from '../Tabs/SerratedTabs';
import AddFormButton from '../Buttons/AddFormButton';
import Form from '../Form/Form';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { v4 as uuidv4 } from 'uuid'; 
import { makeStyles } from '@material-ui/core/styles';

import { FormsContext } from '../../context/FormsContext';
import { deleteForm } from '../../context/FormsActions';


const useStyles = makeStyles((theme) => ({
  centerButtons: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    borderRadius: 0,
  }
}))


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

export default function Demo() {
  const [index, setIndex] = useState(0);
  const { formsState, formsDispatch } = useContext(FormsContext);
  const classes = useStyles();

  const form1 = {
    id: uuidv4(),
    label: 'Form1',
    formfields: [
      {
        id :"phone-number",
        label: "Phone Number",
        type: "Number",
        value: ""
      }
    ]
  };
  
  const form2 = {
    id: uuidv4(),
    label: 'Form2',
    formfields: [
      {
        id :"first-name",
        label: "First Name",
        type: "text",
        value: ""
      },
      {
        id :"second-name",
        label: "Second Name",
        type: "text",
        value: ""
      },
      {
        id :"third-name",
        label: "Third Name",
        type: "text",
        value: ""
      }
    ]
  };
  
  const form3 = {
    id: uuidv4(),
    label: 'Form3',
    formfields: [
      {
        id :"email",
        label: "Email",
        type: "email",
        value: ""
      },
      {
        id :"password",
        label: "Password",
        type: "password",
        value: ""
      },
    ]
  };

  const handleFormDeletion = (formId) => {
    deleteForm(formId, formsDispatch);
    if(formsState.length > index && index > 0) {
      setIndex(index - 1)
    }
  }

  const handleTabChange = (e, currentIndex) => {
    setIndex(currentIndex);
  }
  
  return (
    <>
      <div className={classes.centerButtons}>
        <ButtonGroup fullWidth size="large" color="primary" aria-label="large outlined primary button group">
          <AddFormButton className={classes.button} formSchema={form1} buttonName="Form1"  />
          <AddFormButton className={classes.button} formSchema={form2} buttonName="Form2" />
          <AddFormButton className={classes.button} formSchema={form3} buttonName="Form3" />
        </ButtonGroup>
      </div>
      <AppBar
        position={'static'}
        elevation={0}
        style={{ backgroundColor: '#E6E8EB' }}
      >
        <Toolbar
          style={{ overflow: 'hidden' }}
        >
          <SerratedTabs
            style={{ alignSelf: 'flex-end' }}
            tabs={formsState}
            tabStyle={{
              bgColor: '#4486a3',
              selectedBgColor: '#ffffff',
            }}
            tabProps={{
              disableRipple: true,
            }}
            value={index}
            onChange={handleTabChange}
            deleteTabHandler={handleFormDeletion}
          />
        </Toolbar>
      </AppBar>
      <TabPanel value={index} index={index}>
          { formsState[index] &&
            <Form formId={formsState[index].id} index={index} />
          }
      </TabPanel>
    </>
  );
};