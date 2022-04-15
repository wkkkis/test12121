import React from 'react';

//Compopent
import { TextField } from '@material-ui/core';

//Interfaces
import { IField } from './Field.type';

const Field: React.FC<IField> = ({label, onChange, ...props}) => {

  return (
    <TextField 
        label={label} 
        onChange={onChange}
        {...props}
    />
  );
}

export default Field