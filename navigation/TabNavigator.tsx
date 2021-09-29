import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import PostScreen from "@TabScreens/PostScreen";
import HomeScreen from "@TabScreens/HomeScreen";
import ProfileScreen from "@TabScreens/ProfileScreen";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";

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
