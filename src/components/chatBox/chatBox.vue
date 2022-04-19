<template>
		<topProfileChatBox :user="friendStore.getUserById(friendStore.selectedUser)[0]"/>
		<div class="chat-panel">
			<div v-if="friendStore.isUserSelected">

				<template v-if="messagesStore.getLastMessageFromUser(friendStore.selectedUser).body == 'Ваши сообщения и звонки защищены'">
					<div class="chat-panel--messages-begin">
						<p style="background: #c0deff;padding:10px">{{messagesStore.getLastMessageFromUser(friendStore.selectedUser).body}}</p>
					</div>					
				</template>

				<div v-for="(group, key) in messagesStore.groupsMessagesByDays(friendStore.selectedUser)" :key="key">
					
					<div v-if="formatDate(key, 'day') == new Date().getDate()" class="chat-panel--messages-begin">
						<p>Today</p>
					</div> 
					<div v-else class="chat-panel--messages-begin">
						<p>{{formatDate(key,'days')}}</p>
					</div>
					<chatBoxMessage
						v-for="message in group"
						:key="message.id"
						:messageId="message.id"
						:message="message.body" 
						:messageFrom="message.from"
						:peerId="message.peerId"
						:date="formatDate(message.date,'hours')"
					/> 
				</div>				
			</div>
			<div v-else class="chat-panel--messages-begin">
				<p>Please select user first</p>
			</div>
		</div>
		<chatBoxBottom @onSendMessage="sendMessage"/>
</template>

<script setup>
import moment from 'moment'
import chatBoxBottom from './chatBoxBottom.vue'
import chatBoxMessage from './chatBoxMessage.vue'
import topProfileChatBox from './topProfileChatBox.vue'
import { useMessagesStore } from '@/store/useMessages'
import {useFriendList} from '@/store/useFriendList'

defineEmits(['onSendMessage'])
const messagesStore = useMessagesStore()
const friendStore = useFriendList()
let messagesByUser = []
const formatDate = (date, format) => {
	if(format == 'hours'){
		return moment(date).format("h:mm")
	}
	if(format == 'days'){
		return moment(date).format("DD, MMM")
	}
	if(format == 'day'){
		return moment(date).format("DD")
	}	
}

friendStore.$onAction(({name,store,after}) => {
	after(result => {
		if(name == 'selectChat'){
			 messagesStore.groupsMessagesByDays(friendStore.selectedUser)
    	}
	})
})
messagesStore.$onAction(({name,store,after}) => {
	after(result => {
		if(name == 'pushMessage'){
			friendStore.setLastMsg(friendStore.selectedUser)
    	}
	})
})
const sendMessage = (message) => {
	messagesStore.pushMessage({
			peerId: friendStore.selectedUser,
			body: message,
			from: 1
	})


}
</script>

<style>

</style>