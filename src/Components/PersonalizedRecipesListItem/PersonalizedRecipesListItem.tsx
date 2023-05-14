import React, { useCallback, memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { RoundedImage } from 'app/Components';
import * as types from 'app/Constants/types';
import { Colors, Metrics, Fonts } from 'app/Theme';

const QUANTITY_INGREDIENTS = 5;
interface Props {
  item: any;
  onSelect: (item: any) => void;
}

const PersonalizedRecipesListItem = ({ item, onSelect }: Props) => {
  const { selected_notes, recipe_name } = item;

  const handlePress = useCallback(() => onSelect(item), [onSelect, item]);

  const notes = selected_notes.slice(0, QUANTITY_INGREDIENTS);

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={handlePress}>
      <View style={styles.rowReversed}>
        {notes.map((item: types.Note) => (
          <RoundedImage key={item.pk} uri={item.featured_image.image} style={[styles.image]} />
        ))}
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {recipe_name}
        </Text>
        <View style={[styles.row, styles.wrap]}>
          {notes.map((item: types.RecipeBestMatch, index: number) => (
            <Text key={item.pk} style={styles.subtitle}>
              {item.name} {index !== selected_notes.length - 1 && ', '}
              {index === QUANTITY_INGREDIENTS - 1 && selected_notes.length > QUANTITY_INGREDIENTS && '...'}
            </Text>
          ))}
        </View>
      </View>
      <Icon name={'chevron-right'} style={styles.arrowRight} size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.greyScaleOne,
    borderRadius: Metrics.smallBorderRadius,
    marginBottom: Metrics.margin,
    paddingLeft: 26,
    alignItems: 'center',
    height: Metrics.recipeListItemHeight,
  },
  textContainer: {
    flex: 0.9,
    paddingLeft: Metrics.margin,
  },
  row: { flexDirection: 'row' },
  rowReversed: {
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    flexWrap: 'wrap',
    flex: 0.2,
  },
  image: { marginLeft: -26, borderColor: Colors.greyScaleOne },
  title: {
    ...Fonts.style.normal,
    color: Colors.greyScaleSix,
  },
  subtitle: {
    ...Fonts.style.helper,
    color: Colors.greyScaleFour,
  },
  wrap: { flexWrap: 'wrap' },
  arrowRight: { flex: 0.1, marginRight: Metrics.margin },
});

export default memo(PersonalizedRecipesListItem);
