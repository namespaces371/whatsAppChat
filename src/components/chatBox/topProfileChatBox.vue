<template>
				<div class="settings-tray">
					<div class="friend-drawer no-gutters friend-drawer--grey">
					<img class="profile-image" :src="user.thumb" alt="">
					<div class="text">
					<h6>{{user.name}}</h6>
					<p class="text-muted">{{user.profileDesc}}</p>
					</div>
					<span class="settings-tray--right">
					<i class="material-icons">cached</i>
					<i class="material-icons">message</i>
					<i class="material-icons">menu</i>
					</span>
				</div>
				</div>
</template>

<script setup>
const props = defineProps(['user'])
</script>

<style>

</style>