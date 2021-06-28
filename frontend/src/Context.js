import React from 'react';

export const AuthUserContext = React.createContext({
	user: null,
	setUser: () => {},
});

export const RouteContext = React.createContext({
	location: window.location,
	setLocation: () => {},
});
