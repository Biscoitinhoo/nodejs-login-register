export interface Encrypt {
  /* just encrypt a value */
  encrypt(value: string): Promise<string>;
}
