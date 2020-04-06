import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import Icon from './Icon';

import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

class Movie extends React.Component {
  render() {
    const { navigation, movie, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={horizontal} card flex style={[styles.movie, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { movie: movie })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: movie.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { movie: movie })}>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={14} style={styles.productTitle}>{movie.name}</Text>
            <Text size={16} color={materialTheme.COLORS.WARNING}>
              {movie.rating.total_rating}{" "}
              <Icon name="shape-star" family="GalioExtra" size={14} />
            </Text>
            <Text size={12} muted={!priceColor} color={priceColor}>{movie.rating.total_users} friends</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(Movie);

const styles = StyleSheet.create({
  movie: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});