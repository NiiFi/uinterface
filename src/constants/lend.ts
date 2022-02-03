import { t } from '@lingui/macro'

export enum BorrowMode {
  STABLE = 1,
  VARIABLE = 2,
}

export enum FormType {
  DEPOSIT = 1,
  BORROW = 2,
  WITHDRAW = 3,
  REPAY = 4,
}

export const formSteps: { [type: string]: number } = {
  [FormType.DEPOSIT]: 1,
  [FormType.BORROW]: 2,
  [FormType.WITHDRAW]: 1,
  [FormType.REPAY]: 1,
}

export const typeLabels: { [type: string]: string } = {
  [FormType.DEPOSIT]: t`Deposit`,
  [FormType.BORROW]: t`Borrow`,
  [FormType.WITHDRAW]: t`Withdraw`,
  [FormType.REPAY]: t`Repay`,
}

export const availableLabels: { [type: string]: string } = {
  [FormType.DEPOSIT]: t`Available to deposit`,
  [FormType.BORROW]: t`Available to borrow`,
  [FormType.WITHDRAW]: t`Available to withdraw`,
  [FormType.REPAY]: t`Available to repay`,
}

export const headerLabels: { [type: string]: string[] } = {
  [FormType.DEPOSIT]: [t`How much would you like to deposit?`],
  [FormType.BORROW]: [t`How much would you like to borrow?`, t`Please select your interest rate`],
  [FormType.WITHDRAW]: [t`How much would you like to withdraw?`],
  [FormType.REPAY]: [t`Repay`],
}

export const subheaderLabels: { [type: string]: string[] } = {
  [FormType.DEPOSIT]: [
    t`Please enter an amount you would like to deposit. The maximum amount you can deposit is shown below.`,
  ],
  [FormType.BORROW]: [
    t`Please enter an amount you would like to borrow. The maximum amount you can borrow is shown below.`,
    t`Choose either stable or variable APY for your loan. Please click on the desired rate type and read the info box for more information on each option.`,
  ],
  [FormType.WITHDRAW]: [
    t`Please enter an amount you would like to withdraw. The maximum amount you can withdraw is shown below.`,
  ],
  [FormType.REPAY]: [t`How much do you want to repay?`],
}

export const maxApprovalValue = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const NumeralFormatType = '0.000000000000000000'
