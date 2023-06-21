export const calculateSlidesPerView = (containerWidth: number) => {
  if (containerWidth >= 1400) {
    return 7;
  } else if (containerWidth < 1400 && containerWidth >= 1200) {
    return 6;
  } else if (containerWidth < 1200 && containerWidth >= 1000) {
    return 5;
  } else if (containerWidth < 1000 && containerWidth >= 700) {
    return 4;
  } else if (containerWidth < 700 && containerWidth >= 480) {
    return 3;
  } else if (containerWidth < 480) {
    return 2;
  }
  return 1;
};
