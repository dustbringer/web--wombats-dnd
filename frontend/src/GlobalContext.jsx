import React from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = React.createContext(null);

// maybe move all this to 'AlertContext' if more things come up
// seperate the contexts!
const GlobalProvider = ({ children }) => {
  const [alertErrorOpen, setAlertErrorOpen] = React.useState(false);
  const [alertErrorMsg, setAlertErrorMsg] = React.useState('No Error!');
  const [alertSuccessOpen, setAlertSuccessOpen] = React.useState(false);
  const [alertSuccessMsg, setAlertSuccessMsg] = React.useState('No Success!');

  const store = {
    AlertErrorOpen: [alertErrorOpen, setAlertErrorOpen],
    AlertErrorMsg: [alertErrorMsg, setAlertErrorMsg],
    AlertSuccessOpen: [alertSuccessOpen, setAlertSuccessOpen],
    AlertSuccessMsg: [alertSuccessMsg, setAlertSuccessMsg],
    AlertQueue: [],
    showError: (msg) => {
      setAlertErrorMsg(msg);
      setAlertErrorOpen(true);
    },
    showSuccess: (msg) => {
      setAlertSuccessMsg(msg);
      setAlertSuccessOpen(true);
    },
  };

  return <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>;
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
