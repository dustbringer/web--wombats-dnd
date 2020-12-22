/**
 * Parameters:
 *   n = number to mod
 *   m = modulo number
 */
export const mod = (n, m) => {
  let ret = n;
  while (ret < 0) ret += m;
  while (ret >= m) ret -= m;
  return ret;
};
