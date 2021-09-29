import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import * as firebase from "firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUser } from "@actions/user";
import {
  getPosts,
  likePost,
  unLikePost,
  savePost,
  unSavePost,
} from "@actions/post";
import PostComponent from "@Components/PostComponent";
import { SafeAreaView } from "react-native-safe-area-context";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.getPosts();
  }
  // componentDidMount = () => {
  //   this.props.getPosts();
  // };

  handleBackButton = () => {
    Alert.alert(
      "Exit App",
      "Exiting the application?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      }
    );
    return true;
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewStyle}>
        <View style={styles.mainView}>
          <Image
            source={require("../../assets/images/people-tutor-warrior.png")}
            style={styles.logoImg}
          />
          <View style={styles.logoutBtnView}>
            <TouchableOpacity onPress={() => firebase.auth().signOut()}>
              <Image
                source={require("../../assets/images/logout.png")}
                style={styles.logoutBtnImg}
              />
            </TouchableOpacity>
            {/* <Image source={require('../../assets/images/share.jpg')} style={{width:25,height:25, margin:10, bottom:5}} /> */}
          </View>
        </View>

        <FlatList
          data={this.props.post.feed}
          keyExtractor={(item) => JSON.stringify(item.uid)}
          renderItem={({ item }) => (
            <PostComponent
              item={item}
              user={this.props.user}
              likePost={(item) => this.props.likePost(item)}
              unLikePost={(item) => this.props.unLikePost(item)}
              savePost={(item) => this.props.savePost(item)}
              unSavePost={(item) => this.props.unSavePost(item)}
              navigation={this.props.navigation}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getUser, getPosts, likePost, unLikePost, savePost, unSavePost },
    dispatch
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.post,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  mainView: {
    height: 60,
    width: screenWidth,
    borderBottomColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  logoImg: {
    width: 130,
    height: 60,
    marginHorizontal: 15,
  },
  logoutBtnView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  logoutBtnImg: {
    width: 25,
    height: 25,
    margin: 10,
    marginHorizontal: 20,
    bottom: 4,
  },
});
