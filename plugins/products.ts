import type { Product, ProductCollection, ProductCategory } from "@medusajs/medusa/dist"
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import type { Dict } from "@/types"

export default defineNuxtPlugin((nuxtApp) => {
  const singleProduct = ref({} as Product | PricedProduct)
  const allProducts = ref<Array<PricedProduct | Product>>()
  const collections_all = ref<Array<ProductCollection>>()
  const categories_all = ref<Array<ProductCategory>>()
  const products_q = ref<string | undefined>()

  const limit = ref(10)
  const pre_offset = ref(1)
  const offset = computed({
    set: (val) => pre_offset.value = val,
    get: () => pre_offset.value,
  })
  const count = ref(0)
  const loading = ref(true)

  const reqQuery = computed(() => {
    return {
      limit: limit.value,
      offset: (offset.value - 1) * limit.value,
      expand: 'variants,options,variants.prices,variants.options,collection,tags,type,images,sales_channels,categories',
      fields: 'id,title,thumbnail,status,handle,collection_id',
      is_giftcard: false
    } as Dict
  })

  const getData = async () => {

    await useAsyncData('products-list', async () => {
      const { products: _products, count: _count } = await useCybandyClient().admin.products.list({
        q: products_q.value,
        ...reqQuery.value
      })

      if (_products) {
        allProducts.value = _products
        count.value = _count
      }
    }, {
      watch: [reqQuery, products_q],

    })
  }

  const getCols = async () => {

    const { data, error } = await useAsyncData('product-collection', async () => {
      return await useCybandyClient().admin.collections.list()
    }, { pick: ['collections', 'count', 'limit', 'offset'] })
    if (!error.value) {
      if (data.value?.collections) {
        collections_all.value = data.value.collections
      }
    }
  }


  const getCategories = async () => {

    const { data, error } = await useAsyncData('product-categories', async () => {
      const { product_categories, count, limit, offset } = await useCybandyClient().admin.productCategories.list(
        {
          limit: 1000, include_descendants_tree: true,
          parent_category_id: JSON.stringify(null)
        })
      return { product_categories, count, limit, offset }
    }, { pick: ['product_categories', 'count', 'limit', 'offset'] })

    if (data.value?.product_categories) {
      categories_all.value = data.value.product_categories
    }
  }

  async function getSingleProduct(id: string, expand = '') {

    const payload = ref({
      id: id,
      expand: expand ? expand : 'options,options.values,variants,categories,collection,type,tags,sales_channels,images,variants.prices,variants.options'
    })
    const { data, error } = await useProductsList(payload)
    return data?.value?.products[0]
  }

  nuxtApp.hook('app:beforeMount', () => {
    const generalStore = useGeneralStore()
    useAsyncData('generalStoreData', async () => {
      await Promise.all([
        generalStore.getCategories(), generalStore.getCollections(),
        generalStore.getTags(), generalStore.getTypes()
      ])
    })
  })

  const pageView = ref('product')
  return {
    provide: {
      product: {
        product: {
          getSingleProduct,
          singleProd: computed({
            set: (val) => singleProduct.value = val,
            get: () => singleProduct.value
          }),
          allProd: computed({
            set: (val) => allProducts.value = val,
            get: () => allProducts.value
          }),
          limit,
          offset,
          count,
          getData,
          loading,
          q: computed({
            set: (val) => products_q.value = val,
            get: () => products_q.value
          })
        },
        collections: {
          list: computed({
            set: (val) => collections_all.value = val,
            get: () => collections_all.value
          })
        },
        styles: {
          status: {
            published: {
              color: 'emerald'
            },
            draft: {
              color: 'amber'
            },
            rejected: {
              color: 'red'
            },
            proposed: {
              color: 'cyan'
            },
          } as Dict
        },
        view: computed({
          set: (val) => pageView.value = val,
          get: () => pageView.value
        }),
        categories: {
          all: computed({
            set: (val) => categories_all.value = val,
            get: () => categories_all.value
          }),
          getCategories
        }
      },

    }
  }
})
