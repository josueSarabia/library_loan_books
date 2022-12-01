<template lang="pug">
v-container 
	v-row.justify-center
		v-col(cols="11")
			v-data-table(:headers="headers" :items="items" :items-per-page="15" class="elevation-1")
				template(v-slot:item.actions="{ item }" )
					v-btn(icon='' color='red' @click="showDeleteConfirmationModal(item)")
						v-icon mdi-delete
	</template>
			
	<script>
	import { get, httpDelete } from '@/http'
	import Swal from 'sweetalert2'
	export default {
		name: 'Inventory',
		data () {
			return {
				headers: [
					{ text: 'User', value: 'user'},
					{ text: 'Book code', value: 'bookCode', },
					{ text: 'Initial date', value: 'date' },
					{ text: 'Return date', value: 'returnDate' },
					{ text: 'Actions', value: 'actions' },
				],
				items: []
			}
		},
		created () {
			const vm = this
			get('loans/').then((res) => {
				vm.items = res.loans
			})
		},
		methods: {
			showDeleteConfirmationModal (loan) {
				const vm = this
				Swal.fire({
					title: 'Are you sure you want to end this loan?',
					icon: 'warning',
					showCancelButton: true,
					cancelButtonText: 'No, cancel',
					confirmButtonText: 'yes, finish it'
				}).then((res) => {
					if (res.value) {
						httpDelete(`loans/${loan.bookCode}/${loan.user}`).then(() => {
							Swal.fire({
								title: 'Loan finished',
								icon: 'success',
								confirmButtonText: 'Ok.'
							})
							vm.items = vm.items.filter(el => el.code !== loan.code)
						})
					}
				})
			}
		}
	}
	</script>
	
	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style scoped lang="scss">
	</style>