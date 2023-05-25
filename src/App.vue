<script setup lang="ts">
import { query, doc, collection, onSnapshot } from "firebase/firestore";
import {db} from "./firebase"

const q = query(collection(db, "teams"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const teams = [];
    querySnapshot.forEach((doc) => {
        teams.push(doc.data());
    });
    console.log("Current teams : ", teams);
});


</script>

<template>
  <div><h1>Welcomme</h1></div>
</template>

<style scoped></style>
