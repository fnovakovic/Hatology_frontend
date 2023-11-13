<template>
  <div>
<!--    <header class="bg-dark text-white p-4">-->
<!--      <h1 class="text-center">Product Detail</h1>-->
<!--    </header>-->

    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <div class="card product-card">
            <img class="product-image" :src="selectedImage"
                 :style="{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: '400px', /* Adjust the height here */
            }">

          </div>
        </div>
        <div class="col-md-6">
          <div class="card p-3">
            <h2 class="card-title">{{ name }}</h2>
            <p class="card-text">{{ description }}</p>
            <p class="card-text">Price: {{ price }} RSD</p>
            <button @click="buyProduct()" class="btn btn-primary">Buy</button>
          </div>
        </div>
      </div>


      <div class="horizontal-bar">
        <div
            class="image-container"
            v-for="item in this.imageData" :key="item.id"
            @click="showImage(item)"
        >
          <img :src="item" >
        </div>
      </div>
      <div class="modal" v-if="selectedImage">
        <span class="close" @click="closeModal">&times;</span>
        <img :src="selectedImage.src" :alt="selectedImage.alt" class="modal-content">
      </div>

    </div>

<!--    <footer class="bg-dark text-white text-center p-2 mt-5">-->
<!--      <p>&copy; 2023 Your Company</p>-->
<!--    </footer>-->
  </div>
</template>


<script>
import axios from "axios";
import configuration from "../../public/configuration.json";

export default {
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    adress: "",
    phoneNumber: "",
    quantity: "",
    images: [],
    selectedImage: null,
  }),
  props: {
    name: String,
    description: String,
    imageData: [],
    price: String,
    id: String,
  },
  methods: {
    showImage(image) {
      this.selectedImage = image;

    },closeModal() {
      this.selectedImage = null;
    },
    async buyProduct() {

      const headers = {
        'Content-Type': 'application/json',
      };
      const body = {
        uniqueId: localStorage.getItem('token'),
        productId: this.id,
      };


      await axios.post(configuration.apiUrl + "/api/orders/buy", body,{headers: headers})
          .then((response) => {
          })
          .catch((error) => {
            // Handle errors
            console.error('Error:', error);
          });


      axios.post(configuration.apiUrl + "/api/orders/ad", body,{headers: headers})
          .then((response) => {
          })
          .catch((error) => {
            // Handle errors
            console.error('Error:', error);
          });
    }
  },mounted() {
    this.selectedImage = this.imageData[0]
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
}

header {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
}

header h1 {
  font-size: 36px;
}

.product-card {
  border: none;
  background: none;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.btn {
  background-color: #f56a25;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.btn:hover {
  background-color: #f44a05;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px 0;
}
.product-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.horizontal-bar {
  display: flex;
  overflow-x: auto;
  scroll-behavior: auto;
  gap: 20px; /* Increased gap between images */
  padding: 20px; /* Increased padding */
}

.image-container {
  flex: 0 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.image-container img {
  width: 150px; /* Increased width */
  height: 150px; /* Increased height */
  object-fit: cover;
}
</style>
