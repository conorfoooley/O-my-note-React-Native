import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PerfumeCard } from 'app/Components';
import { types } from 'app/Constants';
import { Colors, Fonts, Metrics, Typography } from 'app/Theme';
import { translate } from 'app/translations';

interface Props {
  perfumes: types.Perfume[];
  user: types.User;
  onSelect: (id: number) => void;
  updateCollection: (type: string, id: number) => void;
}

const RecommendedPerfumeList: React.FC<Props> = ({ perfumes, onSelect, updateCollection, user }: Props) => {
  const renderPerfumeCard = (perfume: types.Perfume) => (
    <PerfumeCard
      key={perfume.pk}
      id={perfume.pk}
      name={perfume.name}
      brand={perfume.brand}
      image={perfume.image}
      onSelect={onSelect}
      match={perfume.fetch_accuracy}
      favorite={user?.wish_perfumes?.find((e) => e.pk === perfume.pk)}
      addToFavorite={async (type: any, id: any, cb: () => void) => {
        await updateCollection(type, id);
        cb();
      }}
      small
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.header}>{translate('recommendedPerfumesTitle')}</Text>
        {perfumes?.filter((p, index) => index % 2 === 1).map(renderPerfumeCard)}
      </View>
      <View style={styles.divider} />
      <View style={styles.column}>
        {perfumes?.filter((p, index) => index % 2 === 0).map(renderPerfumeCard)}
      </View>
    </View>
  );
};

export default React.memo(RecommendedPerfumeList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrics.mediumMargin,
    flexDirection: 'row',
    paddingBottom: 80,
    paddingTop: Metrics.mediumMargin,
  },
  column: {
    flex: 0.5,
  },
  divider: {
    width: 12,
  },
  header: {
    ...Fonts.style.h3,
    color: Colors.greyScaleSix,
    lineHeight: Typography.lineHeight,
    height: Metrics.perfumeSmallCardHeight / 2,
  },
});
