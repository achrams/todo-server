export default class Password {
  static async encrypt(value: string) {
    const { hashSync, genSaltSync } = await import('bcrypt-ts');
    return hashSync(value, genSaltSync(10));
  }

  static async compare(value: string, hash: string) {
    const { compareSync } = await import('bcrypt-ts');
    return compareSync(value, hash);
  }
}
