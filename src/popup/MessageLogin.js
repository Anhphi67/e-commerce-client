import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory,
  Link
} from "react-router-dom";
export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  let history = useHistory();

  const handleClickOpen = () => {
  };
  const handleClose_Y = () => {
    props.handleChange()
    history.push("/signin")
  };
  const handleClose_N = () => {
    props.handleChange()
  };

  return (
    <div className="cursor-default">

      <Dialog
        open={props.obj.show}
        onClose={handleClose_N}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.obj.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.obj.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose_N} color="primary" className="outline-none">
            Từ chối
          </Button>
          <Button onClick={handleClose_Y} color="primary" className="outline-none" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
