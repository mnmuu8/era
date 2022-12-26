import React from 'react'
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const SelectBox = (props) => {
  return (
    <FormControl className='c-select-box'>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required} value={props.value}
        onChange={(e) => props.select(e.target.value)}
      >
        {props.options.map((option) => {
          return <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
        })}
      </Select>
    </FormControl>
  )
}

export default SelectBox
