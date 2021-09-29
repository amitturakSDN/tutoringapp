import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import * as Permissions from "expo-permissions";
import Spinner from "react-native-loading-spinner-overlay";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUser } from "@actions/user";
import * as ImagePicker from "expo-image-picker";
import { uploadPhoto } from "@actions/index";
import {
  updateNextPhoto,
  removeImage,
  updateDescription,
  updateTitle,
  uploadPost,
} from "@actions/post";
import { FontAwesome } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class PostScreen extends React.Component {
  state = {
    urlChosen: undefined,
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
          // const url = await this.props.uploadPhoto(image)
          const url = await this.props.uploadPhoto(image);
          // this.setState({url:url})
          this.props.updateNextPhoto(url);
          this.setState({ urlChosen: url });
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  changeChosenUrl = (url) => {
    this.setState({ urlChosen: url });
  };

  removeImage = (url) => {
    const position = this.props.post.photos.indexOf(url);
    this.props.removeImage(position);
    setTimeout(() => {
      this.setState({ loading: true });
    }, 500);
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
    if (this.props.post.photos.length == 2) {
      this.setState({ urlChosen: this.props.post.photos[0] });
    } else {
      this.setState({ urlChosen: undefined });
    }
  };

  upload = () => {
    this.props.uploadPost();
    this.props.navigation.navigate("Home");
    // xx.then((responseData) => {
    //   if (typeof responseData != "string") {
    //     // alert("test = " + responseData);
    //     this.props.navigation.navigate("HomeScreen");
    //   } else {
    //     alert(responseData);
    //   }
    // });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Spinner visible={this.state.loading} />
        <Image
          source={require("../../assets/backgrounds/background-white.jpg")}
          style={styles.bgImg}
        />
        <View
          style={
            Platform.OS == "ios"
              ? { width: screenWidth, height: 55 }
              : {
                  width: screenWidth,
                  height: 55,
                  marginTop: 30,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }
          }
        >
          <Text style={styles.createNewPostTxt}>Create a new post</Text>
          <TouchableOpacity
            style={styles.uploadView}
            onPress={() => this.upload()}
          >
            <Text style={styles.uploadTxt}>Upload</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{}}>
            <TextInput
              placeholderTextColor={"black"}
              numberOfLines={3}
              placeholder={"Type in your Title here :)"}
              onChangeText={(input) => this.props.updateTitle(input)}
              value={this.props.post.title}
              style={styles.postcheckoutTxtInput}
            />
            <TextInput
              placeholderTextColor={"black"}
              numberOfLines={7}
              placeholder={"Type in your description here :)"}
              onChangeText={(input) => this.props.updateDescription(input)}
              value={this.props.post.description}
              style={styles.postcheckoutTxtInput}
            />
          </View>

          <View style={styles.openLibraryView}>
            {this.state.urlChosen == undefined ? (
              <TouchableOpacity
                style={styles.touchableOpenLibrary}
                onPress={() => this.openLibrary()}
              >
                <Text style={{ marginVertical: 10 }}>
                  Upload Image(optional)
                </Text>
                <View style={styles.plusView}>
                  <Text style={styles.plusViewTxt}>+</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                // onPress={alert(this.state.urlChosen)}
                style={styles.urlChoosen}
              >
                <Image
                  source={{ uri: this.state.urlChosen }}
                  onLoadStart={() => this.setState({ loading: true })}
                  onLoadEnd={() => {
                    this.setState({ loading: false });
                  }}
                  style={styles.urlChoosenImg}
                />
                <TouchableOpacity
                  onPress={() => this.removeImage(this.state.urlChosen)}
                  style={styles.urlChoosenTochableOpacity}
                >
                  <FontAwesome name="trash" color={"black"} size={40} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              width: screenWidth,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            {this.props.post.photos == undefined ||
            this.props.post.photos?.length == 3 ||
            this.props.post.photos?.length == 0 ? null : (
              <TouchableOpacity
                style={styles.touchLibrary}
                onPress={() => this.openLibrary()}
              >
                <View style={styles.touchLibraryPlusView}>
                  <Text style={styles.touchLibraryPlusTxt}>+</Text>
                </View>
              </TouchableOpacity>
            )}
            {this.props.post.photos?.map((e) => (
              <TouchableOpacity onPress={() => this.changeChosenUrl(e)}>
                <Image source={{ uri: e }} style={styles.chnageChoosenUrl} />
              </TouchableOpacity>
            ))}
          </View>
          {/* <View>
          <TouchableOpacity
            style={styles.skipBtnView}
            onPress={() => this.props.navigation.push("Signup")}
          >
            <Text style={styles.skipTxt}>Skip</Text>
          </TouchableOpacity>
        </View> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      uploadPost,
      getUser,
      uploadPhoto,
      updateNextPhoto,
      removeImage,
      updateDescription,
      updateTitle,
    },
    dispatch
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.post,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);

const styles = StyleSheet.create({
  bgImg: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: -1,
    width: screenWidth,
    height: screenHeight,
  },
  createNewPostTxt: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 22,
  },
  uploadView: {
    margin: 10,
  },
  uploadTxt: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 22,
    color: "blue",
  },
  openLibraryView: {
    // marginTop: 30,
    width: screenWidth,
    height: 360,
  },
  touchableOpenLibrary: {
    width: screenWidth,
    height: 360,
    justifyContent: "center",
    alignItems: "center",
  },
  plusView: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  plusViewTxt: {
    color: "white",
    fontSize: 40,
  },
  urlChoosen: {
    width: screenWidth,
    height: 360,
  },
  urlChoosenImg: {
    width: screenWidth,
    height: 160,
  },
  urlChoosenTochableOpacity: {
    position: "absolute",
    bottom: 30,
    right: 40,
  },
  touchLibrary: {
    width: 95,
    height: 90,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    margin: 10,
  },
  touchLibraryPlusView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  touchLibraryPlusTxt: {
    color: "white",
    fontSize: 30,
  },
  chnageChoosenUrl: {
    width: 95,
    height: 90,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 12,
    margin: 10,
  },
  skipBtnView: {
    margin: 25,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.05)",
    width: screenWidth * 0.9,
    alignItems: "center",
  },
  skipTxt: {
    fontWeight: "bold",
    fontSize: 24,
    color: "black",
  },
  postcheckoutTxtInput: {
    backgroundColor: "rgba(0,0,0,0.05)",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 20,
    width: "95%",
    borderRadius: 10,
  },
});
