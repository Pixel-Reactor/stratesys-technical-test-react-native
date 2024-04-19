import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Search from '../screens/Search';
import { MyProvider } from '../context/MyContext'; 

describe('Search Component', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <MyProvider>
        <Search />
      </MyProvider>
    );
    const input = getByPlaceholderText('Insert an ID to find');
    expect(input).toBeDefined();
  });

  test('search functionality works', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MyProvider>
        <Search />
      </MyProvider>
    );
    const input = getByPlaceholderText('Insert an ID to find');
    fireEvent.changeText(input, '123');
    const searchButton = getByText('Search');
    fireEvent.press(searchButton); 

    expect(getByText('Loading...')).toBeDefined();


    await waitFor(() => {
        expect(getByText('No user found')).toBeDefined();
    }, { timeout: 1000 });

    
  
  });
});
