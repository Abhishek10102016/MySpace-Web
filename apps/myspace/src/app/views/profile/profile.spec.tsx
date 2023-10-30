import { render } from '@testing-library/react';

import Profile from './profile';
import { BrowserRouter } from 'react-router-dom';

describe('Profile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
