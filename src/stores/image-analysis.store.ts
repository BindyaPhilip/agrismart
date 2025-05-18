import { defineStore } from 'pinia';
import {ImageService} from "@/services/image-analysis.service";
import type {ModelTrainInput, RustDetectionResult} from '@/types/services/image-analysis';

const imageService = new ImageService();

interface ImageType {
    response: String;
    imageAnalysisResults: RustDetectionResult | null
    // errResponse: null | AuthResponse
  

 }

export const imageStore = defineStore('imageStore', {
    state: (): ImageType  => ({
        response: "",
        imageAnalysisResults: null
       
        
    
    }),
    actions: {

        ImageUpload(file:File){
            imageService.ImageUpload(file).then(response => {
                this.imageAnalysisResults = response
            }).catch(err => {
            })
        },
        ModelTraining(payload:ModelTrainInput){
            imageService.ModelTraining(payload).then( response =>{

            }).catch(err => {
            })
        }

    
 
  
   

   
   
        
        
    },
});