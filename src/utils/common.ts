import mime from 'mime';

// eslint-disable-next-line no-control-regex
export const removeEmptyChars = (value: string) => value.replace(/\u0000/g, '');

export const padEmptyChars = (value: string, chars: number) => value.padEnd(chars, '\u0000');

export const tryOr = <T, U>(callback: () => T, defaultValue: U): T | U => {
  try {
    return callback();
  } catch (error) {
    return defaultValue;
  }
};

export const tryOrNull = <T>(cb: () => T) => tryOr(cb, null);

export const chunk = <T>(array: T[], chunkSize: number): T[][] =>
  array.reduce((accumulator, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!accumulator[chunkIndex]) {
      accumulator[chunkIndex] = [];
    }

    accumulator[chunkIndex].push(item);

    return accumulator;
  }, [] as T[][]);

export const zipMap = <T, U, V>(
  left: T[],
  right: U[],
  fn: (t: T, u: U | null, i: number) => V
): V[] => left.map((t: T, index) => fn(t, right?.[index] ?? null, index));

export const fetchJson = async <T>(uri: string): Promise<T | null> => {
  try {
    const response = await fetch(uri);
    const metadata: T = await response.json();
    return metadata;
  } catch (error) {
    return null;
  }
};

export const randomStr = (
  length: number = 20,
  alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) => {
  let result = '';
  const alphabetLength = alphabet.length;
  for (var i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
  }

  return result;
};

export const getContentType = (fileName: string): string | null => mime.getType(fileName);

export const getExtension = (fileName: string): string | null => {
  const lastDotIndex = fileName.lastIndexOf('.');

  return lastDotIndex < 0 ? null : fileName.slice(lastDotIndex + 1);
};
