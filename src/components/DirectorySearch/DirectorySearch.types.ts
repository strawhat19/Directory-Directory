export type DirectorySearchProps = {
    idPrefix: string;
    className?: string;
    placeholder?: string;
    submitLabel?: string;
    onSearch?: () => void;
    variant?: `hero` | `explorer`;
};
