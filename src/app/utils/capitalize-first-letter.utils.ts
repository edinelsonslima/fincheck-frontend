export function capitalizeFirstLetter([firstLetter, ...restString]: string) {
  return firstLetter.toLocaleUpperCase() + restString.join('')
}