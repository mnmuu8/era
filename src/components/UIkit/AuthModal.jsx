import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import PrimaryButton from './PrimaryButton';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AuthModal = (props) => {

  const dispatch = useDispatch();
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="c-auth-modal"
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <h2>サインインしてください</h2>
            <PrimaryButton label={"サインイン"} onClick={() => dispatch(push("/signin"))} />
            <p onClick={() => dispatch(push("/signup"))}>アカウント登録はこちら</p>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AuthModal;