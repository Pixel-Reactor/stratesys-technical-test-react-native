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
  const idText = getByText('1');
  expect(idText).toBeDefined();

  
  const nameAndSurnameText = getByText('John Doe');
  expect(nameAndSurnameText).toBeDefined();


  const phoneText = getByText('9879879');
  expect(phoneText).toBeDefined();


  const addressText = getByText('123 Main St');
  expect(addressText).toBeDefined();


  const emailText = getByText('john.doe@example.com');
  expect(emailText).toBeDefined();
});


const TestComponent = () => {
  const { setDetails } = useMyContext();

  useEffect(() => {
   
    setDetails({ on: true, data: {
      id: 1,
      name: 'John',
      surname: 'Doe',
      phone: 9879879,
      address: '123 Main St',
      email: 'john.doe@example.com',
  } });
  }, [setDetails]);

  return <Details />;
};
