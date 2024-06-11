<template>
  <div class="">
    <!-- Sign up form -->
    <section class="signup">
      <div class="container">
        <div class="signup-content">
          <div class="signup-form">
            <h2 class="form-title">Sign up</h2>
            <form @submit.prevent="register" class="register-form" id="register-form">
              <div class="form-group">
                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                <input type="text" name="name" v-model="user.first_name" placeholder="First name" required/>
              </div>
              <div class="form-group">
                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                <input type="text" name="name" v-model="user.last_name" placeholder="Last name" required/>
              </div>
              <div class="form-group">
                <label for="email"><i class="zmdi zmdi-email"></i></label>
                <input type="email" name="email" v-model="user.email" placeholder="Your Email" required/>
              </div>
              <div class="form-group">
                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                <input type="password" name="pass" v-model="user.password" placeholder="Password" required/>
              </div>
              <div class="form-group">
                <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                <input type="password" name="re_pass" v-model="user.confirm_password" placeholder="Repeat your password" required/>
              </div>
              <div class="form-group">
                <input type="checkbox" name="agree-term" v-model="user.agree_term" class="agree-term" />
                <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
              </div>
              <div class="form-group form-button">
                <v-btn color="success" type="submit">Register</v-btn>
              </div>
            </form>
          </div>
          <div class="signup-image">
            <figure><img src="../assets/images/signin-image.jpg" alt="sign up image"></figure>
            <RouterLink to="/" class="signup-image-link">I am already member</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '../axios.js'

export default {
  name: 'SignUp',
  data() {
    return {
      user: {
        email: null,
        password: null,
        confirm_password: null,
        first_name: null,
        last_name: null,
        agree_term: false,
      },
    }
  },
  methods: {
    async register() {
      this.error = null; // Clear previous errors
      if (this.user.password !== this.user.confirm_password) {
        this.error = 'Passwords do not match';
        return;
      }

      try {
        const user_data = {
          email: this.user.email,
          password: this.user.password,
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          agree_term: this.user.agree_term,
          is_active: true,
          is_superuser: false,
          is_verified: false,
        }

        const response = await axios.post('auth/register', user_data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        const token = response.data.access_token;
        localStorage.setItem('accessToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
        this.$router.push('/'); // Redirect to another page
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
  }
}
</script>

<style scoped>
.signup {
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

.signup-content {
  display: flex;
  align-items: center;
}

.signup-form {
  max-width: 400px;
  width: 100%;
  margin-right: 2rem;
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

.signup-image {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signup-image figure {
  margin-bottom: 1rem;
}

.signup-image-link {
  color: #333;
  text-decoration: none;
}
</style>
