const replaceEmptyString = (string, replacement) => string.replaceAll(' ', replacement)

export const getKeyFormatted = ({ country, name, region }) => {
  const COUNTRY_NAME = replaceEmptyString(country, '_')
  const REGION_NAME = replaceEmptyString(region, '_')
  const CITY_NAME = replaceEmptyString(name, '_')

  return `${COUNTRY_NAME}|${REGION_NAME}|${CITY_NAME}`
}
