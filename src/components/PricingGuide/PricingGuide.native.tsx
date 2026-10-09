import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { styles } from './PricingGuide.native.styles';
import { pricingGuideContent } from './pricingGuideContent';
import { elementProps } from '../../shared/ui/elementProps';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';

const PricingGuide = () => {
  const { width, palette, styles: common } = useBlogPresentation();

  return (
    <View {...elementProps(`pricing-guide`)} style={[styles.section, { backgroundColor: palette.background, paddingVertical: width >= 760 ? 32 : 24 }]}>
      <View {...elementProps(`pricing-guide-header`)} style={styles.header}>
        <Text {...elementProps(`pricing-guide-eyebrow`)} style={[common.eyebrowLabel, { color: palette.muted }]}>{pricingGuideContent.eyebrow}</Text>
        <Text {...elementProps(`pricing-guide-heading`)} accessibilityRole={`header`} style={common.title}>{pricingGuideContent.title}</Text>
        <Text {...elementProps(`pricing-guide-summary`)} style={common.paragraph}>{pricingGuideContent.summary}</Text>
      </View>
      <View {...elementProps(`pricing-guide-cards`)} style={[styles.cards, width >= 900 && styles.cardsWide]}>
        {pricingGuideContent.items.map((item) => (
          <View
            key={item.id}
            {...elementProps(`pricing-guide-card`, item.id)}
            style={[styles.card, width >= 900 && styles.cardWide, { borderColor: palette.border, borderTopColor: `${item.color}66`, backgroundColor: palette.surface }]}
          >
            <View
              accessible={false}
              pointerEvents={`none`}
              accessibilityElementsHidden
              {...elementProps(`pricing-guide-card-tab`, item.id)}
              importantForAccessibility={`no-hide-descendants`}
              style={[styles.tab, { backgroundColor: `${item.color}66` }]}
            />
            <View {...elementProps(`pricing-guide-card-symbol`, item.id)} style={[styles.symbol, { backgroundColor: `${item.color}12` }]}>
              <Icon size={22} name={item.icon} color={item.color} filled={item.icon === `folder`} id={`pricing-guide-card-icon-${item.id}`} className={`pricing-guide-card-icon`} />
            </View>
            <Text {...elementProps(`pricing-guide-card-title`, item.id)} accessibilityRole={`header`} style={[common.title, styles.title]}>{item.title}</Text>
            <Text {...elementProps(`pricing-guide-card-description`, item.id)} style={[common.paragraph, styles.description]}>{item.description}</Text>
          </View>
        ))}
      </View>
      <Link href={`/docs`} asChild>
        <Pressable {...elementProps(`pricing-guide-docs-link`)} accessibilityRole={`link`} style={({ pressed }) => [common.action, pressed && common.pressed]}>
          <Icon size={16} name={`learning`} color={palette.green} id={`pricing-guide-docs-icon`} className={`pricing-guide-docs-icon`} />
          <Text {...elementProps(`pricing-guide-docs-label`)} style={[common.actionLabel, { color: palette.ink }]}>{`Read the Browsing Guide`}</Text>
          <Icon size={14} name={`arrow-right`} color={palette.muted} id={`pricing-guide-docs-arrow`} className={`pricing-guide-docs-arrow`} />
        </Pressable>
      </Link>
    </View>
  );
};

export default PricingGuide;
