import React from "react";
import { withStyles } from "@material-ui/core";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Subscription(props) {

  return (
    <h1>Models</h1>
  );
}

Subscription.propTypes = {
};

export default withStyles(styles)(Subscription);
