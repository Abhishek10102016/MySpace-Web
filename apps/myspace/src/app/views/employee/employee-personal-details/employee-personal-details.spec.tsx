import { render } from '@testing-library/react';

import EmployeePersonalDetails from './employee-personal-details';
import { BrowserRouter } from 'react-router-dom';

describe('EmployeePersonalDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <EmployeePersonalDetails />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
