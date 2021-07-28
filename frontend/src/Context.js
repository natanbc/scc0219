import React from 'react';

export const AuthUserContext = React.createContext({
	user: null,
	setUser: (_: Object) => {},
});

export const RouteContext = React.createContext({
	location: window.location,
	setLocation: (_: typeof window.location) => {},
});
