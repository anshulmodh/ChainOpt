import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

function Dashboard(props) {
  const {
    selectDashboard,
  } = props;

  useEffect(selectDashboard, [selectDashboard]);

  return (
    <Fragment>
      <h1>Metrics</h1>
    </Fragment>
  );
}

Dashboard.propTypes = {
  selectDashboard: PropTypes.func.isRequired,
};

export default Dashboard;
