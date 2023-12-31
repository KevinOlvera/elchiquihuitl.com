import { type User } from './models/users'

export const LOGO_LIGHT = 'https://picsur.kovin.dev/i/c2792569-07c4-40fe-9698-89b112548be0.png'
export const LOGO_DARK = 'https://picsur.kovin.dev/i/e06b13bd-0a2b-44ea-a05e-fc68ffc18bdb.png'

export const IVA = 0

export function mapStatusToColor(status: User['status']) {
  switch (status) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'warning'
    default:
      return undefined
  }
}

export enum CountryCode {
  MX = '+52',
  US = '+1',
  CO = '+57',
}
