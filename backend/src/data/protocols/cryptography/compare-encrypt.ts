export interface CompareEncrypt {
  /* compare a value with a encrypted value */
  compare(value: string, hash: string): Promise<boolean>;
}
