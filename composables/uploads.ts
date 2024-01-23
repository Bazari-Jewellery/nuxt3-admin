// import type {AdminCreateUploadPayload} from "@medusajs/medusa/dist/services/"
export async function useUploadImage(file:File|File[]){
  return await useCybandyClient().admin.uploads.create(file)
}

export async function useDeleteImage(file_key:string){
  return await useCybandyClient().admin.uploads.delete({file_key:file_key})
}
