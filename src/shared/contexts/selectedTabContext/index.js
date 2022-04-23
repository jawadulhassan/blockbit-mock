import React from 'react';

const SelectedTabContext = React.createContext({});

export const SelectedTabProvider = SelectedTabContext.Provider;
export const SelectedTabConsumer = SelectedTabContext.Consumer;

export default SelectedTabContext;
