import { useMemo } from 'react';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { pricingPlans } from './pricingPlans';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';
import { createPricingStyles } from './PricingSection.native.styles';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';
import { Pressable, Text, View, useWindowDimensions, type LayoutChangeEvent } from 'react-native';

type PricingSectionProps = {
    horizontalInset?: number;
    onLayout?: (event: LayoutChangeEvent) => void;
};

export default function PricingSection({ horizontalInset = 0, onLayout }: PricingSectionProps) {
    const accent = useSearchAccent();
    const { isDark } = useTheme();
    const { width } = useWindowDimensions();
    const { styles: common } = useBlogPresentation();
    const columns = width >= 1000 ? 4 : width >= 600 ? 2 : 1;
    const styles = useMemo(() => createPricingStyles(isDark), [isDark]);
    const columnWidth = columns === 4 ? `25%` : columns === 2 ? `50%` : `100%`;

    return (
        <View
            onLayout={onLayout}
            {...elementProps(`pricing-section`)}
            style={[
                styles.section,
                { width, backgroundColor: accent.color, marginHorizontal: -horizontalInset, paddingHorizontal: width >= 760 ? 32 : 20 },
            ]}
        >
            <View {...elementProps(`pricing-section-content`)} style={styles.content}>
                <View {...elementProps(`pricing-section-header`)} style={styles.header}>
                    <Text {...elementProps(`pricing-section-eyebrow`)} style={styles.eyebrow}>
                        {`PLANS & POSSIBILITIES`}
                    </Text>
                    <Text
                        {...elementProps(`pricing-section-title`)}
                        style={styles.title}
                        accessibilityRole={`header`}
                    >
                        {`A Little More Direction`}
                    </Text>
                    <Text {...elementProps(`pricing-section-description`)} style={styles.description}>
                        {`Explore for free. Build your presence. Make your next move.`}
                    </Text>
                </View>
                <View {...elementProps(`pricing-section-table`)} style={styles.table}>
                    {pricingPlans.map((plan, index) => (
                        <View
                            key={plan.id}
                            {...elementProps(`pricing-section-plan`, plan.id)}
                            style={[
                                styles.plan,
                                { width: columnWidth },
                                (index + 1) % columns === 0 && styles.lastColumn,
                                index >= pricingPlans.length - columns && styles.lastRow,
                                plan.highlighted && styles.highlightedPlan,
                            ]}
                        >
                            <View
                                {...elementProps(`pricing-section-plan-tab`, plan.id)}
                                style={[styles.folderTab, { backgroundColor: plan.color }]}
                            />
                            <Text {...elementProps(`pricing-section-plan-audience`, plan.id)} style={styles.audience}>
                                {plan.audience}
                            </Text>
                            <View
                                {...elementProps(`pricing-section-plan-mark-row`, plan.id)}
                                style={styles.markRow}
                            >
                                <Icon
                                    filled
                                    name={plan.icon}
                                    color={plan.color}
                                    size={plan.id === `dragon` ? 40 : 34}
                                    className={`pricing-section-plan-icon`}
                                    id={`pricing-section-plan-icon-${plan.id}`}
                                />
                                {plan.highlighted && (
                                    <Text
                                        style={styles.badge}
                                        {...elementProps(`pricing-section-plan-badge`, plan.id)}
                                    >
                                        {`More Visibility`}
                                    </Text>
                                )}
                            </View>
                            <Text
                                {...elementProps(`pricing-section-plan-name`, plan.id)}
                                style={[styles.planName, { color: plan.color }]}
                            >
                                {plan.name}
                            </Text>
                            <Text {...elementProps(`pricing-section-plan-summary`, plan.id)} style={styles.summary}>
                                {plan.summary}
                            </Text>
                            <View {...elementProps(`pricing-section-plan-price-row`, plan.id)} style={styles.priceRow}>
                                <Text {...elementProps(`pricing-section-plan-price`, plan.id)} style={styles.price}>
                                    {plan.price}
                                </Text>
                                <Text {...elementProps(`pricing-section-plan-period`, plan.id)} style={styles.pricePeriod}>
                                    {plan.period}
                                </Text>
                            </View>
                            <Text {...elementProps(`pricing-section-plan-detail`, plan.id)} style={styles.detail}>
                                {plan.detail}
                            </Text>
                            {plan.features.length > 0 && (
                                <View {...elementProps(`pricing-section-plan-features`, plan.id)} style={styles.features}>
                                    {plan.features.map((feature, featureIndex) => (
                                        <View
                                            key={feature}
                                            style={styles.feature}
                                            {...elementProps(`pricing-section-plan-feature`, `${plan.id}-${featureIndex}`)}
                                        >
                                            <Icon
                                                size={15}
                                                name={`check`}
                                                color={plan.color}
                                                className={`pricing-section-plan-feature-icon`}
                                                id={`pricing-section-plan-feature-icon-${plan.id}-${featureIndex}`}
                                            />
                                            <Text
                                                style={styles.featureLabel}
                                                {...elementProps(`pricing-section-plan-feature-label`, `${plan.id}-${featureIndex}`)}
                                            >
                                                {feature}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                            <Link
                                asChild
                                href={plan.id === `free` ? `/` : `/contact`}
                                {...elementProps(`pricing-section-plan-action-link`, plan.id)}
                            >
                                <Pressable
                                    accessibilityRole={`link`}
                                    {...elementProps(`pricing-section-plan-action`, plan.id)}
                                    style={({ pressed }) => [styles.action, pressed && styles.pressed]}
                                >
                                    <Text
                                        style={[common.actionLabel, styles.actionLabel]}
                                        {...elementProps(`pricing-section-plan-action-label`, plan.id)}
                                    >
                                        {plan.id === `free` ? `Explore Free` : `Get In Touch`}
                                    </Text>
                                    <Icon
                                        size={15}
                                        color={plan.color}
                                        name={`arrow-right`}
                                        className={`pricing-section-plan-action-icon`}
                                        id={`pricing-section-plan-action-icon-${plan.id}`}
                                    />
                                </Pressable>
                            </Link>
                        </View>
                    ))}
                </View>
                <View {...elementProps(`pricing-section-note`)} style={styles.note}>
                    <Icon
                        size={16}
                        name={`info`}
                        color={`#ffffff`}
                        id={`pricing-section-note-icon`}
                        className={`pricing-section-note-icon`}
                    />
                    <Text {...elementProps(`pricing-section-note-label`)} style={styles.noteLabel}>
                        {`Prices are in USD. Free is available now; paid plans and features are coming soon.`}
                    </Text>
                </View>
            </View>
        </View>
    );
}
