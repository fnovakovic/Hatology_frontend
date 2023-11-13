<template>
  <div id="app">
    <body>
    <header :style="navbarStyle">
      <nav class="navbar">
        <div class="logo">
          <a href="/public">
            <img v-on:click="moveToMainPage()" src=
                "https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png"
                 alt="gfg_logo">
          </a>
        </div>
        <div class="hamburger-menu">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </div>
        <div class="nav-menu hide">
          <a v-on:click="moveToMainPage()">Home</a>
          <a v-on:click="moveToShop()">Shop</a>
          <a v-if="isDisabled" v-on:click="moveToAddProduct()">Add Product</a>
          <a v-if="isDisabled" v-on:click="moveToOrders()">Orders</a>
          <a v-if="isDisabled" v-on:click="moveToContacts()">Contacts</a>
          <a v-on:click="moveToOrderProduct()" ><img src="../assets/cart.png" style="width: 35px"></a>
        </div>

      </nav>
    </header>
    </body>

  </div>
</template>


<script>

import axios from "axios";
import configuration from "../../public/configuration.json";



export default {
  data: () => ({
    User: [],
    isDisabled: false,
    navbarStyle: {
      backgroundColor: 'brown',
      color: 'white', // Adjust text color to be visible on brown background
    },
  }),
  watch: {
    '$route'(to, from) {
      if (to.name === 'mainPage') {
        this.navbarStyle = {
          backgroundColor: 'transparent',
          position: 'absolute',
          width: '100%',
        };
      } else {
        this.navbarStyle = {
          backgroundColor: 'white',
        };
      }
    },
  },
  methods: {
    async checkPrivilages() {
      const token = localStorage.getItem("jwt");
      if (token) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        try {
          const response = await axios.get(configuration.apiUrl + "/api/users/check", { headers: headers });
          this.User = response.data;
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.error('JWT token not found in localStorage. You may want to redirect to a login page or take appropriate action.');
      }

      if (this.User.adminPermission == "1") {
        this.isDisabled = !this.isDisabled;
      }
    },moveToMainPage() {

      this.$router.push({
        name: "mainPage",
      });
    },moveToAddProduct() {

      this.$router.push({
        name: "addProduct",
      });
    },moveToShop() {

      this.$router.push({
        name: "shop",
      });
    },moveToOrders() {

      this.$router.push({
        name: "orders",
      });
    },moveToOrderProduct() {

      this.$router.push({
        name: "orderProduct",
      });
    },moveToContacts() {

      this.$router.push({
        name: "contacts",
      });
    },
  },

  mounted() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('hide');
    });
    this.checkPrivilages();
  },
};
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: all 0.4s;
}
body{
  font-family: sans-serif;
}
a{
  text-decoration: none;
  color: black;
  font-size: 1.3rem;
  font-weight: bold;
}

/* navbar styling */
.navbar{
  position: fixed;
  display: flex;
  height: 5rem;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-bottom: 2px solid rgb(86, 68, 64);
  width: 100%;
  z-index: 999;
}

/* logo style */
.logo img{
  width: 4rem;
  height: 4rem;
  margin-left:1rem;
}

.hamburger-menu{
  padding-right: 1.5rem;
  cursor: pointer;
}

.hamburger-menu .line{
  display: block;
  width:2.5rem;
  height: 2px;
  margin-bottom: 10px;
  background-color: black;
  cursor: pointer;
}

.nav-menu{
  position: fixed;
  width: 94%;
  top: 6rem;
  left: 18px;
  background-color: rgb(255, 255, 255);
  font-weight: 600;

}
.nav-menu a{
  display: block;
  text-align: center;
  padding: 5px 0;
}
.nav-menu a:hover{
  background-color: rgb(223, 251, 219);
}

.hide{
  display: none;
}

/* for Desktop view */
@media screen and (min-width:600px){
  .navbar{
    justify-content: space-around;
  }
  .nav-menu{
    display: block;
    position: static;
    width: auto;
    margin-right:20px;
    background: none;
  }
  .nav-menu a{
    display: inline-block;
    padding: 15px 20px;
  }
  .nav-menu a:hover{
    background-color: rgb(223, 251, 219);
    border-radius: 5px;
  }
  .hamburger-menu{
    display: none;
  }
}

</style>
