export function convertFirstLetterToUpperCase(text: string) {
  return text.at(0)?.toLocaleUpperCase() + text.slice(1);
}

export function getDateFormatted(date: Date) {
  return new Date(date).toLocaleDateString('ro-Ro');
}
