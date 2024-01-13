<script setup lang=ts>
import type { Order } from "@medusajs/medusa"
import type { PropType } from "vue";
import type { Dict } from "~/types";

const props = defineProps({
  modelValue: Boolean,
  fulfillment_id:{
    type:String,
    required:true
  },
  order: {
    type: Object as PropType<Order>,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const order = ref(props.order)

const send_notification = ref(false)

const tracking_numbers = ref([''] as string[])

function add_tracking_number(){
  tracking_numbers.value.push('')
}

function remove_tracking_number(ind:number){
  tracking_numbers.value.splice(ind,1)
}

function reset(){
  tracking_numbers.value = ['']
  modal.value = false
}

async function ship_fulfillment(){
  const cybandy = useCybandyClient()
  const {data, error} = useAsyncData(`order: ${props.fulfillment_id}-ship`,async()=>{
    return await cybandy.admin.orders.createShipment(order.value.id,{
      fulfillment_id: props.fulfillment_id,
      tracking_numbers: tracking_numbers.value,
      no_notification: !send_notification.value
    })
  },{pick:['order']})
  if(!error.value && data.value){
    useNuxtApp().$order.singleOrder.value = data.value.order
    toastNotification('Items are shipped').default_toast()
  }
}
</script>

<template>
  <UModal v-model="modal" >
    <UCard :ui="{header:{base:''}}">
      <template #header>
        <div class="flex items-center">
          <h3 class="flex-grow text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-50">Mark Fulfillment Shipped</h3>
          <UButton @click="reset" size="sm" color="gray" variant="ghost" icon="i-heroicons-x-mark"/>
        </div>
      </template>


      <div class="flex flex-col gap-4">
        <p class="text-gray-700 dark:text-gray-200">Tracking</p>
        <div class="flex flex-col gap-4">
          <!-- <span class="text-xs">Tracking Number</span> -->
          <div v-for="(number,ind) of tracking_numbers" class="flex flex-col gap-1">
            <div class="flex items-center justify-between">
              <span >Tracking number</span>
              <UIcon @click="()=>remove_tracking_number(ind)" v-if="tracking_numbers.length>1" name="i-heroicons-trash" class="w-4 h-4 cursor-pointer"/>
            </div>
            <UInput v-model="tracking_numbers[ind]" placeholder="Tracking number..." />
          </div>
        </div>

        <UButton type="button" @click="add_tracking_number" class="self-end" icon="i-heroicons-plus" variant="outline" color="black" label="Add Additional Tracking Number" />
      </div>


      <template #footer>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-5">
            <UCheckbox v-model="send_notification" label="Send notification"/>
            
          </div>
          <div class="flex items-center gap-5">
            <UButton @click="reset" variant="outline" label="Cancel"/>
            <UButton @click="ship_fulfillment" variant="solid" label="Complete" />
          </div>
        </div>
      </template>

    </UCard>
  </UModal>
</template>
