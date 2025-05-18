import axios from "axios";
import type {
    ApiResponseWithCustomerType,
    ApiResponseWithCountries,
    ApiResponseWithStation,
    ApiResponseWithDistricts,
    MailGroupResponse,
    CategoryListResponse,
    MailTypeResponse,
    MailClassResponse,
    MailDestinationResponse,
    ProofOfDeliveryResponse,
    ProofOfDeliveryObjectResponse,
    ApiResponseWithDepartments,
    ApiResponseWithCounties, ApiResponseWithSubCounties, ApiResponseWithParishes, ApiResponseWithVillages
} from "@/types/components/helper-types";

export class HelperService {
// const token = localStorage.getItem('accessToken');
    private client= axios.create({
        baseURL: import.meta.env.VITE_BASE_URL +"/configuration",
        headers:{
            "Content-Type": "application/json"
        }
    })

    private clientAuth= axios.create({
        baseURL: import.meta.env.VITE_BASE_URL +"/configuration",
        headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
    })


    public async fetchCustomerTypes():Promise<ApiResponseWithCustomerType> {
        const response =  await this.client.get('/customer-type/list');
        return response.data;
    }


    public async fetchCountries():Promise<ApiResponseWithCountries> {
        const response =  await this.client.get('/country/list');
        return response.data;
    }

    public async fetchDistricts():Promise<ApiResponseWithDistricts> {
        const response =  await this.clientAuth.get('/admin-units/district');
        return response.data;
    }
    public async fetchCounties(districtId: String):Promise<ApiResponseWithCounties> {
        const response =  await this.clientAuth.get(`/admin-units/county?districtId=${districtId}`);
        return response.data;
    }
    public async fetchSubCounties(countyId: String):Promise<ApiResponseWithSubCounties> {
        const response =  await this.clientAuth.get(`/admin-units/subCounty?countyId=${countyId}`);
        return response.data;
    }
    public async fetchParishes(subCountyId: String):Promise<ApiResponseWithParishes> {
        const response =  await this.clientAuth.get(`/admin-units/parish?subCountyId=${subCountyId}`);
        return response.data;
    }
    public async fetchVillages(parishId: String):Promise<ApiResponseWithVillages> {
        const response =  await this.clientAuth.get(`/admin-units/village?parishId=${parishId}`);
        return response.data;
    }


    public async fetchStations():Promise<ApiResponseWithStation> {
        const response =  await this.clientAuth.get('/station/list');
        return response.data;
    }


public async fetchMailGroups():Promise<MailGroupResponse> {
    const response =  await this.client.get('/mail-group/list');
  
    return response.data;
}
public async fetchEmsMailGroups():Promise<MailGroupResponse> {
    const response =  await this.client.get('/mail-group/list/ems');
  
    return response.data;
}

public async fetchProofOfDeliveryCategories(mailTypeId:string):Promise<ProofOfDeliveryObjectResponse> {
    const response =  await this.client.post('/mail-tariff/additional/by-mail-type',{mailTypeId:mailTypeId});
  
    return response.data;
}

public async fetchCategoryList():Promise<CategoryListResponse> {
    const response =  await this.client.get('/mail-tariff/additional/category/list');
  
    return response.data;
}
public async fetchMailType():Promise<MailTypeResponse> {
    const response =  await this.client.get('/mail-type/list');
  
    return response.data;
}
public async fetchMailClasses():Promise<MailClassResponse> {
    const response =  await this.client.get('/mail-class/list');
  
    return response.data;
}
public async fetchEmsMailClasses():Promise<MailClassResponse> {
    const response =  await this.client.get('/mail-class/list/ems');
  
    return response.data;
}
public async fetchMailDestinations():Promise<MailDestinationResponse> {
    const response =  await this.client.get('/mail-destination/list');
  
    return response.data;
}
public async fetchEmsMailDestinations():Promise<MailDestinationResponse> {
    const response =  await this.client.get('/mail-destination/list/ems');
  
    return response.data;
}
public async fetchAllMailDestinations():Promise<MailDestinationResponse> {
    const response =  await this.client.get('/mail-destination/list');
  
    return response.data;
}
public async createMailDestinations(payload:any):Promise<any> {
    const response =  await this.client.post('/mail-destination/create',payload);
  
    return response.data;
}
public async updateMailDestinations(payload:any):Promise<any> {
    const response =  await this.client.post('/mail-destination/update',payload);
  
    return response.data;
}
public async fetchMailAdditional():Promise<ProofOfDeliveryResponse> {
    const response =  await this.client.get('/mail-tariff/additional/list');
  
    return response.data;
}

public async fetchEmsStations():Promise<ApiResponseWithStation> {
    const response =  await this.client.get('/station/list/ems');
    return response.data;
}

public async fetchDepartments():Promise<ApiResponseWithDepartments> {
    const response =  await this.client.get('/department/list');
  
    return response.data;
}

}



