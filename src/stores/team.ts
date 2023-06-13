import {ref, watchEffect} from 'vue'
import type {Ref} from 'vue'
import {defineStore} from 'pinia'
import {collection, onSnapshot, query, doc} from 'firebase/firestore'
import {db} from '@/firebase'

export const useTeamStore = defineStore('team', () => {
    const teams: Ref<undefined | Array<any>> = ref()
    const currentTeam = ref()
    const q = query(collection(db, 'teams'))

    onSnapshot(q, (querySnapshot) => {
        const localTeams: any[] = []
        querySnapshot.forEach((doc) => {
            localTeams.push(doc.data())
        })
        teams.value = localTeams
    })

    watchEffect(() => {
        // Logs when the team is updated
        // console.log("teams",teams)
    })
    const fetchById = (id: string) => {
        /**
         * check if a subscription exist and unsubscribe it.
         *
         * Why it necessary
         *
         * If we fetch the team with id 1
         * Then we call the team with id 2
         * The current team will be the content of team 2
         * Then if the content of team 1 is updated by someone else or another process
         * The current will be updated to team 1.
         * To avoid this effect we need to unsubscribe to old document update
         *
         */
        if (currentTeam.value && currentTeam.value.subscription) {
            currentTeam.value.subscription()
        }

        // Create new subscription
        const unsub = onSnapshot(doc(db, 'teams', id), (doc) => {

            // Set team data value
            currentTeam.value = { data: doc.data()}
        })

        // Update the subscription
        currentTeam.value = {...currentTeam.value, subscription: unsub}
    }

    return {teams, fetchById, currentTeam}
})
