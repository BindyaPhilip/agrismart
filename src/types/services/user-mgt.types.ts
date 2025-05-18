export interface AuthResponse {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: Object
    status: Number
}


export interface LoginInput {
    email: string
    password: string
}

export interface RegisterFarmerInput {
    email: string
    username: string
    password: string
    confirm_password: string
    phone_number: string
    farm_location: string
    farm_size: string
    crop_types: string[]
}

export interface User {
    id: string;
    email: string;
    username: string;
    role: string; 
    phone_number: string;
    is_approved: boolean;
    points: number;
  }
  
  export interface Profile {
    id: string;
    user: User;
    farm_location: string;
    farm_size: number;
    crop_types: string[];
    soil_type: string;
    irrigation_method: string;
    disease_history: string;
    farm_latitude: number | null;
    farm_longitude: number | null;
    experience_years: number;
    preferred_language: string;
    farm_equipment: string;
  }
  
  export interface UserProfileResponse {
    user: User;
    profile: Profile;
  }

  export interface RegisterExpertInput {
    email: string
    username: string
    password: string
    phone_number: string
    areas_of_expertise: string
    certifications: string
    bio: string
    experience_years: number
    institution: string
    languages_spoken: string
    social_links: string
  }

  export interface User {
    id: string;
    email: string;
    username: string;
    role: string;
    phone_number: string;
    is_approved: boolean;
    points: number;
  }
  
  export interface ExpertProfile {
    id: string;
    user: User;
    areas_of_expertise: string;
    certifications: string;
    bio: string;
    experience_years: number;
    institution: string;
    languages_spoken: string;
    social_links: string;
    validated_responses_count: number;
  }
  
  export interface ExpertResponse {
    user: User;
    profile: ExpertProfile;
  }
  
  export interface ResetPasswordInput {
    token: string
    new_password: string
    confirm_password: string
  }
  
  export interface CommunityPostInput {
    title: string
    content: string
    image: string
    disease_type: string
    crop_type: string
    urgency_level: string
    rust_detection: string
  }

  export interface Farmer {
    id: string;
    email: string;
    username: string;
    role: string;
    phone_number: string;
    is_approved: boolean;
    points: number;
  }
  
  export interface Expert {
    id: string;
    email: string;
    username: string;
    role: string;
    phone_number: string;
    is_approved: boolean;
    points: number;
  }
  
  export interface FarmerComment {
    id: string;
    farmer: Farmer;
    content: string;
    created_at: string;
    is_approved: boolean;
    expert_comment: string;
    approved_by: Expert;
  }
  
  export interface ExpertComment {
    id: string;
    expert: Expert;
    content: string;
    created_at: string;
  }
  
  export interface Report {
    id: string;
    farmer: Farmer;
    title: string;
    content: string;
    disease_type: string;
    crop_type: string;
    urgency_level: string;
    created_at: string;
    is_approved: boolean;
    is_flagged: boolean;
    farmer_comments: FarmerComment[];
    expert_comments: ExpertComment[];
  }
  
  export interface ReportResponse {
    count: number;
    next: string
    previous: string 
    results: Report[];
  }

  export interface User {
    id: string;
    email: string;
    username: string;
    role: string
    phone_number: string;
    is_approved: boolean;
    points: number;
  }
  
  export interface FarmerComment {
    id: string;
    farmer: Farmer;
    content: string;
    created_at: string;
    is_approved: boolean;
    expert_comment: string;
    approved_by:  Expert;
  }
  
  export interface ExpertComment {
    id: string;
    expert: Expert;
    content: string;
    created_at: string;
  }
  
  export interface Post {
    id: string;
    farmer: User;
    title: string;
    content: string;
    disease_type: string;
    crop_type: string;
    urgency_level: string
    created_at: string;
    is_approved: boolean;
    is_flagged: boolean;
    farmer_comments: FarmerComment[];
    expert_comments: ExpertComment[];
  }

  export interface Farmer {
    id: string;
    email: string;
    username: string;
    role: string;
    phone_number: string;
    is_approved: boolean;
    points: number;
  };
  
  export interface Advice {
    id: string;
    farmer: Farmer;
    content: string;
    created_at: string; // ISO date string
    is_approved: boolean;
    expert_comment: string;
    approved_by: string | null;
  };
  

  export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  phone_number: string;
  is_approved: boolean;
  points: number;
}

export interface Expert {
  id: string;
  user: User;
  areas_of_expertise: string;
  certifications: string;
  bio: string;
  experience_years: number;
  institution: string;
  languages_spoken: string;
  social_links: string;
  validated_responses_count: number;
}

export interface ExpertAvailability {
  id: string;
  expert: Expert;
  start_time: string; 
  end_time: string;   
  is_booked: boolean;
  is_active: boolean;
}

export interface ExpertAvailabilityResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExpertAvailability[];
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  phone_number: string;
  is_approved: boolean;
  points: number;
}

export interface Expert {
  id: string;
  user: User;
  areas_of_expertise: string;
  certifications: string;
  bio: string;
  experience_years: number;
  institution: string;
  languages_spoken: string;
  social_links: string;
  validated_responses_count: number;
}

export interface Slot {
  id: string;
  expert: Expert;
  start_time: string; // ISO date string
  end_time: string;   
  is_booked: boolean;
  is_active: boolean;
}

export interface Booking {
  id: string;
  farmer: User;
  slot: Slot;
  status: string; 
  selected_date: string;
  created_at: string; 
  notification_sent: boolean;
}


export interface TokenResponse {
  refresh: string;
  access: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  phone_number: string;
  profile: Profile;
}

export interface Profile {
  id: string;
  user: User;
  areas_of_expertise: string;
  certifications: string;
  bio: string;
  experience_years: number;
  institution: string;
  languages_spoken: string;
  social_links: string;
  validated_responses_count: number;
}




  
  