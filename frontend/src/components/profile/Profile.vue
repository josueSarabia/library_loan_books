<template lang="pug">
v-container(fluid fill-height) 
	v-row.justify-center.align-center.mt-4
		v-col(cols="8")
			v-row
				v-col.pb-0.pt-1(cols="6")
					v-text-field(label="Name" v-model="profile.name" :disabled="!isEdit" outlined background-color="white")
				v-col.pb-0.pt-1(cols="6")
					v-text-field(label="Last name" v-model="profile.lastName" :disabled="!isEdit" outlined background-color="white")
			v-row
				v-col.pb-0.pt-1(cols="6")
					v-text-field(label="Email" v-model="profile.email" :disabled="!isEdit" outlined background-color="white")
				v-col.pb-0.pt-1(cols="6")
					v-text-field(label="Address" v-model="profile.address" :disabled="!isEdit" outlined background-color="white")
			v-row
				v-col.pb-0.pt-1(cols="12")
					v-text-field(v-if="isEdit" label="Password" v-model="profile.password" :disabled="!isEdit" outlined background-color="white")
					v-text-field(v-else label="Password" value="*****************************" :disabled="!isEdit" outlined background-color="white")
			v-row 
				v-col
					h3.red--text Delete account
					v-btn( color="red" :loading="loading" :disabled="loading" @click="deleteAccount()") Delete
			v-row 
				v-col.pb-0.pt-1.d-flex.flex-row.justify-center
					v-btn(v-if="isEdit" color="info" :loading="loading" :disabled="invalid() || loading" @click="save()") Save
					v-btn(v-else color="info" :loading="loading" @click="showUpdateForm()") Update	
						
				v-col.pb-0.pt-1.d-flex.flex-row.justify-center(v-if="isEdit")
					v-btn( color="red" :loading="loading" :disabled="loading" @click="cancel") Cancel	
</template>
<script>
import { get, put, httpDelete } from '@/http'
import Swal from 'sweetalert2'

export default {
	name: 'Profile',
	props: {
	},
	data () {
		return {
			profile: {
				name: "",
				lastName: "",
				address: "",
				email: "",
				password: ""
			},
			profileBackup: {
				name: "",
				lastName: "",
				address: "",
				email: "",
				password: ""
			},
			isEdit: false,
			loading: false
		}
	},
	created () {
		const vm = this
		const id = localStorage.getItem('id');
		if (!id) {
			vm.$router.replace('/login')
		} else {
			get(`users/${id}/`).then((res) => {
				vm.profile = res.user
			})
		}
	},
	methods: {
		invalid () {
			const vm = this
			if (
				!vm.profile.name ||
				!vm.profile.lastName ||
				!vm.profile.address ||
				!vm.profile.email ||
				!vm.profile.password
			) {
				return true
			}

			return false
		},
		showUpdateForm () {
			const vm = this
			vm.profileBackup.name = vm.profile.name
			vm.profileBackup.lastName = vm.profile.lastName 
			vm.profileBackup.address = vm.profile.address 
			vm.profileBackup.email = vm.profile.email
			vm.profileBackup.password = vm.profile.password
			vm.isEdit = true
		},
		cancel () {
			const vm = this
			vm.profile.name = vm.profileBackup.name
			vm.profile.lastName = vm.profileBackup.lastName 
			vm.profile.address = vm.profileBackup.address 
			vm.profile.email = vm.profileBackup.email
			vm.profile.password = vm.profileBackup.password
			vm.isEdit = false
		},
		save () {
			const vm = this
			vm.loading = true
			const user= {
				id: vm.profile.id,
				name: vm.profile.name,
				lastName: vm.profile.lastName,
				address: vm.profile.address,
				email: vm.profile.email,
				password: vm.profile.password
			}
			put(`users/`, user).then(() => {
				vm.loading = false
				vm.isEdit = false
				Swal.fire({
					title: 'Profile saved',
					icon: 'success',
					confirmButtonText: 'Ok'
				})
			}).catch((e) => {
				vm.loading = false
				let message = 'Unknown error please try later'
				if (e.error === 'EMAIL ALREADY EXISTS') {
						message = 'Email is already in use'
				}
				Swal.fire({
						title: message,
						icon: 'error',
						confirmButtonText: 'Ok'
				})
			})
		},
		deleteAccount () {
			const vm = this
			Swal.fire({
				title: 'Are you sure you want to delete your account?',
				icon: 'warning',
				showCancelButton: true,
				cancelButtonText: 'No, cancel',
				confirmButtonText: 'yes, delete'
			}).then((res) => {
				if (res.value) {
					httpDelete(`users/${vm.profile.id}`).then(() => {
						Swal.fire({
							title: 'Account deleted',
							icon: 'success',
							confirmButtonText: 'Ok.'
						}).then(() => {
							vm.$router.replace('/login')
						})
					}).catch(() => {
						Swal.fire({
							title: 'Can not delete account with pending loans',
							icon: 'error',
							confirmButtonText: 'Ok.'
						})
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