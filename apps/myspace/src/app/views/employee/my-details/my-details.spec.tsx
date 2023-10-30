import { render } from '@testing-library/react';

import MyDetails from './my-details';

describe('MyDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyDetails />);
    expect(baseElement).toBeTruthy();
  });
});
