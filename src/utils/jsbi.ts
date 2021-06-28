export default class JSBI {
  // @ts-ignore
  private constructor(length: number, sign: boolean)
  // @ts-ignore
  private length: number
  // @ts-ignore
  private sign: boolean

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/ban-types
  static BigInt(from: number | string | boolean | object): JSBI

  // @ts-ignore
  toString(radix?: number): string
  // @ts-ignore
  static toNumber(x: JSBI): number

  // @ts-ignore
  static unaryMinus(x: JSBI): JSBI
  // @ts-ignore
  static bitwiseNot(x: JSBI): JSBI
  // @ts-ignore
  static exponentiate(x: JSBI, y: JSBI): JSBI
  // @ts-ignore
  static multiply(x: JSBI, y: JSBI): JSBI
  // @ts-ignore
  static divide(x: JSBI, y: JSBI): JSBI
  // @ts-ignore
  static remainder(x: JSBI, y: JSBI): JSBI
  // @ts-ignore
  static add(x: JSBI, y: JSBI): JSBI
  // @ts-ignore
  static subtract(x: JSBI, y: JSBI): JSBI
  // @ts-ignore
  static leftShift(x: JSBI, y: JSBI): JSBI
  // @ts-ignore
  static signedRightShift(x: JSBI, y: JSBI): JSBI
  // @ts-ignore
  static lessThan(x: JSBI, y: JSBI): boolean
  // @ts-ignore
  static lessThanOrEqual(x: JSBI, y: JSBI): boolean
  // @ts-ignore
  static greaterThan(x: JSBI, y: JSBI): boolean
  // @ts-ignore
  static greaterThanOrEqual(x: JSBI, y: JSBI): boolean
  // @ts-ignore
  static equal(x: JSBI, y: JSBI): boolean
  // @ts-ignore
  static notEqual(x: JSBI, y: JSBI): boolean
  // @ts-ignore
  static bitwiseAnd(x: JSBI, y: JSBI): JSBI
  // @ts-ignore
  static bitwiseXor(x: JSBI, y: JSBI): JSBI
  // @ts-ignore
  static bitwiseOr(x: JSBI, y: JSBI): JSBI
  // @ts-ignore
  static asIntN(n: number, x: JSBI): JSBI
  // @ts-ignore
  static asUintN(n: number, x: JSBI): JSBI
  // @ts-ignore
  static ADD(x: any, y: any): any
  // @ts-ignore
  static LT(x: any, y: any): boolean
  // @ts-ignore
  static LE(x: any, y: any): boolean
  // @ts-ignore
  static GT(x: any, y: any): boolean
  // @ts-ignore
  static GE(x: any, y: any): boolean
  // @ts-ignore
  static EQ(x: any, y: any): boolean
  // @ts-ignore
  static NE(x: any, y: any): boolean
}
