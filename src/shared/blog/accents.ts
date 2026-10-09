import { blogArticles } from './articles';

const blogCardAccents = [
  { color: `#0874f9`, background: `#edf4ff`, darkBackground: `#15294c` },
  { color: `#21a668`, background: `#ecf7f1`, darkBackground: `#15372d` },
  { color: `#d83b42`, background: `#fceff0`, darkBackground: `#3b2029` },
  { color: `#8054d7`, background: `#f3edff`, darkBackground: `#271e42` },
  { color: `#b7860b`, background: `#fff8db`, darkBackground: `#342e1b` },
  { color: `#d97722`, background: `#fff1e6`, darkBackground: `#35281f` },
  { color: `#cd4c8c`, background: `#fdeef5`, darkBackground: `#382237` },
] as const;

export const getBlogCardAccent = (articleId: string, isDark = false) => {
  const index = Math.max(0, blogArticles.findIndex((article) => article.id === articleId));
  const accent = blogCardAccents[index % blogCardAccents.length] ?? blogCardAccents[0];
  return { color: accent.color, background: isDark ? accent.darkBackground : accent.background };
};
