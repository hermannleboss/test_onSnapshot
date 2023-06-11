import {afterAll, beforeEach, describe, expect, it, vi} from 'vitest'
import {createPinia, setActivePinia} from "pinia";
import {useCounterStore} from "../counter";
import {useTeamStore} from "../team";

describe('Team Store Test', () => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('Test Load', async () => {
        const teamStore = useTeamStore()
        expect(teamStore.teams).toBeUndefined()

        function watchWantedResponse(): Promise<void> {
            return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    // Try To reject after timout
                    reject()
                }, 5000);
                if (teamStore.teams !== undefined) {
                    resolve();
                } else {
                    const intervalId = setInterval(() => {
                        if (teamStore.teams !== undefined) {
                            clearInterval(intervalId);
                            resolve();
                        }
                    }, 1000);
                }
            });
        }

        // Example usage
        watchWantedResponse().then(() => {
            console.log('Desired response received!');
            expect(teamStore.teams).not.toBeUndefined()
        }).catch((error) => {
            console.log('Desired response is rejected')
        });
    }, {timeout: 50000})
})