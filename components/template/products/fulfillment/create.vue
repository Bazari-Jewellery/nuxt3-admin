<script setup lang=ts>
import type { Order } from "@medusajs/medusa"
import type { PropType } from "vue";
import type { Dict } from "~/types";

const props = defineProps({
  modelValue: Boolean,
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

function filter_items(item_id: string) {
  const _item = order.value.items.filter((x) => x.id == item_id)
  return _item[0]
}

// const quantity_input_boxes = computed(()=> order.value.items.map((item)=>{
//  const fulfilled_quantity = order.value.fulfillments.reduce( function(accumulator:number, cur_val){
//   return  cur_val.items.reduce((acc:number, it_cu_val)=>{
//     return item.id==it_cu_val.item_id ? acc + it_cu_val.quantity: 0
//   })
//  })
// }))

type InputBoxes = {
  [key: string]: {
    quantity: number,
    fulfilled: number,
    id: string,
    to_fulfil: number
  }
}

const res_inp_boxes = ref({} as InputBoxes)
const quantity_input_boxes = computed({
  set: (val) => res_inp_boxes.value = val,
  get: () => res_inp_boxes.value
})

function reset() {
  order.value?.items?.map((item) => {
    res_inp_boxes.value[item.id] = {
      quantity: item.quantity,
      fulfilled: 0,
      id: item.id,
      to_fulfil: item.quantity
    }
  })

  order.value.fulfillments.map((x) => {
    x.items.map((_it) => {
      res_inp_boxes.value[_it.item_id].fulfilled += _it.quantity
      res_inp_boxes.value[_it.item_id].to_fulfil -= _it.quantity

    })
  })
}

onMounted(() => {
  reset()

})


function plus(item_id: string) {
  const _val = quantity_input_boxes.value[item_id]
  const nu_val = _val.to_fulfil + 1
  if (nu_val + _val.fulfilled > _val.quantity) {
    return
  } else {
    quantity_input_boxes.value[item_id].to_fulfil = nu_val
  }
}
function minus(item_id: string) {
  const _val = quantity_input_boxes.value[item_id]
  const nu_val = _val.to_fulfil - 1
  if (nu_val < 0) {
    return
  } else {
    quantity_input_boxes.value[item_id].to_fulfil = nu_val
  }
}

function disable_button(item_id: string, future_val: number) {
  const _val = quantity_input_boxes.value[item_id]
  if (_val.to_fulfil + future_val < 0 || _val.to_fulfil >= _val.quantity - _val.fulfilled + future_val) {
    return true
  } else false
}

function cancel() {
  reset()
  modal.value = false
}
const send_notification = ref(false)

async function send_fulfillment() {
  const _items = Object.values(quantity_input_boxes.value).map((x) => {
    return {
      quantity: x.to_fulfil,
      item_id: x.id
    }
  })
  const { data, error } = await useAsyncData(`order: ${order.value.id}-fulfillment`, async () => {
    return await useCybandyClient().admin.orders.createFulfillment(order.value.id, {
      items: _items,
      no_notification: !send_notification.value
    })

  }, { pick: ['order'] })
  if (!error.value && data.value) {
    useNuxtApp().$order.singleOrder.value = data.value.order
    toastNotification('', 'Items fulfilled').default_toast()
    modal.value = false
  }
}
</script>

<template>
  <UModal v-model="modal" :fullscreen="true" :ui="{ base: 'items-center' }">
    <div>



      <div class="min-w-full  sm:min-w-[550px] xl:min-w-[768px]">
        <UCard :ui="{ divide: '' }">
          <template #header>
            <div class="w-full flex items-center justify-between">
              <UIcon @click="cancel" name="i-heroicons-x-mark-20-solid" class="w-5 h-5 cursor-pointer p-5 ring" />

              <div class="flex items-center gap-5">
                <UButton @click="cancel" label="Cancel" color="black" variant="outline" />
                <UButton @click="send_fulfillment" label="Create fulfillment" variant="solid" />
              </div>
            </div>
          </template>


          <div class="space-y-2">
            <div class="w-full flex gap-4">
              <UIcon name="i-ph-package" class="w-5 h-5 text-black dark:text-white" />
              <div>
              <h3 class="text-base text-black dark:text-white">Items to be fulfilled</h3>                
              <p class="py-2">Select the number of items that you wish to fulfill</p>
              </div>
              
            </div>
            <div v-if="order.fulfillments" v-for="it_ff of order.items">
              <div v-if="quantity_input_boxes[it_ff.id].to_fulfil > 0" class="text-gray-500 dark:text-gray-400 text-xs space-y-2 pl-4 py-2">
                <div class="flex justify-between">
                  <div class="flex gap-4">
                    <NuxtImg width="36" height="48" :src="(it_ff?.thumbnail as string)"
                      format="webp" />
                    <div class="flex flex-col gap-1">
                      <span class="text-gray-700 dark:text-gray-200">
                        {{ it_ff.title }}
                      </span>
                      <span>
                        {{ it_ff?.variant?.title }}
                      </span>
                    </div>
                  </div>
                  <UInput :min="0" :max="quantity_input_boxes[it_ff.id].to_fulfil"
                    v-model="quantity_input_boxes[it_ff.id].to_fulfil" :ui="{ icon: { trailing: { pointer: '' } } }">

                    <template #trailing>
                      <span class="flex items-center gap-1">
                        <span>/{{ quantity_input_boxes[it_ff.id].quantity }}</span>
                        <span class="flex items-center gap-2">
                          <UIcon @click="() => minus(it_ff.id)" name="i-heroicons-minus"
                            class="w-4 h-4 cursor-pointer" />
                          <UIcon @click="() => plus(it_ff.id)" name="i-heroicons-plus"
                            class="w-4 h-4 cursor-pointer" />
                        </span>
                      </span>
                    </template>
                  </UInput>
                </div>
              </div>

            </div>
          </div>

          <template #footer>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-base text-black dark:text-white">Send notification</p>
                <p>When toggled, notification email will be sent to customer</p>
              </div>
              <UToggle v-model="send_notification" />
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </UModal>
</template>
