<template>
  <div class="">
    <!-- Sign in Form -->
    <section class="sign-in">
      <div class="container">
        <div class="signin-content">
          <div class="signin-image">
            <figure><img src="../assets/images/signin-image.jpg" alt="sign up image"></figure>
            <RouterLink to="/signup" class="signup-image-link">Create an account</RouterLink>
          </div>
          <div class="signin-form">
            <h2 class="form-title">Sign in</h2>
            <form @submit.prevent="login" class="register-form" id="login-form">
              <div class="form-group">
                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                <input type="text" name="your_name" v-model="username" placeholder="Your Name" required/>
              </div>
              <div class="form-group">
                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                <input type="password" name="your_pass" v-model="password" placeholder="Password" required/>
              </div>
              <div class="form-group">
                <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
              </div>
              <div class="form-group form-button">
                <v-btn color="success" @click="login" type="submit">Log In</v-btn>
              </div>
            </form>
            <div v-if="error" class="error-message">
              <ul>
                <li v-for="(msg, index) in errorMessages" :key="index">{{ msg }}</li>
              </ul>
            </div>
            <div class="social-login">
              <span class="social-label">Or login with</span>
              <ul class="socials">
                <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '../axios.js'

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: '',
      error: null,
      errorMessages: []
    }
  },
  methods: {
    async login() {
      this.error = null; // Clear previous errors
      try {
        const formData = new URLSearchParams();
        formData.append('username', this.username);
        formData.append('password', this.password);

        const response = await axios.post('auth/jwt/login', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        
        const token = response.data.access_token;
        localStorage.setItem('accessToken', token); // Store the token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token in the headers
        this.$router.push('/dashboard'); // Redirect to another page
      } catch (error) {
        if (error.response && error.response.status === 422 && error.response.data && error.response.data.detail) {
          // Handle validation errors
          this.error = error.response.data.detail.map(err => `${err.loc[1]}: ${err.msg}`).join(', ');
        } else {
          // Handle other errors
          this.error = 'An error occurred. Please try again.';
        }
      }
    },
  },
}
</script>

<style scoped>
.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;
}

.container {
  background: #fff;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.signin-content {
  display: flex;
  align-items: center;
}

.signin-image {
  margin-right: 2rem;
}

.signin-form {
  max-width: 400px;
  width: 100%;
}

.form-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.form-group label {
  margin-right: 1rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  text-align: center;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

.social-login {
  margin-top: 2rem;
  text-align: center;
}

.social-login .socials {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.social-login .socials li {
  margin: 0 0.5rem;
}

.social-login .socials li a {
  font-size: 1.5rem;
  color: #333;
  text-decoration: none;
}
</style>
