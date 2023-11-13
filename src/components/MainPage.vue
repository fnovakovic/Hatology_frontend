<template>
  <body>
<section id="home" class="bg-image">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <div class="hero-content">
          <h2 class="display-4">Welcome to FashionCloset</h2>
          <p class="lead">Your one-stop shop for the latest fashion trends.</p>
          <a class="btn btn-primary" v-on:click="moveToShop()">Shop Now</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="products">

  <div class="container">
    <div class="row">
      <div class="col-md-4 mb-4" v-for="item in filteredProducts" :key="item.id">
        <div v-on:click="singleProductPreview(item.name, item.description, item.imageData, item.price, item.id)" class="card product-card">

          <img :src="getFirstImage(item.imageData)" >

          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <div class="product-details">
              <div class="product-price">{{ item.price }}</div>
              <button class="btn btn-primary">Buy</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</section>

<section id="about" class="py-5 bg-light">
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="section-content text-center">
          <h2>About Us</h2>
          <p>We are passionate about fashion and committed to bringing you the latest styles and trends. Our mission is to help you look and feel your best.</p>
        </div>
      </div>
    </div>
  </div>
</section>


<section id="contact" class="py-5 bg-light">
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <div class="section-content">
          <h2>Contact Us</h2>
          <p>If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:contact@fashioncloset.com">contact@fashioncloset.com</a></p>
          <a class="btn btn-primary" v-on:click="moveToContactPage()">Contact Form</a> <!-- Add a "Contact Form" button -->
        </div>
      </div>
      <div class="col-lg-6">
        <img src="src/assets/map-image.jpg" alt="Map Image" class="img-fluid"> <!-- Add a map or location image -->
      </div>
    </div>
  </div>
</section>


<footer class="bg-dark text-white py-3">
  <div class="container text-center">
    <button @click="testEmit">Test Emit</button>
    <p>&copy; 2023 FashionCloset</p>
  </div>
</footer>
  </body>

</template>




<script>
import axios from "axios";
import configuration from "../../public/configuration.json";

export default {
  data: () => ({
    check: "Yes",
    Products: [],
  }),
  computed: {
    filteredProducts() {
      return this.Products.filter(item => item.checkedNew === this.check);
    }
  },
  methods: {
    getAllProducts() {
        const headers = {
          'Content-Type': 'application/json',
        };

        axios.get(configuration.apiUrl + "/api/product/all",{headers: headers})
            .then((response) => {
              this.Products = response.data;
            })
            .catch((error) => {
              // Handle errors
              console.error('Error:', error);
            });
    },
    getToken() {
      let token = localStorage.getItem("token")

      if(token == null || token == undefined){
        token = "";
      }

      axios.post(configuration.apiUrl + "/api/tkn/token", {
        token: token
      }).then(response => {
        console.log(response.data);
        localStorage.removeItem("token");
        localStorage.setItem("token", response.data);

      });
    },
    singleProductPreview(name, description, imageData,price,id) {
      let modifiedImageData = imageData.trim().replace(/,$/, '');

      const imageArray = [];

      modifiedImageData.split(',').forEach(image => {
        imageArray.push(image);
      });

      this.$router.push({
        name: "singleProduct",
        params: {
          name: name,
          description: description,
          imageData: imageArray,
          price:price,
          id:id,
        }

      });
    },
    moveToShop() {

      this.$router.push({
        name: "shop"
      });
    },moveToContactPage() {

      this.$router.push({
        name: "contactPage"
      });
    },
    getFirstImage(imageData) {
      if (imageData) {
        const imageArray = imageData.split(',');
        return imageArray[0];
      }
      return '';
    } ,testEmit() {
      // Emit a test event to check if the frontend receives it
      this.socket.emit('testEvent', 'This is a test event');
    }
  },
  mounted() {

    this.socket = this.$socket; // Access the socket instance from global properties

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.on("newProductAdded", (product) => {
      console.log('New Product Received:', product);
      // Handle the new product event here
      this.products.push(product); // Assuming you push new products into the array
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    this.getAllProducts()
    this.getToken()

  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
};
</script><style scoped>
/* Add this CSS for the background image */
.box {
  background-size: cover; /* Adjust the size as needed */
  background-position: center; /* Adjust the position as needed */
  background-repeat: no-repeat; /* Prevent image repetition */
  /* Your other box styles */
  margin-right: 10px; /* Add some spacing between items */
}
/* Reset some default styles */
body, h1, h2, p, ul, li {
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
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

nav ul {
  list-style: none;
}

nav li {
  display: inline;
  margin-right: 20px;
}

nav a {
  text-decoration: none;
  color: #fff;
}

section {
  padding: 40px;
  text-align: center;
}

/* Increase the height of the #home section */
#home {
  height: 600px; /* Adjust the height as needed */
}

.cta-button {
  display: inline-block;
  background-color: #f7f7f7;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 20px;
}

#products {
  background-color: #fff;
}

.product {
  display: inline-block;
  margin: 20px;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 5px;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px 0;
}

.product-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  background-color: #fff;
  border-radius: 10px;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.product-description {
  font-size: 14px;
  margin-top: 10px;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #f56a25; /* Adjust the color to your preference */
}

.btn-primary {
  background-color: #f56a25; /* Adjust the color to your preference */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #f44a05; /* Adjust the hover color to your preference */
}
#home {
  height: 100vh;
  color: #fff;
  text-align: center;
  padding: 100px 0;
}

.hero-content {
  text-align: left;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
}

.hero-content h2 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 30px;
}

.btn-primary {
  background-color: #f56a25;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: bold;
  text-decoration: none;
}

.btn-primary:hover {
  background-color: #f44a05;
}

.bg-image {
  background-image: url('src/assets/img3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
}

.hero-content {
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  color: #fff;
  text-align: left;
}

.hero-content h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 30px;
}

.btn-primary {
  background-color: #f56a25;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

.btn-primary:hover {
  background-color: #f44a05;
  color: #fff;
}


/* Add the following styles */
.section-content {
  padding: 20px;
  color: #333; /* Adjust text color */
}

.section-content h2 {
  font-size: 2.5rem;
  font-weight: bold;
}

.section-content p {
  font-size: 1.25rem;
}

.bg-light {
  background-color: #f7f7f7; /* Light background for Contact Us */
}

.footer p {
  margin: 0;
}

</style>

