<script setup lang=ts>
import type { ProductVariant } from "@medusajs/medusa"
import type { PropType } from "vue";
import { useRegionsList } from "~/composables/regions";
import type { Dict } from "~/types";

const props = defineProps({
  modelValue: Boolean,
  variants: {
    type: Array<ProductVariant>,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const variants = computed(() => props.variants)

function close() {
  modal.value = false
}
const confirm_close = ref(false)

defineShortcuts({
  escape: {
    usingInput: true,
    handler: () => {
      confirm_close.value = true
    }
  }
})

const columns = [
  {
    key: 'product',
    label: 'Product',
    currency_code: '',
    region_id: undefined as undefined | string
  },
]
const currencies = [
  {
    key: 'eur',
    label: 'Prices (EUR)',
    currency_code: 'eur',
    region_id: undefined as undefined | string
  },
  {
    key: 'usd',
    label: 'Prices (USD)',
    currency_code: 'usd',
    region_id: undefined as undefined | string
  },
  {
    key: 'cad',
    label:'Prices (CAD)',
    currency_code: 'usd',
    region_id: undefined as undefined | string
  },
]
const selected_currencies = ref([currencies[0]])

type IRegion = {
  label: string,
  key: string,
  currency_code: string,
  region_id: undefined | string
  data: Dict
}
const regionList = ref([] as IRegion[])

asyncComputed(async () => {
  const { data } = await useRegionsList()
  if (data.value) {

    regionList.value = data.value.regions.map((x) => {
      return {
        key: x.id,
        label: x.name,
        currency_code: x.currency_code,
        region_id: x.id,
        data: x
      }
    })
  }
})

watch(regionList, () => {
  console.log('regions', regionList.value)
})

const selected_regions = ref(regionList.value)


const columnsTable = computed(() => columns.concat(currencies.filter((col) => selected_currencies.value.includes(col)), regionList.value?.filter((reg) => selected_regions?.value?.includes(reg))))


interface tableType extends Dict {
  product: string,
  data: any,
  eur: number,
  usd?: number,
  cad?: number,
}

// const tableData = ref([] as tableType[])

// if (variants.value) {

//   tableData.value = variants.value.map((_variants) => {
//     let price = _variants.prices[0].amount
//     return { product: _variants.title, data: _variants, eur: price }
//   })
// }

const tableData = ref([] as tableType[])
const _tableData = computed(() => {
  const data = ref([] as tableType[])
  variants.value.map((_variants) => {
    const temp = {} as tableType
    temp['data'] = _variants
    temp['id'] = {} as Dict
    temp.product = _variants.title
    // price
    _variants.prices.map((_price) => {
      if (_price.region_id) {
        temp[_price.region_id] = priceFormatterNoSymbol(Number(_price.amount), _price.currency_code) || priceFormatterNoSymbol(Number(0), _price.currency_code)
        temp['id'][_price.region_id] = _price.id
        return
      }
      temp[_price.currency_code] = _price.amount ? priceFormatterNoSymbol(Number(_price.amount), _price.currency_code) : priceFormatterNoSymbol(Number(0), _price.currency_code)
      temp['id'][_price.currency_code] = _price.id
      // if(_price.currency_code=='eur'){
      //   temp.eur = _price.amount
      // }
    })

    // check for columns without data and put undefined there
    const col_keys = columnsTable.value.map((x) => x['key'])

    col_keys.map((x) => {
      if (!Object.keys(temp).includes(x)) {
        temp[x] = undefined
      }
    })

    data.value.push(temp)
    return temp
  })
  tableData.value = data.value
  return data.value
})



// watch(columnsTable, () => {
//   console.log('cols',columnsTable.value);



// })


function changeAllCol(col: string, amount: number) {

  _tableData.value.map((_row) => {
    _row[col] = amount
  })

}


async function update(variant_id: string, product_id: string, payload: object) {
  await useLazyAsyncData(async () => await useCybandyClient().admin.products.updateVariant(product_id, variant_id, payload), { pick: ['product'] })
}

const savePrices = ref(false)
async function updatePrices() {

  // console.log('update', _tableData.value);

  try {
    const final_data = ref([] as Dict[])
  for (let i = 0; i < tableData.value.length; i++) {
    const data = tableData.value[i];
    const row = [] as Dict[]



    for (let j = 0; j < columnsTable.value.length; j++) {
      const col = columnsTable.value[j];
      if (col.key != 'product') {
        const payload = {} as Dict
        payload.amount = data[col.key] * 100
        if (col.region_id) {
          payload.region_id = col.region_id
        }

        payload['id'] = data['id'][col.key]
        payload['currency_code'] = col.currency_code

        

        row.push(payload)

      }

    }
    await update(data.data.id, data.data.product_id, { prices: [...row] })
    final_data.value.push([...row])
  }
    useToastSuccess('','Prices updated')
  } catch (error:any) {
    useToastFailure('')
  }

  // console.log(final_data.value);


  // modal.value = false
}
</script>

<template>
  <UModal v-model="modal" :fullscreen="true" :ui="{ fullscreen: 'overflow-y-auto no-scrollbar' }">
    <UCard :ui="{ base: 'w-full', divide: '' }">
      <template #header>
        <div class="relative flex items-center justify-between">
          <UButton @click="() => confirm_close = true" variant="solid" color="gray" icon="i-heroicons-x-mark">
            <template #trailing>
              <UKbd>Esc</UKbd>
            </template>
          </UButton>
          <div class="flex items-center gap-5">
            <UButton @click="() => modal = false" variant="solid" color="gray" label="Discard" />
            <UButton @click="savePrices=true" variant="solid" color="primary" label="Save and close" />
          </div>
        </div>
      </template>

      <div class="flex items-center">
        <USelectMenu v-model="selected_currencies" :options="currencies" multiple :ui="{trigger:'w-fit', width:'w-fit'}">
          <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-view-columns" label="currencies" />
        </USelectMenu>
        <USelectMenu v-model="selected_regions" :options="regionList" multiple>
          <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-view-columns" label="Regions" />
        </USelectMenu>
      </div>

      <template #footer>
        <!-- <UTable class="w-full" :rows="_tableData" :columns="columnsTable">
     
        </UTable> -->
        <div class="w-full overflow-x-auto">
          <table class="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr class="divide-x divide-gray-200 dark:divide-gray-800">
                <th v-for="col in columnsTable"
                  class="text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
                  <span class="flex items-center gap-5">
                    <span>{{ col.label }}</span>
                    <UInput v-if="col.key != 'product'" type="number"
                      @update:model-value="(val) => changeAllCol(col.key, val)" size="xs" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr v-for="(row, ind) of _tableData"
                class="divide-x divide-gray-200 dark:divide-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td v-for="(col, j) of columnsTable" class="">
                  <span v-if="j == 0">{{ row[col.key] }}</span>
                  <!-- <input type="number" v-model="_tableData[ind]?.[col.key]"> -->
                  <!-- <UInput v-if="_tableData[ind]" type="number" /> -->
                  <UInput v-else v-model="_tableData[ind][col.key]" variant="none" />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center justify-end gap-5">
            <UButton @click="() => modal = false" variant="solid" color="gray" label="Discard" />
            <UButton @click="updatePrices" variant="solid" color="primary" label="Save and close" />
          </div>
        </div>
      </template>
    </UCard>

    <DialogueCancelConfirm @confirm="() => modal = false" v-model="confirm_close" title="Close"
      description="Are you sure you want to close this editor without saving?" what="" confirm-button-color="red"/>
    <DialogueCancelConfirm @confirm="() => updatePrices" v-model="savePrices" title="Saving Changes"
      description="Saving edited prices" what="" />
  </UModal>
</template>
