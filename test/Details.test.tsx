import React, { useEffect } from 'react';
import { render } from '@testing-library/react-native';
import Details from '../components/Details';
import { MyProvider, useMyContext } from '../context/MyContext';

test('renders correctly and modal is open', () => {
 
  const { getByText } = render(
    <MyProvider>
      <TestComponent />
    </MyProvider>
  );

 
  const backButton = getByText('BACK');
  expect(backButton).toBeDefined();

  
  const deleteButton = getByText('Delete');
  expect(deleteButton).toBeDefined();
});


const TestComponent = () => {
  const { setDetails } = useMyContext();

  useEffect(() => {
   
    setDetails({ on: true, data: null });
  }, [setDetails]);

  return <Details />;
};
