<template lang="pug">
v-container(fluid fill-height) 
	v-row.justify-center.align-center.mt-4
		v-col(cols="8")
			v-row
				v-col.pb-0.pt-1(cols="12")
					v-text-field(label="Code" v-model="book.code" outlined background-color="white")
			v-row
				v-col.pb-0.pt-1(cols="12")
					v-text-field(label="Title" v-model="book.title" outlined background-color="white")
			v-row
				v-col.pb-0.pt-1(cols="6")
					v-text-field(label="Autor" v-model="book.autor" outlined background-color="white")
				v-col.pb-0.pt-1(cols="6")
					v-text-field(label="Category" v-model="book.category" outlined background-color="white")
			v-row
				v-col.pb-0.pt-1(cols="6")
					v-text-field(label="Place of Edition" v-model="book.placeOfEdition" outlined background-color="white")
				v-col.pb-0.pt-1(cols="6")
					v-text-field(label="Editorial" v-model="book.editorial" outlined background-color="white")
			v-row
				v-col.pb-0.pt-1(cols="6")
					v-text-field(label="Year of Edition" v-model="book.year" outlined background-color="white")
				v-col.pb-0.pt-1(cols="6")
					v-text-field(label="Number of pages" v-model="book.numberOfPages" outlined background-color="white")
			v-row
				v-col.pb-0.pt-1(cols="12")
					v-text-field(label="Stock" value="1" disabled outlined background-color="white")
			v-row 
				v-col.pb-0.pt-1.d-flex.flex-row.justify-center
					v-btn(color="info" :loading="loading" :disabled="invalid() || loading" @click="save()") Save	
				v-col.pb-0.pt-1.d-flex.flex-row.justify-center
					v-btn(color="red" :loading="loading" :disabled="loading" @click="goBack()") Cancel	
</template>
<script>

export default {
		name: 'BookForm',
		props: {
			book: {
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
			}
		},
		methods: {
			invalid () {
				const vm = this
				if (
					!vm.book.autor ||
					!vm.book.title ||
					!vm.book.category ||
					!vm.book.code ||
					!vm.book.placeOfEdition ||
					!vm.book.editorial ||
					!vm.book.year ||
					!vm.book.numberOfPages
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