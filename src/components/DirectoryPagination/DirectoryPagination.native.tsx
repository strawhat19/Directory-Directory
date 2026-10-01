import Icon from '../Icon/Icon';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';
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
    pageNumbers,
    onPageChange,
}: DirectoryPaginationProps) {
    const accent = useSearchAccent();
    const { isDark } = useTheme();
    const palette = useMemo(() => getNativePalette(isDark, accent), [isDark, accent]);
    const styles = useMemo(() => createDirectoryPaginationStyles(palette), [palette]);
    const firstPage = currentPage === 1;
    const lastPage = currentPage === totalPages;

    if (totalPages <= 1) return null;

    return (
        <View
            {...elementProps(`directory-pagination`)}
            accessibilityLabel={`Directory pages`}
            style={styles.pagination}
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
                style={styles.controls}
            >
                <Pressable
                    {...elementProps(`directory-pagination-previous`)}
                    disabled={firstPage}
                    accessibilityRole={`button`}
                    accessibilityLabel={`Previous directory page`}
                    accessibilityState={{ disabled: firstPage }}
                    onPress={() => onPageChange(currentPage - 1)}
                    style={({ pressed }) => [styles.button, firstPage && styles.disabled, pressed && styles.pressed]}
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
                {pageNumbers.map((page) => {
                    const active = currentPage === page;

                    return (
                        <Pressable
                            key={page}
                            {...elementProps(`directory-pagination-page`, `${page}`)}
                            accessibilityRole={`button`}
                            accessibilityLabel={`Directory page ${page} of ${totalPages}`}
                            accessibilityState={{ selected: active }}
                            onPress={() => onPageChange(page)}
                            style={({ pressed }) => [styles.button, active && styles.activeButton, pressed && styles.pressed]}
                        >
                            <Text
                                {...elementProps(`directory-pagination-page-label`, `${page}`)}
                                style={[styles.label, active && styles.activeLabel]}
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
                    style={({ pressed }) => [styles.button, lastPage && styles.disabled, pressed && styles.pressed]}
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
