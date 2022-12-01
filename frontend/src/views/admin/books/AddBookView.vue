<template lang="pug">
BookForm(:book="book" :loading="loading" @save="save()")
</template>

<script>
import BookForm from '@/components/books/BookForm'
import { post } from '@/http'
import Swal from 'sweetalert2'

export default {
		name: 'AddBookView',
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
		methods: {
			save () {
				const vm = this
				vm.book.year = +vm.book.year
				vm.book.numberOfPages = +vm.book.numberOfPages
				vm.loading = true
				post('books/', vm.book).then(() => {
            vm.loading = false
            vm.clear()
            Swal.fire({
							title: 'Book saved',
							icon: 'success',
							confirmButtonText: 'Ok'
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
			clear () {
				const vm = this
				vm.book = {
					autor: "",
					title: "",
					category: "",
					code: "",
					placeOfEdition: "",
					editorial: "",
					year: "",
					numberOfPages: "",
					stock: 1,
				}
			},
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>