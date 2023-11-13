<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="main">
        <p>First Name: <span>{{ firstName }}</span></p>
        <p>Last Name: <span>{{ lastName }}</span></p>
        <p>Email: <span>{{ email }}</span></p>
        <p>Number: <span>{{ number }}</span></p>
        <p>Address: <span>{{ adress }}</span></p>
        <div v-for="item in this.products" :key="item.id">
          <p>Name: {{ item }}</p>
        </div>
        <div v-for="item in this.products2" :key="item.id">
          <p>Price: {{ item }}</p>
        </div>
        <p>Date and Time: <span>{{ dateAndTime }}</span></p>
        <p>Delivered: <span>{{ delivered }}</span></p>
        <p>Need To Pay: <span>{{ needToPay }} RSD</span></p>
        <p>Delivered Time: <span>{{ deliveredTime }}</span></p>
        <button @click="back" class="orange-button">Return</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    firstName: String,
    lastName: String,
    email: String,
    number: String,
    adress: String,
    dateAndTime: String,
    delivered: String,
    deliveredTime: String,
    needToPay: String,
    products: Array,
    products2: Array
  },
  methods: {
    back() {
      this.$router.push({ name: "orders" });
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
