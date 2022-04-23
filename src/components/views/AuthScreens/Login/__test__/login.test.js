import '@testing-library/jest-dom';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, screen, render } from '@testing-library/react';

import { loginEndpoint } from 'shared/endPoints';
import App, { LocationDisplay } from '../../../App';

import Login from '..';

// Ok, so here's what your tests might look like

// this is a handy function that I would utilize for any component
// that relies on the router being in context
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

// test('rendering a component that uses withRouter', () => {
//   const route = '/login';
//   const { getByTestId } = renderWithRouter(<LocationDisplay />, { route });
//   expect(getByTestId('location-display').textContent).toBe(route);
// });

// const server = setupServer(
//   rest.post(loginEndpoint, (req, res, ctx) => {
//     return res(ctx.json({ token: 'fake_user_token' }));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => {
//   server.resetHandlers();
//   window.localStorage.removeItem('token');
// });
// afterAll(() => server.close());

// test('allows the user to login successfully', async () => {
//   const route = '/login';
//   renderWithRouter(<App theme="dark" />, { route });

//   const fakeUserResponse = { data: 'response' };

//   fireEvent.change(screen.getByLabelText(/username/i), {
//     target: { value: 'jawadulhassan150@gmail.com' },
//   });
//   fireEvent.change(screen.getByLabelText(/password/i), {
//     target: { value: 'Click@123' },
//   });

//   fireEvent.click(screen.getByText(/login/i));

//   expect(window.localStorage.getItem('token')).toEqual(fakeUserResponse.token);
// });

// test('handles server exceptions', async () => {
//   // mock the server error response for this test suite only.
//   server.use(
//     rest.post('/', (req, res, ctx) => {
//       return res(
//         ctx.status(500),
//         ctx.json({ message: 'Internal server error' })
//       );
//     })
//   );

//   render(<Login />);

//   // fill out the form
//   fireEvent.change(screen.getByLabelText(/username/i), {
//     target: { value: 'jawadulhassan150@gmail.com' },
//   });
//   fireEvent.change(screen.getByLabelText(/password/i), {
//     target: { value: 'Click@123' },
//   });

//   fireEvent.click(screen.getByText(/login/i));

//   expect(window.localStorage.getItem('token')).toBeNull();
// });
