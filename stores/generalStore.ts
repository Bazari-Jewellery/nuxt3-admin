import type { ProductCollection, ProductCategory, ProductTag, ProductType } from '@medusajs/medusa'
import { sortBy } from 'lodash-es'

/**
 * Pinia store to manage collection, categories, tags and types
 */
export const useGeneralStore = defineStore('generalStore', {
  state: () => ({
    collections: [] as ProductCollection[],
    categories: [] as ProductCategory[],
    types: [] as ProductType[],
    tags: [] as ProductTag[],
  }),
  getters: {

  },
  actions: {
    async getCollections() {
      const { collections: _cols } = await useCybandyClient().admin.collections.list({ limit: 10000, offset: 0 })
      if (_cols) {
        this.collections = sortBy(_cols, ['title'])
      }
    },

    async getCategories() {
      const { product_categories } = await useCybandyClient().admin.productCategories.list({ limit: 10000, include_descendants_tree: true, parent_category_id: 'null' })
      if (product_categories) {
        this.categories = sortBy(product_categories, ['name'])
      }
    },

    async getTypes() {
      const { product_types } = await useCybandyClient().admin.productTypes.list({ limit: 100000 })
      if (product_types) {
        this.types = sortBy(product_types, ['value'])
      }
    },

    async getTags() {
      const { product_tags } = await useCybandyClient().admin.productTags.list({ limit: 100000, offset: 0 })

      if (product_tags) {
        this.tags = sortBy(product_tags, ['value'])
      }
    }
  }
})
