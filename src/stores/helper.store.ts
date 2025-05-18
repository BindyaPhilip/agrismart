import { defineStore } from 'pinia';
import {HelperService} from "@/services/helper.service";
import type {Country, County, District, Parish, Station, SubCounty, Village, Item as ItemEntry,
    CategoryList,ProofOfDeliveryObject,MailGroup,MailClass,MailDestination,MailType,
    ProofOfDelivery,StationItem,Department
    
   

} from "@/types/components/helper-types";
import type {CustomerTypesResponse} from "@/types/services/auth.types";



const service = new HelperService();

interface HelpStoreState {
    response: Object| null;
    countries: Array<Country>;
    districts: Array<District>;
    counties: Array<County>;
    subCounties: Array<SubCounty>;
    parishes: Array<Parish>;
    villages: Array<Village>;
    customerTypes: Array<CustomerTypesResponse> ;
    stations: Array<Station> ;
    errResponse: null | Object 
    categoryList:Array<CategoryList>
    proofCategories:ProofOfDeliveryObject | null
    mailGroups:Array<MailGroup>
    mailGroupsEms:Array<MailGroup>
    mailClasses:Array<MailClass>
    mailClassesEms:Array<MailClass>
    mailDestinations:Array<MailDestination>
    mailDestinationsEms:Array<MailDestination>
    mailDestinationsAll:Array<MailDestination>
    mailTypes:Array<MailType>
    additionals:Array<ProofOfDelivery>
    stationsEms: Array<Station> ;
    departments: Array<Department> ;

}

export const useHelperStore = defineStore('helper-store', {
    state: (): HelpStoreState  => ({
        response: null,
        customerTypes: [],
        countries: [],
        districts: [],
        counties: [],
        subCounties: [],
        parishes: [],
        villages: [],
        stations: [],
        errResponse: null,
        categoryList:[],
        proofCategories:null,
        mailGroups:[],
        mailGroupsEms:[],
        mailClasses:[],
        mailClassesEms:[],
        mailDestinations:[],
        mailDestinationsEms:[],
        mailDestinationsAll:[],
        mailTypes:[],
        additionals:[],
        stationsEms:[],
        departments:[]
    }),
    getters: {
        getStations: (state): Array<ItemEntry> => {
            let items = [{value: "", label: "Select Station"}];
            if(state.stations.length !== 0){
                state.stations.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getFromStations: (state): Array<ItemEntry> => {
            let items = [{value: "", label: "From Station"}];
            if(state.stations.length !== 0){
                state.stations.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getToStations: (state): Array<ItemEntry> => {
            let items = [{value: "", label: "To Station"}];
            if(state.stations.length !== 0){
                state.stations.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getCountries: (state): Array<ItemEntry> => {
            let items = [{value: "", label: "Select Country"}];
            if(state.countries.length !== 0){
                state.countries.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getDistricts: (state): Array<ItemEntry> => {
            let items = [{value: "", label: "Select District"}];
            if(state.districts.length !== 0){
                state.districts.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getOrganizationCustomerTypes: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{value: "", label: "Select Organization type"}];
            if(state.customerTypes.length !== 0){
                state.customerTypes.forEach(result => {
                    if(result.name !== "INDIVIDUAL"){
                        items.push({
                            label: result.name,
                            value: result.id
                        })
                    }
                })
            }
            return items
        },
        getCustomerTypes: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{value: "", label: "Select Customer type"}];
            if(state.customerTypes.length !== 0){
                state.customerTypes.forEach(result => {
                   
                        items.push({
                            label: result.name,
                            value: result.id
                        })
                    
                })
            }
            return items
        },
        getCounties: (state): Array<ItemEntry> => {
            let items = [{value: "", label: "Select County"}];
            if(state.counties.length !== 0){
                state.counties.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getSubCounties: (state): Array<ItemEntry> => {
            let items = [{value: "", label: "Select SubCounty"}];
            if(state.subCounties.length !== 0){
                state.subCounties.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getParishes: (state): Array<ItemEntry> => {
            let items = [{value: "", label: "Select Parish"}];
            if(state.parishes.length !== 0){
                state.parishes.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getVillages: (state): Array<ItemEntry> => {
            let items = [{value: "", label: "Select Village"}];
            if(state.villages.length !== 0){
                state.villages.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getDepartments: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{value: "", label: "Select Department"}];
            if(state.departments.length !== 0){
                state.departments.forEach(result => {
                    items.push({
                        label: result.name.split("_").join(" "),
                        value: result.id
                    })
                })
            }
            return items
        },
        getMailGroups: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{value: "", label: "Select Mail Group"}];
            if(state.mailGroups.length !== 0){
                state.mailGroups.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getMailGroupsRegistered: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{ value: "", label: "Select Mail Group" }];
            if (state.mailGroups.length !== 0) {
                state.mailGroups.forEach(result => {
                    if (result.name === "REGISTERED") { // Adjust name as needed
                        items.push({
                            label: result.name,
                            value: result.id
                        });
                    }
                });
            }
            return items;
        },
        
        getEmsMailGroups: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{value: "", label: "Select Mail Group"}];
            if(state.mailGroupsEms.length !== 0){
                state.mailGroupsEms.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
 
        getCategoryList: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{value: "", label: "Select Category"}];
            if(state.categoryList.length !== 0){
                state.categoryList.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getMailTypes: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{value: "", label: "Select Category"}];
            if(state.mailTypes.length !== 0){
                state.mailTypes.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getMailClasses: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{value: "", label: "Select Class"}];
            if(state.mailClasses.length !== 0){
                state.mailClasses.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getEmsMailClasses: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{value: "", label: "Select Class"}];
            if(state.mailClassesEms.length !== 0){
                state.mailClassesEms.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getMailDestination: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{value: "", label: "Select Destination"}];
            if(state.mailDestinations.length !== 0){
                state.mailDestinations.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        getEmsMailDestination: (state): Array<ItemEntry> => {
            let items: ItemEntry[] = [{value: "", label: "Select Destination"}];
            if(state.mailDestinationsEms.length !== 0){
                state.mailDestinationsEms.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id
                    })
                })
            }
            return items
        },
        // getStations: (state): Array<StationItem> => {
        //     let items = [{value: "", label: "Select Station",regionId:""}];
        //     if(state.stations.length !== 0){
        //         state.stations.forEach(result => {
        //             items.push({
        //                 label: result.name,
        //                 value: result.id, 
        //                 regionId:result?.regionId
        //             })
        //         })
        //     }
        //     return items
        // },
        getEmsStations: (state): Array<StationItem> => {
            let items = [{value: "", label: "Select Station",regionId:""}];
            if(state.stationsEms.length !== 0){
                state.stationsEms.forEach(result => {
                    items.push({
                        label: result.name,
                        value: result.id, 
                        regionId:result?.regionId
                    })
                })
            }
            return items
        },
       
    },
    actions: {
        fetchCustomerTypes(){
            service.fetchCustomerTypes().then(response => {
                this.customerTypes = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchCountries(){
            service.fetchCountries().then(response => {
                this.countries = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchDistricts(){
            service.fetchDistricts().then(response => {
                this.districts = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchCounties(districtId: String){
            service.fetchCounties(districtId).then(response => {
                this.counties = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchSubCounties(countyId: String){
            service.fetchSubCounties(countyId).then(response => {
                this.subCounties = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchParishes(subCountyId: String){
            service.fetchParishes(subCountyId).then(response => {
                this.parishes = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchVillages(parishId: String){
            service.fetchVillages(parishId).then(response => {
                this.villages = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchStations(){
            service.fetchStations().then(response => {
                this.stations = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchMailGroups(){
            service.fetchMailGroups().then(response => {
                this.mailGroups = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchEmsMailGroups(){
            service.fetchEmsMailGroups().then(response => {
                this.mailGroupsEms = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchProofOfDeliveryCategories(mailTypeId:string){
            service.fetchProofOfDeliveryCategories(mailTypeId).then(response => {
                this.proofCategories = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchCategoryList(){
            service.fetchCategoryList().then(response => {
                this.categoryList = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        
        },
        
        fetchMailType(){
            service.fetchMailType().then(response => {
                this.mailTypes = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        
        },
        fetchMailClasses(){
            service.fetchMailClasses().then(response => {
                this.mailClasses = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        
        },
        fetchEmsMailClasses(){
            service.fetchEmsMailClasses().then(response => {
                this.mailClassesEms = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        
        },
        fetchMailDestinations(){
            service.fetchMailDestinations().then(response => {
                this.mailDestinations = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        
        },
        fetchEmsMailDestinations(){
            service.fetchEmsMailDestinations().then(response => {
                this.mailDestinationsEms = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        
        },
        fetchAllMailDestinations(){
            service.fetchAllMailDestinations().then(response => {
                this.mailDestinationsAll = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        
        },
        fetchMailAdditional(){
            service.fetchMailAdditional().then(response => {
                this.additionals = response.data
            }).catch(err => {
                this.errResponse =  err.response?.data
            })
        
        },
        fetchEmsStations(){
            service.fetchEmsStations().then(response => {
                this.stationsEms = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
        fetchDepartments(){
            service.fetchDepartments().then(response => {
                this.departments = response.data
            }).catch(err => {
                this.errResponse =  err.response
            })
        },
    },
});