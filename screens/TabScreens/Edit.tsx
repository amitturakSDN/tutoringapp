import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  updatePhoto,
  updateEmail,
  updatePassword,
  updateUsername,
  updateName,
  updateQuote,
  signup,
  updateUser,
} from "@actions/user";
import { uploadPhoto } from "../../actions";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

class Edit extends React.Component {
  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
      if (!image.cancelled) {
        const url = await this.props.uploadPhoto(image);
        this.props.updatePhoto(url);
      }
    }
  };

  async onEdit() {
    await this.props.updateUser();
    this.setState({ message: "User edited successfully!" });
  }
  state = {
    message: "",
  };

  render() {
    this.props.navigation.setOptions({
      headerBackTitle: " ",
      headerTitle: "Edit Profile",
    });

    return (
      <View style={styles.mainView}>
        <Image
          source={require("../../assets/backgrounds/background-white.jpg")}
          style={styles.bgImg}
        />
        {/* <Text style={{fontSize: 30, margin: 40, fontFamily:'Product-sans-bold', color:'white'}}>Edit</Text> */}
        <View style={styles.openLibraryMainView}>
          <View style={styles.openLibraryView}>
            {this.props.user.photo == undefined ? (
              <TouchableOpacity
                onPress={() => this.openLibrary()}
                style={styles.openLibraryTouchableOpacity}
              ></TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => this.openLibrary()}
                style={styles.openLibraryTouchableOpacity}
              >
                <Image
                  style={styles.openLibraryImg}
                  source={{ uri: this.props.user.photo }}
                />
              </TouchableOpacity>
            )}
            <Text style={styles.changeProfileTxt}>
              Change the profile image
            </Text>
          </View>
        </View>
        <TextInput
          value={this.props.user.name}
          onChangeText={(input) => this.props.updateName(input)}
          placeholder="Name"
          placeholderTextColor="black"
          style={styles.textInput}
        />
        <TextInput
          value={this.props.user.quote}
          onChangeText={(input) => this.props.updateQuote(input)}
          placeholder="Quote"
          placeholderTextColor="black"
          style={styles.textInput}
        />
        <Text style={styles.messageTxt}> {this.state.message} </Text>
        <TouchableOpacity
          onPress={() => this.onEdit()}
          style={styles.onEditTouch}
        >
          <Text style={styles.acceptChangesTxt}>ACCEPT CHANGES</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updatePhoto,
      uploadPhoto,
      updateUser,
      updateEmail,
      updatePassword,
      updateUsername,
      updateName,
      signup,
      updateQuote,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
  },
  bgImg: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: -1,
    width: screenWidth,
    height: screenHeight,
  },
  openLibraryMainView: {
    flexDirection: "row",
  },
  openLibraryView: {
    justifyContent: "center",
    alignItems: "center",
  },
  openLibraryTouchableOpacity: {
    alignItems: "center",
    width: screenWidth / 4,
    height: screenWidth / 4,
    borderRadius: screenWidth / 8,
    backgroundColor: "black",
    margin: 20,
    marginHorizontal: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  openLibraryImg: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    borderRadius: screenWidth / 8,
  },
  changeProfileTxt: {
    color: "white",
    marginBottom: 50,
    fontFamily: "Product-sans-bold",
  },
  textInput: {
    width: screenWidth * 0.9,
    height: 50,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0, 0.03)",
    margin: 15,
    textAlign: "center",
    padding: 15,
    color: "black",
    fontSize: 15,
  },
  messageTxt: {
    color: "#51FF0D",
    fontSize: 20,
    fontFamily: "Product-sans",
    top: 30,
  },
  onEditTouch: {
    width: screenWidth * 0.9,
    alignItems: "center",
    backgroundColor: "beige",
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 3,
    top: 100,
  },
  acceptChangesTxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Product-sans-bold",
  },
});
