export interface AuthResponse {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: Object
    status: Number
}
export interface LoginResponse {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: {
        accessToken: string
        refreshToken: string
        tokenType: string
        userObj: SessionUser
    }
    status: Number
}

export interface VerifyEmailResponse {
    error: string
    message: string
    data: {
        phone: String
        token: String
    }
    status: Number
}
export interface CustomerTypesResponse {
    id: string;
    name: string;
}

export interface SignInRequestInput {
    email: string
    password: string

}
export interface ResetPasswordInput {
    oldPassword: string
    newPassword: string

}

export interface ActivateAccountRequestInput {
    token: string
    otp: Number
    password: string
    confirmPassword: string
}

export interface SignUpRequestInput {
    email: string
    phoneNumber: string
}

export interface ContactPersonInput {
    id: String
    username: string
    email: string
    firstname: string
    surname: string
    sex: Sex
    mobileNo: string
    physicalAddress: string
}

export interface SessionUser_ {
    username: String
    email: String
    firstname: String
    surname: String
    sex : Sex
    mobileNo: String
    physicalAddress: String
    userId: String
    branch: {
        id: String
        name: String
        primaryPhone: String
        primaryEmail: String
        physicalAddress: String
        contactPerson:ContactPersonInput
        account: {
            id: String
            accountNumber: String
            name: String
            primaryPhone: String
            primaryEmail: String
            website: String
            isEmailVerified: boolean
            isPhoneVerified: boolean
            isActivated: boolean
            customerType: {
                id: String
                name: String
            }
        }
    }
    postaAccountId: String
}
export interface SessionUser {

    id: string
    surname: null | string
    firstname?:string
    lastName: null | string
    middleName: null | string
    username: string
    name: null | string
    email: string
    phone: string
    enabled: boolean
    accountComplete: boolean
    sex? : Sex
    mobileNo?: String
    physicalAddress?: String
    userId?: String
    postaAccountId?: String
    accountId: String
   
 
}

export interface ProfileForm {
    customerTypeId: string
    idType: string
    idNumber: string
    organisationName: string
    firstName: string
    lastName: string
    middleName: string
    gender: 'MALE' | 'FEMALE'
    physicalAddress: string
    nationality: string
    dob: string
    occupation: string
  }
  

export interface ConfirmPassword {
    passwordToken: string
    newPassword: string
    confirmPassword:string
}

export interface ChangePasswordInput {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}
export interface VerifyEmailInputs{
    token: string
    verificationCode: string
  
  }
export interface ResendOTP{
    actionType: string
    token: string
  }
export type Sex = "MALE" | "FEMALE"