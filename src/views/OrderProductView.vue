<template>
  <div class="main">
    <p class="title">Orders:</p>
    <div class="table-container">
      <table class="table">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Remove</th>

        </tr>

        <tr class="item" v-for="item in Products" :key="item.id">
          <td >{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <button @click="remove(item)" class="black-button">Remove</button>

        </tr>
      </table>
      <p>{{this.sum}}</p>
    </div>

    <div class="container mt-5">
      <div class="row justify-content-center">
    <form class="mt-5">
      <h2>Order Information</h2>
      <div class="form-group">
        <label>First Name:</label>
        <input v-model="firstName" type="text" maxlength="12" class="form-control"   >
      </div>
      <div class="form-group">
        <label>Last Name:</label>
        <input  v-model="lastName" type="text" maxlength="15" class="form-control"  >
      </div>
      <div class="form-group">
        <label>Address:</label>
        <input v-model="adress" type="text" maxlength="30" class="form-control"   >
      </div>
      <div class="form-group">
        <label>Phone Number:</label>
        <input v-model="phoneNumber" type="tel" maxlength="10" class="form-control"   >
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input v-model="email" type="email" maxlength="30" class="form-control"   >
      </div>
      <button @click="orderProduct()" class="btn btn-primary" type="submit">Order</button>
    </form>
  </div>
  </div>
  </div>
</template>
<script>

import axios from "axios";
import configuration from "../../public/configuration.json";

function escapeHTML(text) {
  const element = document.createElement('div');
  element.innerText = text;
  return element.innerHTML;
}
export default {

  data: () => ({
    Products: [],
    sum:0,
    firstName: "",
    lastName: "",
    email: "",
    adress: "",
    phoneNumber: "",
  }),
  methods: {

    getOrders() {

      const headers = {
        'Content-Type': 'application/json',
      };
      const body = {
        uniqueId: localStorage.getItem('token')

      };
      axios.post(configuration.apiUrl + "/api/orders/gett", body, {headers: headers})
          .then((response) => {
            this.Products = response.data.products;

            this.calculate();
          })
          .catch((error) => {
            // Handle errors
            console.error('Error:', error);
          });


    },
    calculate() {

      for (const p of this.Products) {
        this.sum = this.sum + parseInt(p.price);
      }
    },
    remove(item) {

      const headers = {
        'Content-Type': 'application/json',
      };
      const body = {
        uniqueId: localStorage.getItem('token'),
        productId: item.id

      };
      axios.post(configuration.apiUrl + "/api/orders/remove", body, {headers: headers})
          .then((response) => {
          })
          .catch((error) => {
            // Handle errors
            console.error('Error:', error);
          });


    },
    orderProduct() {
      this.firstName = escapeHTML(this.firstName);
      this.lastName = escapeHTML(this.lastName);
      this.email = escapeHTML(this.email);
      this.phoneNumber = escapeHTML(this.phoneNumber);
      this.adress = escapeHTML(this.adress);

      const headers = {
        'Content-Type': 'application/json',
      };
      const body = {
        uniqueId: localStorage.getItem('token'),
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        number: this.phoneNumber,
        adress: this.adress,

      };
      axios.post(configuration.apiUrl + "/api/orders/create", body,{headers: headers})
          .then((response) => {
          })
          .catch((error) => {
            // Handle errors
            console.error('Error:', error);
          });
    },
  },
    mounted() {
      this.getOrders();
    }
};
</script>



<style scoped>

</style>