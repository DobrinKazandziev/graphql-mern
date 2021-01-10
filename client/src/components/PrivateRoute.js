import React, { useState, useEffect, useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

import LoadingToRedirect from './LoadingToRedirect';

const PrivateRoute = ({ children, ...rest }) => {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (state.userToken) {
      setUser(true);
    }
  }, [state.userToken]);

  const navLinks = () => (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/password/update">Password</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/post/create">Post</Link>
        </li>
      </ul>
    </nav>
  );

  const renderContent = () => (
    <div className="container-fluid pt-15">
      <div className="row">
        <div className="col-md-4">
          {navLinks()}
        </div>
        <div className="col-md-8">
          <Route {...rest} />
        </div>
      </div>
    </div>
  )

  return user ? renderContent() : <LoadingToRedirect path="/login" />
}

export default PrivateRoute;
