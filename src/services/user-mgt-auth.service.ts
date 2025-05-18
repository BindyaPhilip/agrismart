import axios from "axios";
import type {
    LoginInput,
    RegisterFarmerInput,
    UserProfileResponse,
    RegisterExpertInput,
    ResetPasswordInput,
    CommunityPostInput,
    ReportResponse,
    TokenResponse
} from "@/types/services/user-mgt.types";

console.log('VITE_USER_MANAGEMENT_URL:', import.meta.env.VITE_USER_MANAGEMENT_URL);

export class UserAuthService {

    private authClient= axios.create({
        baseURL: import.meta.env.VITE_USER_MANAGEMENT_URL +"/auth/",
        headers:{
            "Content-Type": "application/json"
        }
    })
    private client= axios.create({
        baseURL: import.meta.env.VITE_USER_MANAGEMENT_URL ,
        headers:{
            "Content-Type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    //login 
    public async login(payload:LoginInput ): Promise<TokenResponse> {
        const response = await this.authClient.post('login/',payload)
        localStorage.setItem('accessToken', response.data?.access);
        localStorage.setItem('refreshToken', response.data?.refresh);
        localStorage.setItem('user', JSON.stringify(response.data?.user));
        return response?.data;
    }

    public async  RegisterFarmer(payload: RegisterFarmerInput): Promise<UserProfileResponse> {
        const response = await this.authClient.post('register/farmer/',payload)
        return response?.data
    }
    public async  RegisterExpert(payload: RegisterExpertInput): Promise<UserProfileResponse> {
        const response = await this.authClient.post('register/expert/',payload)
        return response?.data
    }

    public async ForgotPassword(payload:{email:string}): Promise<any> {
        const response = await this.authClient.post('forgot-password/',payload)
        return response?.data
    }

    public async ResetPassword(payload: ResetPasswordInput ): Promise<any> {
        const response = await this.authClient.post('reset-password/',payload)
        return response?.data
    }

    public async MakeCommunityPost(payload:CommunityPostInput): Promise<any> {
        return await this.client.post('community/posts/',payload)
        
    }

    public async GetAllCommunityPosts(): Promise<ReportResponse>{
        const response = await this.client.get('community/posts/all/')
        return response?.data;
    }

    public async moderateCommunityPost(post_id:string,payload: {action:string}): Promise<any>{
        return await this.client.put(`community/posts/moderate/${post_id}/`,payload)
    }
    public async flagPost(post_id:string,payload: {action:string}): Promise<any>{
        return await this.client.put(`community/posts/moderate/${post_id}/`,payload)
    }

    public async approvePost(post_id:string,payload: {action:string}): Promise<any>{
        return await this.client.put(`community/posts/moderate/${post_id}/`,payload)
    }
    
    public async unFlagPost(post_id:string,payload: {action:string}): Promise<any>{
        return await this.client.put(`community/posts/moderate/${post_id}/`,payload)
    }

    public async getAllApprovedPosts(): Promise<any>{
        const response = await this.client.get('/community/posts/')
        return response.data;
    }

    public async commentOnPost(post_id:string, payload: {content:string}): Promise<any>{
        return await this.client.post(`community/responses/${post_id}/`,payload)

    }

    public async approveComment(post_id:string, payload:{action:string,expert_comment:string}): Promise<any> {
        return await this.client.put(`community/responses/moderate/${post_id}/`,payload)
    }
    public async rejectComment(post_id:string, payload:{action:string,expert_comment:string}): Promise<any> {
        return await this.client.put(`community/responses/moderate/${post_id}/`,payload)
    }
    public async retrievePostResponses(post_id:string):Promise<any>{
        const response = await this.client.get(`community/responses/moderate/${post_id}/`)
        return response.data;
    }

    public async getPostById(post_id:string): Promise<any>{
        const response = await this.client.get(`community/posts/${post_id}/`)
        return response.data
    }

    public async createAvailabilitySlot(payload:{start_time:string, end_time:string}): Promise<any> {
        return await this.client.post('consultations/availability-slots/',payload)
    }
    public async getAvailabilitySlots(page:number, page_size:number): Promise<any> {
        const response = await this.client.get(`consultations/availability-slots/?page=${page}&page_size=${page_size}`)
        return response.data
    }
    public async deactivateSlot(slot_id:string): Promise<any> {
        return await this.client.put(`consultations/availability-slots/end/${slot_id}/`);

    }

    public async getSlotsForFarmers(): Promise<any>{
        const response = await this.client.get('consultations/availability-slots/all/')
        return response.data
    }

    public async bookSlot(payload:{slot_id:string}): Promise<any>{
        return await this.client.post('consultations/consultations/',payload)
    }
    public async getFarmerBookingSlots(): Promise<any>{
        const response =  await this.client.get('consultations/consultations/manage/')
        return response.data
    }

    public async rejectBooking(payload:{booking_id:string, action:string,selected_date:string}): Promise<any>{
        return await this.client.put('consultations/consultations/manage/',payload)
    }
    public async approveBooking(payload:{booking_id:string, action:string,selected_date:string}): Promise<any>{
        return await this.client.put('consultations/consultations/manage/',payload)
    }





}



