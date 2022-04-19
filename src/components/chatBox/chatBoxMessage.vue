<template>
  		  <div class="row no-gutters">
          <template v-if="+messageFrom === 0">
              <div class="col-md-6">
                <div class="row" :id="'message-item-'+messageId">
                  <div class="chat-avatar-row">
                    <div class="message-avatar">
                        <img :src="peer.thumb" class="message-avatar--img"/>
                    </div>
                  </div>
                  <div class="chat-bubble col-md-9 chat-bubble--left">
                    <span>{{message}}</span>
                    <div class="message-box--time">{{date}}</div>
                  </div>
                </div>
              </div>
          </template>
          <template v-else>
            <div class="col-md-6 offset-md-6">
              <div class="row">
                <div class="chat-bubble col-md-9 chat-bubble--right'">
                  <span>{{message}}</span>
                  <div class="message-box--time">{{date}}</div>
                </div>
                 <div class="chat-avatar-row">
                  <div class="message-avatar">
                      <img src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg" class="message-avatar--img"/>
                  </div>
                </div>               
              </div>
			      </div>
          </template>

		  </div>
</template>

<script setup>

import {onMounted, ref} from 'vue'
import {useFriendList} from '@/store/useFriendList'
const props = defineProps({
    messageFrom: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
      required: true
    },
    peerId:{
      required: true,
      type: Number
    },
    messageId:{
      type:Number,
      required:true
    }
})
const friendStore = useFriendList()
const peer = friendStore.getUserById(props.peerId)[0]
onMounted(() => {
  const chatPanelEl = document.getElementsByClassName('chat-panel')[0]
  chatPanelEl.scrollTop = chatPanelEl.scrollHeight;

})
</script>
<style scoped>
.message-avatar{
  margin:auto;
}
.message-avatar--img{
    border-radius: 50%;
    width: 34px;
    height: 34px;
}
.chat-avatar-row{
    width: 40px;
    margin-left: 5px;
    display: flex;
}
</style>