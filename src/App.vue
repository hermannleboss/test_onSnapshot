<script setup lang="ts">
import {query, doc, collection, onSnapshot} from "firebase/firestore";
import {db} from "./firebase"
import {ref} from "vue";

const q = query(collection(db, "teams"));
const refTeams = ref()
const loading = ref(false)
const lastLoadingTime = ref(0)
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let start =  performance.now();
    loading.value = true
    const teams = [];
    querySnapshot.forEach((doc) => {
        teams.push(doc.data());
    });
    refTeams.value = teams
    loading.value = false
    lastLoadingTime.value = performance.now() - start;
});


</script>

<template>
    <div><h1>Welcomme</h1>
        <div>
            <p> loading time={{lastLoadingTime}}</p>
            <p>is loading = {{loading}}</p>
            <p v-if="refTeams">teams {{refTeams.length}}</p>
        </div>
    </div>
</template>

<style scoped></style>
