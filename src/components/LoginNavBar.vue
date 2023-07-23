<template>
    <div>
        
        <b-form inline @submit.prevent="Login">
            

            <b-form-input
                id="Username"
                size="sm" class="mr-sm-2" placeholder="Username"
                v-model="username"
                type="text"
                ></b-form-input>


                <b-form-input
                id="Password"
                type="password"
                size="sm" class="mr-sm-2" placeholder="Password"
                v-model="password"
                ></b-form-input>

            <b-button
            type="submit"
            variant="primary"
            size="sm" class="my-2 my-sm-0" id="sub-but"
            >Login</b-button>


        </b-form>



    </div>
</template>

<script>

export default {
    name: "LoginNavBar",
    data() {
        return {
            username: "",
            password: "",
        };
  },
    methods: {
        async Login() {
        try {
            
            const response = await this.axios.post(
            this.$root.store.server_domain +"/Login",
            {
                username: this.username,
                password: this.password
            }
            );

            let firstname = await this.axios.get(
            this.$root.store.server_domain +"/users/privateName")
            this.$root.store.shared_data.login(this.username, firstname);
            this.$emit('logged')
            this.$root.toast("Login", "User logged in successfully", "success");
            this.$router.push("/");
            // location.reload();

        } catch (err) {
            console.log(err.response);
            this.$root.toast("Login", "User failed to login.", "danger");
            this.username = "";
            this.password = "";
            this.$router.push("/Login");

        }
        },
        

  }
}
</script>

<style>
#sub-but
{
    background-color: #37713f;
    border-color: #37713f;
}

#sub-but:hover
{
    background-color: #965b38ab;
    border-color: #965b38ab;
}


</style>