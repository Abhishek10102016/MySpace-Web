import { render } from '@testing-library/react';

import EmployeeEmploymentDetail from './employee-employment-detail';

describe('EmployeeEmploymentDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmployeeEmploymentDetail />);
    expect(baseElement).toBeTruthy();
  });
});
