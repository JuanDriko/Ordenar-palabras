<template> 
    <div class="container">
      <form @submit.prevent="submitForm">
        <div class="row w-100 mt-2">
          <div class="col-12 px-4 mt-1">
            <label for="email" class="text-white ms-2 roboto-medium">Correo electrónico</label>
            <input type="email" v-model="form.email" class="w-100 form-control m-2" placeholder="Correo electrónico" required>
            <span v-if="errors.email" class="invalid-feedback text-center" role="alert">
              <strong>{{ errors.email }}</strong>
            </span>
          </div>
          <div class="col-12 px-4 mt-1">
            <label for="nickname" class="text-white ms-2 roboto-medium">Nickname:</label>
            <input type="text" v-model="form.nickname" class="w-100 form-control m-2" placeholder="Nickname" required>
            <span v-if="errors.nickname" class="invalid-feedback text-center" role="alert">
              <strong>{{ errors.nickname }}</strong>
            </span>
          </div>
        </div>
        <div class="text-center mt-4">
          <button type="submit" class="btn-game">
            <h1 class="roboto-bold">Start Game</h1>
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          email: '',
          nickname: '',
        },
        errors: {
          email: '',
          nickname: '',
        },
      };
    },
    methods: {
      submitForm() {
        this.errors = { email: '', nickname: '' };
  
        if (!this.form.email) {
          this.errors.email = 'El correo electrónico es obligatorio.';
        } else if (!this.validateEmail(this.form.email)) {
          this.errors.email = 'El correo electrónico no es válido.';
        }
        if (!this.form.nickname) {
          this.errors.nickname = 'El nickname es obligatorio.';
        }
  
        if (!this.errors.email && !this.errors.nickname) {
          this.saveToLocalStorage();
          this.redirectToPreguntas();
        }
      },
      validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      },
      saveToLocalStorage() {
        localStorage.setItem('userEmail', this.form.email);
        localStorage.setItem('userNickname', this.form.nickname);
      },
      redirectToPreguntas() {
        this.$router.push({ name: 'Preguntas' });
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .btn-game {
    background-color: #CDAA39;
    color: #002C52;
    padding: 0.5rem 2rem;
    border-radius: 5rem;
    border: none;
    cursor: pointer;
  }
  </style>