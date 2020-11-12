<template>
    <div class="login-content">
        <div>
            <img src='../assets/woodtraderlogo.png' style="width: 25%; margin-top: -10%; margin-bottom: 5%;">
        </div>
        <form>
            <div class="form-group">
                <input type="text" v-model="login" class="form-control" placeholder="Login">
            </div>

            <div>
                <input type="password" v-model="password" class="form-control" placeholder="Hasło">

                <button type="submit" @click.prevent="submit()" class="btn btn-success btn-primary btn-md">Zaloguj</button>
            </div>
            
        </form>

        <div class="spazz-footer">
        <div id="spazz-footer"> &copy; 2020 Created by Rafal Szczotka. All rights reserved.
        </div>
    </div>
        
    </div>
</template>

<script>
import axios from '../axios-auth';

export default {
    data() {
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        submit() {
            const formData = {
                login: this.login,
                password: this.password
            };
            this.$store.dispatch('login', {
                login: formData.login,
                password: formData.password
            })
            .then(response => {this.$router.push('/orders')});
        }
    }
}
</script>

<style scoped>
.login-content {
    text-align: center;
    margin-top: 300px;
}
.form-control {
  width: 170px;
  height: 35px;
  margin: auto;
}

.btn {
    margin-top: 15px;
}

.spazz-footer
{
    width: 100%;
    height: 30px;
}

#spazz-footer
{
    height: 30px;
    width: 100%;
    margin-top: 23.6%;
    font-size: 0.70vw;
    font-family: 'Libre Baskerville', serif;
    text-align: center;
    color: #ffffff;
}

a.tilelink
{
    color: #ffffff;
    text-decoration: none;
}
</style>