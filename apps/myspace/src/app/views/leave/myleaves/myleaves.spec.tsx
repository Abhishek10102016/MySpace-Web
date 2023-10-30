import { render } from '@testing-library/react';

import Leavestable from './leavestable';

describe('Leavestable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Leavestable />);
    expect(baseElement).toBeTruthy();
  });
});
