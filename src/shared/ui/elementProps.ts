export function elementProps(className: string, suffix?: string) {
  const id = suffix ? `${className}-${suffix}` : className;

  return {
    id,
    className,
    testID: id,
    nativeID: id,
  };
}
