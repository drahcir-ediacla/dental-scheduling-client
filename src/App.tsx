import { useEffect } from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authUser } from './redux/actions/authUserActions';
import { useAppDispatch, useAppSelector, } from './redux/store';
import type { RootState } from './redux/store';


const Home = lazy(() => import('./pages/HomePage'));
const LoginUser = lazy(() => import('./pages/LoginUser'));
const CreateAccount = lazy(() => import('./pages/CreateAccount'));
const BookAppointment = lazy(() => import('./pages/BookAppointment'));

function App() {
  const currentUser = useAppSelector((state: RootState) => state.auth.data);
  console.log('currentUser:', currentUser)
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Suspense fallback='...Loading'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-appointment" element={!currentUser ? <Navigate to="/" /> : <BookAppointment />} />
            <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginUser />} />
            <Route path="/create-account" element={currentUser ? <Navigate to="/" /> : <CreateAccount />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
