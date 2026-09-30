import { Link } from 'expo-router';
import Icon from '../Icon/Icon';
import BrandMark from '../BrandMark/BrandMark';
import { authDemoNotice } from './useAuthPage';
import type { AuthPageProps } from './AuthPage.types';
import AuthActions from '../AuthActions/AuthActions';
import DirectoryMarquee from '../DirectoryMarquee/DirectoryMarquee';
import { useNativeAuthPage } from './useAuthPage.native';
import { elementProps } from '../../shared/ui/elementProps';
import { palette } from '../LandingPage/LandingPage.native.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { siteNavigation } from '../../shared/navigation/siteNavigation';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function AuthPage({ mode }: AuthPageProps) {
    const {
        year,
        error,
        ready,
        fields,
        styles,
        values,
        submit,
        content,
        padding,
        pending,
        disabled,
        switchHref,
        updateField,
    } = useNativeAuthPage(mode);

    return (
        <SafeAreaView
            {...elementProps(`auth-screen`, mode)}
            edges={[`top`, `bottom`]}
            style={styles.screen}
        >
            <ScrollView
                {...elementProps(`auth-scroll`, mode)}
                stickyHeaderIndices={[0]}
                keyboardShouldPersistTaps={`handled`}
                contentContainerStyle={[styles.content, { paddingHorizontal: padding }]}
            >
                <View
                    {...elementProps(`auth-sticky-header`, mode)}
                    style={styles.stickyHeader}
                >
                    <View {...elementProps(`auth-header`, mode)} style={styles.header}>
                        <Link href={`/`} asChild>
                            <Pressable
                                {...elementProps(`auth-brand-link`, mode)}
                                accessibilityLabel={`Directory Directory home`}
                                style={({ pressed }) => [styles.brand, pressed && styles.pressed]}
                            >
                                <BrandMark size={43} id={`auth-brand-mark-${mode}`} className={`auth-brand-mark`} />
                                <Text {...elementProps(`auth-brand-name`, mode)} style={styles.brandName}>
                                    {`Directory\nDirectory`}
                                </Text>
                            </Pressable>
                        </Link>
                        <View
                            {...elementProps(`auth-header-controls`, mode)}
                            style={styles.headerControls}
                        >
                            <View {...elementProps(`auth-navigation`, mode)} style={styles.navigation}>
                                {siteNavigation.map((item) => (
                                    <Link key={item.id} href={item.href} asChild>
                                        <Pressable
                                            {...elementProps(`auth-navigation-link`, `${mode}-${item.id}`)}
                                            style={({ pressed }) => [styles.navigationLink, pressed && styles.pressed]}
                                        >
                                            <Icon
                                                size={15}
                                                name={item.icon}
                                                color={item.color}
                                                id={`auth-navigation-icon-${mode}-${item.id}`}
                                                className={`auth-navigation-icon`}
                                            />
                                            <Text
                                                {...elementProps(`auth-navigation-label`, `${mode}-${item.id}`)}
                                                style={styles.navigationLabel}
                                            >
                                                {item.label}
                                            </Text>
                                        </Pressable>
                                    </Link>
                                ))}
                            </View>
                            <AuthActions scope={`auth-${mode}`} />
                        </View>
                    </View>
                    <DirectoryMarquee scope={`auth-header-${mode}`} />
                </View>
                <View {...elementProps(`auth-panel`, mode)} style={styles.panel}>
                    <View {...elementProps(`auth-eyebrow`, mode)} style={styles.eyebrow}>
                        <Icon
                            size={16}
                            name={content.icon}
                            color={palette.blue}
                            id={`auth-eyebrow-icon-${mode}`}
                            className={`auth-eyebrow-icon`}
                        />
                        <Text {...elementProps(`auth-eyebrow-label`, mode)} style={styles.eyebrowLabel}>
                            {`Your local profile`}
                        </Text>
                    </View>
                    <Text {...elementProps(`auth-heading`, mode)} accessibilityRole={`header`} style={styles.heading}>
                        {content.title}
                    </Text>
                    <Text {...elementProps(`auth-description`, mode)} style={styles.paragraph}>
                        {content.description}
                    </Text>
                    <Text {...elementProps(`auth-demo-notice`, mode)} style={styles.notice}>
                        {authDemoNotice}
                    </Text>
                    {fields.map((field) => (
                        <View
                            key={field.id}
                            {...elementProps(`auth-field`, `${mode}-${field.id}`)}
                            style={styles.field}
                        >
                            <Text {...elementProps(`auth-label`, `${mode}-${field.id}`)} style={styles.label}>
                                {field.label}
                            </Text>
                            <TextInput
                                style={styles.input}
                                editable={!disabled}
                                value={values[field.id]}
                                accessibilityLabel={field.label}
                                placeholder={field.placeholder}
                                placeholderTextColor={palette.muted}
                                {...elementProps(`auth-input`, `${mode}-${field.id}`)}
                                onChangeText={(value) => updateField(field.id, value)}
                                autoCapitalize={field.id === `email` ? `none` : `words`}
                                keyboardType={field.id === `email` ? `email-address` : `default`}
                            />
                        </View>
                    ))}
                    {error ? (
                        <Text
                            {...elementProps(`auth-form-error`, mode)}
                            style={styles.error}
                            accessibilityLiveRegion={`polite`}
                        >
                            {error}
                        </Text>
                    ) : null}
                    <Pressable
                        disabled={disabled}
                        onPress={() => void submit()}
                        accessibilityRole={`button`}
                        {...elementProps(`auth-submit-button`, mode)}
                        accessibilityState={{ disabled, busy: pending }}
                        style={({ pressed }) => [
                            styles.button,
                            disabled && styles.disabled,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Icon
                            size={17}
                            name={content.icon}
                            color={palette.white}
                            id={`auth-submit-icon-${mode}`}
                            className={`auth-submit-icon`}
                        />
                        <Text {...elementProps(`auth-submit-label`, mode)} style={styles.buttonLabel}>
                            {!ready ? `Loading local profiles…` : pending ? `Opening profile…` : content.label}
                        </Text>
                    </Pressable>
                    <View {...elementProps(`auth-switch`, mode)} style={styles.switch}>
                        <Text {...elementProps(`auth-switch-prompt`, mode)} style={styles.footerText}>
                            {content.switchPrompt}
                        </Text>
                        <Link href={switchHref} asChild>
                            <Pressable
                                {...elementProps(`auth-switch-link`, mode)}
                                style={({ pressed }) => [styles.link, pressed && styles.pressed]}
                            >
                                <Icon
                                    size={15}
                                    name={content.switchIcon}
                                    color={palette.blue}
                                    id={`auth-switch-icon-${mode}`}
                                    className={`auth-switch-icon`}
                                />
                                <Text {...elementProps(`auth-switch-label`, mode)} style={styles.linkLabel}>
                                    {content.switchLabel}
                                </Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
                <View {...elementProps(`auth-footer`, mode)} style={styles.footer}>
                    <Text {...elementProps(`auth-copyright`, mode)} style={styles.footerText}>
                        {year === null
                            ? `© Directory Directory. Made for the curious.`
                            : `© ${year} Directory Directory. Made for the curious.`}
                    </Text>
                    <Link href={`https://piratechs.com/`} asChild>
                        <Pressable
                            {...elementProps(`auth-footer-piratechs-link`, mode)}
                            style={({ pressed }) => [styles.link, pressed && styles.pressed]}
                        >
                            <Text {...elementProps(`auth-footer-piratechs-label`, mode)} style={styles.linkLabel}>
                                {`Piratechs`}
                            </Text>
                            <Icon
                                size={14}
                                name={`arrow-up-right`}
                                color={palette.blue}
                                id={`auth-footer-piratechs-icon-${mode}`}
                                className={`auth-footer-piratechs-icon`}
                            />
                        </Pressable>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
