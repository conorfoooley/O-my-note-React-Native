import React, { useState, useCallback, memo } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import { PerfumeCardAccuracyMatch, PerfumeCardHeart, Image } from 'app/Components';
import * as types from 'app/Constants/types';
import { Colors, Fonts, Metrics, Typography } from 'app/Theme';

interface Props {
  id: number;
  name: string;
  onSelect: (id: number) => void;
  favorite: boolean | types.Perfume | undefined;
  brand?: any;
  match?: number;
  image?: string;
  small?: boolean;
  fixedWidth?: boolean;
  addToFavorite?: (type: string, id: number, cb: () => void) => void;
}

const PerfumeCard: React.FC<Props> = ({
  id,
  name,
  brand,
  match,
  image,
  onSelect,
  favorite,
  small,
  addToFavorite,
  fixedWidth,
}: Props) => {
  const [fav, setFav] = useState(favorite);

  const [loading, setLoading] = useState(false);

  const handlePress = useCallback(() => onSelect(id), [id, onSelect]);

  const handleHeartPressAction = useCallback(() => {
    if (small) {
      setLoading(true);
      addToFavorite &&
        addToFavorite(fav ? 'remove' : 'add', id, () => {
          setFav(!fav);
          setLoading(false);
        });
    }
    return;
  }, [addToFavorite, id, fav, small]);
  return (
    <View style={[styles.card, small && styles.smallCard, fixedWidth && styles.cardFixedWidth]}>
      {match && <PerfumeCardAccuracyMatch match={match} />}

      {!loading && <PerfumeCardHeart small={small} fav={fav} onPressAction={handleHeartPressAction} />}

      <TouchableOpacity activeOpacity={0.8} onPress={handlePress} style={styles.touchable}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={image ? { uri: image } : require('../../Assets/Images/perfume.png')}
          />
        </View>
        <View style={[small ? styles.smallTextContainer : styles.textContainer]}>
          <Text numberOfLines={1} style={[small ? styles.smallTitle : styles.title]}>
            {name}
          </Text>
          <Text numberOfLines={1} style={[small ? styles.smallBrand : styles.brand]}>
            {brand}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Metrics.perfumeCardWidth,
    aspectRatio: 218 / 210,
    borderRadius: Metrics.smallBorderRadius,
    backgroundColor: Colors.greyScaleOne,
    marginEnd: 12,
    justifyContent: 'space-between',
  },
  smallCard: {
    width: undefined,
    aspectRatio: undefined,
    height: Metrics.perfumeSmallCardHeight,
    marginBottom: Metrics.margin,
    marginEnd: 0,
  },
  cardFixedWidth: {
    width: Metrics.perfumeSmallCardWidth,
  },
  touchable: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    paddingBottom: 8,
  },
  image: {
    flex: 1,
  },
  textContainer: {
    width: Metrics.perfumeCardWidth,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomLeftRadius: Metrics.smallBorderRadius,
    borderBottomRightRadius: Metrics.smallBorderRadius,
    backgroundColor: Colors.lightBlue,
  },
  smallTextContainer: {
    marginTop: -8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomLeftRadius: Metrics.smallBorderRadius,
    borderBottomRightRadius: Metrics.smallBorderRadius,
  },
  title: {
    color: Colors.greyScaleOne,
    ...Fonts.style.favouritePerfumeName,
    lineHeight: Typography.smallerLineHeight,
    marginBottom: 2,
  },
  smallTitle: {
    color: Colors.greyScaleSix,
    ...Fonts.style.smallMedium,
    lineHeight: Typography.smallerLineHeight,
    marginBottom: 1,
  },
  brand: {
    ...Fonts.style.helper,
    color: Colors.greyScaleOne,
  },
  smallBrand: {
    ...Fonts.style.xsmallBase,
    color: Colors.greyScaleSix,
  },
});

export default memo(PerfumeCard);
