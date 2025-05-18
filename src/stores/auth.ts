import { defineStore } from 'pinia';
import {AuthService} from "@/services/auth.service";
import type {
    ActivateAccountRequestInput,
    AuthResponse, ChangePasswordInput, ConfirmPassword, SessionUser,
    SignInRequestInput,
    SignUpRequestInput, VerifyEmailResponse,VerifyEmailInputs,ProfileForm, ResendOTP
} from "@/types/services/auth.types";

const authService = new AuthService();

interface AuthStateType {
    response: String;
    resendTokenResponse:String
    error: String| Object;
    currentUser: null| SessionUser ;
    returnUrl: null | String;
    signUpTokenData: {
        phone: String;
        token: String
    };
    signUpData:any |null
    newTokenData:any | null
    completeResponse:any |null
    validationError: String| Object;
    errResponse: null | AuthResponse }

export const useAuthStore = defineStore('auth', {
    state: (): AuthStateType  => ({
        response: "",
        error: "",
        errResponse: null,
        currentUser: null,
        returnUrl: null,
        signUpTokenData: {
            token: "",
            phone: ""
        },
        validationError:"",
        signUpData:null,
        completeResponse:null,
        resendTokenResponse:"",
        newTokenData:null
    }),
    actions: {
        register(payload: SignUpRequestInput){
            authService.signUp(payload).then(response => {
                this.response = response.message
                this.signUpData = response?.data
                localStorage.setItem('signUpToken', response.data.toString())
            
            }).catch(err => {
                this.errResponse =  err.response.data
            })
        },
        activate(payload: ActivateAccountRequestInput){
            authService.activateAccount(payload).then(response => {
                this.response = response.message
                localStorage.clear()
            }).catch(err => {
                this.errResponse =  err.response.data
            })
        },
        refresh(token: string| null){
            authService.refreshToken().then(response => {
                this.response = response.message
            }).catch(err => {
                this.errResponse =  err.response.data
            })
        },
        validateToken(token: string){
            authService.validateToken(token).then(response => {
                
                this.response = response.message
            }).catch(err => {
                this.validationError =  err.response.data
            })
        },
        verifyEmail(payload: VerifyEmailInputs){
            authService.verifyEmail(payload).then(response => {
                this.response = response.message
                this.signUpTokenData =  response.data
                localStorage.setItem('token', response.data.token.toString())
            }).catch(err => {
                this.errResponse =  err.response.data
            })
        },
         login(payload: SignInRequestInput): void {
           authService.signIn(payload).then(response => {
            //    localStorage.setItem('accessToken', response.data.accessToken);
            //    localStorage.setItem('refreshToken', response.data.refreshToken);
            //    localStorage.setItem('user', JSON.stringify(response.data.userObj));
               this.currentUser =  response.data.userObj;
               
               this.response = response.message;
               this.error = response.error;
           }).catch(err => {
               this.errResponse =  err.response.data;
           })
        },
         logout():void {
             localStorage.clear();
            authService.signOut().then(response => {
                this.currentUser = null;
                this.response = response.message;
                this.error = response.error;
            })
             location.reload()
        },
        reset(){
            this.errResponse =  null
            this.response = "";
        },
        confirmEmail(email: string){
            authService.confirmEmail({ email }).then(res => {
                this.response =  res.message
            }).catch(err => {
                this.errResponse =  err.response.data
            });
        },
        confirmNewPassword(payload: ConfirmPassword){
            authService.confirmNewPassword(payload).then(res => {
                this.response =  res.message
            }).catch(err => {
                this.errResponse =  err.response.data
            });
        },
        changePassword(payload: ChangePasswordInput){
            authService.changePassword(payload).then(res => {
                this.response =  res.message
            }).catch(err => {
                this.errResponse =  err.response.data
            });
        },
        completeProfile(payload: ProfileForm){
            authService.completeProfile(payload).then(res => {
                this.response =  res.message
                this.completeResponse = res.data
            }).catch(err => {
                this.errResponse =  err.response.data
            });
        },
        resendOtp(payload: ResendOTP){
            authService.resendOtp(payload).then(res => {
                this.resendTokenResponse =  res.message
                this.newTokenData = res.data
                this.signUpData = res?.data
                localStorage.setItem('signUpToken', res.data.toString())
            }).catch(err => {
                this.errResponse =  err.response.data
            });
        },
        
        
    },
});