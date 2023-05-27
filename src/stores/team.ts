import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { collection, onSnapshot, query , doc} from 'firebase/firestore'
import { db } from '@/firebase'

export const useTeamStore = defineStore('team', () => {
  const teams: Ref<undefined | Array<any>> = ref()
    const currentTeam = ref()
    const currentSub=ref()
  const q = query(collection(db, 'teams'))
   onSnapshot(q, (querySnapshot) => {
    const localTeams: any[] = []
    querySnapshot.forEach((doc) => {
      localTeams.push(doc.data())
    })
    teams.value = localTeams
  })


    const fetchById = (id: string) =>{
      // if(currentSub.value){
      //     currentSub.value()
      // }
        console.log("called", id)
        const unsub = onSnapshot(doc(db, "teams", id), (doc) => {
            console.log("called data", doc.data())
            currentTeam.value=doc.data()
        });
        currentSub.value=unsub
    }

  return {teams, fetchById, currentTeam}
})
