import { render } from '@testing-library/react';
import EmployeeEdit from './employee-edit';
import { BrowserRouter } from 'react-router-dom';

describe('EmployeeEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <EmployeeEdit />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
