import type {CountryCallingCode, NationalNumber, NumberType} from "libphonenumber-js";
import type {CustomerTypesResponse} from "@/types/services/auth.types";

export interface Item {
    label: string;
    value:string
}

export interface ApiResponse {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: Object
    status: Number
}
export interface ApiResponseWithCustomerType {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: Array<CustomerTypesResponse>
    status: Number
}
export interface ApiResponseWithCountries {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: Array<Country>
    status: Number
}

export interface ApiResponseWithDistricts {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: District[]
    status: Number
}
export interface ApiResponseWithCounties {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: County[]
    status: Number
}
export interface ApiResponseWithSubCounties {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: SubCounty[]
    status: Number
}
export interface ApiResponseWithParishes {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: Parish[]
    status: Number
}
export interface ApiResponseWithVillages {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: Village[]
    status: Number
}

export interface ApiResponseWithStation {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: Array<Station>
    status: Number
}
export interface Station {
    id: string
    name: string
    code: string
    regionId: string
    stationType: string
    createdDate: string
    updatedDate: string

}

export interface Country {
    name: string
    code2: string
    code3: string
    id: string
}

export interface District {
    id: string
    name: string
    code: string
    activeFlag: string
}

export interface County {
    id: string
    name: string
    code: string
    activeFlag: string
    districtId: string
}

export interface SubCounty {
    id: string
    countyId: string
    name: string
    code: string
    activeFlag: string

}
export interface Parish {
    id: string
    subCountyId: string
    name: string
    code: string
    activeFlag: string
}
export interface Village {
    id: string
    parishId: string
    name: string
    code: string
    activeFlag: string
}

export type PhoneResult = {
    isValid: boolean
    isPossible?: boolean
    countryCode?: CountryCode | any
    countryCallingCode?: CountryCallingCode
    nationalNumber?: NationalNumber
    type?: NumberType
    formatInternational?: string
    formatNational?: string
    uri?: string
    e164?: string
    rfc3966?: string
}

export interface PickerShortcut {
    identifier: string // should be uniq
    label: string
    value: {
        start: string
        end: string
    }
}

export interface MailGroup {
    id: string;
    name: string;
  }

  export interface MailGroupResponse {
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: MailGroup[]
    status: Number
}
      
export interface ProofOfDelivery {
"id":string
  "categoryId": string
  "name": string
  "mailTypeId": string
  "amount": number
}
export interface ProofCat{
name: string
tariffCategoryIds: string[]
}
export interface ProofOfDeliveryObject {
category1:ProofCat
category2:ProofCat

}
export interface ProofOfDeliveryObjectResponse{
error: string
errors?:Array<{message: string; field: string}>
count?: Number
message: string
data: ProofOfDeliveryObject
status: Number
}
export interface ProofOfDeliveryResponse{
error: string
errors?:Array<{message: string; field: string}>
count?: Number
message: string
data: ProofOfDelivery[]
status: Number
}
export interface CategoryList {
id: string;
name: string;
}
export interface CategoryListResponse{
error: string
errors?:Array<{message: string; field: string}>
count?: Number
message: string
data: CategoryList[]
status: Number
}
export interface MailType {
id: string;
name: string;
}
export interface MailTypeResponse{
error: string
errors?:Array<{message: string; field: string}>
count?: Number
message: string
data: MailType[]
status: Number
}
export interface MailClass {
id: string;
name: string;
}
export interface MailClassResponse{
error: string
errors?:Array<{message: string; field: string}>
count?: Number
message: string
data: MailClass[]
status: Number
}
export interface MailDestination {
id: string;
name: string;
code: string;
}
export interface MailDestinationResponse{
error: string
errors?:Array<{message: string; field: string}>
count?: Number
message: string
data: MailDestination[]
status: Number
}
export interface MailZone {
"id": string
"zoneNumber": number
}
export interface MailZoneResponse {
error: string
errors?:Array<{message: string; field: string}>
count?: Number
message: string
data: MailZone[]
status: Number
}
export interface MailTariffInternational
{
"id": string
"zoneId": string
"mailClassId": string
"tariffType": string
"weight": number
"amount": number
}
export interface MailTariffInternationalResponse {
error: string
errors?:Array<{message: string; field: string}>
count?: Number
message: string
data: MailTariffInternational[]
status: Number
}
export interface MailTariffDomestic
{
"id": string
"tariffType": string
"weight": number
"amount": number
}
export interface MailTariffDomesticResponse {
error: string
errors?:Array<{message: string; field: string}>
count?: Number
message: string
data: MailTariffDomestic[]
status: Number
}

export interface StationItem {
    label: string;
    value:string
    regionId:string
}
export interface Department {
    id: string
    name: string
    description: string
    createdDate:string
    updatedDate:string

  
}
export interface ApiResponseWithDepartments{
    error: string
    errors?:Array<{message: string; field: string}>
    count?: Number
    message: string
    data: Array<Department>
    status: Number
}
type CountryCode = 'AC' | 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AO' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HN' | 'HR' | 'HT' | 'HU' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TA' | 'TC' | 'TD' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'XK' | 'YE' | 'YT' | 'ZA' | 'ZM' | 'ZW';