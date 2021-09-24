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
import { getUser } from "../../actions/user";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class NotificationsScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Image
          source={require("../../assets/backgrounds/background-white.jpg")}
          style={styles.bgImg}
        />

        <Text style={styles.notificaationTxt}>NotificationsScreen</Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser }, dispatch);
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
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
  notificaationTxt: {
    fontSize: 35,
    fontFamily: "logo-font",
    marginVertical: 60,
    color: "#0095f6",
  },
});
