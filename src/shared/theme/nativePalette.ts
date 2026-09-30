const lightPalette = {
  red: `#d83b42`,
  blue: `#0874f9`,
  ink: `#14213d`,
  green: `#21a668`,
  white: `#ffffff`,
  muted: `#6b7280`,
  border: `#e3e7ee`,
  purple: `#8054d7`,
  surface: `#ffffff`,
  blueSoft: `#edf4ff`,
  purpleSoft: `#f3edff`,
  purpleBorder: `#e7ddfb`,
  background: `#f7f8fa`,
  headerScrim: `rgba(247, 248, 250, 0.4)`,
};

const darkPalette = {
  ...lightPalette,
  ink: `#ffffff`,
  muted: `#a4aec0`,
  border: `#2b3950`,
  surface: `#142033`,
  blueSoft: `#15294c`,
  purpleSoft: `#271e42`,
  purpleBorder: `#47366b`,
  background: `#0b1220`,
  headerScrim: `rgba(11, 18, 32, 0.4)`,
};

export const getNativePalette = (isDark: boolean) => isDark ? darkPalette : lightPalette;
