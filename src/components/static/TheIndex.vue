<template>
  <TheSignupModal></TheSignupModal>
  <TheLoginModal></TheLoginModal>
  <the-footer></the-footer>
  <TheHeader></TheHeader>
  <TheNav></TheNav>
  <TheArticle></TheArticle>
</template>


<script>
import TheHeader from "./TheHeader.vue";
import TheNav from "./TheNav.vue";
import TheArticle from "./TheArticle.vue";
import TheSignupModal from "../dynamic/singleUse/TheSignupModal.vue";
import TheLoginModal from "../dynamic/singleUse/TheLoginModal.vue";
export default {
  components: {
    TheHeader,
    TheNav,
    TheArticle,
    TheSignupModal,
    TheLoginModal,
  },
  async beforeMount() {
      let initial_logincheck = await this.$store.dispatch("checkUserLogged");
      if(initial_logincheck.success) {
        console.log("EINGELOGGT; SOLL WEITERLEITEN AUF /DASHBOARD");
        this.$router.push("/dashboard");
      }
  },
};
</script>