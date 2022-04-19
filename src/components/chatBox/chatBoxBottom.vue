<template>
  		  <div class="row">
			<div class="col-12">
			  <div class="chat-box-tray">
				<i class="material-icons">sentiment_very_satisfied</i>
				<input type="text" 

				@keyup.enter="sendMessage"
				v-model.trim="bodyMessage" 
				placeholder="Type your message here..."
				>
				<i class="material-icons">mic</i>
				<button @click="sendMessage">
					<i class="material-icons">send</i>
				</button>
			  </div>
			</div>
		  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'

const emit = defineEmits(['onSendMessage'])

 const bodyMessage = ref('')

 const sendMessage = () => {
	 if(bodyMessage.value.length !== 0){
	 	emit('onSendMessage', bodyMessage.value)
		 bodyMessage.value = ''
	 }
 }
</script>

<style>

</style>