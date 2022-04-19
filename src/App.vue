<template>
<div style="height: 100%">
	<div class="">
		<div class="row no-gutters">
			<leftSide />
			<div class="col-md-9" v-if="friendStore.isUserSelected">
					<chatBox />
				</div>
				<div v-else class="col-md-9" style="background: #fafafa;">
					<div class="container">
						<div class="col-md-12">
							Hello
						</div>
					</div>					
				</div>
		</div>

	</div>
  </div>
</template>
<script setup>
  import leftSide from '@/components/leftSide/leftSide.vue'
  import chatBox from '@/components/chatBox/chatBox.vue'
  import {useFriendList} from '@/store/useFriendList'
  const friendStore = useFriendList()
</script>
<style>

</style>
