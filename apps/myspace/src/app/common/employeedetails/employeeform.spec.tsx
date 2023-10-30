import { render } from '@testing-library/react';

import Employeeform from './employeeform';

describe('Employeedetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Employeeform />);
    expect(baseElement).toBeTruthy();
  });
});
