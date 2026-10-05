import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { useMemo, useRef } from 'react';
import { BlurTargetView } from 'expo-blur';
import BrandMark from '../BrandMark/BrandMark';
import { useProfilePage } from './useProfilePage';
import AuthActions from '../AuthActions/AuthActions';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createProfileStyles } from './ProfilePage.native.styles';
import GlassBackdrop from '../GlassBackdrop/GlassBackdrop.native';
import DirectoryMarquee from '../DirectoryMarquee/DirectoryMarquee';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { useCopyrightYear } from '../../shared/time/useCopyrightYear';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

export default function ProfilePage() {
  const state = useProfilePage();
  const { year } = useCopyrightYear();
  const { isDark } = useTheme();
  const accent = useSearchAccent();
  const blurTarget = useRef<View | null>(null);
  const palette = getNativePalette(isDark, accent);
  const styles = useMemo(() => createProfileStyles(isDark, accent), [isDark, accent]);
  const { user, ready } = state;

  return (
    <SafeAreaView {...elementProps(`profile-screen`)} edges={[`top`, `bottom`]} style={styles.screen}>
      <ScrollView
        stickyHeaderIndices={[0]}
        {...elementProps(`profile-scroll`)}
        contentContainerStyle={styles.content}
      >
        <View {...elementProps(`profile-sticky-header`)} style={styles.stickyHeader}>
          <GlassBackdrop scope={`profile-header`} blurTarget={blurTarget} />
          <DirectoryMarquee scope={`profile-header`} />
          <View {...elementProps(`profile-header`)} style={styles.header}>
            <Link href={`/`} asChild>
              <Pressable
                {...elementProps(`profile-brand-link`)}
                accessibilityLabel={`Directory Directory home`}
                style={({ pressed }) => [styles.brand, pressed && styles.pressed]}
              >
                <BrandMark id={`profile-brand-mark`} className={`profile-brand-mark`} size={42} />
                <Text {...elementProps(`profile-brand-name`)} style={styles.brandName}>
                  {`Directory\nDirectory`}
                </Text>
              </Pressable>
            </Link>
            <AuthActions scope={`profile-header`} />
          </View>
        </View>
        <BlurTargetView ref={blurTarget} {...elementProps(`profile-body-blur-target`)} style={styles.body}>
          <View {...elementProps(`profile-hero`)} style={styles.hero}>
            <View {...elementProps(`profile-eyebrow`)} style={styles.eyebrow}>
              <Icon name={`user`} id={`profile-eyebrow-icon`} color={palette.blue} size={15} />
              <Text {...elementProps(`profile-eyebrow-label`)} style={styles.eyebrowLabel}>
                {`YOUR ACCOUNT`}
              </Text>
            </View>
            <Text {...elementProps(`profile-heading`)} accessibilityRole={`header`} style={styles.heading}>
              {`Profile`}
            </Text>
          </View>
          {!ready ? (
            <View {...elementProps(`profile-loading`)} accessibilityLabel={`Loading profile`} style={styles.card}>
              <View {...elementProps(`profile-loading-avatar`)} style={[styles.avatar, styles.skeleton]} />
              <View {...elementProps(`profile-loading-name`)} style={[styles.skeletonLine, styles.skeleton]} />
              <View {...elementProps(`profile-loading-email`)} style={[styles.skeletonLine, styles.skeleton]} />
            </View>
          ) : user ? (
            <>
              <View {...elementProps(`profile-navigation`)} style={styles.navigation}>
                <Link href={state.profileRoute.href} asChild>
                  <Pressable
                    accessibilityRole={`link`}
                    accessibilityState={{ selected: true }}
                    {...elementProps(`profile-navigation-account`)}
                    style={({ pressed }) => [styles.navigationLink, styles.activeLink, pressed && styles.pressed]}
                  >
                    <Icon name={state.profileRoute.icon} id={`profile-navigation-account-icon`} color={palette.blue} size={16} />
                    <Text {...elementProps(`profile-navigation-account-label`)} style={styles.linkLabel}>
                      {state.profileRoute.label}
                    </Text>
                  </Pressable>
                </Link>
                <Link href={`/`} asChild>
                  <Pressable
                    accessibilityRole={`link`}
                    {...elementProps(`profile-navigation-home`)}
                    style={({ pressed }) => [styles.navigationLink, pressed && styles.pressed]}
                  >
                    <Icon name={`grid`} id={`profile-navigation-home-icon`} color={palette.blue} size={16} />
                    <Text {...elementProps(`profile-navigation-home-label`)} style={styles.linkLabel}>
                      {`Browse directories`}
                    </Text>
                  </Pressable>
                </Link>
              </View>
              <View {...elementProps(`profile-account`)} style={styles.card}>
                {user.photoURL ? (
                  <Image
                    style={styles.avatar}
                    source={{ uri: user.photoURL }}
                    accessibilityLabel={user.name}
                    {...elementProps(`profile-avatar`)}
                  />
                ) : (
                  <View {...elementProps(`profile-avatar`)} style={[styles.avatar, { backgroundColor: state.avatarColor }]}>
                    <Text {...elementProps(`profile-avatar-initial`)} style={[styles.initial, { color: state.avatarTextColor }]}>
                      {state.initial}
                    </Text>
                  </View>
                )}
                <Text {...elementProps(`profile-account-name`)} style={styles.name}>
                  {user.name}
                </Text>
                <Text {...elementProps(`profile-account-email`)} style={styles.email}>
                  {user.email}
                </Text>
                <Text {...elementProps(`profile-account-note`)} style={styles.note}>
                  {`Your Directory Directory account.`}
                </Text>
              </View>
            </>
          ) : (
            <View {...elementProps(`profile-sign-in-prompt`)} style={styles.card}>
              <Icon name={`user`} id={`profile-sign-in-icon`} color={palette.blue} size={32} />
              <Text {...elementProps(`profile-sign-in-heading`)} accessibilityRole={`header`} style={styles.name}>
                {`Sign in to view this`}
              </Text>
              <Text {...elementProps(`profile-sign-in-copy`)} style={styles.note}>
                {`Sign in or create an account to view your profile.`}
              </Text>
              <AuthActions scope={`profile-prompt`} />
            </View>
          )}
          <View {...elementProps(`profile-footer`)} style={styles.footer}>
            <Text {...elementProps(`profile-copyright`)} style={styles.footerText}>
              {`© ${year ?? `—`} Directory Directory`}
            </Text>
            <Link href={`https://piratechs.com/`} asChild>
              <Pressable
                accessibilityRole={`link`}
                {...elementProps(`profile-footer-piratechs-link`)}
                style={({ pressed }) => [styles.externalLink, pressed && styles.pressed]}
              >
                <Text {...elementProps(`profile-footer-piratechs-label`)} style={styles.linkLabel}>
                  {`Piratechs`}
                </Text>
                <Icon name={`arrow-up-right`} id={`profile-footer-piratechs-icon`} color={palette.blue} size={14} />
              </Pressable>
            </Link>
          </View>
        </BlurTargetView>
      </ScrollView>
    </SafeAreaView>
  );
}
