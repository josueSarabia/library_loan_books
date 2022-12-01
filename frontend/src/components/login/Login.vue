<template lang="pug">
v-container(fluid fill-height) 
  v-row.justify-center.align-center
    v-col(cols="3")
      v-card(rounded) 
        v-card-title.justify-center.pb-0
          p Log in
        v-card-text
          v-row.justify-center
            v-col.pt-0(cols="10")
              v-text-field(label="Email" v-model="email")
              v-text-field(type="password" label="Password" v-model="password")
          v-row 
            v-col.d-flex.flex-row.justify-center
              v-btn(color="info" :loading="loading" :disabled="invalid()" @click="login") Log in
          v-row.justify-center 
            p(@click="goToSignUp()" style="text-decoration: underline; color: cornflowerblue; cursor: pointer;") You don't have an account? Sign up here.
  </template>
  
  <script>
  import Swal from 'sweetalert2'
  import { get } from '@/http'
  export default {
    name: 'Register',
    data () {
      return {
        email: "",
        password: "",
        loading: false
      }
    },
    methods: {
      invalid () {
        const vm = this
        if (
          !vm.email ||
          !vm.password
        ) {
          return true
        }
  
        return false
      },
      login () {
        const vm = this
        vm.loading = true
        get(`users/email/${vm.email}/`).then((res) => {
          if (!res.user.id) {
            Swal.fire({
              title: 'Invalid credentials',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          } else {
            if (res.user.userType === 'admin') {
              vm.$router.push('/admin/')
            } else {
              vm.$router.push('/dashboard/')
            }

            localStorage.setItem('id', res.user.id);
            vm.loading = false
          }
        })
      },
      goToSignUp () {
        const vm = this
        vm.$router.push('/')
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  </style>