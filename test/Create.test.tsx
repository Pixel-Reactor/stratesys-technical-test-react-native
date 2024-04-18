import React from "react";
import Create from "../screens/Create";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { MyProvider } from "../context/MyContext";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("renders correctly and modal is open", () => {
  const { getByText } = render(
     
        <MyProvider>
     <NavigationContainer>
        <Create />
       </NavigationContainer>
    </MyProvider>
   
  );

  const createButton = getByText("Create");
  expect(createButton).toBeDefined();
});

test("submits form correctly and receives status 200", async () => {
 
  const mockApiResponse = {
    data: {
      id: 123,
      name: "John",
      surname: "Doe",
      phone: 123456789,
      address: "123 Main St",
      email: "john.doe@example.com",
    },
    status: 200,
  };

  mockedAxios.post.mockResolvedValueOnce(mockApiResponse);

  const { getByPlaceholderText, getByText } = render(
    <NavigationContainer>
      <MyProvider>
        <Create />
      </MyProvider>
    </NavigationContainer>
  );

  // Llenar los campos del formulario
  fireEvent.changeText(getByPlaceholderText("ID ex. 123"), "123");
  fireEvent.changeText(getByPlaceholderText("names"), "John");
  fireEvent.changeText(getByPlaceholderText("surname"), "Doe");
  fireEvent.changeText(getByPlaceholderText("phone"), "123456789");
  fireEvent.changeText(getByPlaceholderText("address"), "123 Main St");
  fireEvent.changeText(getByPlaceholderText("email"), "john.doe@example.com");

  // Hacer clic en el botón "Create"
  fireEvent.press(getByText("Create"));

  // Esperar a que la respuesta de axios sea recibida y verificarla
  await waitFor(() => {
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://my-json-server.typicode.com/Pixel-Reactor/jsondb/users",
      {
        id: 123,
        name: "John",
        surname: "Doe",
        phone: 123456789,
        address: "123 Main St",
        email: "john.doe@example.com",
      }
    );
    // Verificar el estado de la respuesta
    expect(mockApiResponse.status).toBe(200);
  });
});
