<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <pre class="p-3 rounded-md border bg-gray-50" v-else> {{ departmentGroup }}</pre>
  </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { onMounted, ref, watch } from "vue"
import { DepartmentGroupTy, UserResTy, UserTy } from "../types/user.type"

const users = ref<UserTy[]>([])
const isLoading = ref(false)
const departmentGroup = ref<DepartmentGroupTy>({})

async function getDataFromApi() {
  try {
    const res = await axios.get<UserResTy>("https://dummyjson.com/users")
    users.value = res.data.users
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => users.value,
  (newValue, oldValue) => {
    if (newValue) {
      transformData()
    }
  }
)

onMounted(async () => {
  await getDataFromApi()
})

async function transformData() {
  users.value.forEach((user) => {
    const { company, gender, age, hair, firstName, lastName, address } = user

    const department = company.department
    const hair_color = hair.color

    if (!departmentGroup.value[department]) {
      departmentGroup.value[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      }
    }

    if (gender.toLowerCase() === "male") {
      departmentGroup.value[department].male++
    } else if (gender.toLowerCase() === "female") {
      departmentGroup.value[department].female++
    }

    if (!departmentGroup.value[department].ageRange) {
      departmentGroup.value[department].ageRange = `${age}-${age}`
    } else {
      const [minAge, maxAge] = departmentGroup.value[department].ageRange.split("-")
      departmentGroup.value[department].ageRange = `${Math.min(age, +minAge)}-${Math.max(age, +maxAge)}`
    }

    if (!departmentGroup.value[department].hair[hair_color]) {
      departmentGroup.value[department].hair[hair_color] = 1
    } else {
      departmentGroup.value[department].hair[hair_color]++
    }

    const fullName = firstName + lastName
    departmentGroup.value[department].addressUser[fullName] = address.postalCode
  })
}
</script>

<style scoped></style>
