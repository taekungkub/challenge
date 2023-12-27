<template>
  <div>
    <div class="grid grid-cols-3 gap-4 items-start">
      <div>
        <div v-for="item in itemsFilter" :key="item.name">
          <ItemTask :name="item.name" @click="handleItem(item)" />
        </div>
      </div>
      <BoxTask :title="'Fruit'">
        <div v-for="item in fruitFilter" :key="item.name">
          <ItemTask :name="item.name" @click="handleFruit(item)" />
        </div>
      </BoxTask>
      <BoxTask :title="'Vegetable'">
        <div v-for="item in vegatableFilter" :key="item.name">
          <ItemTask :name="item.name" @click="handleVegetable(item)" />
        </div>
      </BoxTask>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue"
import ItemTask from "./ItemTask.vue"
import BoxTask from "./BoxTask.vue"

interface ItemTy extends TimeTy {
  type: TypeTy
  name: string
}

type TypeTy = "Fruit" | "Vegetable"

interface TimeTy {
  timeoutId?: number
}

const items = ref<ItemTy[]>([
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
])

const itemsFilter = computed(() => items.value.filter((v) => !fruitFilter.value.includes(v) && !vegatableFilter.value.includes(v)))
const fruitFilter = computed(() => task.value.filter((v) => v.type === "Fruit"))
const vegatableFilter = computed(() => task.value.filter((v) => v.type === "Vegetable"))

const task = ref<ItemTy[]>([])

function handleItem(item: ItemTy) {
  addTask(item)
}

function handleVegetable(item: ItemTy) {
  removeTask(item)
}

function handleFruit(item: ItemTy) {
  removeTask(item)
}

const addTask = (item: ItemTy) => {
  const duration = 5000
  task.value.push(item)
  item.timeoutId = setTimeout(() => {
    removeTask(item)
  }, duration)
}

const removeTask = (item: ItemTy) => {
  if (item.timeoutId) {
    clearTimeout(item.timeoutId)
  }

  const index = task.value.findIndex((v) => v.name === item.name)
  if (index !== -1) {
    task.value.splice(index, 1)
  }
}
</script>

<style scoped></style>
