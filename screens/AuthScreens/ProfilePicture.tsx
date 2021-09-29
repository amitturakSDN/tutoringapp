import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { uploadPhoto } from "@actions/index";
import Spinner from "react-native-loading-spinner-overlay";
import { updatePhoto } from "@actions/user";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class ProfilePicture extends React.Component {
  state = {
    loading: false,
  };
  openLibrary = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        const image = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        });
        if (image) {
          setTimeout(() => {
            this.setState({ loading: true });
          }, 800);
        }
        if (!image.cancelled) {
          const url = await this.props.uploadPhoto(image);
          this.props.updatePhoto(url);
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  render() {
    return (
      <View style={styles.profileView}>
        <Spinner visible={this.state.loading} />
        <Image
          source={require("../../assets/backgrounds/background-white.jpg")}
          style={styles.bgImg}
        />
        <View style={styles.chooseProfilePitureView}>
          <Text style={styles.chooseProfileTxt}>Choose a profile picture</Text>
          {this.props.user.photo == undefined ? (
            <TouchableOpacity onPress={() => this.openLibrary()}>
              <View style={styles.openLibraryView}>
                <Image
                  source={require("../../assets/images/camera.png")}
                  style={styles.camera}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.openLibrary()}>
              <Image
                source={{ uri: this.props.user.photo }}
                onLoadStart={() => this.setState({ loading: true })}
                onLoadEnd={() => {
                  this.setState({ loading: false });
                }}
                style={styles.openLibraryView}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.signupBtnView}
            onPress={() => this.props.navigation.push("Signup")}
          >
            <Text style={styles.continueTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.signupBtnView}
            onPress={() => this.props.navigation.push("Signup")}
          >
            <Text style={styles.continueTxt}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ uploadPhoto, updatePhoto }, dispatch);
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicture);

const styles = StyleSheet.create({
  profileView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bgImg: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: -1,
    width: screenWidth,
    height: screenHeight + 50,
  },
  chooseProfilePitureView: {
    justifyContent: "center",
    alignItems: "center",
    bottom: 100,
  },
  chooseProfileTxt: {
    fontWeight: "bold",
    fontSize: 24,
    color: "black",
    margin: 15,
  },
  openLibraryView: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    borderRadius: screenWidth * 0.25,
    backgroundColor: "beige",
  },
  signupBtnView: {
    margin: 25,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.05)",
    width: screenWidth * 0.9,
    alignItems: "center",
  },
  continueTxt: {
    fontWeight: "bold",
    fontSize: 24,
    color: "black",
  },
  camera: {
    width: 110,
    height: 80,
    position: "absolute",
    top: 50,
    left: 40,
  },
});
