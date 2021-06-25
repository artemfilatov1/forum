import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSet = () => {
        props.setOpen(false);
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{'set avatar'}</DialogTitle>
                <form onSubmit={props.onSet}>
                    <DialogContent>
                        <DialogContentText>
                            {'click to button and find photo to avatar'}
                        </DialogContentText>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={(e) => props.setFile(e.target.files[0])}
                            accept=".jpg, .jpeg, .png"
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSet} color="primary" type='submit'>
                            Set
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
