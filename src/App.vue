<template>
  <router-view></router-view>
</template>

<script>

export default {
  provide() {
    return {
      clt_isDataComplete: this.clt_isDataComplete,
      srv_isDataComplete: this.srv_isDataComplete,
      srv_validSigns: this.srv_validSigns,
      srv_checkForDoubles: this.srv_checkForDoubles,
      trytoLogin: this.trytoLogin,
    };
  },
  methods: {
    clt_isDataComplete(req) {
      let result = {alerts: []};
      let wrongs = 0;
      for(let input in req.entries) {
          if(req.entries[input] === "") {
              wrongs++;
          } 
      }
      if(wrongs === 0) {
          result.success = true;
      } else {
          result.success = false;
          result.alerts.push(["Unvollständig", "Es sind leere Einträge vorhanden"]);
      }
      return result;
    },
    /**Prüft SERVERSETITIG ob leere Einträge vorhanden sind:*/
    async srv_isDataComplete(userdata) {
        userdata.task = "vali_check_if_empty";
        // userdata.task = "test_vali_check_if_empty";
        let testresult = await this.$store.dispatch("post", userdata);
        return testresult;
        
    },
    async srv_validSigns(userdata) {
        userdata.task = "vali_check_if_valid_signs";
        // userdata.task = "test_vali_check_if_valid_signs";
        let testresult = await this.$store.dispatch("post", userdata);
        return testresult;
    },
    async srv_checkForDoubles(userdata) {
        userdata.task = "vali_check_for_doubles";
        // userdata.task = "test_vali_check_for_doubles";
        let testresult = await this.$store.dispatch("post", userdata);
        return testresult;
    },
    async trytoLogin(username) {
      console.error(username);
        let loginobject = {trytologinUsername: username, task: "login_user"};
        let loginresult = await this.$store.dispatch("post", loginobject);
        return loginresult;
    },
  },
}
</script>

<style>
::selection{
    background-color: var(--hr-color);
    color: #2F4858;
}
.bg-primary {
    background-color: #BB818F !important;
}
.bg-secondary {
    background-color: #2F4858 !important;
}
.text-secondary {
    color: #2F4858 !important;
}
.border-secondary {
    border-color: #2F4858 !important;
}
/* BUTTONS: */
.neutral-btns {
    background-color: var(--neutral-btn-bg-blue);
}
.neutral-btns:hover {
    background-color: var(--neutral-btn-bg-blue) !important;
}
#content-logged-user {
    height: 97vh;
}
main h1,
main h2 {
    text-shadow: 5px 5px 5px var(--hr-color);
}
svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.3rem;
    color: var(--fontawesome-color);
}
p button svg,
.topiccard button i,
.vocabcard button i {
    font-size: 1rem;
}
</style>
