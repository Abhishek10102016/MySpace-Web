import { render } from '@testing-library/react';

import Departmentlist from './departmentlist';

describe('Departmentlist', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Departmentlist />);
    expect(baseElement).toBeTruthy();
  });
});
