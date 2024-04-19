
# React-Native Technical test

This is a expo React-Native project able to fetch users data, create or update existing data.

The requirement were to use 
https://jsonplaceholder.typicode.com/
fake api to fecth, send, or update a user object data.
#### Note: 
As the jsonplaceholder.typicode.com doesn't provides a free storage api, the response we receive will be faked returning the same object we send to it.
It provides a solucion with Mockend but it need to register a credit card to be able to use it, so i create a custom fake api server with custom data (still using the jsonplaceholder.typicode.com api) to be fetched the first time the app starts.
It can be found in repository in my account 
https://github.com/Pixel-Reactor/jsondb .
For this reason , the app will make a call and wait for a successful response, thefore, the new, deleted or updated data will be handled by a global state that handle the list in the context.
# App structure

The App is written in TypeScript and uses TailWind (Native/Wind) to styles the components.

The App has a context that wraps all the components to be able to pass and receive global states used by components

# Screen and Modals

The App has a Navigation container that contains 3 screens bottom tab: 

#### Home

#### Search

#### Add New

## Home tabs

It will first render 3 fake users data, and will update the global state of the list whenever the list has an update like a deleted or updated item.

The card showed have a details buttom that will open a Modal that shows the full info about the selected user.

### Edit or delete


As soon we get in the details we will see the full data and 2 more button that will allow us to delete the item or edit.


## Search 

This screen will allow us to search and element by id, and it will return a card like the home screen if it find something or No user Found text if it doesn'tabs

## Add New 

This screen allow us to create a new user object, 
that must contain all the fields requested (id,name,surname,phone,address,email)

Both this form and edit form will check the input provided and if the id is already in use before submitting the form.

## Data Validation
- ID (must be a number, required)
- name (must be a string, required)
- surname (must be a string, required)
- phone (must be a number, required)
- address (must be a number, required)
- email (must be a string, required)

# Start the app

- Clone this repository
- Open a terminal in the main folder
- Install dependencies

```bash
npm install 
```

- run the project with expo server with : 
```bash
npm run start 
```


## Running Tests

Test are builded with testing-library/react-native and jest
to run them in the terminal:
```bash
  npx jest
```


## Authors

- Matteo Stella [@pixel-reactor](https://github.com/Pixel-Reactor) 

