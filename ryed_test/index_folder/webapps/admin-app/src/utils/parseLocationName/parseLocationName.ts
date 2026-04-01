interface LocationData {
  country: string;
  latitude: number;
  longitude: number;
  locationName: string;
  locationNameLocalized: string;
}

export const parseLocationName = (data?: LocationData) => {
  if (!data || !Object.keys(data).length) {
    return '';
  }
  const { locationName, locationNameLocalized } = data;

  const wordCount = (str: string) => str.trim().split(/\s+/).length;

  const locationNameWordCount = wordCount(locationName);
  const locationNameLocalizedWordCount = wordCount(locationNameLocalized);

  if (locationNameWordCount > locationNameLocalizedWordCount) {
    return locationName;
  } else {
    return locationNameLocalized;
  }
};
