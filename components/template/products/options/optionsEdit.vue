<script setup lang=ts>
import type { PropType } from 'vue'
import type { Product } from "@medusajs/medusa/dist"
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
const props = defineProps({
  product: {
    type: Object as PropType<Product | PricedProduct>,
    required: true
  },
  openModal: Boolean,
})
const emits = defineEmits(['update:openModal'])
const openModal = computed({
  set: (val) => emits('update:openModal', val),
  get: () => props.openModal
})
const product = computed(() => props.product)
const my_options = ref(product.value.options?.map((x) => {
  return {
    id: x.id,
    title: x.title
  }
}) || [])

const _delete = ref([] as { id: string | undefined, title: string }[])

const add_option = () => {
  my_options.value?.push({ title: '', id: '' })
}

const delete_option = (ind: number) => {
  if (ind < 0 || ind > my_options.value?.length) return
  const opt = my_options.value[ind]
  // console.log(opt);

  if (!opt.title) {
    my_options.value.splice(ind, 1)
    return
  }
  my_options.value.splice(ind, 1)
  _delete.value.push({ id: opt.id, title: opt.title })
}

async function updateOption(opt_id: string, paylaod: { title: string }) {
  return await useCybandyClient().admin.products.updateOption(product.value.id as string, opt_id, paylaod)
}

async function addOption(payload: { title: string }) {
  return await useCybandyClient().admin.products.addOption(product.value.id as string, payload)
}

async function delOption(opt_id: string) {
  return await useCybandyClient().admin.products.deleteOption(product.value.id as string, opt_id)
}

async function create() {

  try {
    _delete.value.forEach(async opt_del => {
      if (opt_del.id) {
        await delOption(opt_del.id)
      }
    });

    my_options.value.forEach(async my_opt => {
      if (my_opt.title) {
        if (my_opt.id) {
          await updateOption(my_opt.id, { title: my_opt.title })
        } else {
          await addOption({ title: my_opt.title })
        }
      }
    });

    openModal.value = false
    useToastSuccess()
  } catch (error: any) {
    useToastFailure()
  }

}

</script>

<template>
  <ModalTitleButton @send="create" v-model="openModal" title="Edit Options">
    <div class="space-y-5 lg:min-w-[550px] xl:min-w-[600px]">
      <h3 class="text-base lg:text-lg">Product options</h3>

      <UFormGroup v-for="(opt, ind) of my_options" label="Option title">
        <div class="flex items-center gap-5">
          <UInput v-model="my_options[ind].title" class="flex-grow" />
          <UButton @click="() => delete_option(ind)" variant="solid" color="gray" icon="i-heroicons-trash" />
        </div>
      </UFormGroup>
    </div>

    <UButton @click="add_option" block icon="i-heroicons-plus" label="Add an option" class="mt-10" />
  </ModalTitleButton>
</template>
