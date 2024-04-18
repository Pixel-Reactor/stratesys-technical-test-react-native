import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import Update from '../components/Update'; 
import { MyProvider } from '../context/MyContext'; 

test('should render Update modal and handle form submission correctly', async () => {
   
    const initialState = {
        edit: {
            on: true,
            data: {
                id: 1,
                name: 'John',
                surname: 'Doe',
                phone: 9879879,
                address: '123 Main St',
                email: 'john.doe@example.com',
            }
        }
    };

   
    const { getByText } = render(
        <MyProvider initialState={initialState}>
            <Update />
        </MyProvider>
    );

  
    await waitFor(() => {
        const modal = getByText('Save Changes');
        expect(modal).toBeTruthy();
    });

  
    const idInput = screen.getByPlaceholderText('id');
    fireEvent.changeText(idInput, '2');

    const nameInput = screen.getByPlaceholderText('name');
    fireEvent.changeText(nameInput, 'Jane');

    const saveButton = getByText('Save Changes');
    fireEvent.press(saveButton);

    
});
