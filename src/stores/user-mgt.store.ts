import { defineStore } from 'pinia';
import {UserAuthService} from "@/services/user-mgt-auth.service";
import type {
    LoginInput,
    AuthResponse,
    RegisterFarmerInput,
    UserProfileResponse,
    RegisterExpertInput,
    ResetPasswordInput,
    CommunityPostInput,
    Report,
    Post,
    Advice,
    ExpertAvailability
} from "@/types/services/user-mgt.types";

const userAuthService = new UserAuthService();

interface AuthStateType {
    response: String;
    errResponse: null | AuthResponse
    FarmerProfile:UserProfileResponse | null
    communityPostResponse: any | null
    allPosts:Report[]
    post: any | null
    moderateResponse: any | null
    flagResponse: any | null
    approveResponse: any | null
    unFlagResponse: any | null
    approvedPosts:Post []
    commentResponse: any | null
    approveCommentResponse: any | null
    retrievedResponses:Advice[]
    rejectCommentResponse: any | null
    createAvailabilitySlotResponse: any | null
    availableslots:ExpertAvailability[]
    deactivateResponse: any | null
    farmerSlots:ExpertAvailability[]
    bookingResponse: any | null
    farmerBookings: any []
    rejectBookingResponse: any | null
    approveBookingResponse: any | null
 }

export const useAuthStore = defineStore('authStore', {
    state: (): AuthStateType  => ({
        response: "",
        errResponse: null,
        FarmerProfile: null,
        communityPostResponse: null,
        allPosts: [],
        moderateResponse: null,
        flagResponse: null,
        approveResponse: null,
        unFlagResponse: null,
        approvedPosts:[],
        commentResponse: null,
        approveCommentResponse: null,
        retrievedResponses:[],
        rejectCommentResponse: null,
        post: null,
        createAvailabilitySlotResponse: null,
        availableslots: [],
        deactivateResponse: null,
        farmerSlots: [],
        bookingResponse: null,
        farmerBookings: [],
        rejectBookingResponse: null,
        approveBookingResponse: null
    
    }),
    actions: {
         login(payload: LoginInput): void {
            userAuthService.login(payload).then(response => {
               localStorage.setItem('accessToken', response.access);
               localStorage.setItem('refreshToken', response.refresh);
               this.response = response.access;
           }).catch(err => {
           })
        },
        RegisterFarmer(payload: RegisterFarmerInput) {
            userAuthService.RegisterFarmer(payload).then(response => {
                this.FarmerProfile = response
            }).catch(err => {
            })
        },
        RegisterExpert(payload: RegisterExpertInput) {
            userAuthService.RegisterExpert(payload).then(response => {
                this.FarmerProfile = response
            }).catch(err => {
            })
        },
        ForgotPassword(payload:{email:string}) {
            userAuthService.ForgotPassword(payload).then( response => {
                this.response = response.message
            }).catch(err => {
            })
        },
        ResetPassword(payload: ResetPasswordInput ) {
            userAuthService.ResetPassword(payload).then( response =>{
                this.response = response.message
            }).catch(err => {
            })
            
        },
        MakeCommunityPost(payload:CommunityPostInput) {
            userAuthService.MakeCommunityPost(payload).then( response => {
                this.communityPostResponse = response
            }).catch(err => {
            })
        },
        GetAllCommunityPosts(){
            userAuthService.GetAllCommunityPosts().then( response =>{
                this.allPosts = response.results
            }).catch(err => {
            })
        },
        moderateCommunityPost(post_id:string,payload: {action:string}) {
            userAuthService.moderateCommunityPost(post_id,payload).then( response => {
                this.moderateResponse = response 
            }).catch(err => {
            })
        },
        flagPost(post_id:string,payload: {action:string}) {
            userAuthService.flagPost(post_id,payload).then( response => {
                this.flagResponse = response
            }).catch(err => {
            })
        },
        approvePost(post_id:string,payload: {action:string}) {
            userAuthService.approvePost(post_id,payload).then( response => {
                this.approveResponse = response 
            }).catch(err => {
            })
        },
        unFlagPost(post_id:string,payload: {action:string}) {
            userAuthService.unFlagPost(post_id,payload).then( response => {
                this.unFlagResponse = response 
            }).catch(err => {
            })
        },
        getAllApprovedPosts() {
            userAuthService.getAllApprovedPosts().then( response => {
                this.approvedPosts = response
            })
        },
        commentOnPost(post_id:string, payload: {content:string}) {
            userAuthService.commentOnPost(post_id, payload).then( response => {
                this.commentResponse = response
            })
        },
        approveComment(response_id:string, payload:{action:string,expert_comment:string}){
            userAuthService.approveComment(response_id, payload).then( response => {
                this.approveCommentResponse = response
            })
        },
        rejectComment(response_id:string, payload:{action:string,expert_comment:string}){
            userAuthService.rejectComment(response_id, payload).then( response => {
                this.rejectCommentResponse = response
            })
        },
        retrievePostResponses(post_id:string){
            userAuthService.retrievePostResponses(post_id).then( response => {
                this.retrievedResponses = response
            })
        },
        getPostById(post_id:string){
            userAuthService.getPostById(post_id).then(response => {
                this.post = response
                console.log("store",response.data)
            })
        },
        createAvailabilitySlot(payload:{start_time:string, end_time:string}) {
            userAuthService.createAvailabilitySlot(payload).then( response => {
                this.createAvailabilitySlotResponse  = response
            })
        },
        getAvailabilitySlots(page:number, page_size:number){
            userAuthService. getAvailabilitySlots(page, page_size).then( response => {
                this.availableslots = response.results
            })
        },
        deactivateSlot(slot_id:string){ 
            userAuthService.deactivateSlot(slot_id).then(response => {
                this.deactivateResponse = response
            })
        },
        getSlotsForFarmers(){
            userAuthService.getSlotsForFarmers().then( response => {
                this.farmerSlots = response
            })
        },
        bookSlot(payload:{slot_id:string}){
            userAuthService.bookSlot(payload).then( response => {
                this.bookingResponse = response
            })
        },
        getFarmerBookingSlots(){
            userAuthService.getFarmerBookingSlots().then( response => {
                this.farmerBookings = response
            })
        },
        rejectBooking(payload:{booking_id:string, action:string,selected_date:string}) {
            userAuthService.rejectBooking(payload).then( response => {
                this.rejectBookingResponse = response
            })
        },
        approveBooking(payload:{booking_id:string, action:string,selected_date:string}){
            userAuthService.rejectBooking(payload).then( response => {
                this.approveBookingResponse = response
            })
        }


    
 
  
   

   
   
        
        
    },
});