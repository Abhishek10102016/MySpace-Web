import styles from './employee.module.css';

/* eslint-disable-next-line */
export interface EmployeeProps {}

export function Employee(props: EmployeeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Employee!</h1>
    </div>
  );
}

export default Employee;
