<template lang="pug">
div
  v-app-bar(color="#1976d2", dark app clipped-left)
    
    v-toolbar-title My library - Admin
    v-spacer
    v-btn(@click="logout()") logout

  v-navigation-drawer(absolute permanent left app clipped color="#e3f2fd")
    v-list(nav, dense)
      v-list-item-group()
        v-list-item(to="/admin/addbook")
          v-list-item-icon
            v-icon mdi-plus
          v-list-item-content
            v-list-item-title Add book
        
        
        v-list-item(to="/admin/inventory")
          v-list-item-icon
            v-icon mdi-plus
          v-list-item-content
            v-list-item-title Inventory


        v-list-item(to="/admin/addloan")
          v-list-item-icon
            v-icon mdi-plus
          v-list-item-content
            v-list-item-title Create Loan


        v-list-item(to="/admin")
          v-list-item-icon
            v-icon mdi-plus
          v-list-item-content
            v-list-item-title Loans
  v-main
    router-view.pa-2
</template>

<script>
export default {
  name: 'AdminIndex',
  methods: {
    logout() {
      const vm = this
      localStorage.setItem('id', '');
      vm.$router.replace('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>