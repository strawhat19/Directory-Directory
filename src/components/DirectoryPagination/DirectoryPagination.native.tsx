import Icon from '../Icon/Icon';
import { useMemo } from 'react';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';
import { getDirectoryPageItems } from '../../shared/landing/directoryPagination';
import { createDirectoryPaginationStyles } from './DirectoryPagination.native.styles';

type DirectoryPaginationProps = {
    currentPage: number;
    totalPages: number;
    pageNumbers: number[];
    onPageChange: (page: number) => void;
};

export default function DirectoryPagination({
    currentPage,
    totalPages,
    onPageChange,
}: DirectoryPaginationProps) {
    const accent = useSearchAccent();
    const { isDark } = useTheme();
    const { width } = useWindowDimensions();
    const compact = width <= 600;
    const pageItems = getDirectoryPageItems(currentPage, totalPages, compact);
    const { styles: common } = useBlogPresentation();
    const palette = useMemo(() => getNativePalette(isDark, accent), [isDark, accent]);
    const styles = useMemo(() => createDirectoryPaginationStyles(palette), [palette]);
    const firstPage = currentPage === 1;
    const lastPage = currentPage === totalPages;

    if (totalPages <= 1) return null;

    return (
        <View
            {...elementProps(`directory-pagination`)}
            accessibilityLabel={`Directory pages`}
            style={[styles.pagination, compact && styles.paginationCompact]}
        >
            <Text
                {...elementProps(`directory-pagination-summary`)}
                accessibilityLiveRegion={`polite`}
                style={styles.summary}
            >
                {`Page ${currentPage} of ${totalPages}`}
            </Text>
            <View
                {...elementProps(`directory-pagination-controls`)}
                style={[styles.controls, compact && styles.controlsCompact]}
            >
                <Pressable
                    {...elementProps(`directory-pagination-previous`)}
                    disabled={firstPage}
                    accessibilityRole={`button`}
                    accessibilityLabel={`Previous directory page`}
                    accessibilityState={{ disabled: firstPage }}
                    onPress={() => onPageChange(currentPage - 1)}
                    style={({ pressed }) => [styles.button, compact && styles.buttonCompact, firstPage && styles.disabled, pressed && styles.pressed]}
                >
                    <View
                        {...elementProps(`directory-pagination-previous-icon-container`)}
                        style={styles.previousIcon}
                    >
                        <Icon
                            size={16}
                            name={`arrow-right`}
                            color={palette.ink}
                            id={`directory-pagination-previous-icon`}
                            className={`directory-pagination-previous-icon`}
                        />
                    </View>
                </Pressable>
                {pageItems.map((page) => {
                    if (typeof page !== `number`) return (
                        <Text
                            key={page}
                            accessible={false}
                            accessibilityElementsHidden
                            style={[common.actionLabel, styles.ellipsis]}
                            importantForAccessibility={`no-hide-descendants`}
                            {...elementProps(`directory-pagination-${page}`)}
                        >
                            {`…`}
                        </Text>
                    );
                    const active = currentPage === page;

                    return (
                        <Pressable
                            key={page}
                            {...elementProps(`directory-pagination-page`, `${page}`)}
                            accessibilityRole={`button`}
                            accessibilityLabel={`Directory page ${page} of ${totalPages}`}
                            accessibilityState={{ selected: active }}
                            onPress={() => onPageChange(page)}
                            style={({ pressed }) => [styles.button, compact && styles.buttonCompact, active && styles.activeButton, active && compact && styles.activeButtonCompact, pressed && styles.pressed]}
                        >
                            <Text
                                {...elementProps(`directory-pagination-page-label`, `${page}`)}
                                style={[common.actionLabel, styles.label, active && styles.activeLabel, active && compact && styles.activeLabelCompact]}
                            >
                                {page}
                            </Text>
                        </Pressable>
                    );
                })}
                <Pressable
                    {...elementProps(`directory-pagination-next`)}
                    disabled={lastPage}
                    accessibilityRole={`button`}
                    accessibilityLabel={`Next directory page`}
                    accessibilityState={{ disabled: lastPage }}
                    onPress={() => onPageChange(currentPage + 1)}
                    style={({ pressed }) => [styles.button, compact && styles.buttonCompact, lastPage && styles.disabled, pressed && styles.pressed]}
                >
                    <Icon
                        size={16}
                        name={`arrow-right`}
                        color={palette.ink}
                        id={`directory-pagination-next-icon`}
                        className={`directory-pagination-next-icon`}
                    />
                </Pressable>
            </View>
        </View>
    );
}
