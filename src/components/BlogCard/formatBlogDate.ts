export const formatBlogDate = (date: string) => new Date(`${date}T12:00:00Z`).toLocaleDateString(`en-US`, {
  day: `numeric`,
  year: `numeric`,
  month: `long`,
  timeZone: `UTC`,
});
