import { render } from '@testing-library/react';

import Employeelist from './employeelist';
import { BrowserRouter } from 'react-router-dom';

describe('Employeelist', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Employeelist />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
