import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../store/auth';

export default function SignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const signOutUser = async () => {
      const response = await dispatch(signOut());
      if (response) {
        navigate('/');
      }
    };

    signOutUser();
  }, [dispatch, navigate]);

  return <div>Signing you out...</div>;
}
