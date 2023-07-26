export const hexColorRegexp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const isHexColor = (value: string) => {
  return value.match(hexColorRegexp);
};
