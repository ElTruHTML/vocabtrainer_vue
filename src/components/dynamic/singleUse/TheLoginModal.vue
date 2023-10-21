<template>
    <div class="modal fade" id="modal_for_login" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal_for_login" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Anmelden</h1>
            <button @click="closeLoginModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="closemodal"></button>
          </div>
              <form @submit.prevent="login_reaction" class="container-fluid d-flex flex-column justify-content-between align-items-center">

                  <div class="input-label-box border border-2 border-secondary rounded w-100 position-relative my-4">
                      <!-- <input type="text" class="w-100 position-absolute bottom-0 s-0 pt-3" name="login_username" id="login_username" minlength="8" required> -->
                      <input 
                        @focus="focusInput('name')"
                        @blur="blurInput('name')"
                        v-model="usergivenname"
                        :class="{'has-values': nameHasVal}"
                        type="text" class="w-100 position-absolute bottom-0 s-0 pt-3" name="login_username" id="login_username" required>
                      <label for="login_username" class="position-absolute top-0 s-0 lh-1 w-100 ps-1 text-secondary">NUTZERNAME</label>
                  </div>
                  
                  <div class="input-label-box border border-2 border-secondary rounded w-100 position-relative mb-5">
                      <input 
                        @focus="focusInput('pw')"
                        @blur="blurInput('pw')"
                        v-model="usergivenpw"
                        :class="{'has-values': pwHasVal}"
                        type="password" class="w-100 position-absolute bottom-0 s-0 pt-3" name="login_password" id="login_password" required>
                      <label for="login_password" class="position-absolute top-0 s-0 lh-1 w-100 ps-1 text-secondary">PASSWORT</label>
                  </div>
                  
                  <div v-if="showAlerts === true && resultobject.alerts.length > 0" class="container-fluid p-0 m-0">
                        <alert-comp  v-for="alert in resultobject.alerts"
                                :key="alert[0]"
                                :keyword="alert[0]"
                                :text="alert[1]"
                                alert_type="danger"></alert-comp>
                    </div>

                  <div class="container-fluid d-flex justify-content-end-align-items-center final-button-container mb-3">
                      <button type="button" class="btn rounded rounded-pill border border-secondary me-auto">Passwort vergessen?</button>
                      <button @click="closeLoginModal" type="button" class="btn rounded rounded-pill border border-secondary ms-auto me-3" data-bs-dismiss="modal">Schließen</button>
                      <input type="submit" value="Anmelden" class="btn neutral-btns rounded rounded-pill border border-dark">
                  </div>
              </form>
          </div>
        </div>
      </div>
</template>

<script>

export default {
    data() {
        return {
            usergivenname   : "",
            usergivenpw     : "",
            nameHasVal      : false,
            pwHasVal        : false,
            showAlerts      : false,
            resultobject    : {alerts: [], name: "TheLoginModal.vue"},
        };
    },
    inject: [
        "clt_isDataComplete",
        "srv_isDataComplete",
        "srv_validSigns",
        "trytoLogin",
    ],
    methods: {
        async login_reaction() {
            this.resetAlerts();
            let req = {};
            req.trytologinUsername = this.usergivenname;
            req.trytologinPassword = this.usergivenpw;

            let logindatacomplete = await this.srv_isDataComplete(req);
            if(!logindatacomplete.success) {
                this.showAlerts = true;
                for(let i = 0 ; i < logindatacomplete.reasonsForInvalid.length ; i++)
                {
                    this.resultobject.alerts.push([logindatacomplete.keywordsForInvalid[i], logindatacomplete.reasonsForInvalid[i]]);

                }
                return;
            }
            let logindatavalidsigns = await this.srv_validSigns(req);
            if(!logindatavalidsigns.success) {
                this.showAlerts = true;
                for(let i = 0 ; i < logindatavalidsigns.reasonsForInvalid.length ; i++)
                {
                    this.resultobject.alerts.push([logindatavalidsigns.keywordsForInvalid[i], logindatavalidsigns.reasonsForInvalid[i]]);

                }
                return;
            }


            let userexistresponse = await this.srv_doesUserExist(req);
            if(!userexistresponse.success) {
                this.showAlerts = true;
                for(let i = 0 ; i < userexistresponse.reasonsForInvalid.length ; i++)
                {
                    this.resultobject.alerts.push([userexistresponse.keywordsForInvalid[i], userexistresponse.reasonsForInvalid[i]]);

                }
                return;
            }
            let passwordmatchresponse = await this.srv_passwordMatch(req);
            if(!passwordmatchresponse.success) {
                this.showAlerts = true;
                for(let i = 0 ; i < passwordmatchresponse.reasonsForInvalid.length ; i++)
                {
                    this.resultobject.alerts.push([passwordmatchresponse.keywordsForInvalid[i], passwordmatchresponse.reasonsForInvalid[i]]);

                }
                return;
            }
            req.task = "login_user";
            let logintry = await this.trytoLogin(this.usergivenname);
            if(logintry.success) {
                this.$refs.closemodal.click();
                this.$store.commit("login", this.usergivenname);
                this.$router.push("/dashboard");
            }
            
        },
        async srv_passwordMatch(logindata) {
            logindata.task = "does_password_match";
            let testresult = await this.$store.dispatch("post", logindata);
            console.log("Validator srv_does_password_match");
            console.log("task: ", logindata.task);
            console.log("testresult:", testresult);
            return testresult;
        },
        async srv_doesUserExist(userdata) {
            userdata.task = "vali_does_user_exist";
            // userdata.task = "test_vali_does_user_exist";
            let testresult = await this.$store.dispatch("post", userdata);
            console.log("Validator srv_doesUserExist");
            console.log("task: ", userdata.task);
            console.log("testresult:", testresult);
            return testresult;
        },
        resetUsergivenData() {
            this.usergivenname  = "";
            this.usergivenpw    = "";
            this.nameHasVal     = false;
            this.pwHasVal       = false;
        },
        resetAlerts() {
            this.showAlerts = false;
            this.resultobject.alerts.length = 0;
        },
        closeLoginModal() {
            this.resetAlerts();
            this.resetUsergivenData();
        },
        focusInput(attr) {
            // this.showAlerts = false;
            switch(attr) {
                case "name":
                        this.nameHasVal = true;
                    break;
                case "pw":
                        this.pwHasVal = true;
                    break;
            }
        },
        blurInput(attr) {
            // this.showAlerts = false;
            switch(attr) {
                case "name":
                    if(this.usergivenname.trim() !== "") {
                        this.nameHasVal = true;
                    } else {
                        this.nameHasVal = false;
                        this.usergivenname = "";
                    }
                    break;
                case "pw":
                    if(this.usergivenpw.trim() !== "") {
                        this.pwHasVal = true;
                    } else {
                        this.pwHasVal = false;
                        this.usergivenpw = "";
                    }
                    break;
            }
        },
    },
};
</script>



<style scoped>
.input-label-box {
    min-height: 50px;
    overflow: hidden;
}
.input-label-box input {
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    transition: background-color .3s;
}
.input-label-box label {
    transition: all .2s;
    border: none;
    height: 100%;
    font-size: 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    pointer-events: none;
}
.input-label-box input.has-values {
    background-color: var(--hr-color);
    background-color: #BB818F;
    background-blend-mode: lighten;
}
.input-label-box input.has-values ~ label {
    height: 40%;
    font-size: 16px;
}
.modal {
    /* ################ist die Farbe von --hr-color */
    background-color: rgba(173, 103, 120, .2);
}
.modal-content {
    background-color: var(--card-bg);
}
.modal-header {
    border-bottom-color: var(--card-red-line);
}
.modal-footer {
    border-top-color: var(--card-red-line);
}
.modal form small {
    font-size: 10px;
}
.modal form .alert-danger p {
    font-size: 10px !important;
}
.alert-dismissible .btn-close {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}
</style>