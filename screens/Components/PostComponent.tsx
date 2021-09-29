import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;

export default class PostComponent extends Component {
  static propTypes = {
    prop: PropTypes,
  };
  state = {
    liked: undefined,
    numLike: 0,
    saved: undefined,
  };

  likePost = () => {
    if (
      this.props.item.likes.includes(this.props.user.uid) ||
      this.state.liked == true
    ) {
      if (this.state.liked == false) {
        this.setState({ liked: true });
        this.setState({ numLike: this.state.numLike + 1 }); //
        this.props.likePost(this.props.item);
      } else {
        this.setState({ liked: false });
        this.setState({ numLike: this.state.numLike - 1 }); //
        this.props.unLikePost(this.props.item);
      }
    } else {
      this.setState({ liked: true });
      this.props.likePost(this.props.item);
      this.setState({ numLike: this.state.numLike + 1 }); //
    }
  };

  savePost = () => {
    if (
      this.props.item.savedBy.includes(this.props.user.uid) ||
      this.state.saved == true
    ) {
      if (this.state.liked == false) {
        this.setState({ saved: true });
        this.props.savePost(this.props.item);
      } else {
        this.setState({ saved: false });
        this.props.unSavePost(this.props.item);
      }
    } else {
      this.setState({ saved: true });
      this.props.savePost(this.props.item);
    }
  };

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.upperTouchableOpacityView}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(
                "ProfileScreen",
                this.props.item.uid
              )
            }
            style={styles.profileNavigateView}
          >
            <Image
              source={{ uri: this.props.item.photo }}
              // source={require("../../assets/images/usericon.png")}
              style={styles.userIcon}
            />
            <Text style={styles.username}>{this.props.item.username}</Text>
          </TouchableOpacity>
          {/* <Text style={{margin:15}}>{moment(this.props.item.date).format('ll')}</Text> */}

          {/* <Image
            source={require("../../assets/images/3-dot.png")}
            style={{ width: 25, height: 25, margin: 10 }}
          /> */}
        </View>
        <View>
          <Text style={styles.title}>{this.props.item.title}</Text>
          <Text style={styles.description}>{this.props.item.description}</Text>
        </View>
        <View>
          <ScrollView horizontal={true} pagingEnabled={true}>
            {this.props.item.photos?.map((e) => (
              <Image source={{ uri: e }} style={styles.contentImg} />
            ))}
          </ScrollView>
        </View>

        {/* This is our bottom bar */}
        <View style={styles.bottomBarView}>
          <View style={styles.likeImgView}>
            <TouchableOpacity onPress={() => this.likePost()}>
              {this.props.item.likes.includes(this.props.user.uid) &&
              this.state.liked == undefined ? (
                <Image
                  source={require("../../assets/images/likeblue.png")}
                  style={styles.fbBlueLike}
                />
              ) : this.state.liked == true ? (
                <Image
                  source={require("../../assets/images/likeblue.png")}
                  style={styles.fbBlueLike}
                />
              ) : (
                <Image
                  source={require("../../assets/images/fblike.png")}
                  style={styles.fbLike}
                />
              )}
            </TouchableOpacity>
            {/* <Image
              source={require("../../assets/images/comment.jpg")}
              style={{ width: 25, height: 25, margin: 10 }}
            /> */}
            {/* <Image source={require('../../assets/images/share.jpg')} style={{width:25,height:25, margin:10}} /> */}
          </View>
          {/* <TouchableOpacity
                    onPress={()=>this.savePost()}>
                        {
                            (this.props.item.savedBy.includes(this.props.user.uid) && this.state.saved == undefined)?
                            <Image source={require('../../assets/images/save-black.jpg')} style={{width:25,height:25, margin:10}} />
                            :
                                (this.state.saved == true)?
                                <Image source={require('../../assets/images/save-black.jpg')} style={{width:25,height:25, margin:10}} />
                                :
                                <Image source={require('../../assets/images/save.jpg')} style={{width:25,height:25, margin:10}} />

                        }
                    </TouchableOpacity> */}
        </View>

        <Text style={styles.likeTxt}>
          {this.props.item.likes.length + this.state.numLike} likes
        </Text>

        {/* <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
            {this.props.item.username}{" "}
          </Text>
          <Text>{this.props.item.description}</Text>
        </View> */}
        {/* <TouchableOpacity>
          <Text style={{ marginHorizontal: 10, color: "grey", marginTop: 5 }}>
            Show all the comments: {this.props.item.comments.length}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: this.props.user.photo }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 32 / 2,
                marginHorizontal: 10,
                marginTop: 5,
              }}
            />
            <Text style={{ color: "grey", marginTop: 5 }}>
              Add a comment...
            </Text>
          </View>
          <Image
            source={require("../../assets/images/emojis.jpg")}
            style={{ width: 80, height: 17, margin: 10 }}
          />
        </View> */}
        <Text style={styles.dateTxt}>
          {moment(this.props.item.date).format("ll")}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    marginBottom: 10,
  },
  upperTouchableOpacityView: {
    width: screenWidth,
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 0.07,
  },
  profileNavigateView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    margin: 15,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
  },
  title: {
    marginLeft: 25,
    marginBottom: 12,
    fontSize: 15,
    fontWeight: "bold",
  },
  description: {
    marginHorizontal: 25,
    marginBottom: 15,
    fontSize: 13,
  },
  contentImg: {
    width: screenWidth,
    height: 360,
  },
  bottomBarView: {
    width: screenWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
  },
  likeImgView: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  fbBlueLike: {
    width: 35,
    height: 35,
    margin: 10,
  },
  fbLike: {
    width: 45,
    height: 45,
    margin: 10,
  },
  likeTxt: {
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 0,
  },
  dateTxt: {
    marginHorizontal: 10,
    color: "grey",
    marginTop: 5,
  },
});
