export interface EducationalResource {
    id: string;
    title: string;
    url: string;
    description: string;
    disease: string;
    resource_type: string;
    created_at: string;
  }
  
  export interface RustDetectionResult {
    id: number;
    farmer_id: string;
    image: string;
    uploaded_at: string;
    rust_class: string;
    confidence: number;
    educational_resources: EducationalResource[];
  }

  export interface ModelTrainInput {
    image:File
    label:string
  }
  