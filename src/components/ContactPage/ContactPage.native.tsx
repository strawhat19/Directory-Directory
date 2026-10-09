import { useRef } from 'react';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import PageCta from '../PageCta/PageCta';
import { BlurTargetView } from 'expo-blur';
import BrandMark from '../BrandMark/BrandMark';
import { contactFields } from './useContactForm';
import AuthActions from '../AuthActions/AuthActions';
import { pageCtas } from '../../shared/cta/pageCtas';
import PageEyebrow from '../PageEyebrow/PageEyebrow';
import { useContactPage } from './useContactPage.native';
import { elementProps } from '../../shared/ui/elementProps';
import ContactArtwork from '../ContactArtwork/ContactArtwork';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassBackdrop from '../GlassBackdrop/GlassBackdrop.native';
import DirectoryMarquee from '../DirectoryMarquee/DirectoryMarquee';
import { siteNavigation } from '../../shared/navigation/siteNavigation';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function ContactPage() {
    const blurTarget = useRef<View | null>(null);
    const {
        year,
        status,
        styles,
        palette,
        values,
        padding,
        preview,
        updateField,
        previewMessage,
    } = useContactPage();

    return (
        <SafeAreaView {...elementProps(`contact-screen`)} edges={[`top`, `bottom`]} style={styles.screen}>
            <ScrollView
                {...elementProps(`contact-scroll`)}
                stickyHeaderIndices={[0]}
                keyboardShouldPersistTaps={`handled`}
                contentContainerStyle={[styles.content, { paddingHorizontal: padding }]}
            >
                <View
                    {...elementProps(`contact-sticky-header`)}
                    style={styles.stickyHeader}
                >
                    <GlassBackdrop scope={`contact-header`} blurTarget={blurTarget} />
                    <DirectoryMarquee scope={`contact-header`} />
                    <View
                        {...elementProps(`contact-header`)}
                        style={styles.header}
                    >
                        <Link href={`/`} asChild>
                            <Pressable
                                {...elementProps(`contact-brand-link`)}
                                accessibilityLabel={`Directory Directory home`}
                                style={({ pressed }) => [styles.brand, pressed && styles.pressed]}
                            >
                                <BrandMark size={43} id={`contact-brand-mark`} className={`contact-brand-mark`} />
                                <Text {...elementProps(`contact-brand-name`)} style={styles.brandName}>
                                    {`Directory\nDirectory`}
                                </Text>
                            </Pressable>
                        </Link>
                        <View
                            {...elementProps(`contact-header-controls`)}
                            style={styles.headerControls}
                        >
                            <View {...elementProps(`contact-navigation`)} style={styles.navigation}>
                                {siteNavigation.map((item) => (
                                    <Link key={item.id} href={item.href} asChild>
                                        <Pressable
                                            {...elementProps(`contact-navigation-link`, item.id)}
                                            accessibilityState={{ selected: item.id === `contact` }}
                                            style={({ pressed }) => [
                                                styles.navigationLink,
                                                item.id === `contact` && styles.activeLink,
                                                pressed && styles.pressed,
                                            ]}
                                        >
                                            <Icon
                                                size={15}
                                                name={item.icon}
                                                color={item.color}
                                                id={`contact-navigation-icon-${item.id}`}
                                                className={`contact-navigation-icon`}
                                            />
                                            <Text {...elementProps(`contact-navigation-label`, item.id)} style={styles.navigationLabel}>
                                                {item.label}
                                            </Text>
                                        </Pressable>
                                    </Link>
                                ))}
                            </View>
                            <AuthActions scope={`contact-header`} />
                        </View>
                    </View>
                </View>
                <BlurTargetView
                    ref={blurTarget}
                    style={styles.body}
                    {...elementProps(`contact-body-blur-target`)}
                >
                <Link href={`/`} asChild>
                    <Pressable
                        {...elementProps(`contact-back-link`)}
                        style={({ pressed }) => [styles.backLink, pressed && styles.pressed]}
                    >
                        <Icon size={14} name={`grid`} color={palette.muted} id={`contact-back-icon`} className={`contact-back-icon`} />
                        <Text {...elementProps(`contact-back-label`)} style={styles.paragraph}>
                            {`Back to directories`}
                        </Text>
                    </Pressable>
                </Link>
                <PageEyebrow
                    page={`contact`}
                    id={`contact-eyebrow`}
                    label={`A little conversation`}
                    iconId={`contact-eyebrow-icon`}
                    labelId={`contact-eyebrow-label`}
                />
                <Text {...elementProps(`contact-heading`)} accessibilityRole={`header`} style={styles.heading}>
                    {`Contact`}
                </Text>
                <Text {...elementProps(`contact-description`)} style={styles.paragraph}>
                    {`An idea, a question, or something worth finding? There's always room for a good conversation.`}
                </Text>
                <ContactArtwork />
                <View {...elementProps(`contact-notice`)} style={styles.notice}>
                    <Text {...elementProps(`contact-notice-heading`)} style={styles.title}>
                        {`A preview, for now`}
                    </Text>
                    <Text {...elementProps(`contact-notice-description`)} style={styles.paragraph}>
                        {`This form isn't connected to a delivery service. You can preview your draft here; nothing is sent or saved outside this page's memory.`}
                    </Text>
                </View>
                <View {...elementProps(`contact-form-panel`)} style={styles.panel}>
                    <Text {...elementProps(`contact-form-heading`)} accessibilityRole={`header`} style={styles.title}>
                        {`Write a little note`}
                    </Text>
                    {contactFields.map((field) => (
                        <View key={field.id} {...elementProps(`contact-field`, field.id)} style={styles.field}>
                            <Text {...elementProps(`contact-label`, field.id)} style={styles.label}>
                                {field.label}
                            </Text>
                            <TextInput
                                {...elementProps(`contact-input`, field.id)}
                                value={values[field.id]}
                                accessibilityLabel={field.label}
                                placeholder={field.placeholder}
                                multiline={field.id === `message`}
                                placeholderTextColor={palette.muted}
                                onChangeText={(value) => updateField(field.id, value)}
                                style={[styles.input, field.id === `message` && styles.messageInput]}
                                keyboardType={field.id === `email` ? `email-address` : `default`}
                                autoCapitalize={field.id === `email` ? `none` : `sentences`}
                            />
                        </View>
                    ))}
                    <Pressable
                        onPress={previewMessage}
                        {...elementProps(`contact-preview-button`)}
                        accessibilityRole={`button`}
                        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                    >
                        <Text {...elementProps(`contact-preview-button-label`)} style={styles.buttonLabel}>
                            {`Preview message`}
                        </Text>
                        <Icon
                            size={17}
                            name={`arrow-right`}
                            color={palette.white}
                            id={`contact-preview-button-icon`}
                            className={`contact-preview-button-icon`}
                        />
                    </Pressable>
                    {status ? (
                        <Text
                            {...elementProps(`contact-form-status`)}
                            style={styles.paragraph}
                            accessibilityLiveRegion={`polite`}
                        >
                            {status}
                        </Text>
                    ) : null}
                    {preview ? (
                        <View {...elementProps(`contact-preview`)} style={styles.preview}>
                            <Text {...elementProps(`contact-preview-heading`)} accessibilityRole={`header`} style={styles.title}>
                                {`Local message preview`}
                            </Text>
                            <Text {...elementProps(`contact-preview-name`)} style={styles.label}>
                                {preview.name}
                            </Text>
                            <Text {...elementProps(`contact-preview-email`)} style={styles.paragraph}>
                                {preview.email}
                            </Text>
                            <Text {...elementProps(`contact-preview-message`)} style={styles.paragraph}>
                                {preview.message}
                            </Text>
                        </View>
                    ) : null}
                </View>
                <PageCta parentMaxWidth={900} content={pageCtas.contact} />
                <View {...elementProps(`contact-footer`)} style={styles.footer}>
                    <Text {...elementProps(`contact-copyright`)} style={styles.footerText}>
                        {year === null
                            ? `© Directory Directory.`
                            : `© ${year} Directory Directory.`}
                    </Text>
                    <Link href={`https://piratechs.com/`} asChild>
                        <Pressable
                            {...elementProps(`contact-footer-piratechs-link`)}
                            style={({ pressed }) => [styles.externalLink, pressed && styles.pressed]}
                        >
                            <Text {...elementProps(`contact-footer-piratechs-label`)} style={styles.externalLabel}>
                                {`Visit Piratechs`}
                            </Text>
                            <Icon
                                size={14}
                                name={`arrow-up-right`}
                                color={palette.blue}
                                id={`contact-footer-piratechs-icon`}
                                className={`contact-footer-piratechs-icon`}
                            />
                        </Pressable>
                    </Link>
                </View>
                </BlurTargetView>
            </ScrollView>
        </SafeAreaView>
    );
}
