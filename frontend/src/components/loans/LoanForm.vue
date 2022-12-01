<template lang="pug">
v-container(fluid fill-height) 
	v-row.justify-center.align-center.mt-4
		v-col(cols="8")
			v-row
				v-col.pb-0.pt-1(cols="12")
					v-text-field(label="User Email" v-model="loan.user" outlined background-color="white")
			v-row
				v-col.pb-0.pt-1(cols="12")
					v-text-field(label="Book Code" v-model="loan.bookCode" outlined background-color="white")
			v-row
				v-col.pb-0.pt-1(cols="6")
					v-menu(ref="menu", v-model="menu", :close-on-content-click="false", :return-value.sync="loan.date", transition="scale-transition", offset-y, min-width="auto")
						template(v-slot:activator="{ on, attrs }")
							v-text-field(v-model="loan.date", label="Initial Date", prepend-icon="mdi-calendar", readonly, v-bind="attrs", v-on="on")
						v-date-picker(v-model="loan.date", no-title, scrollable)
							v-spacer
							v-btn(text, color="primary", @click="menu = false")
								| Cancel
							v-btn(text, color="primary", @click="$refs.menu.save(loan.date)")
								| OK
				v-col.pb-0.pt-1(cols="6")
					v-menu(ref="menu", v-model="menu2", :close-on-content-click="false", :return-value.sync="loan.returnDate", transition="scale-transition", offset-y, min-width="auto")
						template(v-slot:activator="{ on, attrs }")
							v-text-field(v-model="loan.returnDate", label="Return date", prepend-icon="mdi-calendar", readonly, v-bind="attrs", v-on="on")
						v-date-picker(v-model="loan.returnDate", no-title, scrollable)
							v-spacer
							v-btn(text, color="primary", @click="menu = false")
								| Cancel
							v-btn(text, color="primary", @click="$refs.menu.save(loan.returnDate)")
								| OK
			v-row 
				v-col.pb-0.pt-1.d-flex.flex-row.justify-center
					v-btn(color="info" :loading="loading" :disabled="invalid() || loading" @click="save()") Save	
				v-col.pb-0.pt-1.d-flex.flex-row.justify-center
					v-btn(color="red" :loading="loading" :disabled="loading" @click="goBack()") Cancel	
	</template>
	<script>
	
	export default {
			name: 'LoanForm',
			props: {
				loan: {
					type: Object,
					default: () => {}
				},
				loading: {
					type: Boolean,
					default: false
				}
			},
			data () {
				return {
					menu: false,
					menu2: false,
				}
			},
			methods: {
				invalid () {
					const vm = this
					if (
						!vm.loan.user ||
						!vm.loan.bookCode ||
						!vm.loan.date ||
						!vm.loan.returnDate
					) {
						return true
					}
		
					return false
				},
				save () {
					const vm = this
					vm.$emit('save')
				},
				goBack () {
					const vm = this
					vm.$router.back()
				}
			}
	}
	</script>
	
	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style scoped lang="scss">
	</style>