<template lang="pug">
LoanForm(:loan="loan" :loading="loading" @save="save()")
</template>

<script>
import LoanForm from '@/components/loans/LoanForm'
import { post } from '@/http'
import Swal from 'sweetalert2'

export default {
		name: 'AddLoanView',
		components: {
			LoanForm
		},
		data () {
			return {
				loan: {
					user: "",
					bookCode: "",
					date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
					returnDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
				},
				loading: false
			}
		},
		methods: {
			save () {
				const vm = this
				vm.loading = true
				post('loans/', vm.loan).then(() => {
					vm.loading = false
					vm.clear()
					Swal.fire({
						title: 'Loan saved',
						icon: 'success',
						confirmButtonText: 'Ok'
					})
        }).catch((e) => {
					vm.loading = false
					let message = 'Unknown error please try later'
					if (e.error === 'LOAN ALREADY EXISTS') {
							message = 'The user already has this book'
					} else if (e.error === 'BAD DATES') {
							message = 'Return date can not be before initial date'
					} else if (e.error === 'BOOK HAS NO STOCK') {
							message = 'Book has no stock'
					} else if (e.error === 'BOOK DO NO EXISTS') {
							message = 'The book does not exist, please check the code and try again.'
					}
					Swal.fire({
							title: message,
							icon: 'error',
							confirmButtonText: 'Ok'
					})
        })
			},
			clear () {
				const vm = this
				vm.loan = {
					user: "",
					bookCode: "",
					date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
					returnDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
				}
			},
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>