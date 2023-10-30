import { render } from '@testing-library/react';

import Employee from './employee';

describe('Employee', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Employee />);
    expect(baseElement).toBeTruthy();
  });
});
