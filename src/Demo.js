import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SerratedTabs from './SerratedTabs';
import AddFormButton from './components/buttons/AddFormButton';
import { FormsContext } from './context/FormsContext';
import { deleteForm } from './context/FormsActions';
import { v4 as uuidv4 } from 'uuid'; 
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormCustom from './components/form/FormCustom';
import Form1 from './components/form/Form1';

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
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Demo = () => {
  const [index, setIndex] = useState(0);
  const { formsState, formsDispatch } = useContext(FormsContext);

  const handleFormDeletion = (formId) => {
    console.log('deleteid ', formId)
    console.log('filtered', formsState.filter((form) => form.id !== formId))
    deleteForm(formId, formsDispatch);
    if(formsState.length > index && index > 0) {
      setIndex(index - 1)
    }
  }

  const form1Schema = {
    id: uuidv4(),
    label: 'Form1',
    formfields: [
      {
        id :"id6",
        label: "Text",
        type: "text",
        value: ""
      }
    ]
  };

  const form2Schema = {
    id: uuidv4(),
    label: 'Form2',
    formfields: [
      {
        id :"id1",
        label: "Text",
        type: "text",
        value: ""
      },
      {
        id :"id2",
        label: "Text",
        type: "text",
        value: ""
      },
      {
        id :"id3",
        label: "Text",
        type: "text",
        value: ""
      }
    ]
  };

  const form3Schema = {
    id: uuidv4(),
    label: 'Form3',
    formfields: [
      {
        id :"id4",
        label: "Text",
        type: "text",
        value: ""
      },
    ]
  };

  const handleTabChange = (e, currentIndex) => {
    setIndex(currentIndex);
  }

  console.log('formsState', formsState)
  console.log('index', index)
  
  return (
    <>
      <AddFormButton formSchema={form1Schema} buttonName="Form1" />
      <AddFormButton formSchema={form2Schema} buttonName="Form2" />
      <AddFormButton formSchema={form3Schema} buttonName="Form3" />
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
          {/* {
            formsState[index] && 
              <FormCustom 
                fieldsInitial={formsState[index].formFields}
                id={formsState[index].id}
              />
          } */}
          { formsState[index] &&
            <Form1 formId={formsState[index].id} index={index} />
          }
      </TabPanel>
    </>
  );
};

export default Demo;