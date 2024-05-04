import HomeAdd from '@/pages/index/components/AddBill/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    HomeAdd: typeof HomeAdd
  }
}

// 组件实例类型
export type HomeAddInstance = InstanceType<typeof HomeAdd>
