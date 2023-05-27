<script setup lang="ts">
import { useTeamStore } from '@/stores/team'
const teamStore = useTeamStore()
</script>

<template>
  <div>
    <h1>Welcomme</h1>
    <div>current{{ teamStore.currentTeam }}</div>
      <div  v-if="teamStore.teams==undefined">
          Loading
      </div>
    <div v-if="teamStore.teams">
      <p>teams {{ teamStore.teams?.length }}</p>
      <div v-for="team in teamStore.teams" :key="team.id">
        {{ team.name }}
        <br />
        <p v-if="team.members">{{ team.members.length }}</p>
        <br />
        <br />

        <div>
          <a
            @click="
              () => {
                console.log('clicked', team.uid)
                teamStore.fetchById(team.uid)
              }
            "
            >Set current for {{ team.uid }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
