import {beforeEach, describe, expect, it,} from 'vitest'
import {createPinia, setActivePinia} from "pinia";
import {useTeamStore} from "../team";

const watchWantedResponse = (
    callback: () => boolean,
    config: { timeout: number } = {timeout: 5000}
): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            // Try To reject after timout
            reject()
        }, config.timeout);
        if (callback()) {
            resolve();
        } else {
            const intervalId = setInterval(() => {
                if (callback()) {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 1000);
        }
    });
}
describe('Team Store Test', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('Test Load', async () => {
        const teamStore = useTeamStore()
        expect(teamStore.teams).toBeUndefined()

        // Example usage
        watchWantedResponse(() => {
            return teamStore.teams !== undefined
        }).then(() => {
            console.log('Desired response received!');
            expect(teamStore.teams).not.toBeUndefined()
        }).catch(() => {
            console.log('Desired response is rejected')
        });
    }, {timeout: 50000})
})