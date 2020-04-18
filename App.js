import React from 'react';
import { Platform, StatusBar, Image } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import firebase from 'firebase';

import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import { Images, materialTheme } from './constants/';

import { NavigationContainer } from '@react-navigation/native';
import Screens from './navigation/Screens';

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

// cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
];

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyCtFf0XDUEoe0YeN2YQfJHc8rVKTCvfMUg",
      authDomain: "moviz-ff7ec.firebaseapp.com",
      databaseURL: "https://moviz-ff7ec.firebaseio.com",
      projectId: "moviz-ff7ec",
      storageBucket: "moviz-ff7ec.appspot.com",
      messagingSenderId: "688816801464",
      appId: "1:688816801464:web:ab96e40afe6b9221c6d64d",
      measurementId: "G-2XDCVHL0T2"
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <GalioProvider theme={materialTheme}>
              <Block flex>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <Screens />
              </Block>
            </GalioProvider>
          </NavigationContainer>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
