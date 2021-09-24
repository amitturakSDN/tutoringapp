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
import { getUser, followUser, unFollowUser } from "../../actions/user";
import { getPost } from "../../actions/post";
import * as firebase from "firebase";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class ProfileScreen extends React.Component {
  componentDidMount = () => {
    const { params } = this.props.route;
    if (params !== undefined) {
      this.props.getUser(params, "PROFILE");
    }
  };

  follow = () => {
    this.props.followUser(this.props.profile.uid);
  };
  unFollow = () => {
    this.props.unFollowUser(this.props.profile.uid);
  };

  goToPost = (post) => {
    this.props.getPost(post);
    this.props.navigation.navigate("OnePost");
  };

  render() {
    const { params } = this.props.route;
    this.props.navigation.setOptions({
      title: this.props.profile?.username,
    });

    if (params == undefined || params == this.props.user.uid) {
      return (
        <ScrollView style={styles.scrollview}>
          <SafeAreaView style={styles.safeareaview}>
            <View style={styles.mainView}>
              <Image
                source={{ uri: this.props.user?.photo }}
                style={styles.userPhoto}
              />
              <View style={styles.upperPostView}>
                <View style={styles.postsView}>
                  <Text style={styles.postsViewTxt}>
                    {this.props.user?.posts?.length}
                  </Text>
                  <Text>Posts</Text>
                </View>
                {/* <View style={styles.postsView}>
                  <Text style={styles.postsViewTxt}>
                    {this.props.user?.followers?.length}
                  </Text>
                  <Text style={styles.postsViewTxtt}>Followers</Text>
                </View>
                <View style={styles.postsView}>
                  <Text style={styles.postsViewTxt}>
                    {this.props.user?.following?.length}
                  </Text>
                  <Text style={styles.postsViewTxtt}>Following</Text>
                </View> */}
              </View>
            </View>
            <View style={styles.logoutView}>
              <Text style={styles.emailTxt}>{this.props.user?.email}</Text>
              <Text>{this.props.user?.bio}</Text>
              <TouchableOpacity
                style={styles.logoutTouchableopacity}
                onPress={() => firebase.auth().signOut()}
              >
                <Text style={styles.logoutTxt}>Logout</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.editView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Edit")}
                style={styles.editProfileView}
              >
                <Text style={styles.editProfileTxt}>Edit profile</Text>
              </TouchableOpacity>
            </View>

            {this.props.user?.posts?.length <= 0 ? (
              <View style={styles.noDataView}>
                <Text style={styles.noDataTxt}>
                  No Data Has Been Uploaded yet
                </Text>
              </View>
            ) : (
              <FlatList
                numColumns={3}
                data={this.props.user?.posts}
                keyExtractor={(item) => JSON.stringify(item.date)}
                style={{ flex: 1 }}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => this.goToPost(item)}>
                    <Image
                      source={{ uri: item.photos[0] }}
                      style={styles.goToPostImg}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          </SafeAreaView>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              width: "100%",
              height: 120,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={{ uri: this.props.profile?.photo }}
              style={{ width: 90, height: 90, borderRadius: 45, margin: 20 }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 20,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {this.props.profile?.posts?.length}
                </Text>
                <Text style={{ fontSize: 15 }}>Posts</Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 20,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {this.props.profile?.followers?.length}
                </Text>
                <Text style={{ fontSize: 15 }}>Followers</Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 20,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {this.props.profile?.following?.length}
                </Text>
                <Text style={{ fontSize: 15 }}>Following</Text>
              </View>
            </View>
          </View>
          <View
            style={{ paddingHorizontal: 20, width: "100%", marginBottom: 20 }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {this.props.profile?.email}
            </Text>
            <Text>{this.props.profile?.bio}</Text>
          </View>
          {this.props.profile?.followers?.includes(this.props.user.uid) ? (
            <View
              style={{
                height: 60,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => this.unFollow()}
                style={{
                  flexDirection: "row",
                  width: screenWidth * 0.45,
                  height: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "grey",
                  borderRadius: 7,
                  margin: screenWidth * 0.0125,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16, margin: 5 }}>
                  Following
                </Text>
                <Image
                  source={require("../../assets/images/arr-bottom.png")}
                  style={{ width: 15, height: 9 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: screenWidth * 0.45,
                  height: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "grey",
                  borderRadius: 7,
                  margin: screenWidth * 0.0125,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                height: 60,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => this.follow()}
                style={{
                  width: "90%",
                  backgroundColor: "#0095f8",
                  height: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 7,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 19, fontWeight: "bold" }}
                >
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {this.props.user?.posts?.length <= 0 ? (
            <View
              style={{
                height: 60,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "black", fontSize: 19 }}>
                No Data Has Been Uploaded yet
              </Text>
            </View>
          ) : (
            <FlatList
              numColumns={3}
              data={this.props.user?.posts}
              keyExtractor={(item) => JSON.stringify(item.date)}
              style={{ flex: 1 }}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.goToPost(item)}>
                  <Image
                    source={{ uri: item.photos[0] }}
                    style={{ width: screenWidth / 3, height: screenWidth / 3 }}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </ScrollView>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getUser, followUser, unFollowUser, getPost },
    dispatch
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: "white",
    height: screenHeight,
  },
  safeareaview: {
    flex: 1,
  },
  mainView: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  userPhoto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    margin: 20,
  },
  upperPostView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postsView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  postsViewTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postsViewTxtt: {
    fontSize: 15,
  },
  followersView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  logoutView: {
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 20,
  },
  emailTxt: {
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutTouchableopacity: {
    marginLeft: 270,
  },
  logoutTxt: { color: "blue" },
  editView: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  editProfileView: {
    width: "90%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "grey",
  },
  editProfileTxt: {
    color: "black",
    fontSize: 19,
    fontWeight: "bold",
  },
  noDataView: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  noDataTxt: {
    color: "black",
    fontSize: 19,
  },
  goToPostImg: {
    width: screenWidth / 3,
    height: screenWidth / 3,
  },
});
