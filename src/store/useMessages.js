import { defineStore } from "pinia";
import moment from 'moment'

export const useMessagesStore = defineStore('messagesStore',{
    state: () => {
        return {
            messagesList:[
                {
                    id: 0,
                    peerId : 1,
                    body: 'Мне Александр номер ваш дал',
                    from: 0,
                    date: new Date().setDate(new Date().getDate() - 5)
                },
                {
                    id: 1,
                    peerId : 1,
                    body: 'Мне Самсунг гелакси 21 s 22s интересует оператива 6/128  если оптом брать примерно 20шт цена',
                    from: 0,
                    date: new Date().setDate(new Date().getDate() - 5)
                },                
                {
                    id: 2,
                    peerId : 2,
                    body: 'S21 128gb gray 2шт остались-65,000₽',
                    from: 0,
                    date: new Date().setDate(new Date().getDate() - 6)
                },
                {
                    id: 3,
                    peerId : 2,
                    body: 'Hello Peter!',
                    from: 0,
                    date: new Date().setDate(new Date().getDate() - 1)
                }                                
            ]
        }
    },
    getters:{
        getMessageList(state){
            return state.messagesList
        },
        getMessagesFromConversation: (state) => {
            return (peerId) => {
                return state.messagesList.filter((message) => message.peerId == peerId)
            }
        },
        groupsMessagesByDays(state){
           return (userId) => {
               return this.getMessagesFromConversation(userId).reduce((acc, messStore) => {
                const weekDay = `${moment(messStore.date).format('YYYY-MM-DD')}`;
                if (!acc[weekDay]) {
                    acc[weekDay] = [];
                }
                acc[weekDay].push(messStore);
                return acc;
                }, {});         
            } 
        },
        getLastMessageFromUser(state){
            return (userId) => {
                const filtered =  state.messagesList.filter(x => x.peerId == userId)
                return (filtered[filtered.length - 1] ? filtered[filtered.length - 1] : {
                    body: 'Ваши сообщения и звонки защищены',
                    date: 0
                })
            }
        }
    },
    actions:{
        pushMessage(messageObject){
            this.messagesList.push({
                id: Date.now(),
                peerId : messageObject.peerId,
                body: messageObject.body,
                from: messageObject.from,
                date: Date.now()
            })
            return messageObject.peerId
        }
    }
})