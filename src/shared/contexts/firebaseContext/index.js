import React from 'react';

const FirebaseAuthContext = React.createContext({});

export const FirebaseAuthProvider = FirebaseAuthContext.Provider;
export const FirebaseAuthConsumer = FirebaseAuthContext.Consumer;

export default FirebaseAuthContext;
