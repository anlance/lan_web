import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const RouteWithSubRoutes = route => (<Route
      path={route.path}
      exact={route.exact}
      render={props => {
            return (
                  route &&( route.Redirect ? (<Redirect to={route.Redirect}></Redirect>) :
                  (<route.component {...props} routes={route.routes} />))
            )
      }}
/>
);

export const RenderRoutes = ({ routes }) => {
      return (routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />))
};
