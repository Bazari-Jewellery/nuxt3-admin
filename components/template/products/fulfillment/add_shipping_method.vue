<script setup lang=ts>
import type { Order, ShippingOption } from "@medusajs/medusa"
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

const shippingMethods = asyncComputed(async () => {
  const cybandy = useCybandyClient()
  const options_: ShippingOption[] = []
  const _default = { name: 'Select', id: '' } as ShippingOption
  options_.push(_default)
  const { data } = await useAsyncData('shipping_methods', async () => {
    return await cybandy.admin.shippingOptions.list({
      region_id: order.value.region_id
    })
  }, { pick: ['shipping_options'] })
  if (data.value) {
    options_.push(...data.value.shipping_options)
  }
  return options_

})
const ship_option = ref({ name: 'Select', id: '' } as ShippingOption)

if (shippingMethods.value) {
  ship_option.value = shippingMethods.value[0]
}

function reset() { modal.value = false }
const price = ref()

async function update() {
  const cybandy = useCybandyClient()
  if (ship_option.value.id == '') {
    toastNotification('select shipping method').error()
    return
  }
  const { data, error } = await useAsyncData(async () => await cybandy.admin.orders.addShippingMethod(order.value.id, {
    option_id: ship_option.value.id,
    price: price.value ? price.value : Number(ship_option.value.amount) || 0
  }), { pick: ['order'] })

  if (data.value) {
    useNuxtApp().$order.singleOrder.value = data.value.order
    modal.value = false
  }

}

watch(modal, () => {
  if (!modal.value) {
    price.value = null
  }
})
</script>

<template>
  <UModal v-model="modal">
    <UCard>
      <template #header>
        <div class="flex items-center">
          <h3 class="flex-grow text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-50">Add Shipping Method
          </h3>
          <UButton @click="reset" size="sm" color="gray" variant="ghost" icon="i-heroicons-x-mark" />
        </div>
      </template>

      <div v-if="shippingMethods" class="space-y-5">
        <UFormGroup label="Shipping methods">
          <USelectMenu v-model="ship_option" :options="shippingMethods" option-attribute="name"
            placeholder="Select shipping method...">
            <!-- <template #label>
              {{ ship_option.name }}
            </template> -->
          </USelectMenu>
        </UFormGroup>

        <UFormGroup label="Price"
          help="Enter a new price only if necessary. Otherwise the configured price will for the selected method will apply">
          <UInput v-model="price" type="number" />
        </UFormGroup>
      </div>

      <template #footer>
        <div class="flex justify-end items-center">
          <!-- <div class="flex items-center gap-5">
            <UCheckbox v-model="send_notification" label="Send notification"/>
            
          </div> -->
          <div class="flex items-center gap-5">
            <UButton @click="reset" variant="outline" label="Cancel" />
            <UButton @click="update" variant="solid" label="Add" />
          </div>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
