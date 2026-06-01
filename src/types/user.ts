export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted'

export interface UserRecord {
  id: string
  organization: string
  username: string
  email: string
  phoneNumber: string
  dateJoined: string
  status: UserStatus | string
  fullName: string
  avatar: string
  accountBalance: number
  accountNumber: number
  bvn: number
  gender: string
  maritalStatus: string
  children: string
  residenceType: string
  educationLevel: string
  employmentStatus: string
  sector: string
  employmentDuration: string
  officeEmail: string
  monthlyIncome: number
  loanRepayment: number
  twitter: string
  facebook: string
  instagram: string
  guarantorName: string
  guarantorPhone: string
  guarantorEmail: string
  guarantorRelationship: string
  userTier: number
}
