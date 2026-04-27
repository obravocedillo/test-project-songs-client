export const removePluralTitle = (title: string): string => {
  return title[title.length - 1] === "s"
    ? title.slice(0, title.length - 1)
    : title;
};
