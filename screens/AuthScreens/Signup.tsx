import { Component } from "react";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  Picker,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  updateUsername,
  updateUsertype,
  signup,
} from "../../actions/user";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class Signup extends React.Component {
  state = {
    repeat: "", // is the repeat password
  };

  onLoginPress = () => {
    if (
      this.props.user.password == this.state.repeat &&
      this.props.user.username !== ""
    ) {
      this.props.signup();
      // alert(this.props.user.username)
    } else {
      alert("the passcodes are not identical");
    }
  };

  GetSelectedUserRoleValueItem = (userRole) => {
    // Alert.alert(throttlemodeValue)
    console.warn(userRole, "user changed  role");
    this.props.updateUsertype(userRole);
    this.setState({ userRole: userRole });
    console.warn("updated state value", this.state.userRole);
  };

  roles = ["student", "teacher"];

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/backgrounds/background-white.jpg")}
          style={styles.backgroundImage}
        />

        <View style={styles.inputlabelView}>
          <Text style={styles.inputlabelText}>Username</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholderTextColor={"grey"}
          placeholder={"your username"}
          onChangeText={(input) => this.props.updateUsername(input)}
          value={this.props.user.username}
        />

        <View style={styles.inputlabelView}>
          <Text style={styles.inputlabelText}>User type</Text>
        </View>
        {/* <TextInput 
              style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
              placeholderTextColor={'grey'}
              placeholder={'your usertype'}
              onChangeText={input=>this.props.updateUsertype(input)}
              value={this.props.user.usertype}
              /> */}
        <SelectDropdown
          style={styles.textinput}
          data={this.roles}
          onSelect={(selectedItem, index) => {
            this.props.updateUsertype(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        <View style={styles.inputlabelView}>
          <Text style={styles.inputlabelText}>Email</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholderTextColor={"grey"}
          placeholder={"example@example.com"}
          // value={this.props.user.email}
          // onChangeText={input=>this.props.updateEmail(input)}
          onChangeText={(input) => this.props.updateEmail(input)}
          value={this.props.user.email}
        />
        <View style={styles.inputlabelView}>
          <Text style={styles.inputlabelText}>Password</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholderTextColor={"grey"}
          placeholder={"Passcode123"}
          // value={this.props.user.password}
          onChangeText={(input) => this.props.updatePassword(input)}
          value={this.props.user.password}
          // onChangeText={input=>this.props.updatePassword(input)}
          secureTextEntry={true}
        />
        <View style={styles.inputlabelView}>
          <Text style={styles.inputlabelText}>Repeat Password</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholderTextColor={"grey"}
          placeholder={"Repeat Passcode123"}
          // value={this.props.user.password}
          onChangeText={(input) => this.setState({ repeat: input })}
          value={this.state.repeat}
          // onChangeText={input=>this.props.updatePassword(input)}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.signupbutton}
          onPress={() => this.onLoginPress()}
        >
          <Text style={styles.signUpButtonText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, updateUsername, updateUsertype, signup },
    dispatch
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: -1,
    width: screenWidth,
    height: screenHeight + 50,
  },
  textinput: {
    height: 50,
    width: screenWidth * 0.9,
    color: "black",
    paddingHorizontal: 20,
    margin: 0,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
  },
  inputlabelView: {
    width: screenWidth * 0.9,
    marginTop: 10,
  },
  inputlabelText: {
    left: 15,
  },
  signupbutton: {
    width: screenWidth * 0.6,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#0095f6",
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

// check new commit
