import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import Results from '../pages/Results';
import Login from '../pages/Login';
import Game from '../pages/Game';
import Admin from '../pages/admin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Game />
      </Layout>
    ),
  },
  {
    path: '/admin',
    element: (
      <Layout>
        <Admin />
      </Layout>
    ),
  },
  {
    path: '/results',
    element: (
      <Layout>
        <Results />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
]);
