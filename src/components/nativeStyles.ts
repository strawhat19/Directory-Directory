import { StyleSheet } from 'react-native'
import type { CategoryId } from '../data/directories'

export type Theme = `light` | `dark`

export type Palette = {
  page: string
  surface: string
  raised: string
  ink: string
  muted: string
  blue: string
  red: string
  green: string
  line: string
  tab: string
  motif: string
  searchInk: string
  searchMuted: string
  actionInk: string
}

export const palettes: Record<Theme, Palette> = {
  light: {
    page: `#F7F9FC`,
    surface: `#FFFFFF`,
    raised: `#FFFFFF`,
    ink: `#111B2A`,
    muted: `#566579`,
    blue: `#1265BE`,
    red: `#B84958`,
    green: `#187B5A`,
    line: `#D9E2EC`,
    tab: `#EDF2F7`,
    motif: `#1265BE`,
    searchInk: `#111B2A`,
    searchMuted: `#66758A`,
    actionInk: `#FFFFFF`,
  },
  dark: {
    page: `#0B1018`,
    surface: `#101824`,
    raised: `#131C29`,
    ink: `#F6F8FC`,
    muted: `#A9B7C9`,
    blue: `#4B9DFF`,
    red: `#E77B86`,
    green: `#58C79B`,
    line: `#29394D`,
    tab: `#172334`,
    motif: `#4B9DFF`,
    searchInk: `#F6F8FC`,
    searchMuted: `#A9B7C9`,
    actionInk: `#0B1018`,
  },
}

export const categoryColors: Record<CategoryId, { tile: string; icon: string }> = {
  design: { tile: `#1A3553`, icon: `#7BBCFF` },
  tools: { tile: `#183B31`, icon: `#6ED4AA` },
  communities: { tile: `#432731`, icon: `#F09AA3` },
  places: { tile: `#24364A`, icon: `#A8C7E8` },
}

export const lightCategoryColors: Record<CategoryId, { tile: string; icon: string }> = {
  design: { tile: `#E6F1FE`, icon: `#1265BE` },
  tools: { tile: `#E1F3E9`, icon: `#187B5A` },
  communities: { tile: `#FBE9EB`, icon: `#B84958` },
  places: { tile: `#EAF0F7`, icon: `#365C80` },
}

export function createNativeStyles(palette: Palette, width: number) {
  const compact = width < 360
  const tablet = width >= 700
  const wide = width >= 1040
  const sidePadding = tablet ? 44 : compact ? 20 : 24
  const pageWidth = Math.min(width, 1120) - sidePadding * 2
  const categoryGap = tablet ? 16 : 12
  const categoryColumns = width < 335 ? 1 : tablet ? 4 : 2
  const categoryWidth = (pageWidth - categoryGap * (categoryColumns - 1)) / categoryColumns
  const directoryColumns = tablet ? 2 : 1
  const directoryGap = 16
  const directoryWidth = (pageWidth - directoryGap * (directoryColumns - 1)) / directoryColumns

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.page,
    },
    scrollView: {
      flex: 1,
      backgroundColor: palette.page,
    },
    pageShell: {
      position: `relative`,
      width: `100%`,
      maxWidth: 1120,
      alignSelf: `center`,
      paddingHorizontal: sidePadding,
    },
    pressedItem: {
      opacity: 0.72,
    },
    siteHeader: {
      minHeight: tablet ? 96 : 84,
      flexDirection: `row`,
      alignItems: `center`,
      justifyContent: `space-between`,
      gap: 12,
      borderBottomWidth: 1,
      borderColor: palette.line,
    },
    brandLink: {
      minWidth: 0,
      flex: 1,
      flexDirection: `row`,
      alignItems: `center`,
      gap: 12,
    },
    brandName: {
      color: palette.ink,
      fontSize: tablet ? 19 : 17,
      lineHeight: tablet ? 22 : 20,
      fontFamily: `Inter_700Bold`,
    },
    headerActions: {
      flexDirection: `row`,
      alignItems: `center`,
      gap: 8,
    },
    headerIconButton: {
      width: 42,
      height: 42,
      alignItems: `center`,
      justifyContent: `center`,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: palette.line,
      backgroundColor: palette.surface,
    },
    siteNavigation: {
      position: `absolute`,
      zIndex: 10,
      top: tablet ? 88 : 78,
      right: sidePadding,
      width: Math.min(pageWidth, 284),
      gap: 4,
      padding: 10,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: palette.line,
      backgroundColor: palette.raised,
      shadowColor: `#000000`,
      shadowOpacity: 0.18,
      shadowRadius: 20,
      elevation: 8,
    },
    navigationLink: {
      minHeight: 48,
      justifyContent: `center`,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    navigationLinkText: {
      color: palette.ink,
      fontSize: 15,
      fontFamily: `Inter_600SemiBold`,
    },
    navigationPrimaryLink: {
      backgroundColor: palette.blue,
    },
    navigationPrimaryText: {
      color: palette.actionInk,
    },
    heroSection: {
      paddingTop: tablet ? 100 : 70,
    },
    heroCopy: {
      maxWidth: 760,
    },
    heroEyebrow: {
      marginBottom: 18,
      color: palette.blue,
      fontSize: 11,
      lineHeight: 16,
      fontFamily: `Inter_700Bold`,
      letterSpacing: 1.3,
    },
    heroHeading: {
      maxWidth: 740,
      color: palette.ink,
      fontSize: wide ? 72 : tablet ? 58 : compact ? 38 : 42,
      lineHeight: wide ? 79 : tablet ? 66 : compact ? 45 : 49,
      fontFamily: `Inter_600SemiBold`,
    },
    heroDescription: {
      maxWidth: 580,
      marginTop: 20,
      color: palette.muted,
      fontSize: tablet ? 19 : 16,
      lineHeight: tablet ? 29 : 25,
      fontFamily: `Inter_400Regular`,
    },
    heroSearch: {
      flexDirection: `row`,
      alignItems: `center`,
      maxWidth: 680,
      height: tablet ? 72 : 64,
      gap: 13,
      marginTop: tablet ? 38 : 34,
      paddingLeft: 18,
      paddingRight: 7,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: palette.line,
      backgroundColor: palette.raised,
    },
    searchInput: {
      minWidth: 0,
      flex: 1,
      height: `100%`,
      padding: 0,
      color: palette.searchInk,
      fontSize: 16,
      fontFamily: `Inter_400Regular`,
    },
    searchButton: {
      width: tablet ? 56 : 48,
      height: tablet ? 56 : 48,
      alignItems: `center`,
      justifyContent: `center`,
      borderRadius: 11,
      backgroundColor: palette.blue,
    },
    categoryHeadingGroup: {
      marginTop: tablet ? 100 : 76,
    },
    sectionTitle: {
      color: palette.ink,
      fontSize: tablet ? 28 : 23,
      lineHeight: tablet ? 36 : 31,
      fontFamily: `Inter_600SemiBold`,
    },
    sectionDescription: {
      marginTop: 5,
      color: palette.muted,
      fontSize: 14,
      lineHeight: 21,
      fontFamily: `Inter_400Regular`,
    },
    categoryGrid: {
      flexDirection: `row`,
      flexWrap: `wrap`,
      gap: categoryGap,
      marginTop: 22,
    },
    categoryFolder: {
      width: categoryWidth,
      height: tablet ? 148 : 132,
    },
    categoryFolderTab: {
      position: `absolute`,
      zIndex: 2,
      top: 0,
      left: 18,
      width: 34,
      height: 3,
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
    },
    categoryFolderFront: {
      flex: 1,
      justifyContent: `space-between`,
      padding: tablet ? 19 : 16,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: palette.line,
      backgroundColor: palette.raised,
    },
    categoryFolderSelected: {
      borderColor: palette.blue,
      backgroundColor: palette.surface,
    },
    categoryIconTile: {
      width: 42,
      height: 42,
      alignItems: `center`,
      justifyContent: `center`,
      borderRadius: 11,
    },
    categoryFolderBottom: {
      flexDirection: `row`,
      alignItems: `center`,
      justifyContent: `space-between`,
      gap: 4,
    },
    categoryFolderLabel: {
      flexShrink: 1,
      color: palette.ink,
      fontSize: compact ? 14 : tablet ? 18 : 16,
      lineHeight: tablet ? 25 : 22,
      fontFamily: `Inter_600SemiBold`,
    },
    exploreSection: {
      marginTop: tablet ? 116 : 90,
    },
    exploreTitleTab: {
      marginBottom: 26,
    },
    exploreTitle: {
      color: palette.ink,
      fontSize: tablet ? 32 : 26,
      lineHeight: tablet ? 40 : 34,
      fontFamily: `Inter_600SemiBold`,
    },
    exploreControls: {
      alignItems: `stretch`,
      gap: 15,
    },
    topicTabsContent: {
      flexDirection: `row`,
      alignItems: `center`,
      gap: 8,
      paddingRight: 16,
    },
    folderTab: {
      minHeight: 38,
      alignItems: `center`,
      justifyContent: `center`,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: palette.line,
      backgroundColor: palette.surface,
    },
    folderTabSelected: {
      borderColor: palette.blue,
      backgroundColor: palette.blue,
    },
    folderTabText: {
      color: palette.muted,
      fontSize: 14,
      fontFamily: `Inter_600SemiBold`,
    },
    folderTabTextSelected: {
      color: palette.actionInk,
    },
    viewModeControls: {
      flexDirection: `row`,
      alignSelf: `flex-end`,
      gap: 3,
      padding: 4,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: palette.line,
      backgroundColor: palette.surface,
    },
    viewModeButton: {
      width: 38,
      height: 36,
      alignItems: `center`,
      justifyContent: `center`,
      borderRadius: 8,
    },
    viewModeButtonSelected: {
      backgroundColor: palette.blue,
    },
    activeFilterSummary: {
      flexDirection: `row`,
      alignItems: `center`,
      justifyContent: `space-between`,
      gap: 12,
      marginTop: 22,
    },
    activeFilterLabel: {
      flexShrink: 1,
      color: palette.muted,
      fontSize: 14,
      lineHeight: 20,
      fontFamily: `Inter_400Regular`,
    },
    clearFiltersText: {
      color: palette.blue,
      fontSize: 14,
      fontFamily: `Inter_600SemiBold`,
    },
    directoryResults: {
      flexDirection: `row`,
      flexWrap: `wrap`,
      gap: directoryGap,
      marginTop: 22,
    },
    directoryCardGrid: {
      width: directoryWidth,
      minHeight: 195,
      padding: 20,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: palette.line,
      backgroundColor: palette.raised,
    },
    directoryCardRow: {
      width: `100%`,
      minHeight: 112,
      flexDirection: `row`,
      alignItems: `center`,
      gap: 16,
      padding: 18,
      borderWidth: 1,
      borderRadius: 14,
      borderColor: palette.line,
      backgroundColor: palette.raised,
    },
    directoryCardList: {
      minHeight: 78,
    },
    directoryCardTop: {
      flexDirection: `row`,
      alignItems: `center`,
      justifyContent: `space-between`,
      gap: 10,
    },
    directoryCardTopRow: {
      flexShrink: 0,
    },
    directoryIconTile: {
      width: 44,
      height: 44,
      alignItems: `center`,
      justifyContent: `center`,
      borderRadius: 11,
    },
    directoryCategory: {
      color: palette.muted,
      fontSize: 11,
      lineHeight: 16,
      fontFamily: `Inter_600SemiBold`,
      letterSpacing: 0.5,
      textTransform: `uppercase`,
    },
    directoryCardCopy: {
      paddingTop: 18,
    },
    directoryCardCopyRow: {
      minWidth: 0,
      flex: 1,
      paddingTop: 0,
    },
    directoryTitle: {
      color: palette.ink,
      fontSize: 18,
      lineHeight: 25,
      fontFamily: `Inter_600SemiBold`,
    },
    directorySummary: {
      marginTop: 7,
      color: palette.muted,
      fontSize: 14,
      lineHeight: 21,
      fontFamily: `Inter_400Regular`,
    },
    directoryLabel: {
      marginTop: 16,
      color: palette.blue,
      fontSize: 13,
      fontFamily: `Inter_600SemiBold`,
    },
    emptyResults: {
      width: `100%`,
      alignItems: `center`,
      padding: 32,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: palette.line,
      backgroundColor: palette.raised,
    },
    emptyResultsTitle: {
      color: palette.ink,
      fontSize: 20,
      fontFamily: `Inter_600SemiBold`,
      textAlign: `center`,
    },
    emptyResultsDescription: {
      marginTop: 9,
      color: palette.muted,
      fontSize: 14,
      lineHeight: 21,
      fontFamily: `Inter_400Regular`,
      textAlign: `center`,
    },
    emptyResultsReset: {
      minHeight: 44,
      justifyContent: `center`,
      marginTop: 22,
      paddingHorizontal: 17,
      borderRadius: 10,
      backgroundColor: palette.blue,
    },
    emptyResultsResetText: {
      color: palette.actionInk,
      fontFamily: `Inter_600SemiBold`,
    },
    siteFooter: {
      gap: 13,
      marginTop: 92,
      paddingTop: 34,
      paddingBottom: 48,
      borderTopWidth: 1,
      borderColor: palette.line,
    },
    footerBrand: {
      flexDirection: `row`,
      alignItems: `center`,
      gap: 9,
    },
    footerName: {
      color: palette.ink,
      fontSize: 15,
      fontFamily: `Inter_600SemiBold`,
    },
    footerText: {
      color: palette.muted,
      fontSize: 13,
      lineHeight: 20,
      fontFamily: `Inter_400Regular`,
    },
    footerCount: {
      fontFamily: `Inter_600SemiBold`,
    },
    footerLink: {
      color: palette.blue,
      fontFamily: `Inter_600SemiBold`,
    },
    dialogBackdrop: {
      flex: 1,
      justifyContent: `center`,
      padding: 24,
      backgroundColor: `rgba(3, 7, 12, 0.78)`,
    },
    previewDialog: {
      width: `100%`,
      maxWidth: 500,
      alignSelf: `center`,
      padding: 26,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: palette.line,
      backgroundColor: palette.raised,
    },
    dialogClose: {
      width: 38,
      height: 38,
      alignSelf: `flex-end`,
      alignItems: `center`,
      justifyContent: `center`,
      borderRadius: 10,
      backgroundColor: palette.tab,
    },
    dialogEyebrow: {
      marginTop: 5,
      color: palette.blue,
      fontSize: 11,
      lineHeight: 16,
      fontFamily: `Inter_700Bold`,
      letterSpacing: 1.2,
      textTransform: `uppercase`,
    },
    dialogTitle: {
      marginTop: 14,
      color: palette.ink,
      fontSize: 27,
      lineHeight: 34,
      fontFamily: `Inter_600SemiBold`,
    },
    dialogDescription: {
      marginTop: 13,
      color: palette.muted,
      fontSize: 15,
      lineHeight: 24,
      fontFamily: `Inter_400Regular`,
    },
    dialogAction: {
      minHeight: 50,
      alignItems: `center`,
      justifyContent: `center`,
      marginTop: 28,
      paddingHorizontal: 18,
      borderRadius: 11,
      backgroundColor: palette.blue,
    },
    dialogActionText: {
      color: palette.actionInk,
      fontSize: 15,
      fontFamily: `Inter_600SemiBold`,
    },
  })
}
