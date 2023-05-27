import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/firebase'

export const useTeamStore = defineStore('team', () => {
  const teams: Ref<undefined | Array<any>> = ref()
  const q = query(collection(db, 'teams'))
   onSnapshot(q, (querySnapshot) => {
    const localTeams: any[] = []
    querySnapshot.forEach((doc) => {
      localTeams.push(doc.data())
    })
    teams.value = localTeams
  })



  return {teams}
})
