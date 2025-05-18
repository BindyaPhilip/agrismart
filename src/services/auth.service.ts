import axios from "axios";
import type {
    SignInRequestInput,
    ResetPasswordInput,
    AuthResponse,
    SignUpRequestInput,
    ActivateAccountRequestInput,
    CustomerTypesResponse, VerifyEmailResponse, LoginResponse, ConfirmPassword, ChangePasswordInput,
    VerifyEmailInputs,ProfileForm, ResendOTP
} from "@/types/services/auth.types";

export class AuthService {

    private authClient= axios.create({
        baseURL: import.meta.env.VITE_BASE_URL +"/auth",
        headers:{
            "Content-Type": "application/json"
        }
    })

    /* Authentication */
    public async signIn(body: SignInRequestInput):Promise<LoginResponse> {
        const response =  await this.authClient.post('/sign-in', body);
        // console.log('response',response?.data)
        localStorage.setItem('accessToken', response.data?.data?.accessToken);
        localStorage.setItem('refreshToken', response.data?.data?.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data?.data?.user));
        localStorage.setItem('allUserData', JSON.stringify(response.data?.data));
        return response.data;
    }
    public async signOut():Promise<AuthResponse> {
        const response =  await this.authClient.get('/sign-out', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }
    public async refreshToken():Promise<AuthResponse> {
        const response =  await this.authClient.get('/refresh-token');
        return response.data;
    }

    public async validateToken(token:string):Promise<any> {
        const response =  await this.authClient.get(`/validate-token?token=${token}`);
        return response.data;
    }
    /* Account Registration */
    public async signUp(body: SignUpRequestInput):Promise<AuthResponse> {
        const response =  await this.authClient.post('/sign-up', body);
        return response.data;
    }
    public async activateAccount(body: ActivateAccountRequestInput):Promise<AuthResponse> {
        const response =  await this.authClient.post('/activate-account', body);
        return response.data;
    }
    public async verifyEmail(payload: VerifyEmailInputs):Promise<VerifyEmailResponse> {
        const response =  await this.authClient.post(`/verify/email`, payload);
        return response.data;
    }
    // public async verifyEmail(token: String):Promise<VerifyEmailResponse> {
    //     const response =  await this.authClient.get(`/verify/email/?token=${token}`);
    //     return response.data;
    // }

    /* Customer Types */
    public async fetchCustomerTypes():Promise<Array<CustomerTypesResponse>> {
        const response =  await this.authClient.get('/customer-types');
        return response.data;
    }

    /* Countries */
    public async fetchCountries():Promise<AuthResponse> {
        const response =  await this.authClient.get('/countries');
        return response.data;
    }


    // public async confirmEmail(payload: {email: string}): Promise<AuthResponse> {
    //     const response =  await this.authClient.post('/reset-password', payload);
    //     return response.data;
    // }
    public async confirmEmail(payload: {email: string}): Promise<AuthResponse> {
        const response =  await this.authClient.post('/forgot-password', payload);
        return response.data;
    }

    // public async confirmNewPassword(payload: ConfirmPassword): Promise<AuthResponse> {
    //     const response =  await this.authClient.post('/reset-password', payload);
    //     return response.data;
    // }
    public async confirmNewPassword(payload: ConfirmPassword): Promise<AuthResponse> {
        const response =  await this.authClient.post('/confirm-new-password', payload);
        return response.data;
    }
    public async changePassword(payload: ChangePasswordInput): Promise<AuthResponse> {
        const response =  await this.authClient.post('/change-password', payload, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }
    public async completeProfile(payload: ProfileForm): Promise<AuthResponse> {
        const response =  await this.authClient.post('/complete-profile', payload, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
       
        return response.data;
    }
    public async resendOtp(payload: ResendOTP): Promise<AuthResponse> {
        const response =  await this.authClient.post('/resend-otp', payload, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }
}



