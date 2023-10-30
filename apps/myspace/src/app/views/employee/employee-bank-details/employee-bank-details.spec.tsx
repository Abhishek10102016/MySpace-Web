import { render } from '@testing-library/react';

import EmployeeBankDetails from './employee-bank-details';

describe('EmployeeBankDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmployeeBankDetails />);
    expect(baseElement).toBeTruthy();
  });
});
