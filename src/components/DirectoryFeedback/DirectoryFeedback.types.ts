export type DirectoryFeedbackProps = {
  scope?: string;
  color?: string;
  directoryId: string;
  onDetails?: () => void;
  directoryName: string;
  variant?: `card` | `details`;
};
