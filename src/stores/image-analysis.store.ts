import { defineStore } from 'pinia';
import {ImageService} from "@/services/image-analysis.service";
import type {ModelTrainInput, RustDetectionResult} from '@/types/services/image-analysis';
import { isNullishCoalesce } from 'typescript';


const imageService = new ImageService();

interface ImageType {
    response: String;
    imageAnalysisResults: RustDetectionResult | null
    leafDetectionResponse: any | null
    is_leaf: boolean | null
    leafConfidence: number | null
    // errResponse: null | AuthResponse
  

 }

export const imageStore = defineStore('imageStore', {
    state: (): ImageType  => ({
        response: "",
        imageAnalysisResults: null,
        leafDetectionResponse: null,
        is_leaf: null,
        leafConfidence: null
       
        
    
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
        },
        resetAnalysisResults(){
            this.imageAnalysisResults = null
        },
        LeafDetection(file:File){
            imageService.LeafDetection(file).then( response =>{
                this.is_leaf = response.is_leaf
                this.leafConfidence = response.confidence
            })
        },
        resetDetection(){
            this.is_leaf = null
            this.leafConfidence = null
        }
    
 
  
   

   
   
        
        
    },
});