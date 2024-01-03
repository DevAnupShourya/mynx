function findTagsInText(texts: string) {
  const tags = texts.match(/#(\w+)/g);
  return tags || [];
}

export default findTagsInText;
