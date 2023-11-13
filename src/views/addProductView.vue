<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-orange text-white">Add Product</div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <input v-model="name" type="text" maxlength="20" class="form-control" placeholder="Product Name">
              </div>

              <div class="select-editable form-group">
                <input  type="text" v-model="category" maxlength="15" list="browsers" name="browser" class="form-control" placeholder="Select or type a category">
                <datalist id="browsers" class="custom-datalist">
                  <option v-for="item in Categories" :key="item.id" :value="item">{{ item }}</option>
                </datalist>
              </div>

              <p>Show:</p>
              <label class="container">Yes
                <input v-model="checkedNew" type="radio" :checked="checkedNew === 'Yes'" value="Yes" name="radio">
              </label>
              <label class="container">No
                <input v-model="checkedNew" type="radio" :checked="checkedNew === 'No'" value="No" name="radio">
              </label>
              <br>
              <br>

              <div class="form-group">
                <input type="number" v-model="price" class="form-control" placeholder="Price in RSD">
              </div>

              <div class="form-group">
                <textarea type="textarea" v-model="description" maxlength="150" class="form-control" placeholder="Description"></textarea>
              </div>
              <div class="form-group">
                <label for="fileUpload">Upload Image:</label>
                <input type="file" id="fileUpload" class="form-control-file" multiple @change="handleFileChange">
              </div>

              <button @click="addProduct" class="btn btn-primary btn-like">Add Product</button>
            </form>
          </div>
        </div>
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
    imageFiles: [],
    rr: [],
    name: "",
    category: "",
    price: "",
    checkedNew: "No",
    description: "",
    Products: [],
    Categories: new Set()
  }),
  methods: {
    handleFileChange(event) {
      for(let tmp = 0; tmp < event.target.files.length; tmp++){
        this.imageFiles.push(event.target.files[tmp]);
      }
    },
  addProduct() {
      const jwtToken = localStorage.getItem('jwt');

      if (this.imageFiles) {

        const formData = new FormData();
        for (let i = 0; i < this.imageFiles.length; i++) {
          this.rr.push(this.imageFiles[i]);
        }
        for (let i = 0; i < this.rr.length; i++) {
          formData.append('files[]', this.rr[i]);
        }

        this.name = escapeHTML(this.name);
        this.description = escapeHTML(this.description);
        this.category = escapeHTML(this.category);
        this.price = escapeHTML(this.price);

        formData.append('name', this.name);
        formData.append('description', this.description);
        formData.append('price', this.price);
        formData.append('category', this.category);
        formData.append('checkedNew', this.checkedNew);

          if (jwtToken) {
            const headers = {
              'Authorization': `Bearer ${jwtToken}`,
            };

            axios
                .post(configuration.apiUrl + "/api/product/upload", formData, { headers: headers })
                .then((response) => {
                })
                .catch((error) => {
                  // Handle errors
                  console.error('Error:', error);
                });

            this.$router.push({
              name: "mainPage"
            });
          }
        };

    },
    getAllProducts() {
      const headers = {
        'Content-Type': 'application/json',
      };
      axios.get(configuration.apiUrl + "/api/product/all",{headers: headers})
          .then((response) => {
            this.Products = response.data;

            this.Products.forEach(value => {
              this.Categories.add(value.category);
            });

          })
          .catch((error) => {
            // Handle errors
            console.error('Error:', error);
          });



    },
  },
  mounted() {
    this.getAllProducts()
  },
};
</script>

<style scoped>
/* Custom styles for the page */
.card {
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
}

.card-header {
  background-color: #f56a25;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  border-radius: 10px 10px 0 0;
  padding: 15px;
}

.card-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.btn-like {
  background-color: #f56a25;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.3s;
  font-weight: bold;
}

.btn-like:hover {
  background-color: #ff7c4d;
}

.form-control {
  border: 2px solid #f56a25;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #ff7c4d;
}

.bg-orange {
  background-color: #f56a25;
}
.custom-datalist {
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  border: 2px solid #f56a25; /* Use your form's border color */
  border-radius: 5px;
  padding: 5px;
}

.custom-datalist option {
  padding: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  border: 2px solid #f56a25; /* Use your form's border color */
  border-radius: 5px;
  padding: 15px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #ff7c4d; /* Use focus color */
}

</style>
