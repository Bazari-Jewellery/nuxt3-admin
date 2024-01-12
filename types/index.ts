
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
