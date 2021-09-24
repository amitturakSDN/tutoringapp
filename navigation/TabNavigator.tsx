import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/TabScreens/HomeScreen";
import PostScreen from "../screens/TabScreens/PostScreen";
// import {
//   PostScreen,
//   NotificationsScreen,
//   ProfileScreen,
//   HomeScreen,
// } from "screens";
import NotificationsScreen from "../screens/TabScreens/NotificationsScreen";
import SearchScreen from "../screens/TabScreens/SearchScreen";
import ProfileScreen from "../screens/TabScreens/ProfileScreen";

import { FontAwesome } from "@expo/vector-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, login } from "../actions/user";

const Tab = createMaterialBottomTabNavigator();

function TabNavigator(props) {
  //    alert(props.user)
  return (
    <Tab.Navigator
      barStyle={
        Platform.OS == "ios"
          ? { backgroundColor: "white", height: 50, bottom: 10 }
          : { backgroundColor: "white", height: 50 }
      }
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={22} />
          ),
          headerShown: true,
          headerTitle: "See your post",
        })}
      />
      {/* <Tab.Screen name="Search" component={SearchScreen} 
            options={({ route}) => ({
                tabBarIcon: ({color, size }) => (
                    <FontAwesome name='search' color={color} size={22} />
                )
            })} 
            /> */}
      {props.user == "teacher" ? (
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="plus" color={color} size={22} />
            ),
          })}
        />
      ) : null}
      {/* <Tab.Screen name="Notifications" component={NotificationsScreen} 
            options={({ route}) => ({
                tabBarIcon: ({color, size }) => (
                    <FontAwesome name='heart' color={color} size={22} />
                )
            })} 
            /> */}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={22} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.usertype,
  };
};

export default connect(mapStateToProps)(TabNavigator);
