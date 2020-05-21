export const addForm = (form, dispatch) => {
  dispatch({
    type: 'ADD_FORM',
    form,
  });
};


export const deleteForm = (formId, dispatch) => {
  dispatch({
    type: 'DELETE_FORM',
    formId,
  });
};

export const changeInput = (formId, fieldId, fieldValue, dispatch) => {
  dispatch({
    type: 'CHANGE_INPUT',
    formId,
    fieldId, 
    fieldValue,
  });
};
