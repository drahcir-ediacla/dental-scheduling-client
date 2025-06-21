import { useEffect } from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authUser } from './redux/actions/authUserActions';
import { useAppDispatch, useAppSelector, } from './redux/store';
import type { RootState } from './redux/store';


const Home = lazy(() => import('./pages/HomePage'));
const LoginUser = lazy(() => import('./pages/LoginUser'));
const CreateAccount = lazy(() => import('./pages/CreateAccount'));

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
            <Route path="/" index element={<Home />} />
            <Route path="/login" index element={currentUser ? <Navigate to="/" />: <LoginUser />} />
            <Route path="/create-account" index element={currentUser ? <Navigate to="/" /> : <CreateAccount />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
