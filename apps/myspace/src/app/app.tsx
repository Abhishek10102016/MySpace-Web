// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import AppRouter from './routing/appRouter';
import { ToastContainer } from 'react-toastify';

export function App() {
  return (
    <>
      <ToastContainer />
      <AppRouter />
    </>
  );
}

export default App;
