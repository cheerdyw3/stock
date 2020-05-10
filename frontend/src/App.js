import React, { useEffect, Component } from "react";
import { Button, Container } from "@material-ui/core";
import Header from "./components/fragments/Header";
import Menu from "./components/fragments/Menu";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Report from "./components/pages/Report";
import AboutUs from "./components/pages/AboutUs";
import * as loginAction from "./actions/login.action";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Stock from "./components/pages/Stock";
import StockEdit from "./components/pages/StockEdit";
import StockCreate from "./components/pages/StockCreate";
import { useSelector, useDispatch } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const SecurdRoute = ({component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props=>
      //ternary condition
      loginAction.isLoggedIn() ? (
        <Component {...props} />
      ):(
        <Redirect to="/login" />
      )
    }
  />
);

const LoginRoute = ({component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props=>
      //ternary condition
      loginAction.isLoggedIn() ? (
        <Redirect to="/stock" />
      ):(
        <Login {...props} />
      )
    }
  />
);

export default function App() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const dispatch = useDispatch();
  //ถูกเรียกเมื่อ component ถูกสร้างถึ้นมา
  useEffect(() => {
    dispatch(loginAction.reLogin());
  }, [])//เรียกครั้เดียวลบ Input คือไม่ต้แง tag

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const loginReducer = useSelector(({ loginReducer }) => loginReducer);

  return (
    <Router>
      {loginReducer.result && !loginReducer.error && (
        <Header handleDrawerOpen={handleDrawerOpen} open={openDrawer} />
      )}
      {loginReducer.result && !loginReducer.error && (
        <Menu open={openDrawer} handleDrawerClose={handleDrawerClose} />
      )}
      <div className={classes.drawerHeader} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]:
            openDrawer && loginReducer.result && !loginReducer.error,
        })}
      >
      <Container style={{display:"flex",justifyContent:"center"}}>
        <Switch>
          <LoginRoute path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <SecurdRoute path="/stock" component={Stock} />
          <SecurdRoute path="/stockCreate" component={StockCreate} />
          <SecurdRoute path="/stockEdit/:id" component={StockEdit} />
          <Route
            exact={true}
            path="/"
            component={() => <Redirect to="/login" />}
          />
          <SecurdRoute path="/report" component={Report} />
          <SecurdRoute path="/aboutus" component={AboutUs} />
        </Switch>
      </Container>
      </main>
    </Router>
  );
}
