<template>
  		<div class="search-box">
		  <div class="input-wrapper">
			
			
			<template v-if="isFocusInput">
				<i class="material-icons west-icon" @click="searchText = ''; emit('setEmptySearch'); isFocusInput = false">west</i>
			</template>
			<template v-else>
				<i class="material-icons">search</i>
			</template>

			<input placeholder="Search here" 
				v-model="searchText" 
				ref="searchInput"
				@keyup="onKeyup($event)"
				@focus="isFocusInput = true"
			 type="text">

			<transition name="slide-fade">
			 <span v-if="searchText">
				 <i class="material-icons close-icon" @click="searchText = ''; setEmptySearch()">highlight_off</i>
			 </span>
			 </transition>

		  </div>
		</div>
</template>

<script setup>
import {ref} from 'vue'
const emit = defineEmits(['update:searchText','setEmptySearch'])
const props = defineProps(['searchText'])

let timeout = null;
const isSearch = ref(false)
const isFocusInput = ref(false)
const searchInput = ref('') //DOM REF INPUT

const setEmptySearch = () => {
	emit('setEmptySearch')
	searchInput.value.focus()
	
}
const onKeyup = ($event) => {
	clearTimeout(timeout)
	searchDo($event)
	timeout = setTimeout(() => {
		isSearch.value = false
	},1000)
}
const searchDo = ($event) => {
		isSearch.value = true
		emit('update:searchText', $event.target.value)
			
}

</script>

<style scoped>
input{
	padding:10px;
}
.close-icon{
	cursor: pointer;
}
.west-icon{
	cursor: pointer;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>