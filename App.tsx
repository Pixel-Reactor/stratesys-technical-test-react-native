import Home from "./screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import AddButton from "components/AddButton";
import Details from "components/Details";
import { MyProvider } from "./context/MyContext";
import Create from "screens/Create";
import Search from "screens/Search";
import Update from "components/Update";

export default function App() {
  const Tab = createBottomTabNavigator();
 
  return (
    <MyProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            activeTintColor: "tomato",
            inactiveTintColor: "white",
            tabBarStyle: {
              backgroundColor: "rgba(24,24,27,0.99)",
              height: 80,
              paddingBottom: 10,
            },
            tabBarLabelStyle: {
              fontSize: 14,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName:any;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Create") {
                iconName = focused ? "person-add" : "person-add-outline";
              } else if (route.name === "Search") {
                iconName = focused ? "search-sharp" : "search-outline";
              }
              return <Ionicons name={iconName} size={24} color="white" />;
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              headerStyle: {
                backgroundColor: "rgba(24,24,27,0.99)",
              },
              headerTitleStyle: { color: "#ffffff", fontSize: 20 },
              headerStatusBarHeight: 50,
              headerRight: () => <AddButton />,
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              title: "Search",
              headerStyle: {
                backgroundColor: "rgba(24,24,27,0.99)",
              },
              headerTitleStyle: { color: "#ffffff", fontSize: 20 },
              headerStatusBarHeight: 50,
            }}
          />
          <Tab.Screen
            name="Create"
            component={Create}
            options={{
              title: "Add New",
              headerStyle: {
                backgroundColor: "rgba(24,24,27,0.99)",
              },
              headerTitleStyle: { color: "#ffffff", fontSize: 20 },
              headerStatusBarHeight: 50,
            }}
          />
        </Tab.Navigator>
        <Details />
        <Update />
      </NavigationContainer>
    </MyProvider>
  );
}
