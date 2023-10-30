import { render } from '@testing-library/react';

import ApproveRejectLeavePopup from './approve-reject-leave-popup';

describe('ApproveRejectLeavePopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApproveRejectLeavePopup />);
    expect(baseElement).toBeTruthy();
  });
});
