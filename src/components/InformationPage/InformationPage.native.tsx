import { Link } from 'expo-router';
import Icon from '../Icon/Icon';
import BrandMark from '../BrandMark/BrandMark';
import AuthActions from '../AuthActions/AuthActions';
import DirectoryMarquee from '../DirectoryMarquee/DirectoryMarquee';
import type { InformationPageProps } from './InformationPage.types';
import { useInformationPage } from './useInformationPage.native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { palette } from '../LandingPage/LandingPage.native.styles';
import { elementProps } from '../../shared/ui/elementProps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { siteNavigation } from '../../shared/navigation/siteNavigation';
import { informationPages, informationUpdatedDate } from '../../shared/information/informationPages';

export default function InformationPage({ page }: InformationPageProps) {
    const content = informationPages[page];
    const { year, styles, padding } = useInformationPage();

    return (
        <SafeAreaView
            {...elementProps(`information-screen`, page)}
            edges={[`top`, `bottom`]}
            style={styles.screen}
        >
            <ScrollView
                {...elementProps(`information-scroll`, page)}
                stickyHeaderIndices={[0]}
                contentContainerStyle={[styles.content, { paddingHorizontal: padding }]}
            >
                <View
                    {...elementProps(`information-sticky-header`, page)}
                    style={styles.stickyHeader}
                >
                    <View
                        {...elementProps(`information-header`, page)}
                        style={styles.header}
                    >
                        <Link href={`/`} asChild>
                            <Pressable
                                {...elementProps(`information-brand-link`, page)}
                                accessibilityLabel={`Directory Directory home`}
                                style={({ pressed }) => [styles.brand, pressed && styles.pressed]}
                            >
                                <BrandMark
                                    size={43}
                                    id={`information-brand-mark-${page}`}
                                    className={`information-brand-mark`}
                                />
                                <Text
                                    {...elementProps(`information-brand-name`, page)}
                                    style={styles.brandName}
                                >
                                    {`Directory\nDirectory`}
                                </Text>
                            </Pressable>
                        </Link>
                        <View
                            {...elementProps(`information-header-controls`, page)}
                            style={styles.headerControls}
                        >
                            <View {...elementProps(`information-navigation`, page)} style={styles.navigation}>
                                {siteNavigation.map((item) => (
                                    <Link key={item.id} href={item.href} asChild>
                                        <Pressable
                                            {...elementProps(`information-navigation-link`, `${page}-${item.id}`)}
                                            accessibilityState={{ selected: item.id === page }}
                                            style={({ pressed }) => [
                                                styles.navigationLink,
                                                item.id === page && styles.navigationLinkActive,
                                                pressed && styles.pressed,
                                            ]}
                                        >
                                            <Icon
                                                size={15}
                                                name={item.icon}
                                                className={`information-navigation-icon`}
                                                id={`information-navigation-icon-${page}-${item.id}`}
                                                color={item.color}
                                            />
                                            <Text
                                                {...elementProps(`information-navigation-label`, `${page}-${item.id}`)}
                                                style={[styles.navigationLabel, item.id === page && styles.activeLabel]}
                                            >
                                                {item.label}
                                            </Text>
                                        </Pressable>
                                    </Link>
                                ))}
                            </View>
                            <AuthActions scope={`information-header-${page}`} />
                        </View>
                    </View>
                    <DirectoryMarquee scope={`information-header-${page}`} />
                </View>
                <Link href={`/`} asChild>
                    <Pressable
                        {...elementProps(`information-back-link`, page)}
                        style={({ pressed }) => [styles.backLink, pressed && styles.pressed]}
                    >
                        <Icon
                            size={14}
                            name={`grid`}
                            color={palette.muted}
                            id={`information-back-icon-${page}`}
                            className={`information-back-icon`}
                        />
                        <Text {...elementProps(`information-back-label`, page)} style={styles.backLabel}>
                            {`Back to directories`}
                        </Text>
                    </Pressable>
                </Link>
                <View {...elementProps(`information-hero`, page)} style={styles.hero}>
                    <View {...elementProps(`information-eyebrow`, page)} style={styles.eyebrow}>
                        <Icon
                            size={15}
                            name={content.icon}
                            color={palette.blue}
                            id={`information-eyebrow-icon-${page}`}
                            className={`information-eyebrow-icon`}
                        />
                        <Text {...elementProps(`information-eyebrow-label`, page)} style={styles.eyebrowLabel}>
                            {content.eyebrow}
                        </Text>
                    </View>
                    <Text
                        {...elementProps(`information-heading`, page)}
                        style={styles.heading}
                        accessibilityRole={`header`}
                    >
                        {content.title}
                    </Text>
                    <Text {...elementProps(`information-summary`, page)} style={styles.summary}>
                        {content.summary}
                    </Text>
                    {page !== `about` ? (
                        <Text {...elementProps(`information-updated`, page)} style={styles.updated}>
                            {`Last updated ${informationUpdatedDate}`}
                        </Text>
                    ) : null}
                </View>
                <View {...elementProps(`information-note`, page)} style={styles.note}>
                    <Text {...elementProps(`information-note-title`, page)} style={styles.noteTitle}>
                        {content.noteTitle}
                    </Text>
                    <Text {...elementProps(`information-note-text`, page)} style={styles.paragraph}>
                        {content.note}
                    </Text>
                </View>
                <View {...elementProps(`information-sections`, page)} style={styles.sections}>
                    {content.sections.map((section) => (
                        <View
                            key={section.id}
                            {...elementProps(`information-section`, `${page}-${section.id}`)}
                            style={styles.section}
                        >
                            <Text
                                style={styles.sectionTitle}
                                accessibilityRole={`header`}
                                {...elementProps(`information-section-title`, `${page}-${section.id}`)}
                            >
                                {section.title}
                            </Text>
                            {section.paragraphs.map((paragraph, index) => (
                                <Text
                                    key={index}
                                    style={styles.paragraph}
                                    {...elementProps(`information-section-paragraph`, `${page}-${section.id}-${index}`)}
                                >
                                    {paragraph}
                                </Text>
                            ))}
                        </View>
                    ))}
                    <View {...elementProps(`information-contact`, page)} style={styles.contact}>
                        <Text {...elementProps(`information-contact-label`, page)} style={styles.paragraph}>
                            {`Questions or feedback?`}
                        </Text>
                        <Link href={`https://piratechs.com/`} asChild>
                            <Pressable
                                {...elementProps(`information-contact-link`, page)}
                                style={({ pressed }) => [styles.externalLink, pressed && styles.pressed]}
                            >
                                <Text {...elementProps(`information-contact-text`, page)} style={styles.externalLabel}>
                                    {`Visit Piratechs`}
                                </Text>
                                <Icon
                                    size={16}
                                    name={`arrow-up-right`}
                                    color={palette.blue}
                                    id={`information-contact-icon-${page}`}
                                    className={`information-contact-icon`}
                                />
                            </Pressable>
                        </Link>
                    </View>
                </View>
                <View {...elementProps(`information-footer`, page)} style={styles.footer}>
                    <Text {...elementProps(`information-copyright`, page)} style={styles.footerText}>
                        {year === null
                            ? `© Directory Directory. Made for the curious.`
                            : `© ${year} Directory Directory. Made for the curious.`}
                    </Text>
                    <Link href={`https://piratechs.com/`} asChild>
                        <Pressable
                            {...elementProps(`information-footer-piratechs-link`, page)}
                            style={({ pressed }) => [styles.externalLink, pressed && styles.pressed]}
                        >
                            <Text
                                {...elementProps(`information-footer-piratechs-label`, page)}
                                style={styles.externalLabel}
                            >
                                {`Piratechs`}
                            </Text>
                            <Icon
                                size={14}
                                name={`arrow-up-right`}
                                color={palette.blue}
                                id={`information-footer-piratechs-icon-${page}`}
                                className={`information-footer-piratechs-icon`}
                            />
                        </Pressable>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
