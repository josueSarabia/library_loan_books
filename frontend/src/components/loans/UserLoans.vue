<template lang="pug">
v-container 
	v-row.justify-center
		v-col(cols="11")
			v-data-table(:headers="headers" :items="items" :items-per-page="10" class="elevation-1")
</template>
				
<script>
import { get } from '@/http'
export default {
		name: 'UserLoans',
		data () {
			return {
				headers: [
					{ text: 'Book code', value: 'bookCode', },
					{ text: 'Initial date', value: 'date' },
					{ text: 'Return date', value: 'returnDate' },
				],
				items: []
			}
		},
		created () {
			const vm = this
			const id = localStorage.getItem('id');
			get(`loans/user/${id}`).then((res) => {
					vm.items = res.loans
			})
		},
		methods: {
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>