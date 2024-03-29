<script setup lang=ts>
import type { FindParams, Note, OrderEdit, Order } from "@medusajs/medusa/dist"
import type { Dict } from '~/types';

definePageMeta({
  scrollToTop: true
})

const emits = defineEmits(['update:modelValue', 'update:openClose'])
const order = useNuxtApp().$order.singleOrder
// const order = computed({
//   set: (val) => order_val.value = val,
//   get: () => order_val.value
// })

// modal
const modal = ref({
  trigger: false,
  fullscreen: false
})



const payload = ref({
  expand: 'customer,billing_address,shipping_address,discounts,discounts.rule,shipping_methods,shipping_methods.shipping_option,payments,items,fulfillments,fulfillments.tracking_links,returns,returns.shipping_method,returns.shipping_method.shipping_option,returns.shipping_method.tax_lines,refunds,claims.claim_items.item,claims.fulfillments,claims.return_order,claims.additional_items.variant.product.profiles,swaps.return_order,swaps.additional_items.variant.product.profiles,swaps.fulfillments,returnable_items,edits'
} as FindParams)

const id = useRoute().params.id
const final_id = order.value?.id ? order.value.id : id as string

watch(order, () => {
  useHead({
    title: `Order #${order.value.display_id}`
  })
})

const notes = ref({
  notes: [] as Note[],
  offset: 0,
  limit: 50
})

const order_edits = ref({
  order_edits: [] as OrderEdit[],
  offset: 0,
  limit: 50
})

async function fetchOrder() {
  await useAsyncData('fetch_order', async () => {
    const { order: _order } = await useCybandyClient().admin.orders.retrieve(final_id, { ...payload.value })
    if (_order) {
      order.value = _order
      useNuxtApp().$order.singleOrder.value = _order
    }
  })

  await useLazyAsyncData(`notes_${final_id}`, async () => {
    const { notes: _notes } = await useCybandyClient().admin.notes.list({
      resource_id: final_id, limit: notes.value.limit, offset: notes.value.offset,
    })

    if (_notes) {
      notes.value.notes = _notes
    }
  })

  await useLazyAsyncData(`order_edits_${final_id}`, async () => {
    const { order_edits: _edits } = await useCybandyClient().admin.orderEdits.list({
      order_id: final_id, limit: order_edits.value.limit, offset: order_edits.value.offset
    })
    if (_edits) {
      order_edits.value.order_edits = _edits
    }
  })
}

//order information
const first_name = computed(() => order.value.customer?.first_name || order.value.shipping_address?.first_name)
const last_name = computed(() => order.value.customer?.last_name || order.value.shipping_address?.last_name)

onBeforeMount(async () => {
  await fetchOrder()
})

const fulfillment_col = useNuxtApp().$order.styles.fulfillment_col

const payment_col = useNuxtApp().$order.styles.payment_col

async function capture_payment() {
  useAsyncData('capture_payment', async () => {
    const { order: _order } = await useCybandyClient().admin.orders.capturePayment(final_id)
    if (_order) {
      order.value = _order
    }
  })
}


// write notes
const q_notes = ref('')

async function createNote() {
  await useLazyAsyncData('create-note', async () => {
    let { note: _note } = await useCybandyClient().admin.notes.create({
      resource_id: final_id,
      resource_type: 'order',
      value: q_notes.value,

    })
    if (_note) {
      _note.author = useNuxtApp().$currentUser.data.value as any
      notes.value.notes.push(_note)
    }
  })

}

//  show notes on frontend
const disp_notes = computed(() => {
  const results = [] as Dict[]
  for (let index = notes.value.notes?.length; index > 0; index--) {
    const element = notes.value.notes[index - 1];
    results.push({
      author: `${element.author.first_name} ${element.author.last_name}`,
      time: element.created_at,
      content: element.value
    })
  }
  return results
})

function filter_items(item_id: string) {
  const _item = order.value.items.filter((x) => x.id == item_id)
  return _item[0]
}

const order_edit_changes = {
  'item_add': 'Added Item',
  'item_remove': 'Removed Item',
  'item_update': 'Updated Item'
}

// order fulfillment -> create
const create_fulfillment = ref(false)

//order fulfillment -> mark shipped
const current_fulfillment = ref('')
const mark_fulfillment_shipped = ref(false)

// order fulfillment -> cancel
const cancel_fulfillment = ref(false)
async function cancel_fulfillment_func(fulfillment_id = current_fulfillment.value) {
  const cybandy = useCybandyClient()
  const { data, error, pending } = await useAsyncData(`cancel_fulfillment - ${fulfillment_id}`, async () => await cybandy.admin.orders.cancelFulfillment(order.value.id, fulfillment_id), { pick: ['order'] })


  if (data.value) {
    order.value = data.value.order
  }
}

// check if create fulfillment should show
const isAllFulfilled = computed(() => {
  const items_len = order.value.items.reduce((accumulator, x) => {
    return accumulator + x.quantity
  }, 0)
  const fulfilled_items = order.value.fulfillments.reduce((init, y) => {
    return init + y.items.reduce((nu, x) => {
      return nu + x.quantity
    }, 0)
  }, 0)

  return items_len === fulfilled_items
})


const fulfillment_menu = (row: any) => [
  [{
    label: 'Mark Shipped',
    icon: 'i-ph-package',
    click: () => {
      current_fulfillment.value = row.id as string
      mark_fulfillment_shipped.value = true
    }
  }],
  [{
    label: 'Cancel Fulfillment',
    icon: 'i-heroicons-no-symbol',
    click: () => {
      current_fulfillment.value = row.id as string
      cancel_fulfillment.value = true
    }
  }],
]

const changeCustomer = ref(false)
const customer_menu = (row: any) => [
  [{
    label: 'Go to customer',
    icon: 'i-ph-user',
    click: () => {
      navigateTo(`/customers/${row.id as string}`)
    }
  }],
  [{
    label: 'Transfer ownership',
    icon: 'i-heroicons-arrow-path-rounded-square',
    click: () => {
      changeCustomer.value = true

    }
  }],
  [{
    label: 'Edit Shipping Address',
    icon: 'i-carbon-delivery',
    click: () => {
      // console.log(row);

    }
  }],
  [{
    label: 'Edit Billing Address',
    icon: 'i-heroicons-credit-card',
    click: () => {
      // console.log(row);

    }
  }],
  [{
    label: 'Edit Email Address',
    icon: 'i-ph-at',
    click: () => {
      // console.log(row);

    }
  }],
]



const addShippingMethod = ref(false)

</script>

<template>
  <div>

    <div v-if="order" class="space-y-6 sm:space-y-8">


      <div class="relative">
        <UButton to="/orders" label="Back to orders" icon="i-heroicons-arrow-uturn-left" variant="link"
          class=" right-0" />

      </div>


      <div class="grid grid-cols-10 gap-5">
        <div class="col-span-6 space-y-8">
          <!-- pre data -->
          <UCard class="" :ui="{
      body: {
        base: 'space-y-8 text-gray-700 dark:text-gray-200'
      }
    }">
            <div class="text-base">
              <span>Order #</span>
              <span class="font-medium">{{ order.display_id }}</span>
            </div>
            <span class="text-gray-500 dark:text-gray-400">{{ dateFormatter(order.created_at) }}</span>
            <div class="flex gap-5 my-4">
              <div class="flex flex-col gap-2">
                <span>Email</span>
                <span class="text-gray-500 dark:text-gray-400">{{ order.email }}</span>
              </div>
              <div>
                <div class="flex flex-col h-full my-1 border-s border-solid border-gray-200 dark:border-gray-700 ">
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span>Phone</span>
                <span class="text-gray-500 dark:text-gray-400">
                  {{ order.shipping_address?.phone ? order.shipping_address?.phone : 'N/A' }}
                </span>
              </div>
              <div>
                <div class="flex flex-col h-full my-1 border-s border-solid border-gray-200 dark:border-gray-700 ">
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span>Payment</span>
                <span class="text-gray-500 dark:text-gray-400">{{ order.payments?.[0]?.provider_id }}</span>
              </div>
              <div class="flex flex-col items-end gap-2">
                <span>&nbsp;</span>
                <UAvatar :src="`https://flagcdn.com/${order.shipping_address?.country_code}.svg` || ''"
                  :alt="(order.shipping_address?.country_code || '')" size="3xs" :ui="{ rounded: 'rounded-none' }" />
              </div>

            </div>
          </UCard>

          <!-- summary -->
          <UCard class="" :ui="{
      body: {
        base: 'space-y-8 text-gray-700 dark:text-gray-200'
      }
    }">
            <div class="flex justify-between">
              <h5 class="title">Summary</h5>
              <div class="flex items-center gap-5">
                <UButton label="Edit Order" variant="solid" color="gray" size="xs" />
              </div>

            </div>
            <div class="space-y-5">

              <div v-for="item of order.items" class="w-full flex justify-between">
                <div class="flex gap-2">
                  <NuxtImg width="48" height="48" :src="(item.thumbnail as string)" format="webp" fit="cover" />
                  <div class="flex flex-col gap-1">
                    <span>
                      <span>{{ item.title }}</span>
                      <!-- <span>{{ item }}</span> -->
                    </span>
                    <span>
                      {{ item.description }}
                    </span>
                  </div>
                </div>

                <div class="flex gap-6">
                  <div class="flex gap-3">
                    <span>{{ priceFormatter(item.unit_price, order.currency_code) }}</span>
                    <span>x {{ item.quantity }}</span>
                  </div>
                  <div class="flex gap-3">
                    <span>
                      {{ priceFormatter(item.original_total, order.currency_code) }}
                    </span>
                    <span class="uppercase">
                      {{ order.currency_code }}
                    </span>
                  </div>
                </div>

              </div>

              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span class="flex gap-3">
                    <span>{{ priceFormatter(order.subtotal, order.currency_code) }}</span>
                    <span class="uppercase">{{ order.currency_code }}</span>
                  </span>
                </div>

                <div class="flex justify-between items-center">
                  <span>Shipping</span>
                  <span class="flex gap-3">
                    <span>{{ priceFormatter(order.shipping_total, order.currency_code) }}</span>
                    <span class="uppercase">{{ order.currency_code }}</span>
                  </span>
                </div>

                <div class="flex justify-between items-center">
                  <span>Tax</span>
                  <span class="flex gap-3">
                    <span>{{ priceFormatter(order.tax_total, order.currency_code) }}</span>
                    <span class="uppercase">{{ order.currency_code }}</span>
                  </span>
                </div>

                <div class="flex justify-between items-center">
                  <span>Discount</span>
                  <span class="flex gap-3">
                    <span>{{ priceFormatter(order.discount_total, order.currency_code) }}</span>
                    <span class="uppercase">{{ order.currency_code }}</span>
                  </span>
                </div>

                <div class="flex justify-between items-center font-semibold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span class="flex gap-3">
                    <span class="text-lg md:text-xl xl:text-2xl font-semibold">{{ priceFormatter(order.total,
      order.currency_code) }}</span>
                    <!-- <span class="uppercase">{{ order.currency_code }}</span> -->
                  </span>
                </div>
              </div>


            </div>
          </UCard>


          <!-- payment section -->
          <UCard v-if="order.payments" class="" :ui="{
      body: {
        base: 'space-y-8 text-gray-700 dark:text-gray-200'
      }
    }">
            <div class="flex justify-between">
              <h5 class="title">Payment</h5>
              <div class="flex items-center gap-5">
                <UBadge variant="subtle"
                  :color="payment_col[order.payment_status]?.color ? payment_col[order.payment_status]?.color : 'gray'">
                  <span class="truncate capitalize">{{ order.payment_status == 'captured' ? 'Paid' :
      order.payment_status
                    }}</span>
                </UBadge>
                <UButton v-if="order.payment_status == 'awaiting'" label="Capture Payment" variant="outline"
                  @click="capture_payment" size="xs" />
              </div>

            </div>

            <div v-for="pay of order.payments" class="space-y-5">
              <div class="flex justify-between">
                <span>Payment ID:</span>
                <span>{{ pay.id }}</span>
              </div>
              <div class="flex justify-between">
                <span>Date:</span>
                <span>{{ dateFormatter(pay.created_at) }}</span>
              </div>
              <div class="flex justify-between text-gray-900 dark:text-white">
                <span>Total Paid:</span>
                <span class="flex gap-3">
                  <span>{{ priceFormatter(pay.amount, order.currency_code) }}</span>
                  <span class="uppercase">{{ pay.currency_code }}</span>
                </span>
              </div>
            </div>
          </UCard>

          <!-- fulfillment section -->
          <UCard v-if="order.fulfillments" class="" :ui="{
      body: {
        base: 'space-y-8 text-gray-700 dark:text-gray-200'
      }
    }">
            <div class="flex justify-between">
              <h5 class="title">Fulfillment</h5>
              <div class="flex items-center gap-5">
                <UBadge variant="subtle"
                  :color="fulfillment_col[order.fulfillment_status]?.color ? fulfillment_col[order.fulfillment_status]?.color : 'gray'">

                  <span v-if="order.fulfillment_status !== 'not_fulfilled'" class="truncate capitalize">
                    {{ order.fulfillment_status?.split('_').join(' ') }}
                  </span>
                  <span v-else>
                    Awaiting fulfillment
                  </span>
                </UBadge>
                <UButton v-if="!isAllFulfilled" label="Create Fulfillment" variant="solid"
                  @click="() => create_fulfillment = true" size="xs" color="gray" />
              </div>
              <TemplateProductsFulfillmentCreate :order="(order as any)" v-model="create_fulfillment" />
            </div>

            <div v-if="order.shipping_methods?.length > 0">
              <span class="highlight">Shipping Method</span>
              <div v-for="ship of order.shipping_methods" class="space-y-2">
                <span>{{ ship.shipping_option.name }}</span>
              </div>
            </div>

            <div v-else>
              <UButton @click="addShippingMethod = true" color="gray" variant="ghost" label="Add shipping method" />
              <TemplateProductsFulfillmentAddShippingMethod :order="(order as any)" v-model="addShippingMethod" />
            </div>

            <div v-for="(fulfillment, ind) of order.fulfillments" class="space-y-5">
              <div class="flex justify-between">
                <div>
                  <p v-if="!fulfillment.canceled_at">Fulfillment #{{ ind + 1 }} by <span class="capitalize">{{
      fulfillment.provider_id }}</span></p>
                  <p v-if="fulfillment.canceled_at">Fulfillment canceled</p>

                  <p v-if="fulfillment.shipped_at">
                    Tracking <span class="text-primary">
                      {{ fulfillment.tracking_links?.map((x) => x.tracking_number).join(' ') }}
                    </span>
                  </p>
                  <p v-else>Not shipped</p>
                </div>
                <UDropdown v-if="!fulfillment.shipped_at && !fulfillment.canceled_at"
                  :items="fulfillment_menu(fulfillment)">
                  <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
              </div>
            </div>
          </UCard>

          <!-- customer info -->
          <UCard :ui="{
      body: {
        base: 'space-y-8 text-gray-700 dark:text-gray-200'
      }
    }">
            <div class="flex justify-between">
              <h5 class="title">Customer</h5>
              <div class="flex items-center gap-5">
                <UDropdown :items="customer_menu(order.customer)">
                  <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
              </div>

            </div>
            <div class="flex gap-5 items-center">
              <UAvatar :alt="`${first_name} ${last_name}`" :src="(order.customer?.metadata.avatar_src as string || '')"
                size="lg" />
              <div class="flex flex-col gap-4">
                <span class="text-gray-900 dark:text-white font-semibold">{{ first_name }} {{ last_name }}</span>
                <span class="text-gray-700 dark:text-gray-400">{{ order.shipping_address?.city }}, <span
                    class="uppercase">{{
      order.shipping_address?.country?.display_name }}</span></span>
              </div>
            </div>

            <div class="flex w-full gap-5 my-4">
              <div class="flex flex-col gap-2">
                <span>Contact</span>
                <span class="text-gray-500 dark:text-gray-400">{{ order?.email }}</span>
              </div>
              <div>
                <div class="flex flex-col h-full my-1 border-s border-solid border-gray-200 dark:border-gray-700 ">
                </div>
              </div>
              <div v-if="order.shipping_address" class="flex flex-col gap-2">
                <span>Shipping</span>
                <span class="flex gap-2">
                  <span class="text-gray-500 dark:text-gray-400 capitalize">
                    {{ Object.entries(order.shipping_address).filter(([x, y]) => y && ['address_1', 'address_2',
      'company',
      'city', 'country_code', 'postal_code'].includes(x))?.map(([x, y]) => y).join(', ') }}
                  </span>
                  <UAvatar :src="`https://flagcdn.com/${order.shipping_address?.country_code}.svg` || ''"
                    :alt="(order.shipping_address?.country_code || '')" size="3xs" :ui="{ rounded: 'rounded-none' }" />
                </span>
              </div>
              <div>
                <div class="flex flex-col h-full my-1 border-s border-solid border-gray-200 dark:border-gray-700 ">
                </div>
              </div>
              <div v-if="order.billing_address" class="flex flex-col gap-2">
                <span>Billing</span>
                <span class="flex gap-2">
                  <span class="text-gray-500 dark:text-gray-400 capitalize">
                    {{ Object.entries(order.billing_address).filter(([x, y]) => y && ['address_1', 'address_2',
      'company',
      'city', 'country_code', 'postal_code'].includes(x))?.map(([x, y]) => y).join(', ') }}
                  </span>
                  <UAvatar :src="`https://flagcdn.com/${order.shipping_address?.country_code}.svg` || ''"
                    :alt="(order.billing_address.country_code || '')" size="3xs" :ui="{ rounded: 'rounded-none' }" />
                </span>
              </div>

            </div>
          </UCard>
        </div>

        <div class="col-span-4 h-full space-y-8">

          <!-- notes -->
          <UCard :ui="{
      body: {
        base: 'space-y-8 text-gray-700 dark:text-gray-200'
      }
    }">
            <div class="space-y-2">
              <h5 class="title">Notes</h5>
              <p class="text-xs text-gray">Write anything you want to remember or other should take note of when
                handling
                this order</p>
            </div>
            <!-- write a notes -->
            <div>
              <UInput v-model="q_notes" placeholder="Write a note" :ui="{ icon: { trailing: { pointer: '' } } }">

                <template #trailing>
                  <UIcon name="i-carbon-send-alt" class="w-4 h-4 cursor-pointer hover:text-primary"
                    @click="createNote" />
                </template>
              </UInput>
            </div>

            <div class="space-y-4">
              <div v-for="note in disp_notes" class="space-y-3">
                <div class="relative flex justify-between">
                  <span class="flex gap-2 w-full">
                    <UAvatar :alt="note.author" size="2xs" />
                    <div class="flex flex-col gap-1 w-full">
                      <span class="text-xs">{{ note.author }}</span>

                      <span class="w-full pl-2 py-1.5 bg-gray-200/80 dark:bg-gray-950/50 text-xs">
                        {{ note.content }}
                      </span>
                      <span class="text-xs leading-none text-end">{{ dateFormatter(note.time) }}</span>
                    </div>

                  </span>

                  <UPopover class="absolute right-0">
                    <UIcon name="i-heroicons-ellipsis-horizontal-20-solid"
                      class="w-4 h-4 cursor-pointer hover:text-primary" />

                    <template #panel>
                      <div class="p-4 flex items-center gap-5">
                        <UButton label="Delete" color="red" icon="i-heroicons-trash" />
                      </div>
                    </template>
                  </UPopover>
                </div>

                <!-- <p class="w-full">
                  {{ note.content }}
                </p> -->
              </div>
            </div>
          </UCard>

          <!-- order edits -->
          <UCard :ui="{
      body: {
        base: 'space-y-10 text-gray-700 dark:text-gray-200'
      }
    }">
            <div class="space-y-2">
              <h5 class="title">Order History</h5>
            </div>

            <div class="space-y-8">
              <!-- -->
              <div>
                <div v-if="order.fulfillment_status == 'shipped'" class="w-full flex gap-4">
                  <UIcon name="i-carbon-delivery" class="w-5 h-5" />
                  <span>Items Shipped</span>
                </div>
              </div>
              <!-- -->
              <div>
                <div v-if="order_edits.order_edits.length > 0" class="w-full flex gap-4">
                  <UIcon name="i-carbon-delivery" class="w-5 h-5" />
                  <span>Items Shipped</span>
                </div>
              </div>
              <!-- -->
              <div class="space-y-2">
                <div class="w-full flex gap-4">
                  <UIcon name="i-ph-package" class="w-5 h-5" />
                  <span>Items Fulfilled</span>
                </div>
                <div v-if="order.fulfillments" v-for="ff of order.fulfillments"
                  class="text-gray-500 dark:text-gray-400 text-xs space-y-2 pl-4 py-2">
                  <span class="py-2">{{ dateFormatter(ff.created_at) }}</span>
                  <div v-for="it_ff of ff.items" class="flex justify-between">
                    <div class="flex gap-4">
                      <NuxtImg width="36" height="48" :src="(filter_items(it_ff.item_id)?.thumbnail as string)"
                        format="webp" />
                      <div class="flex flex-col gap-1">
                        <span class="text-gray-700 dark:text-gray-200">
                          {{ filter_items(it_ff.item_id).title }}
                        </span>
                        <span>
                          {{ filter_items(it_ff.item_id).variant.title }}
                        </span>
                      </div>
                    </div>
                    <span>x{{ it_ff.quantity }}</span>
                  </div>
                </div>
              </div>
              <!-- -->
              <div>
                <div class="w-full flex gap-4">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5" />
                  <span>Order Placed</span>
                </div>
                <div class="pl-4 py-2.5 text-gray-500 dark:text-gray-400 text-xs">
                  <p>{{ dateFormatter(order.created_at) }} {{ priceFormatter(order.total) }}</p>
                </div>
              </div>
              <!-- -->
            </div>
          </UCard>
        </div>
      </div>
    </div>

    <div v-else>
      loading
    </div>
    <TemplateProductsFulfillmentMarkShipped v-model="mark_fulfillment_shipped" :order="(order as Order)"
      :fulfillment_id="current_fulfillment" />
    <DialogueCancelConfirm v-model="cancel_fulfillment" what="fulfillment" @confirm="cancel_fulfillment_func" />
    <TemplateOrdersChangeCustomer :order="(order as Order)" v-model="changeCustomer" />
  </div>
</template>
