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


}



