import Icon from '../Icon/Icon';
import { Animated, Pressable } from 'react-native';
import type { ScrollToTopProps } from './ScrollToTop.types';
import { useScrollToTop } from './useScrollToTop.native';
import { elementProps } from '../../shared/ui/elementProps';

export default function ScrollToTop({
    visible,
    onPress,
    onLayout,
    reduceMotion,
    overPricing = false,
}: ScrollToTopProps) {
    const {
        styles,
        palette,
        positionStyle,
        animationStyle,
        backgroundStyle,
        defaultIconStyle,
        pricingIconStyle,
    } = useScrollToTop(visible, reduceMotion, overPricing);

    return (
        <Animated.View
            onLayout={onLayout}
            {...elementProps(`scroll-to-top`)}
            pointerEvents={visible ? `auto` : `none`}
            accessibilityElementsHidden={!visible}
            importantForAccessibility={visible ? `auto` : `no-hide-descendants`}
            style={[styles.container, positionStyle, animationStyle]}
        >
            <Pressable
                onPress={onPress}
                disabled={!visible}
                accessibilityRole={`button`}
                accessibilityLabel={`Scroll to top`}
                {...elementProps(`scroll-to-top-button`)}
                style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            >
                <Animated.View
                    pointerEvents={`none`}
                    {...elementProps(`scroll-to-top-button-background`)}
                    style={[styles.buttonBackground, backgroundStyle]}
                />
                <Animated.View
                    pointerEvents={`none`}
                    accessibilityElementsHidden
                    {...elementProps(`scroll-to-top-default-icon-layer`)}
                    style={[styles.iconLayer, defaultIconStyle]}
                >
                    <Icon
                        size={18}
                        strokeWidth={2.4}
                        name={`chevron-up`}
                        color={palette.white}
                        id={`scroll-to-top-icon`}
                        className={`scroll-to-top__icon`}
                    />
                </Animated.View>
                <Animated.View
                    pointerEvents={`none`}
                    accessibilityElementsHidden
                    {...elementProps(`scroll-to-top-pricing-icon-layer`)}
                    style={[styles.iconLayer, pricingIconStyle]}
                >
                    <Icon
                        size={18}
                        strokeWidth={2.4}
                        name={`chevron-up`}
                        color={palette.ink}
                        id={`scroll-to-top-pricing-icon`}
                        className={`scroll-to-top__pricing-icon`}
                    />
                </Animated.View>
            </Pressable>
        </Animated.View>
    );
}
