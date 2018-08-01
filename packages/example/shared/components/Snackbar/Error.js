import React from 'react';
import Snackbar from '../Snackbar';

export default function SnackbarSuccess(props) {
  return <Snackbar actionHandler={props.retry} actionText={'Retry'} backgroundColor="#F44336" {...props} />
}