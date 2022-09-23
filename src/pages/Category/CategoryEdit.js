import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCategory, clearErrors } from '../../store/category';
import CategoryEditForm from './CategoryEditForm';

export default function CategoryEdit() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  // Get existing category
  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      await dispatch(getCategory(id));
      setIsLoading(false);
    };

    fetchCategory();

    return () => {
      dispatch(clearErrors());
    };
  }, []);

  return !isLoading ? <CategoryEditForm /> : <div>Loading...</div>;
}
