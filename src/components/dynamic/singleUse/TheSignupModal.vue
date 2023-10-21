<template>
    <div class="modal fade" id="modal_for_signup" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal_for_signup" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Account anlegen</h1>
              <button @click="closeSignupModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="lead fs-6 lh-1"><small>Mit diesem Account kannst du alle Anwendungen von Kamedin nutzen</small></p>
                <p class="lead fs-6 lh-1"><small>Check <a target="_blank" href="https://www.kamed.in">sein Portfolio ab,</a> um alle Anwendungen einzusehen</small></p>
                <hr>
                <form @submit.prevent="signup_reaction" class="container-fluid d-flex flex-column justify-content-between align-items-center">

                    <div class="input-label-box border border-2 border-secondary rounded w-100 position-relative">
                        <!-- <input type="text" class="w-100 position-absolute bottom-0 s-0 pt-3" name="new_username" id="new_username" maxlength="20" required> -->
                        <input
                            @focus="focusInput('name')"
                            @blur="blurInput('name')"
                            v-model="usergivenname"
                            :class="{'has-values': nameHasVal}"
                            class="w-100 position-absolute bottom-0 s-0 pt-3" type="text" name="new_username" id="new_username">
                        <label for="new_username" class="position-absolute top-0 s-0 lh-1 w-100 ps-1 text-secondary">NUTZERNAME</label>
                    </div>
                    <small class="me-auto text-muted mb-4">3-20 Zeichen lang. Vermeide Sonderzeichen außer - und _</small>

                    <div class="input-label-box border border-2 border-secondary rounded w-100 position-relative">
                        <!-- <input type="password" class="w-100 position-absolute bottom-0 s-0 pt-3" name="new_password" id="new_password" minlength="8" required> -->
                        <input
                            @focus="focusInput('pw')"
                            @blur="blurInput('pw')"
                            v-model="usergivenpw"
                            :class="{'has-values': pwHasVal}"
                            type="password" class="w-100 position-absolute bottom-0 s-0 pt-3" name="new_password" id="new_password">
                        <label for="new_password" class="position-absolute top-0 s-0 lh-1 w-100 ps-1 text-secondary">PASSWORT</label>
                    </div>
                    <small class="me-auto text-muted mb-4">Mind. 8 Zeichen, muss Zahlen, Buchstaben und Sonderezichen enthalten</small>

                    <div class="input-label-box border border-2 border-secondary rounded w-100 position-relative mb-4">
                        <!-- <input type="password" class="w-100 position-absolute bottom-0 s-0 pt-3" name="new_password_repeated" id="new_password_repeated" minlength="8" required> -->
                        <input
                            @focus="focusInput('rep')"
                            @blur="blurInput('rep')"
                            v-model="repeatedpw"
                            :class="{'has-values': repHasVal}"
                            type="password" class="w-100 position-absolute bottom-0 s-0 pt-3" name="new_password_repeated" id="new_password_repeated">
                        <label for="new_password_repeated" class="position-absolute top-0 s-0 lh-1 w-100 ps-1 text-secondary">PASSWORT WIEDERHOLEN</label>
                    </div>
                    
                    <div class="input-label-box border border-2 border-secondary rounded w-100 position-relative">
                        <!-- <input type="email" class="w-100 position-absolute bottom-0 s-0 pt-3" name="new_email" id="new_email" required> -->
                        <input
                            @focus="focusInput('email')"
                            @blur="blurInput('email')"
                            v-model="usergivenemail"
                            :class="{'has-values': emailHasVal}"
                            type="email" class="w-100 position-absolute bottom-0 s-0 pt-3" name="new_email" id="new_email">
                        <label for="new_email" class="position-absolute top-0 s-0 lh-1 w-100 ps-1 text-secondary">E-MAIL</label>
                    </div>
                    <small class="me-auto text-muted mb-4">Gib eine gültige Email - Adresse an</small>
                    <div v-if="showAlerts === true && resultobject.alerts.length > 0" class="container-fluid p-0 m-0">
                        <alert-comp  v-for="alert in resultobject.alerts"
                                :key="alert[0]"
                                :keyword="alert[0]"
                                :text="alert[1]"
                                alert_type="danger"></alert-comp>
                    </div>
                    <div class="container-fluid d-flex justify-content-end-align-items-center final-button-container">
                        <button @click="closeSignupModal" type="button" class="btn rounded rounded-pill border border-secondary ms-auto me-3" data-bs-dismiss="modal" ref="closemodal">Schließen</button>
                        <input type="submit" value="Registrieren" class="btn neutral-btns rounded rounded-pill border border-dark">
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
    export default {
        data() {
            return {
                showAlerts          : false,
                usergivenname       : "",
                usergivenpw         : "",
                repeatedpw          : "",
                usergivenemail      : "",
                nameHasVal          : false,
                pwHasVal            : false,
                repHasVal           : false,
                emailHasVal         : false,
                resultobject        : {alerts: [], name: "TheSignupModal.vue"},
            };
        },
        inject: [
            "clt_isDataComplete",
            "srv_isDataComplete",
            "srv_validSigns",
            "srv_checkForDoubles",
            "trytoLogin",
        ],
        methods: {
            async signup_reaction() {
                this.resetAlerts();
                let req = {
                    entries: {
                        preferredUsername           : this.usergivenname,
                        preferredPassword           : this.usergivenpw,
                        preferredPasswordRepeated   : this.repeatedpw,
                        preferredEmail              : this.usergivenemail,
                    },
                };
                let result = this.clt_isDataComplete(req);
                if(result.success === false) {
                    this.showAlerts = true;
                    this.resultobject.alerts = [...result.alerts];
                    return;
                }
                else {
                    this.resetAlerts();
                }
                let SRV_dataComplete = await this.srv_isDataComplete(req);
                if(!SRV_dataComplete.success) {
                    this.showAlerts = true;
                    for(let i = 0 ; i < SRV_dataComplete.reasonsForInvalid.length ; i++)
                    {
                        this.resultobject.alerts.push([SRV_dataComplete.keywordsForInvalid[i], SRV_dataComplete.reasonsForInvalid[i]]);

                    }
                    return;
                }
                let SRV_validSigns = await this.srv_validSigns(req);
                if(!SRV_validSigns.success) {
                    this.showAlerts = true;
                    for(let i = 0 ; i < SRV_validSigns.reasonsForInvalid.length ; i++)
                    {
                        this.resultobject.alerts.push([SRV_validSigns.keywordsForInvalid[i], SRV_validSigns.reasonsForInvalid[i]]);

                    }
                    return;
                }
                let SRV_doubles = await this.srv_checkForDoubles(req);
                if(!SRV_doubles.success) {
                    this.showAlerts = true;
                    for(let i = 0 ; i < SRV_doubles.reasonsForInvalid.length ; i++)
                    {
                        this.resultobject.alerts.push([SRV_doubles.keywordsForInvalid[i], SRV_doubles.reasonsForInvalid[i]]);

                    }
                    return;
                }
                req.task = "create_user_in_db";
                let creationResult = await this.$store.dispatch("post", req);
                if(!creationResult.success) {
                    this.showAlerts = true;
                    for(let i = 0 ; i < creationResult.reasonsForInvalid.length ; i++)
                    {
                        this.resultobject.alerts.push([creationResult.keywordsForInvalid[i], creationResult.reasonsForInvalid[i]]);

                    }
                    return;
                }
                this.$refs.closemodal.click();
                console.log(req);
                let loginresult = await this.trytoLogin(req.entries.preferredUsername);
                console.log(loginresult);
                if(loginresult.success) {
                    this.$store.commit("login", req.entries.preferredUsername);
                    this.$router.push("/dashboard");
                } else {
                    this.$store.commit("logout");
                    this.$router.push("/");
                }
            },
            resetAlerts() {
                this.showAlerts = false;
                this.resultobject.alerts.length = 0;
            },
            resetUsergivenData() {
                this.usergivenname = "";
                this.usergivenpw = "";
                this.repeatedpw = "";
                this.usergivenemail = "";
                this.nameHasVal = false;
                this.pwHasVal = false;
                this.repHasVal = false;
                this.emailHasVal = false;
            },
            closeSignupModal() {
                this.resetAlerts();
                this.resetUsergivenData();
            },
            focusInput(attr) {
                this.showAlerts = false;
                switch(attr) {
                    case "name":
                            this.nameHasVal = true;
                        break;
                    case "pw":
                            this.pwHasVal = true;
                        break;
                    case "rep":
                            this.repHasVal = true;
                        break;
                    case "email":
                            this.emailHasVal = true;
                        break;
                }
            },
            blurInput(attr) {
                this.showAlerts = false;
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
                    case "rep":
                        if(this.repeatedpw.trim() !== "") {
                            this.repHasVal = true;
                        } else {
                            this.repHasVal = false;
                            this.repeatedpw = "";
                        }
                        break;
                    case "email":
                        if(this.usergivenemail.trim() !== "") {
                            this.emailHasVal = true;
                        } else {
                            this.emailHasVal = false;
                            this.usergivenemail = "";
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