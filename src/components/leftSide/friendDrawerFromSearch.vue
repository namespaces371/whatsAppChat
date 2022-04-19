<template>
<TransitionGroup 
  enter-active-class="animate__animated animate__zoomIn animate__faster" 
  leave-active-class="animate__animated animate__zoomOut"
    appear
>  
<div key="friendDrawerItem">

    <div class="search-result--header-panel">
        <div class="search-result--header-group">
            <span>Search by friends and chats</span> <hr />
        </div>
        <template v-if="searchStore.searchByFriends.length > 0">
        <friendDrawerItem
            v-for="friend in searchStore.searchByFriends"
            :key="friend.id"
            :name="friend.name"
            :profileDesc="friend.profileDesc"
            :thumb="friend.thumb"
            :userId="friend.id"
            :lastMsg="friend.lastMsg"
            :class="[friendStore.isUserSelected && friendStore.selectedUser === friend.id ? 'friend-drawer--active' : '']"
            @onSelectUser="selectChat"
        />
        </template>
        <template v-else>
            <p class="text-center">Sorry, no friends found</p>
        </template>
    </div>

    <div class="search-result--header-panel">
        <div class="search-result--header-group">
            <span>Search by messages</span> <hr />
        </div>


        <template v-if="searchStore.searchByMessages.length > 0">
        <friendDrawerItem
            v-for="friend in searchStore.searchByMessages"
            :key="friend.id"
            :name="friend.name"
            :profileDesc="friend.profileDesc"
            :thumb="friend.thumb"
            :userId="friend.id"
            :lastMsg="friend.lastMsg"
            :class="[friendStore.isUserSelected && friendStore.selectedUser === friend.id ? 'friend-drawer--active' : '']"
            @onSelectUser="selectChat"
        />
        </template>
        <template v-else>
            <p class="text-center">Sorry, no messages found</p>
        </template>
    </div>

</div>
    </TransitionGroup>
</template>

<script setup>
import {useFriendList} from '@/store/useFriendList'
import {useSearchStore} from '@/store/useSearch'
import { watchEffect, ref } from 'vue'
import friendDrawerItem from './friendDrawerItem.vue'

const props = defineProps(['textToSearch'])

const friendStore = useFriendList()
const searchStore = useSearchStore()

    watchEffect(() => {
        searchStore.setQuery(props.textToSearch)
    })
    
searchStore.$onAction(({name,store,after}) => {
	after(result => {
		if(name == 'setQuery'){
            searchStore.searchByFriends
            searchStore.searchByMessages
    	}
	})
})
const selectChat = (userId) => {
    friendStore.selectChat(userId)
} 
</script>

<style scoped>
.search-result--header-group{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
}
.search-result--header-group span{
    padding: 5px;
    margin-top: 15px;
    color: #0062cc;
}
.search-result--header-panel{

}
</style>