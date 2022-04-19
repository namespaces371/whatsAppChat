import { defineStore } from "pinia";
import { useMessagesStore } from "./useMessages";

export const useFriendList = defineStore('friendList',{
        state: () => ({
            selectedUser: null,
            friendsList: [
                {
                    id:1,
                    name:'Robo Cop Pop',
                    thumb: 'https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg',
                    profileDesc: 'Layin down the law since like before Christ...',
                    lastMsg: 'Loading..'
                },
                {
                    id:2,
                    name:'Tony Stark',
                    thumb: 'https://sc04.alicdn.com/kf/H5b0183557cec4043946f03208a7a29dat.jpg',
                    profileDesc: 'Big Power WOW...',
                    lastMsg: 'Loading..'
                },
                {
                    id:3,
                    name:'Spider Man',
                    thumb: 'https://upload.wikimedia.org/wikipedia/ru/thumb/c/cb/AmazingSpiderMan50.jpg/231px-AmazingSpiderMan50.jpg',
                    profileDesc: 'Web is here.',
                    lastMsg: 'Loading..'
                },             
                {
                    id:4,
                    name:'Tanos',
                    thumb: 'https://img.kupigolos.ru/hero/5d571da5e4aab.jpg?p=bh&s=d8e5acc4391fdaa55ffbbf676f80ce85',
                    profileDesc: 'Strength.',
                    lastMsg: 'Loading..'
                },
                {
                    id:5,
                    name:'Captain America',
                    thumb: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Chris_Evans_as_Steve_Rogers_Captain_America.jpg',
                    profileDesc: 'Shield is my weapon',
                    lastMsg: 'Loading..'
                }                                                            
            ]
        }),
        getters: {
            getFriendsList: (state) => {
               return state.friendsList
            },
            isUserSelected: (state) => state.selectedUser !== null,

            getLastMessageFromUser(state){
                if(this.isUserSelected){  
                    const MessagesStore = useMessagesStore()
                    const selectedUser = state.selectedUser
                    return MessagesStore.getLastMessageFromUser(selectedUser)
                } 
            },
            getUserById(state){
                return (peerId) => {
                    return state.friendsList.filter(friend => friend.id === peerId)
                }
            },
            getLastMessageFromUsers(state){
                    state.friendsList.forEach((item, i) => {
                        this.setLastMsg(item.id)
                    })
                    return state.friendsList 
            }
        },
        actions: {
            selectChat(userId){
                this.selectedUser = userId
            },
            setLastMsg(userId){
                const MessagesStore = useMessagesStore()
                this.friendsList = this.friendsList.map((f) => {
                    if(f.id == userId){
                        let mLast = MessagesStore.getLastMessageFromUser(f.id)
                        return {...f, lastMsg: {body:mLast.body, date: mLast.date}}
                    }
                    return f
                }).sort((f1,f2) => new Date(f2.lastMsg.date) - new Date(f1.lastMsg.date))               
            }
        }
})