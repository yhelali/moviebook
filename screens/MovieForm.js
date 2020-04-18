import React from 'react';
import { StyleSheet, StatusBar, Dimensions, Platform, ScrollView, View} from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';

const { width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import { Select, Icon, Header, Product, Switch } from '../components/';

import { connect } from 'react-redux';
import { reviewCreate, reviewUpdate } from '../actions';


class MovieForm extends React.Component {
  onButtonPress() {
    const { navigation, title, Platform, rate, comment } = this.props;

    this.props.reviewCreate({ navigation, title, Platform, rate, comment });
  }

  render() {
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
                  <Text color="black" size={50}>New Review</Text>
                </Block>
                <Text size={16} color='black'>
                  Rate your favorite movies with Friends.
                </Text>
                <Input style = {styles.input}
                placeholder = "Find movie"
                value={this.props.title}
                onChangeText = {value => this.props.reviewUpdate({ prop: 'title', value })}/>
                <Input style = {styles.input}
                placeholder = "Platform"
                onChangeText={value => this.props.reviewUpdate({ prop: 'platform', value })}/>
                <Input style = {styles.input}
                placeholder = "Comment"
                onChangeText={value => this.props.reviewUpdate({ prop: 'comment', value })}/>
                <Block row space="evenly">
                  <Block flex={1.25} right>
                    <Text h5 style={{marginBottom: theme.SIZES.BASE / 2}}>Rating</Text>
                  </Block>
                  <Block flex right>
                      <Select
                        defaultIndex={1}
                        options={[1, 2, 3, 4, 5]}
                        style={styles.shadow}
                        onSelect={value => this.props.reviewUpdate({ prop: 'rate', value })}
                      />
                  </Block>
                </Block>
              </Block>
              <Block center>
                <Button
                  shadowless
                  style={styles.button}
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  onPress={this.onButtonPress.bind(this)}>
                  Publish
                </Button>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { title, Platform, rate, comment } = state.review;
  
  return { title, Platform, rate, comment, navigation: ownProps.navigation };
};

export default connect(mapStateToProps, {
  reviewCreate, reviewUpdate
})(MovieForm);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
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
  input: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
