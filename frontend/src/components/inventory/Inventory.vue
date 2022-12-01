<template lang="pug">
v-container 
	v-row.justify-center
		v-col(cols="11")
			v-data-table(:headers="headers" :items="items" :items-per-page="15" class="elevation-1")
				template(v-slot:item.actions="{ item }" )
					v-btn(icon='' color='green' @click="goToUpdateBook(item)")
						v-icon mdi-cog
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
				{ text: 'Code', value: 'code'},
				{ text: 'Autor', value: 'autor', },
				{ text: 'Title', value: 'title' },
				{ text: 'Category', value: 'category' },
				{ text: 'Place of edition', value: 'placeOfEdition' },
				{ text: 'Editorial', value: 'editorial' },
				{ text: 'Year', value: 'year' },
				{ text: 'Number of pages', value: 'numberOfPages' },
				{ text: 'Stock', value: 'stock' },
				{ text: 'Actions', value: 'actions' },
			],
			items: []
		}
	},
	created () {
		const vm = this
		get('books/').then((res) => {
			vm.items = res.inventory
		})
	},
	methods: {
		goToUpdateBook (book) {
			const vm = this
			vm.$router.push('/admin/updatebook/' + book.code)
		},
		showDeleteConfirmationModal (book) {
			const vm = this
			Swal.fire({
				title: 'Are you sure you want to delete this book?',
				icon: 'warning',
				showCancelButton: true,
				cancelButtonText: 'No, cancel',
				confirmButtonText: 'yes, delete'
			}).then((res) => {
				if (res.value) {
					httpDelete(`books/${book.code}/`).then(() => {
						Swal.fire({
							title: 'Book Deleted',
							icon: 'success',
							confirmButtonText: 'Ok.'
						})
						vm.items = vm.items.filter(el => el.code !== book.code)
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