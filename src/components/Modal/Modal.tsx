import React, { ReactNode } from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomModalProps {
  children: ReactNode;
  open: boolean;
  label: string;
  handleClose: (event: any, reason: string) => void;
}

const CustomModal = ({
  children,
  open = false,
  handleClose,
  label = ''
}: CustomModalProps) => {
  const handleCloseModal = (event: any) => {
    handleClose(event, 'backdropClick');
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          backgroundColor: '#FFF',
          width: '30%',
          height: '80%',
          overflow: 'auto',
          padding: '30px'
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{ top: '-15px', right: '10px' }}
        >
         <CloseIcon />
        </IconButton>
        <Typography variant="h5">
          {label}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;