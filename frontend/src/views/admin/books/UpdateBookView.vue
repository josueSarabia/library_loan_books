<template lang="pug">
BookForm(:book="book" :loading="loading" @save="save()")
</template>

<script>
import BookForm from '@/components/books/BookForm'
import { get, put } from '@/http'
import Swal from 'sweetalert2'

export default {
	name: 'UpdateBookView',
	components: {
		BookForm
	},
	data () {
		return {
			book: {
				autor: "",
				title: "",
				category: "",
				code: "",
				placeOfEdition: "",
				editorial: "",
				year: "",
				numberOfPages: "",
				stock: 1,
			},
			loading: false
		}
	},
	created () {
		const vm = this
		get(`books/${vm.$route.params.id}/`).then((res) => {
			vm.book = res.book
		})
	},
	methods: {
		save () {
			const vm = this
			vm.book.year = +vm.book.year
			vm.book.numberOfPages = +vm.book.numberOfPages
			vm.loading = true
			put('books/', vm.book).then(() => {
				vm.loading = false
				Swal.fire({
					title: 'Book saved',
					icon: 'success',
					confirmButtonText: 'Ok'
				}).then(() => {
					vm.$router.back()
				})
			}).catch(() => {
				vm.loading = false
				Swal.fire({
					title: 'Book already exist',
					icon: 'error',
					confirmButtonText: 'Ok'
				})
			})
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>