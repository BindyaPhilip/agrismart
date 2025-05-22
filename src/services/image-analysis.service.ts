import axios from "axios";
import type {ModelTrainInput, RustDetectionResult} from '@/types/services/image-analysis'

console.log('VITE_IMAGE_ANALYSIS_URL:', import.meta.env.VITE_IMAGE_ANALYSIS_URL);

export class ImageService {

    private imageClient= axios.create({
        baseURL: import.meta.env.VITE_IMAGE_ANALYSIS_URL,
        headers:{
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    public async ImageUpload(file: File): Promise<RustDetectionResult> {
        //create an object
        const formData = new FormData();
        formData.append('image',file)
        const response = await this.imageClient.post('/rust-detection/',formData)
        return response?.data;
    }


    public async ModelTraining(payload:ModelTrainInput): Promise<any>  {
        const formData = new FormData();
        formData.append('image',payload.image)
        formData.append('label',payload.label)
        const response = await this.imageClient.post('/upload-training-images/',formData)
        return response?.data

    }
    public async LeafDetection(file:File): Promise<any> {
        const formData = new FormData();
        formData.append('image',file) 
        try {
            const response = await this.imageClient.post('/leaf-detection/', formData);
            return response?.data;
          } catch (error:any) {
            if (error.response && error.response.status === 400) {
              // Return the 400 response data instead of throwing
              return error.response.data;
            }
            throw error; // Rethrow other errors
          }




    

    }


}



