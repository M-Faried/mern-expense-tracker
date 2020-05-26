import React, { useContext, Fragment } from 'react';
import { AlertContext } from '../../context/AlertContext';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    <Fragment>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert`}>
            <i className='fas fa-info-circle' /> {alert.msg}
          </div>
        ))}
    </Fragment>
  );
};

export default Alerts;
