
export type Dict = { [key: string]: any };

export type IFAQSECTION = {
  created_at:string,
  updated_at:string,
  id:string,
  name:string,
  description:string,
  metadata:Dict
}

export type IFAQ = {
  question:string,
  answer:string,
  created_at:string,
  updated_at:string,
  id:string,
  metadata:Dict
}

export type AccountRequest = {
  id:string,
  created_at:string,
  updated_at:string,
  email:string,
  first_name:string,
  last_name:string,
  company_name:string,
  vat_id:string,
  phone:string,
  street_address:string,
  postal_code:string,
  country_code:string,
  position:string,
  status:string,
  token?:string,
  city:string,
  metadata?:Dict

}

export type AccountRequestGetParams = {
  limit:number,
  offset: number
}

export type AccountRequestPostParams = Omit<AccountRequest, 'id' | 'created_at' | 'updated_at' | 'status' | 'token'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
  token?: string;
};

export type AccountRequestPatchParams = {

  
  email?:string,
  first_name?:string,
  last_name?:string,
  company_name?:string,
  vat_id?:string,
  phone?:string,
  street_address?:string,
  postal_code?:string,
  country_code?:string,
  position?:string,
  status?:string,
  token?:string,
  city?:string,
  metadata?:Dict

}

export type CountryCode = {
  country_code:string,
  label:string,
  phoneCode:number,
  avatar:{
    src:string,
    alt:string
  }
}
