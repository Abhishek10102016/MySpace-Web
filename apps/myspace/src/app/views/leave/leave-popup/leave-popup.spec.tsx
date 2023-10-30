import { render } from '@testing-library/react';

import LeavePopup from './leave-popup';

describe('LeavePopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LeavePopup />);
    expect(baseElement).toBeTruthy();
  });
});
