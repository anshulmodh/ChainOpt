import React, { memo, useCallback, useState, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";

const styles = (theme) => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
});

function Main(props) {
  const { classes, user } = props;
  const [selectedTab, setSelectedTab] = useState(null);

  const selectDashboard = useCallback(() => {
    smoothScrollTop();
    document.title = "ChainOpt - Metrics";
    setSelectedTab("metrics");
  }, [
    setSelectedTab,
  ]);

  return user ? (
    <Fragment>
      <NavBar
        selectedTab={selectedTab}
        user={user}
      />
      <main className={classNames(classes.main)}>
        <Routing
          selectDashboard={selectDashboard}
        />
      </main>
    </Fragment>
  ): (
    <div></div>
  )

  
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
