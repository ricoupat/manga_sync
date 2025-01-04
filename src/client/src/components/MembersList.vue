<script>
import  axios from "axios";
import { eventBus } from "@/eventBus";

export default {
  name: "MembersList",
  data() {
    return {
      members: []
    }
  },
  async mounted() {
    const response = await axios.get("/api/members");
    this.members = response.data;

    eventBus.$on("memberAdded", async () => {
      const response = await axios.get("/api/members");
      this.members = response.data;
    });
  },
  methods: {
    async removeMember(member, index) {
      await axios.delete(`/api/members/${member._id}`);
      this.members.splice(index, 1);
    }
  },
};
</script>

<template>
  <div class="member-list">
    <h1>Members</h1>
    <div class="todo-container">
      <ul>
        <li v-for="(member, index) in members" :key="member.id">
          <div class="members">
            <span class="surname">{{ member.surname }} </span>
            <span class="email">{{member.email}}</span>
          </div>
          <button class="delete" @click="removeMember(member, index)">Delete</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>
.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.todo-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 100px;
  border-bottom: 1px solid #e0e0e0;
}

.members {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  max-width: 250px;
}

.surname {
  font-size: 18px;
  font-weight: bold;
}

.email {
  max-width: 70%;
  font-size: 14px;
}

.delete {
  background-color: #f44336;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
}

</style>