import React from 'react'
import Button from '@material-ui/core/Button'

const PrimaryButton = (props) => {
  return (
    <Button onClick={() => props.onClick()}>
      {props.label}
    </Button>
  )
}

export default PrimaryButton
