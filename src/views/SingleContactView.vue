<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="main">
        <p>Name: <span>{{ name }}</span></p>
        <p>Email: <span>{{ email }}</span></p>
        <p>Message: <span>{{comment}}</span></p>
        <button @click="back" class="orange-button">Return</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    email: String,
    comment: String
  },
  methods: {
    back() {
      this.$router.push({ name: "contacts" });
    }
  },
  mounted() {
  }
};
</script>


<style scoped>
.main {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #f56a25; /* Orange border */
  border-radius: 5px;
  background-color: #808080; /* Black background */
  box-shadow: black;
  color: black; /* White text */
}

p {
  margin: 8px 0;
  font-size: 1.2rem;
}

button {
  background-color: #f56a25; /* Orange background */
  color: black; /* Black text */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f56a25; /* Slightly darker orange on hover */
}

span {
  color: #333; /* Dark gray text */
}
</style>
