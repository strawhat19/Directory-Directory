import { useRef } from 'react';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import PageCta from '../PageCta/PageCta';
import { BlurTargetView } from 'expo-blur';
import BrandMark from '../BrandMark/BrandMark';
import { authDemoNotice } from './useAuthPage';
import AuthActions from '../AuthActions/AuthActions';
import { pageCtas } from '../../shared/cta/pageCtas';
import type { AuthPageProps } from './AuthPage.types';
import { useNativeAuthPage } from './useAuthPage.native';
import GlassBackdrop from '../GlassBackdrop/GlassBackdrop';
import { elementProps } from '../../shared/ui/elementProps';
import { SafeAreaView } from 'react-native-safe-area-context';
import DirectoryMarquee from '../DirectoryMarquee/DirectoryMarquee';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton';
import { siteNavigation } from '../../shared/navigation/siteNavigation';
import { Animated, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const storyItems = [
    { id: `places`, label: `Places`, icon: `places` },
    { id: `learning`, label: `Learning`, icon: `learning` },
    { id: `business`, label: `Business`, icon: `business` },
] as const;

export default function AuthPage({ mode }: AuthPageProps) {
    const blurTarget = useRef<View | null>(null);
    const inputs = useRef<Record<string, TextInput | null>>({});
    const state = useNativeAuthPage(mode);
    const { styles, palette, content } = state;

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
                contentContainerStyle={[styles.content, { paddingHorizontal: state.padding }]}
            >
                <View {...elementProps(`auth-sticky-header`, mode)} style={styles.stickyHeader}>
                    <GlassBackdrop scope={`auth-header-${mode}`} blurTarget={blurTarget} />
                    <DirectoryMarquee scope={`auth-header-${mode}`} />
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
                        <View {...elementProps(`auth-header-controls`, mode)} style={styles.headerControls}>
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
                </View>
                <BlurTargetView
                    ref={blurTarget}
                    style={styles.body}
                    {...elementProps(`auth-body-blur-target`, mode)}
                >
                    <View
                        {...elementProps(`auth-layout`, mode)}
                        style={[styles.layout, state.wide && styles.layoutWide]}
                    >
                        <View
                            {...elementProps(`auth-story`, mode)}
                            style={[styles.story, state.wide && styles.storyWide]}
                        >
                            <View {...elementProps(`auth-story-eyebrow`, mode)} style={styles.eyebrow}>
                                <Icon
                                    size={15}
                                    name={`sparkles`}
                                    color={palette.blue}
                                    id={`auth-story-eyebrow-icon-${mode}`}
                                    className={`auth-story-eyebrow-icon`}
                                />
                                <Text {...elementProps(`auth-story-eyebrow-label`, mode)} style={styles.eyebrowLabel}>
                                    {`A world worth exploring`}
                                </Text>
                            </View>
                            <Text {...elementProps(`auth-story-heading`, mode)} style={[styles.storyHeading, state.wide && styles.storyHeadingWide]}>
                                {`Good finds.\n`}
                                <Text {...elementProps(`auth-story-accent`, mode)} style={styles.storyAccent}>
                                    {`All in one place.`}
                                </Text>
                            </Text>
                            <Text {...elementProps(`auth-story-description`, mode)} style={styles.paragraph}>
                                {`Discover useful directories and make your next visit feel like home.`}
                            </Text>
                            <View {...elementProps(`auth-story-preview`, mode)} style={styles.storyPreview}>
                                {storyItems.map(item => (
                                    <View
                                        key={item.id}
                                        {...elementProps(`auth-story-chip`, `${mode}-${item.id}`)}
                                        style={styles.storyChip}
                                    >
                                        <Icon
                                            size={14}
                                            name={item.icon}
                                            color={palette.blue}
                                            id={`auth-story-chip-icon-${mode}-${item.id}`}
                                            className={`auth-story-chip-icon`}
                                        />
                                        <Text
                                            {...elementProps(`auth-story-chip-label`, `${mode}-${item.id}`)}
                                            style={styles.storyChipLabel}
                                        >
                                            {item.label}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View
                            {...elementProps(`auth-panel`, mode)}
                            style={[styles.panel, state.wide && styles.panelWide]}
                        >
                            <View {...elementProps(`auth-panel-content`, mode)} style={styles.panelContent}>
                                <View {...elementProps(`auth-mode-navigation`, mode)} style={styles.modes}>
                                    {([`sign-in`, `sign-up`] as const).map(item => (
                                        <Link key={item} href={item === `sign-in` ? `/sign-in` : `/sign-up`} asChild>
                                            <Pressable
                                                disabled={item === mode || state.disabled}
                                                {...elementProps(`auth-mode-link`, `${mode}-${item}`)}
                                                accessibilityRole={`link`}
                                                accessibilityState={{ selected: mode === item }}
                                                style={({ pressed }) => [
                                                    styles.modeLink,
                                                    mode === item && styles.modeActive,
                                                    pressed && styles.pressed,
                                                ]}
                                            >
                                                <Icon
                                                    size={15}
                                                    name={item === `sign-in` ? `log-in` : `user-plus`}
                                                    color={mode === item ? palette.blue : palette.muted}
                                                    id={`auth-mode-icon-${mode}-${item}`}
                                                    className={`auth-mode-icon`}
                                                />
                                                <Text
                                                    {...elementProps(`auth-mode-label`, `${mode}-${item}`)}
                                                    style={[styles.modeLabel, mode === item && styles.modeLabelActive]}
                                                >
                                                    {item === `sign-in` ? `Sign In` : `Create Account`}
                                                </Text>
                                            </Pressable>
                                        </Link>
                                    ))}
                                </View>
                                {state.signingUp && state.ready ? (
                                    <View
                                        {...elementProps(`auth-progress`, mode)}
                                        style={styles.progress}
                                        accessibilityLabel={state.progressLabel}
                                    >
                                        {state.steps.map((item, index) => (
                                            <View
                                                key={item.id}
                                                {...elementProps(`auth-progress-step`, `${mode}-${item.id}`)}
                                                style={styles.step}
                                            >
                                                <View
                                                    {...elementProps(`auth-progress-track`, `${mode}-${item.id}`)}
                                                    style={[styles.stepTrack, index <= state.step && styles.stepTrackActive]}
                                                />
                                                <View
                                                    {...elementProps(`auth-progress-details`, `${mode}-${item.id}`)}
                                                    style={styles.stepDetails}
                                                >
                                                    <View
                                                        {...elementProps(`auth-progress-number`, `${mode}-${item.id}`)}
                                                        style={[styles.stepNumber, index <= state.step && styles.stepNumberActive]}
                                                    >
                                                        {index < state.step ? (
                                                            <Icon
                                                                size={11}
                                                                name={`check`}
                                                                color={palette.blue}
                                                                id={`auth-progress-check-${mode}-${item.id}`}
                                                                className={`auth-progress-check`}
                                                            />
                                                        ) : (
                                                            <Text
                                                                {...elementProps(`auth-progress-number-label`, `${mode}-${item.id}`)}
                                                                style={[styles.stepNumberLabel, index === state.step && styles.stepLabelActive]}
                                                            >
                                                                {index + 1}
                                                            </Text>
                                                        )}
                                                    </View>
                                                    <Text
                                                        {...elementProps(`auth-progress-label`, `${mode}-${item.id}`)}
                                                        style={[styles.stepLabel, index === state.step && styles.stepLabelActive]}
                                                    >
                                                        {item.label}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                ) : null}
                                {!state.ready ? (
                                    <View
                                        {...elementProps(`auth-loading`, mode)}
                                        style={styles.form}
                                        accessibilityLabel={`Loading your account`}
                                        accessibilityState={{ busy: true }}
                                    >
                                        <View {...elementProps(`auth-skeleton-heading`, mode)} style={[styles.skeleton, styles.skeletonHeading]} />
                                        <View {...elementProps(`auth-skeleton-copy`, mode)} style={[styles.skeleton, styles.skeletonCopy]} />
                                        {[0, 1, 2].map(index => (
                                            <View
                                                key={index}
                                                {...elementProps(`auth-skeleton-field`, `${mode}-${index}`)}
                                                style={[styles.skeleton, styles.skeletonField]}
                                            />
                                        ))}
                                    </View>
                                ) : (
                                    <Animated.View
                                        {...elementProps(`auth-form`, `${mode}-${state.step}`)}
                                        style={[styles.form, state.revealStyle]}
                                    >
                                        <View {...elementProps(`auth-heading-group`, mode)} style={styles.headingGroup}>
                                            <Text
                                                {...elementProps(`auth-heading`, mode)}
                                                accessibilityRole={`header`}
                                                style={[styles.heading, state.wide && styles.headingWide]}
                                            >
                                                {state.heading}
                                            </Text>
                                            <Text {...elementProps(`auth-description`, mode)} style={styles.paragraph}>
                                                {state.description}
                                            </Text>
                                        </View>
                                        {!state.signingUp || state.step === 0 ? <GoogleAuthButton mode={mode} /> : null}
                                        {state.fields.map((field, index) => {
                                            const password = field.id === `password` || field.id === `confirmPassword`;
                                            const lastField = index === state.fields.length - 1;
                                            return (
                                                <View
                                                    key={field.id}
                                                    {...elementProps(`auth-field`, `${mode}-${field.id}`)}
                                                    style={styles.field}
                                                >
                                                    <Text {...elementProps(`auth-label`, `${mode}-${field.id}`)} style={styles.label}>
                                                        {field.label}
                                                    </Text>
                                                    <View
                                                        {...elementProps(`auth-input-frame`, `${mode}-${field.id}`)}
                                                        style={[styles.inputFrame, state.fieldError === field.id && styles.inputFrameError]}
                                                    >
                                                        <Icon
                                                            size={16}
                                                            name={field.icon}
                                                            color={palette.muted}
                                                            id={`auth-input-icon-${mode}-${field.id}`}
                                                            className={`auth-input-icon`}
                                                        />
                                                        <TextInput
                                                            style={styles.input}
                                                            editable={!state.disabled}
                                                            value={state.values[field.id]}
                                                            autoCorrect={!password && field.id !== `email`}
                                                            accessibilityLabel={field.label}
                                                            placeholder={field.placeholder}
                                                            placeholderTextColor={palette.muted}
                                                            secureTextEntry={password && !state.showPassword}
                                                            returnKeyType={lastField ? `done` : `next`}
                                                            autoComplete={password ? state.signingUp ? `new-password` : `current-password` : field.id === `name` ? `name` : `email`}
                                                            textContentType={password ? state.signingUp ? `newPassword` : `password` : field.id === `name` ? `name` : `emailAddress`}
                                                            ref={input => { inputs.current[field.id] = input; }}
                                                            {...elementProps(`auth-input`, `${mode}-${field.id}`)}
                                                            onChangeText={value => state.updateField(field.id, value)}
                                                            autoCapitalize={field.id === `name` ? `words` : `none`}
                                                            keyboardType={field.id === `email` ? `email-address` : `default`}
                                                            onSubmitEditing={() => {
                                                                if (lastField) void state.submit();
                                                                else inputs.current[state.fields[index + 1].id]?.focus();
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            );
                                        })}
                                        {state.fields.some(field => field.id === `password`) ? (
                                            <Pressable
                                                disabled={state.disabled}
                                                onPress={state.togglePassword}
                                                style={styles.passwordToggle}
                                                accessibilityRole={`button`}
                                                {...elementProps(`auth-password-toggle`, mode)}
                                                accessibilityLabel={state.showPassword ? `Hide Password` : `Show Password`}
                                                accessibilityState={{ selected: state.showPassword }}
                                            >
                                                <Icon
                                                    size={14}
                                                    name={`shield`}
                                                    color={palette.blue}
                                                    id={`auth-password-toggle-icon-${mode}`}
                                                    className={`auth-password-toggle-icon`}
                                                />
                                                <Text {...elementProps(`auth-password-toggle-label`, mode)} style={styles.passwordToggleLabel}>
                                                    {state.showPassword ? `Hide Password` : `Show Password`}
                                                </Text>
                                            </Pressable>
                                        ) : null}
                                        {state.error ? (
                                            <Text
                                                {...elementProps(`auth-form-error`, mode)}
                                                style={styles.error}
                                                accessibilityLiveRegion={`polite`}
                                                accessibilityRole={`alert`}
                                            >
                                                {state.error}
                                            </Text>
                                        ) : null}
                                        <View {...elementProps(`auth-actions`, mode)} style={styles.actions}>
                                            {state.signingUp && state.step > 0 ? (
                                                <Pressable
                                                    onPress={state.back}
                                                    disabled={state.disabled}
                                                    accessibilityRole={`button`}
                                                    {...elementProps(`auth-back-button`, mode)}
                                                    style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
                                                >
                                                    <View {...elementProps(`auth-back-icon-wrap`, mode)} style={styles.backIcon}>
                                                        <Icon
                                                            size={16}
                                                            name={`arrow-right`}
                                                            color={palette.ink}
                                                            id={`auth-back-icon-${mode}`}
                                                            className={`auth-back-icon`}
                                                        />
                                                    </View>
                                                    <Text {...elementProps(`auth-back-label`, mode)} style={styles.backLabel}>
                                                        {`Back`}
                                                    </Text>
                                                </Pressable>
                                            ) : null}
                                            <Pressable
                                                disabled={state.disabled}
                                                onPress={() => void state.submit()}
                                                accessibilityRole={`button`}
                                                {...elementProps(`auth-submit-button`, mode)}
                                                accessibilityState={{ disabled: state.disabled, busy: state.pending }}
                                                style={({ pressed }) => [
                                                    styles.button,
                                                    state.disabled && styles.disabled,
                                                    pressed && styles.pressed,
                                                ]}
                                            >
                                                <Text {...elementProps(`auth-submit-label`, mode)} style={styles.buttonLabel}>
                                                    {state.submitLabel}
                                                </Text>
                                                <Icon
                                                    size={17}
                                                    name={state.signingUp && !state.lastStep ? `arrow-right` : content.icon}
                                                    color={palette.white}
                                                    id={`auth-submit-icon-${mode}`}
                                                    className={`auth-submit-icon`}
                                                />
                                            </Pressable>
                                        </View>
                                        {state.signingUp ? (
                                            <Text {...elementProps(`auth-step-description`, mode)} style={styles.progressLabel}>
                                                {state.progressLabel}
                                            </Text>
                                        ) : null}
                                    </Animated.View>
                                )}
                                <View {...elementProps(`auth-switch`, mode)} style={styles.switch}>
                                    <Text {...elementProps(`auth-switch-prompt`, mode)} style={styles.footerText}>
                                        {content.switchPrompt}
                                    </Text>
                                    <Link href={state.switchHref} asChild>
                                        <Pressable
                                            disabled={state.disabled}
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
                                <View {...elementProps(`auth-demo-notice`, mode)} style={styles.notice}>
                                    <Icon
                                        size={15}
                                        name={`shield`}
                                        color={palette.muted}
                                        id={`auth-demo-notice-icon-${mode}`}
                                        className={`auth-demo-notice-icon`}
                                    />
                                    <Text {...elementProps(`auth-demo-notice-label`, mode)} style={styles.noticeText}>
                                        {authDemoNotice}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <PageCta compact parentMaxWidth={1440} content={pageCtas[mode]} />
                    <View {...elementProps(`auth-footer`, mode)} style={styles.footer}>
                        <Text {...elementProps(`auth-copyright`, mode)} style={styles.footerText}>
                            {state.year === null ? `© Directory Directory.` : `© ${state.year} Directory Directory.`}
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
                </BlurTargetView>
            </ScrollView>
        </SafeAreaView>
    );
}
