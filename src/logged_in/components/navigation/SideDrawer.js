import PropTypes from "prop-types";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
  Box,
  withStyles,
} from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import CloseIcon from "@material-ui/icons/Close";
import { AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Auth, Hub, API } from 'aws-amplify'
// import { useReactOidc } from '@axa-fr/react-oidc-context';
// import oidcConfiguration from './configuration';

const drawerWidth = 240;

const styles = (theme) => ({
  toolbar: {
    minWidth: drawerWidth
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  permanentDrawerListItem: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

function signOut() {
  // console.log(Auth.currentAuthenticatedUser())
  try {
      console.log(Auth.signOut());
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

async function globalSignOut() {
  try {
      await Auth.signOut({ global: true });
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

function SideDrawer(props) {
  const { selectedTab, classes, onClose, open } = props;
  // const { oidcUser, logout, events } = useReactOidc();
  const links = useRef([]);
  // const addUserEvent = user => console.log(`********* User Loaded :${user.profile} *********`);

  // const logoutCognito = () => {
  //   var url = "https://chainopt-dev.auth.us-east-1.amazoncognito.com/logout?client_id=153nh5kdekmb7e8vn9330ii7c9&logout_uri=http%3A%2F%2Flocalhost%3A3000%2F";

  // }

  // React.useEffect(() => {
  //   events.addUserLoaded(addUserEvent);
  //   return () => {
  //     events.removeUserLoaded(addUserEvent);
  //   };
  // });
  const menuItems = [
    // {
    //   link: "/",
    //   name: "Logout",
    //   icon: {
    //     desktop: (
    //       <PowerSettingsNewIcon className="text-white" fontSize="small" />
    //     ),
    //     mobile: <PowerSettingsNewIcon className="text-white" />,
    //   },
    //   // onClick: logoutCognito,
    // },
  ];

  return (
    <Drawer anchor="right" open={open} variant="temporary" onClose={onClose}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Box
          pl={3}
          pr={3}
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="h6">Account</Typography>
          <IconButton
            onClick={onClose}
            color="primary"
            aria-label="Close Sidedrawer"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((element, index) => (
          <Link
            to={element.link}
            className={classes.menuLink}
            onClick={element.onClick}
            key={index}
            ref={(node) => {
              links.current[index] = node;
            }}
          >
            <Tooltip
              title={element.name}
              placement="right"
              key={element.name}
            >
              <ListItem
                selected={selectedTab === element.name}
                button
                divider={index !== menuItems.length - 1}
                className={classes.permanentDrawerListItem}
                onClick={() => {
                  links.current[index].click();
                }}
                aria-label={
                  element.name === "Logout"
                    ? "Logout"
                    : `Go to ${element.name}`
                }
              >
                <ListItemText
                primary={
                  <Typography variant="subtitle1" color="secondary" align="center">
                    {element.name}
                  </Typography>
                }
              />
                {/* <ListItemIcon className={classes.justifyCenter}>
                  {element.icon.desktop}
                </ListItemIcon> */}
              </ListItem>
            </Tooltip>
          </Link>
        ))}
      </List>
      {/* <Link to="/"> */}
        <button onClick={signOut}>logout</button>
        <button onClick={globalSignOut}>global logout</button>
      {/* </Link> */}
      {/* <Link to="/">
        <AmplifySignOut />
      </Link> */}
    </Drawer>
  );
}

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default (withStyles(styles, { withTheme: true })(SideDrawer));

// export default withStyles(styles)(SideDrawer);
