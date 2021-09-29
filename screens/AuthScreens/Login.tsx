import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, login } from "@actions/user";
import Spinner from "react-native-loading-spinner-overlay";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
class Login extends React.Component {
  // roles = ["student", "teacher"];
  state = {
    loading: false,
  };

  loader = () => {
    this.setState({
      loading: true,
    });
  };
  render() {
    return (
      <View style={styles.imgView}>
        <Spinner visible={this.state.loading} />
        {/* <Image source={require('../../assets/backgrounds/back4.jpeg')} style={{   position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50}} /> */}
        <Image
          source={require("../../assets/backgrounds/background-white.jpg")}
          style={styles.bgImg}
        />
        <Text style={styles.appHeading}>Tutoring App</Text>
        <View style={styles.appHeadingBottomView}>
          <View style={styles.labelView}>
            <Text style={styles.labelViewTxt}>Email</Text>
          </View>
          <TextInput
            style={styles.txtInput}
            placeholderTextColor={"grey"}
            placeholder={"example@example.com"}
            // value={this.props.user.email}
            // onChangeText={input=>this.props.updateEmail(input)}
            onChangeText={(input) => this.props.updateEmail(input)}
            value={this.props.user.email}
          />
          <View style={styles.labelView}>
            <Text style={{ left: 15 }}>Password</Text>
          </View>
          <TextInput
            style={styles.txtInput}
            placeholderTextColor={"grey"}
            placeholder={"Passcode123"}
            // value={this.props.user.password}
            onChangeText={(input) => this.props.updatePassword(input)}
            value={this.props.user.password}
            // onChangeText={input=>this.props.updatePassword(input)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.loginView}>
          <TouchableOpacity
            style={styles.loginBtnView}
            onPress={() => {
              this.props.login();
              this.loader();
            }}
          >
            <Text style={styles.loginBtnTxt}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupBtnView}
            // onPress={() => this.props.navigation.navigate("Signup")}
            onPress={() => this.props.navigation.navigate("ProfilePicture")}
          >
            <Text style={styles.dontHaveAnAccountTxt}>
              Don't have an account?{" "}
            </Text>
            <Text style={styles.signupBtnTxt}>Signup!</Text>
          </TouchableOpacity>
          <View style={styles.bottomSignupBtnView}>
            {/* <Text style={{fontSize:18}}>from</Text> */}
            {/* <Text style={{fontSize:20, fontWeight:'bold'}}> xyz</Text> */}
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword, login }, dispatch);
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  imgView: {
    flex: 1,
    alignItems: "center",
  },
  bgImg: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: -1,
    width: screenWidth,
    height: screenHeight + 50,
  },
  appHeading: {
    fontSize: 35,
    fontFamily: "logo-font",
    marginVertical: 60,
    color: "#0095f6",
  },
  appHeadingBottomView: {
    marginTop: 100,
  },
  labelView: {
    width: screenWidth * 0.9,
    marginTop: 10,
  },
  labelViewTxt: {
    left: 15,
  },
  txtInput: {
    height: 50,
    width: screenWidth * 0.9,
    color: "black",
    paddingHorizontal: 20,
    margin: 0,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
  },
  loginView: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },
  loginBtnView: {
    width: screenWidth * 0.6,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#0095f6",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  signupBtnView: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
  },
  dontHaveAnAccountTxt: {
    fontSize: 18,
  },
  signupBtnTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0095f6",
  },
  bottomSignupBtnView: {
    position: "absolute",
    top: 250,
    justifyContent: "center",
    alignItems: "center",
  },
});
