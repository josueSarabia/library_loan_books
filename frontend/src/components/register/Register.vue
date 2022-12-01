<template lang="pug">
v-container(fluid fill-height) 
  v-row.justify-center.align-center
    v-col(cols="3")
      v-card(rounded) 
        v-card-title.justify-center.pb-0
          p Sign up
        v-card-text
          v-row.justify-center
            v-col.pt-0(cols="10")
              v-text-field(label="Name" v-model="name")
              v-text-field(label="Last Name" v-model="lastName")
              v-text-field(label="Address" v-model="address")
              v-text-field(label="Email" v-model="email")
              v-select(v-model="userType" :items="options" label="User type")
              v-text-field(type="password" label="Password" v-model="password")
              v-text-field(type="password" label="Repeat password" v-model="repeatPassword")
          v-row 
            v-col.d-flex.flex-row.justify-center
              v-btn(color="info" :loading="loading" :disabled="invalid()" @click="signup") Sign up
          v-row.justify-center 
            p(@click="goToLogin()" style="text-decoration: underline; color: cornflowerblue; cursor: pointer;") You already have an account? login here.
</template>

<script>
import { post } from '@/http'
import Swal from 'sweetalert2'
export default {
  name: 'Register',
  data () {
    return {
      name: "",
      lastName: "",
      address: "",
      email: "",
      password: "",
      repeatPassword: "",
      loading: false,
      userType: 'admin',
      options: [
        'admin',
        'user'
      ]
    }
  },
  methods: {
    invalid () {
      const vm = this
      if (
        !vm.name ||
        !vm.lastName ||
        !vm.address ||
        !vm.email ||
        !vm.password ||
        !vm.repeatPassword ||
        vm.password !== vm.repeatPassword
      ) {
        return true
      }

      return false
    },
    signup () {
      const vm = this
      vm.loading = true
      const user = {
        name: vm.name,
        lastName: vm.lastName,
        address: vm.address,
        email: vm.email,
        userType: vm.userType,
        password: vm.password,
      }
      post('users/signup/', user).then((res) => {
        vm.loading = false
        if (vm.userType === 'admin') {
          vm.$router.push('/admin/')
        } else {
          vm.$router.push('/dashboard/')
        }

        localStorage.setItem('id', res.id);
      }).catch(() => {
        vm.loading = false
        Swal.fire({
          title: 'Email already exist',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }) 
    },
    goToLogin () {
      const vm = this
      vm.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>