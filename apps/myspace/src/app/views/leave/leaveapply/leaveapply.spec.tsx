import { render } from '@testing-library/react';

import Leaveapply from './leaveapply';

describe('Leaveapply', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Leaveapply />);
    expect(baseElement).toBeTruthy();
  });
});
