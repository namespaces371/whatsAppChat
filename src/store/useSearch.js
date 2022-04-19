import { defineStore } from "pinia";
import { useFriendList } from "./useFriendList";
import { useMessagesStore } from "./useMessages";
export const useSearchStore = defineStore('searchStore',{
    state: () => {
        return {
            query: ''
        }
    },
    getters:{
        getSearchResult(state){
            return state.searchResult
        },
        searchByFriends(state){
            const friendStore = useFriendList()
            const friendList = friendStore.getFriendsList
            let query = state.query.toLowerCase()
            return friendList.filter(friend => friend.name.toLowerCase().indexOf(query) >= 0)
        },
        searchByMessages(state){
            const messageStore = useMessagesStore()
            const friendStore = useFriendList()

            const messagesList = messageStore.getMessageList
            let query = state.query.toLowerCase()
            let messagesFiltered =  messagesList.filter(msg => msg.body.toLocaleLowerCase().indexOf(query) >= 0)
            let final = []
             messagesFiltered.map((msg) => {
                 friendStore.getUserById(msg.peerId).map((f) => {
                    final.push({...f, lastMsg: {body:msg.body, date: msg.date}})
                })
            })
            return final
        }
    },
    actions:{
        setQuery(query){
            this.query = query
        }
    }
})