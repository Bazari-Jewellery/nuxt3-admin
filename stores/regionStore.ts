import { defineStore } from "pinia";
import type { Region } from '@medusajs/medusa'

export const useRegionStore = defineStore("regionStore", {
  state: () => ({
    regions: [] as Region[]
  }),
  getters: {
    regionById: (state) => (id: string) => state.regions.filter((x) => x.id == id)
  },
  actions: {
    async getAll() {
      const { regions: _regs } = await useCybandyClient().admin.regions.list()
      if (_regs.length) {
        this.regions = _regs
      }
    },
    updateRegion(id: string, payload: Region) {
      const _id = this.regions.findIndex((x) => x.id === id)
      if (_id < 0) {
        return
      }
      this.regions[_id] = payload

    }
  }
})
