import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProduct, clearErrors } from '../../store/product';
import ProductEditForm from './ProductEditForm';

export default function ProductEdit() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  // Get existing product
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      await dispatch(getProduct(id));
      setIsLoading(false);
    };

    fetchProduct();

    return () => {
      dispatch(clearErrors());
    };
  }, []);

  return !isLoading ? <ProductEditForm /> : <div>Loading...</div>;
}
