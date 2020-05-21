import React, { createContext, useReducer } from 'react';

const initialState = [
  // {
  //   id: '',     // uuid
  //   label: '',
  //   formfields: [
  //       {
  //           fieldName: '',
  //           fieldValue: ''
  //       }
  //   ]
  // }
];  

export const FormsContext = createContext(initialState);

const addForm = (state, form) => ([...state, form ]);

const deleteForm = (state, formId) => ([...state.filter((form) => form.id !== formId)]);

// const handleFieldValueChange = (state, formId, fieldId, fieldValue) => ([
//   state.find(form => form.id === formId)
// ])

const changeInput = (state, formId, fieldId, fieldValue) => (
  [...state.map(form => {
    if (form.id === formId) {
      form.formfields = getChangedFormfields(state, formId, fieldId, fieldValue)
    }
    return form;
  })]
)

const getChangedFormfields = (formsState, formId, fieldId, fieldValue) => {
  const { formfields } = formsState.find(form => form.id === formId)
  return formfields.map(field => {
    if (field.id === fieldId) {
      field.value = fieldValue;
    }
    return field;
  })
}


const formsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FORM':
      return addForm(state, action.form);
    case 'DELETE_FORM':
      return deleteForm(state, action.formId);
    case 'CHANGE_INPUT':
      console.log('state in reducer', state);
      return changeInput(state, action.formId, action.fieldId, action.fieldValue)
    default:
      return state;
  }
};


export const FormsContextProvider = ({ children }) => {
  const [formsState, formsDispatch] = useReducer(formsReducer, initialState);

  return (
    <FormsContext.Provider
      value={{ formsState, formsDispatch }}
    >
      {children}
    </FormsContext.Provider>
  );
};
