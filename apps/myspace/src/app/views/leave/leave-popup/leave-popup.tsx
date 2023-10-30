import styles from './leave-popup.module.css';

/* eslint-disable-next-line */
export interface LeavePopupProps {}

export function LeavePopup(props: LeavePopupProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LeavePopup!</h1>
    </div>
  );
}

export default LeavePopup;
