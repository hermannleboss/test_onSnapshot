<script setup lang="ts">
import { useTeamStore } from '@/stores/team'
const teamStore = useTeamStore()
</script>

<template>
  <div>
    <h1>Welcomme</h1>
    <div>current <span v-if="teamStore.currentTeam && teamStore.currentTeam.data">{{ teamStore.currentTeam.data.name }}</span></div>
      <div  v-if="teamStore.teams==undefined">
          Loading
      </div>
    <div v-if="teamStore.teams">
      <p>teams {{ teamStore.teams?.length }}</p>
      <div v-for="(team, index) in teamStore.teams" :key="team.id">
          <br />
          <br />
          <div>
              <a
                  @click="
              () => {
                teamStore.fetchById(team.uid)
              }
            "
              >Set current for <em>{{ team.name }}</em></a
              >
          </div>
        {{ team.name }}
        <br />
          counter {{index}}
        <p v-if="team.members">{{ team.members.length }}</p>

      </div>
    </div>
  </div>
</template>

<style scoped></style>
