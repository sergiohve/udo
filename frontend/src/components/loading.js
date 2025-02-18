import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Dialog, DialogContent } from '@mui/material';

function Loading({open, handleClose}) {
    return (
        <div className="flex items-center justify-center h-screen">
            <Dialog open={open} onClose={handleClose}>
                <DialogContent className="flex items-center justify-center h-24">
                    <CircularProgress size={50} color="secondary" />
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default Loading;