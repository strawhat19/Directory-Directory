import AsyncStorage from '@react-native-async-storage/async-storage'
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Keyboard, Linking, Modal, Pressable, ScrollView, StatusBar, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { BrandMark, CategoryIcon, UiIcon } from './NativeIcons'
import { categoryColors, createNativeStyles, lightCategoryColors, palettes } from './nativeStyles'
import { categories, directories, placeholderPublicDirectoryCount, topics } from '../data/directories'
import type { Theme } from './nativeStyles'
import type { CategoryId, TopicId } from '../data/directories'

type ViewMode = `grid` | `table` | `list`
type DialogKind = `signin` | `submit` | null

const themePreferenceKey = `directory-directory-theme`
const viewModes: ViewMode[] = [`grid`, `table`, `list`]

export default function NativeLandingPage() {
  const { width } = useWindowDimensions()
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  })
  const scrollView = useRef<ScrollView>(null)
  const heroOffset = useRef(0)
  const categoryOffset = useRef(0)
  const exploreOffset = useRef(0)
  const heroEntrance = useRef(new Animated.Value(0)).current
  const [theme, setTheme] = useState<Theme>(`dark`)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dialog, setDialog] = useState<DialogKind>(null)
  const [searchText, setSearchText] = useState(``)
  const [activeQuery, setActiveQuery] = useState(``)
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null)
  const [activeTopic, setActiveTopic] = useState<TopicId>(`Featured`)
  const [viewMode, setViewMode] = useState<ViewMode>(`grid`)
  const palette = palettes[theme]
  const categoryPalette = theme === `dark` ? categoryColors : lightCategoryColors
  const styles = useMemo(() => createNativeStyles(palette, width), [palette, width])
  const year = new Date().getFullYear()

  useEffect(() => {
    let mounted = true

    void AsyncStorage.getItem(themePreferenceKey)
      .then((storedTheme) => {
        if (mounted && (storedTheme === `light` || storedTheme === `dark`)) {
          setTheme(storedTheme)
        }
      })
      .catch(() => undefined)

    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (!fontsLoaded && !fontError) return

    Animated.timing(heroEntrance, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start()
  }, [heroEntrance, fontsLoaded, fontError])

  const visibleDirectories = useMemo(() => {
    const query = activeQuery.toLowerCase()
    const matches = directories.filter((directory) => {
      const matchesTopic = activeTopic !== `Featured` || directory.featured
      const matchesCategory = !activeCategory || directory.category === activeCategory
      const searchableText = `${directory.name} ${directory.summary} ${directory.label} ${directory.category}`.toLowerCase()

      return matchesTopic && matchesCategory && (!query || searchableText.includes(query))
    })

    if (activeTopic === `Popular`) return matches.sort((a, b) => b.popularity - a.popularity)
    if (activeTopic === `Latest`) return matches.sort((a, b) => a.freshness - b.freshness)
    if (activeTopic === `Trending`) return matches.sort((a, b) => b.momentum - a.momentum)

    return matches
  }, [activeCategory, activeQuery, activeTopic])

  const scrollTo = (y: number) => {
    scrollView.current?.scrollTo({ y, animated: true })
  }

  const scrollToExplore = () => scrollTo(exploreOffset.current)

  const toggleTheme = () => {
    const nextTheme: Theme = theme === `light` ? `dark` : `light`
    setTheme(nextTheme)
    void AsyncStorage.setItem(themePreferenceKey, nextTheme).catch(() => undefined)
  }

  const selectCategory = (category: CategoryId) => {
    setActiveCategory(activeCategory === category ? null : category)
    setActiveTopic(`All`)
    setActiveQuery(``)
    setSearchText(``)
    scrollToExplore()
  }

  const submitSearch = () => {
    Keyboard.dismiss()
    setActiveQuery(searchText.trim())
    setActiveCategory(null)
    setActiveTopic(`All`)
    scrollToExplore()
  }

  const clearFilters = () => {
    setActiveQuery(``)
    setSearchText(``)
    setActiveCategory(null)
    setActiveTopic(`All`)
  }

  const openDialog = (kind: Exclude<DialogKind, null>) => {
    setMenuOpen(false)
    setDialog(kind)
  }

  if (!fontsLoaded && !fontError) {
    return <SafeAreaView testID={`directory-font-loading`} style={styles.safeArea} />
  }

  return (
    <SafeAreaView testID={`directory-safe-area`} style={styles.safeArea}>
      <StatusBar barStyle={theme === `dark` ? `light-content` : `dark-content`} backgroundColor={palette.page} />

      <ScrollView
        ref={scrollView}
        testID={`landing-page-scroll-view`}
        style={styles.scrollView}
        keyboardShouldPersistTaps={`handled`}
        contentInsetAdjustmentBehavior={`automatic`}
      >
        <View testID={`page-shell`} style={styles.pageShell}>
          <View testID={`site-header`} style={styles.siteHeader}>
            <Pressable
              testID={`brand-link`}
              style={styles.brandLink}
              accessibilityRole={`button`}
              accessibilityLabel={`Directory Directory, scroll to top`}
              onPress={() => { setMenuOpen(false); scrollTo(0) }}
            >
              <BrandMark
                id={`header-brand-mark`}
                size={44}
                color={palette.blue}
                backgroundColor={palette.page}
              />
              <Text testID={`brand-name`} style={styles.brandName} numberOfLines={2}>
                {`Directory\nDirectory`}
              </Text>
            </Pressable>

            <View testID={`header-actions`} style={styles.headerActions}>
              <Pressable
                testID={`theme-toggle`}
                style={styles.headerIconButton}
                accessibilityRole={`button`}
                accessibilityLabel={`Switch to ${theme === `light` ? `dark` : `light`} mode`}
                onPress={toggleTheme}
              >
                <UiIcon id={`theme-toggle-icon`} name={theme === `light` ? `moon` : `sun`} size={22} color={palette.ink} />
              </Pressable>
              <Pressable
                testID={`mobile-menu-toggle`}
                style={styles.headerIconButton}
                accessibilityRole={`button`}
                accessibilityLabel={menuOpen ? `Close menu` : `Open menu`}
                accessibilityState={{ expanded: menuOpen }}
                onPress={() => setMenuOpen(!menuOpen)}
              >
                <UiIcon id={`mobile-menu-icon`} name={menuOpen ? `close` : `menu`} size={22} color={palette.ink} />
              </Pressable>
            </View>
          </View>

          {menuOpen && (
            <View testID={`site-navigation`} style={styles.siteNavigation}>
              <Pressable
                testID={`navigation-explore`}
                style={styles.navigationLink}
                accessibilityRole={`button`}
                onPress={() => { setMenuOpen(false); scrollToExplore() }}
              >
                <Text testID={`navigation-explore-label`} style={styles.navigationLinkText}>{`Explore`}</Text>
              </Pressable>
              <Pressable
                testID={`navigation-categories`}
                style={styles.navigationLink}
                accessibilityRole={`button`}
                onPress={() => { setMenuOpen(false); scrollTo(heroOffset.current + categoryOffset.current) }}
              >
                <Text testID={`navigation-categories-label`} style={styles.navigationLinkText}>{`Categories`}</Text>
              </Pressable>
              <Pressable
                testID={`navigation-submit`}
                style={styles.navigationLink}
                accessibilityRole={`button`}
                onPress={() => openDialog(`submit`)}
              >
                <Text testID={`navigation-submit-label`} style={styles.navigationLinkText}>{`Submit a directory`}</Text>
              </Pressable>
              <Pressable
                testID={`mobile-sign-in`}
                style={[styles.navigationLink, styles.navigationPrimaryLink]}
                accessibilityRole={`button`}
                onPress={() => openDialog(`signin`)}
              >
                <Text testID={`mobile-sign-in-label`} style={[styles.navigationLinkText, styles.navigationPrimaryText]}>{`Sign in`}</Text>
              </Pressable>
            </View>
          )}

          <View
            testID={`hero-section`}
            style={styles.heroSection}
            onLayout={(event) => { heroOffset.current = event.nativeEvent.layout.y }}
          >
            <Animated.View
              testID={`hero-copy`}
              style={[
                styles.heroCopy,
                {
                  opacity: heroEntrance,
                  transform: [{ translateY: heroEntrance.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
                },
              ]}
            >
              <Text testID={`hero-eyebrow`} style={styles.heroEyebrow}>
                {`THE DIRECTORY OF DIRECTORIES`}
              </Text>
              <Text testID={`hero-heading`} style={styles.heroHeading} accessibilityRole={`header`}>
                {`Discover more of the web.`}
              </Text>
              <Text testID={`hero-description`} style={styles.heroDescription}>
                {`A considered collection of directories, organized around what interests you.`}
              </Text>

              <View testID={`hero-search`} style={styles.heroSearch}>
                <UiIcon id={`search-input-icon`} name={`search`} size={22} color={palette.searchMuted} />
                <TextInput
                  testID={`directory-search-input`}
                  style={styles.searchInput}
                  value={searchText}
                  placeholder={`Search the index`}
                  placeholderTextColor={palette.searchMuted}
                  returnKeyType={`search`}
                  accessibilityLabel={`Search directories or topics`}
                  onChangeText={setSearchText}
                  onSubmitEditing={submitSearch}
                />
                <Pressable
                  testID={`directory-search-button`}
                  style={styles.searchButton}
                  accessibilityRole={`button`}
                  onPress={submitSearch}
                >
                  <UiIcon id={`directory-search-button-icon`} name={`chevron`} size={22} color={palette.actionInk} />
                </Pressable>
              </View>
            </Animated.View>

            <View testID={`category-heading-group`} style={styles.categoryHeadingGroup}>
              <Text testID={`category-heading`} style={styles.sectionTitle} accessibilityRole={`header`}>
                {`Browse by interest`}
              </Text>
              <Text testID={`category-description`} style={styles.sectionDescription}>
                {`Follow your curiosity.`}
              </Text>
            </View>

            <View
              testID={`categories`}
              style={styles.categoryGrid}
              onLayout={(event) => { categoryOffset.current = event.nativeEvent.layout.y }}
            >
              {categories.map((category) => {
                const colors = categoryPalette[category.id]

                return (
                  <Pressable
                    key={category.id}
                    testID={`category-folder-${category.id}`}
                    style={({ pressed }) => [styles.categoryFolder, pressed && styles.pressedItem]}
                    accessibilityRole={`button`}
                    accessibilityState={{ selected: activeCategory === category.id }}
                    onPress={() => selectCategory(category.id)}
                  >
                    <View
                      testID={`category-folder-tab-${category.id}`}
                      style={[styles.categoryFolderTab, { backgroundColor: colors.icon }]}
                    />
                    <View
                      testID={`category-folder-front-${category.id}`}
                      style={[styles.categoryFolderFront, activeCategory === category.id && styles.categoryFolderSelected]}
                    >
                      <View
                        testID={`category-icon-tile-${category.id}`}
                        style={[styles.categoryIconTile, { backgroundColor: colors.tile }]}
                      >
                        <CategoryIcon id={`category-icon-${category.id}`} name={category.id} size={25} color={colors.icon} />
                      </View>
                      <View testID={`category-folder-bottom-${category.id}`} style={styles.categoryFolderBottom}>
                        <Text testID={`category-folder-label-${category.id}`} style={styles.categoryFolderLabel} numberOfLines={1}>
                          {category.label}
                        </Text>
                        <UiIcon id={`category-folder-chevron-${category.id}`} name={`chevron`} size={18} color={palette.muted} />
                      </View>
                    </View>
                  </Pressable>
                )
              })}
            </View>
          </View>

          <View
            testID={`explore`}
            style={styles.exploreSection}
            onLayout={(event) => { exploreOffset.current = event.nativeEvent.layout.y }}
          >
            <View testID={`explore-title-tab`} style={styles.exploreTitleTab}>
              <Text testID={`explore-heading`} style={styles.exploreTitle} accessibilityRole={`header`}>
                {`Explore the index`}
              </Text>
              <Text testID={`explore-description`} style={styles.sectionDescription}>
                {`Good places to begin.`}
              </Text>
            </View>

            <View testID={`explore-controls`} style={styles.exploreControls}>
              <ScrollView
                testID={`topic-tabs`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.topicTabsContent}
                accessibilityRole={`tablist`}
              >
                {topics.map((topic) => (
                  <Pressable
                    key={topic}
                    testID={`topic-tab-${topic.toLowerCase()}`}
                    style={({ pressed }) => [
                      styles.folderTab,
                      activeTopic === topic && styles.folderTabSelected,
                      pressed && styles.pressedItem,
                    ]}
                    accessibilityRole={`tab`}
                    accessibilityState={{ selected: activeTopic === topic }}
                    onPress={() => setActiveTopic(topic)}
                  >
                    <Text
                      testID={`topic-tab-label-${topic.toLowerCase()}`}
                      style={[styles.folderTabText, activeTopic === topic && styles.folderTabTextSelected]}
                    >
                      {topic}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>

              <View testID={`view-mode-controls`} style={styles.viewModeControls}>
                {viewModes.map((mode) => (
                  <Pressable
                    key={mode}
                    testID={`view-mode-${mode}`}
                    style={({ pressed }) => [
                      styles.viewModeButton,
                      viewMode === mode && styles.viewModeButtonSelected,
                      pressed && styles.pressedItem,
                    ]}
                    accessibilityRole={`button`}
                    accessibilityLabel={`${mode[0].toUpperCase()}${mode.slice(1)} view`}
                    accessibilityState={{ selected: viewMode === mode }}
                    onPress={() => setViewMode(mode)}
                  >
                    <UiIcon
                      id={`view-mode-icon-${mode}`}
                      name={mode}
                      size={19}
                      color={viewMode === mode ? palette.actionInk : palette.muted}
                    />
                  </Pressable>
                ))}
              </View>
            </View>

            {(activeQuery || activeCategory) && (
              <View testID={`active-filter-summary`} style={styles.activeFilterSummary}>
                <Text testID={`active-filter-label`} style={styles.activeFilterLabel}>
                  {activeQuery
                    ? `Results for “${activeQuery}”`
                    : `${categories.find((category) => category.id === activeCategory)?.label} directories`}
                </Text>
                <Pressable testID={`clear-filters-button`} accessibilityRole={`button`} onPress={clearFilters}>
                  <Text testID={`clear-filters-label`} style={styles.clearFiltersText}>{`Clear filters`}</Text>
                </Pressable>
              </View>
            )}

            <View testID={`directory-results`} style={styles.directoryResults}>
              {visibleDirectories.length > 0 ? visibleDirectories.map((directory) => {
                const category = categories.find((entry) => entry.id === directory.category)
                const colors = categoryPalette[directory.category]
                const row = viewMode !== `grid`

                return (
                  <View
                    key={directory.id}
                    testID={`directory-card-${directory.id}`}
                    style={[
                      row ? styles.directoryCardRow : styles.directoryCardGrid,
                      viewMode === `list` && styles.directoryCardList,
                    ]}
                  >
                    <View
                      testID={`directory-card-top-${directory.id}`}
                      style={[styles.directoryCardTop, row && styles.directoryCardTopRow]}
                    >
                      <View
                        testID={`directory-card-icon-tile-${directory.id}`}
                        style={[styles.directoryIconTile, { backgroundColor: colors.tile }]}
                      >
                        <CategoryIcon id={`directory-card-icon-${directory.id}`} name={directory.category} size={24} color={colors.icon} />
                      </View>
                      {viewMode === `grid` && (
                        <Text testID={`directory-card-category-${directory.id}`} style={styles.directoryCategory}>
                          {category?.label}
                        </Text>
                      )}
                    </View>
                    <View testID={`directory-card-copy-${directory.id}`} style={[styles.directoryCardCopy, row && styles.directoryCardCopyRow]}>
                      {viewMode === `table` && (
                        <Text testID={`directory-card-category-${directory.id}`} style={styles.directoryCategory}>
                          {category?.label}
                        </Text>
                      )}
                      <Text testID={`directory-card-title-${directory.id}`} style={styles.directoryTitle}>
                        {directory.name}
                      </Text>
                      {viewMode !== `list` && (
                        <Text testID={`directory-card-summary-${directory.id}`} style={styles.directorySummary}>
                          {directory.summary}
                        </Text>
                      )}
                    </View>
                    {!row && (
                      <Text testID={`directory-card-label-${directory.id}`} style={styles.directoryLabel}>
                        {directory.label}
                      </Text>
                    )}
                  </View>
                )
              }) : (
                <View testID={`empty-results`} style={styles.emptyResults}>
                  <Text testID={`empty-results-title`} style={styles.emptyResultsTitle}>{`No directories found yet.`}</Text>
                  <Text testID={`empty-results-description`} style={styles.emptyResultsDescription}>
                    {`Try another topic or a broader search.`}
                  </Text>
                  <Pressable
                    testID={`empty-results-reset`}
                    style={styles.emptyResultsReset}
                    accessibilityRole={`button`}
                    onPress={clearFilters}
                  >
                    <Text testID={`empty-results-reset-label`} style={styles.emptyResultsResetText}>
                      {`Show all directories`}
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>

          <View testID={`site-footer`} style={styles.siteFooter}>
            <View testID={`footer-brand`} style={styles.footerBrand}>
              <BrandMark id={`footer-brand-mark`} size={25} color={palette.blue} backgroundColor={palette.page} />
              <Text testID={`footer-brand-name`} style={styles.footerName}>{`Directory Directory`}</Text>
            </View>
            <Text testID={`footer-directory-count`} style={[styles.footerText, styles.footerCount]}>
              {`${placeholderPublicDirectoryCount.toLocaleString(`en-US`)} public directories`}
            </Text>
            <Text testID={`footer-copyright`} style={styles.footerText}>
              {`© ${year} Directory Directory · Made by `}
              <Text
                testID={`footer-piratechs-link`}
                style={styles.footerLink}
                accessibilityRole={`link`}
                onPress={() => { void Linking.openURL(`https://piratechs.com/`) }}
              >
                {`Piratechs`}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={dialog !== null}
        transparent
        animationType={`fade`}
        onRequestClose={() => setDialog(null)}
      >
        <Pressable
          testID={`preview-dialog-backdrop`}
          style={styles.dialogBackdrop}
          onPress={() => setDialog(null)}
        >
          <Pressable
            testID={`preview-dialog`}
            style={styles.previewDialog}
            accessibilityRole={`none`}
            onPress={(event) => event.stopPropagation()}
          >
            <Pressable
              testID={`preview-dialog-close`}
              style={styles.dialogClose}
              accessibilityRole={`button`}
              accessibilityLabel={`Close dialog`}
              onPress={() => setDialog(null)}
            >
              <UiIcon id={`preview-dialog-close-icon`} name={`close`} size={19} color={palette.ink} />
            </Pressable>
            <Text testID={`preview-dialog-eyebrow`} style={styles.dialogEyebrow}>{`Coming soon`}</Text>
            <Text testID={`preview-dialog-title`} style={styles.dialogTitle} accessibilityRole={`header`}>
              {dialog === `signin` ? `Your directory home is on its way.` : `Share a directory soon.`}
            </Text>
            <Text testID={`preview-dialog-description`} style={styles.dialogDescription}>
              {`This landing page is a preview. In the meantime, explore the directories below.`}
            </Text>
            <Pressable
              testID={`preview-dialog-explore`}
              style={styles.dialogAction}
              accessibilityRole={`button`}
              onPress={() => { setDialog(null); scrollToExplore() }}
            >
              <Text testID={`preview-dialog-explore-label`} style={styles.dialogActionText}>
                {`Explore Directories`}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}
