import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform, ScrollView, View} from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';

import { loginUser, loginUpdate } from '../actions';
import { connect } from 'react-redux';

class Onboarding extends React.Component {

  loginUserPress() {
    const { login, password, navigation } = this.props;

    this.props.loginUser({ login, password, navigation });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
      <StatusBar barStyle="light-content" />
      <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Text color="white" size={50}>MoviZ</Text>
              </Block>
              <Text size={16} color='rgba(255,255,255,0.6)'>
                Rate your favorite movies with Friends.
              </Text>
              <Input style = {styles.input}
               placeholder = "Email"
               value = {this.props.login}
               onChangeText = {value => this.props.loginUpdate({ prop: 'login', value })}/>
              <Input style = {styles.input}
               placeholder = "Password"
               password
               viewPass
               value = {this.props.password}
               onChangeText = {value => this.props.loginUpdate({ prop: 'password', value })}/>
            </Block>
            <Block center>
              <Button
                shadowless
                loading
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={this.loginUserPress.bind(this)}>
                Login
              </Button>
            </Block>
          </Block>
        </Block>
      </ScrollView>
      <Block flex center>
        <ImageBackground
          source={{  uri: Images.Onboarding }}
          style={{ height: height, width: width, marginTop: '-100%', zIndex: -1 }}
        />
      </Block>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { login, password } = state.auth;
  
  return { login, password, navigation: ownProps.navigation };
};

export default connect(mapStateToProps, {
  loginUser, loginUpdate
})(Onboarding);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: height, 
    width: width, 
    zIndex: -1
  },
  input: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
