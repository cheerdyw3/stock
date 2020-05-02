import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import Axios from "axios";
import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Link,
  Grid,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import loginReducer from "../../reducers/login.reducer";
import * as loginAction from "./../../actions/login.action";
import { useDispatch, useSelector } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props) {
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);//แมท Reducer
  const classes = useStyles();
  function showForm({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) {
    return (
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={values.username}
          onChange={handleChange}
          id="username"
          label="Username"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={values.password}
          onChange={handleChange}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {loginReducer.error && (
          <Alert severity="error">{loginReducer.result}</Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isSubmitting}
        >
          Register
        </Button>
        <Button
          onClick={() => props.history.goBack()}
          fullWidth
          size="small"
          color="primary"
        >
          Cancel
        </Button>
      </form>
    );
  }
  return (
    <div>
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/images/authen_header.jpg`}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Register
        </Typography>

        <Formik
          initialValues={{ username: "admin", password: "1324" }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            Axios.post("http://localhost:8085/authen/register", values)
              .then((result) => {
                setSubmitting(false);
                if (result.data.success == true) {
                  dispatch(loginAction.setSuccess());
                } else {
                  dispatch(loginAction.hasError("Error, Somting went wrong."));
                }
              })
              .catch((error) => {
                alert(JSON.stringify(error));
              });
          }}
        >
          {(props) => showForm(props)}
        </Formik>
      </CardContent>
    </Card>

    <Dialog
        open={!loginReducer.error && loginReducer.result == "ok"}
        keepMounted
        onClose={()=>{}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{}} color="primary">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
