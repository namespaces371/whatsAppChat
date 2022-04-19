<template>
<div class="col-md-3 border-right" style="overflow-y: scroll;border-bottom: 5px dashed #00000030;">
    <div class="profile-searchbox-block">
        <profileHead />
        <searchBox 
            v-model="searchText" 
            @update:searchText="searchText = $event"
            @setEmptySearch="searchText = ''"
        /> 
    </div>
    <div style="height:100%;max-height:500px">
        <template v-if="isShowSearchChats">         
                <friendDrawerFromSearch :textToSearch="searchText"/> 
        </template>
        <template v-else>
                <friendDrawer />
        </template>        
    </div>
</div>
</template>

<script setup>
import {computed, ref} from 'vue'

import profileHead from '@/components/leftSide/profileHead.vue'
import searchBox from '@/components/leftSide/searchBox.vue'
import friendDrawer from '@/components/leftSide/friendDrawer.vue'
import friendDrawerFromSearch from '@/components/leftSide/friendDrawerFromSearch.vue'
const searchText = ref('')

const isShowSearchChats = computed(() => searchText.value.length !== 0)
</script>

<style scoped>
.profile-searchbox-block{
    position: sticky;
    top: 0;
    z-index: 1;
}
</style>