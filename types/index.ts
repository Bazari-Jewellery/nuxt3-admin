import type { Store, Address } from "@medusajs/medusa"

export interface IStore extends Store {
  address_id?: string | undefined,
  social_media_id?: string,
  privacy_policy?: string,
  tnc?: string,
  address: Address,
  social_media?: SocialMedia
}

export type SocialMedia = {
  facebook?: string | undefined,
  etsy?: string | undefined,
  linkedin?: string | undefined,
  pinterest?: string | undefined,
  shopify?: string | undefined,
  whatsapp?: string | undefined,
  instagram?: string | undefined,

}


export type Dict = { [key: string]: any };

export type listWithCount = {
  limit: number,
  offset: number,
  count: number
}

export type deletedData = { deleted: true, id: string }

export type faqSectionPostParams = {
  name: string,
  description?: string,
  metadata?: Dict
}
export type IFAQSECTION = {
  created_at: string,
  updated_at: string,
  id: string,
  name: string,
  description: string,
  metadata: Dict
}

export type IFAQ = {
  question: string,
  answer: string,
  created_at: string,
  updated_at: string,
  id: string,
  metadata: Dict
}

export type AccountRequest = {
  id: string,
  created_at: string,
  updated_at: string,
  email: string,
  first_name: string,
  last_name: string,
  company_name: string,
  vat_id: string,
  phone: string,
  street_address: string,
  postal_code: string,
  country_code: string,
  position: string,
  status: string,
  token?: string,
  city: string,
  metadata?: Dict

}

export type AccountRequestGetParams = {
  limit: number,
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


  email?: string,
  first_name?: string,
  last_name?: string,
  company_name?: string,
  vat_id?: string,
  phone?: string,
  street_address?: string,
  postal_code?: string,
  country_code?: string,
  position?: string,
  status?: string,
  token?: string,
  city?: string,
  metadata?: Dict

}

export type CountryCode = {
  country_code: string,
  label: string,
  phoneCode: number,
  avatar: {
    src: string,
    alt: string
  }
}

export type IUser = {
  first_name?: string
  last_name?: string
  role?: string
  api_token?: string
  metadata?: any
}

export type IcontentListBetweenOption = {
  title: string,
  content: Array<{
    label: string,
    value: string | number | null | undefined
  }>
}

export type ProductShippingAttributes = {
  height: number | undefined,
  width: number | undefined,
  length: number | undefined,
  weight: number | undefined,
  md_code: string | undefined,
  hs_code: string | undefined,
  origin_country: string | undefined,

}
