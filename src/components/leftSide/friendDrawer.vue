<template>
<TransitionGroup 
    enter-active-class="animate__animated animate__zoomIn animate__faster" 
    leave-active-class="animate__animated animate__zoomOut"
    appear
>  
<div key="friendDrawerItem">
    <friendDrawerItem 
        v-for="friend in friendStore.getFriendsList"
        :key="friend.id"
        :name="friend.name"
        :profileDesc="friend.profileDesc"
        :thumb="friend.thumb"
        :userId="friend.id"
        :lastMsg="friend.lastMsg"
        :class="[friendStore.isUserSelected && friendStore.selectedUser === friend.id ? 'friend-drawer--active' : '']"
        @onSelectUser="selectChat"
    />
</div>
 </TransitionGroup>
</template>

<script setup>
import {useFriendList} from '@/store/useFriendList'
import { onMounted } from '@vue/runtime-core'
import friendDrawerItem from './friendDrawerItem.vue'
const friendStore = useFriendList()

onMounted(() => {
    friendStore.getLastMessageFromUsers
})
const selectChat = (userId) => {
    friendStore.selectChat(userId)
} 
</script>

<style>

</style>