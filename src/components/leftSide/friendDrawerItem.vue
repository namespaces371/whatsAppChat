<template>
		<div class="friend-drawer friend-drawer--onhover" 
			v-bind="$attrs"
		 	@click="$emit('onSelectUser',userId)"
		>
		  <img class="profile-image" :src="thumb" :alt="name">
		  <div class="text">
			<h6>{{name}}</h6>
			<p class="text-muted" style="font-size: 14.2px;">{{lastMsg.body}}</p>
		  </div>
		  <span class="time text-muted small">{{moment(lastMsg.date).format('h:mm')}}</span>
		</div>
		<hr>
</template>

<script setup>
import moment from 'moment'
defineEmits(['onSelectUser'])
defineProps({
	userId:{
		type: Number,
		required: true
	},
	lastMsg: {
		required: true
	},
	name: {
		type: String,
		required: true
	},
	profileDesc:{
		type: String,
		required: true
	},
	thumb:{
		type: String,
		required: true
	}
})

</script>

<style>

</style>