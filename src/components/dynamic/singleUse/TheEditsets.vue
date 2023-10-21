<template>
    <the-footer></the-footer>
    <main class="container-md me-auto ms-5 ps-5 pt-5 pb-2 border border-danger d-flex flex-column justify-content-start align-items-start" id="content-logged-user">

        <div class="row editsets-header-row p-0 border border-white container-fluid">
            <div class="col-6 h-100 border border-danger">
                <h2 class="text-secondary mb-5">Deine Themen</h2>
            </div>
            <div class="col-6 h-100 border border-danger">
                <h2 class="text-secondary mb-5">Deine Vokabeln</h2>
            </div>
        </div>

        <div class="row editsets-card-row p-0 border border-white container-fluid">
            <div
            class="col-6 d-flex flex-column justify-content-center topic-col border border-info"
            :class="[{'align-items-start': getTotalTopics === 0}, {'align-items-center': getTotalTopics > 0}]">
                <TheNoTopicText v-if="getTotalTopics === 0"/>
                <topiccard-wrapper v-else></topiccard-wrapper>
            </div>
            <div class="col-6 vocab-col border border-warning d-flex flex-column justify-content-center align-items-start"></div>
        </div>
        <div class="row editsets-button-row p-0 border border-white container-fluid d-flex justify-content-center align-items-center">
            <footer-btn
            @click="$router.push('/dashboard')"
            btnColor="btn-green-bg"
            buttonLabel="Start"
            icon="fa-solid fa-house"
            :xl_button="true"></footer-btn>
            <footer-btn
            btnColor="btn-blue-bg"
            buttonLabel="Neues Thema"
            icon="fa-solid fa-plus"
            :xl_button="true"></footer-btn>
        </div>

    </main>
</template>

<script>
import TheNoTopicText from '../../static/TheNoTopicText.vue';
import TopiccardWrapper from './TopiccardWrapper.vue';
export default {
    components: {
        TheNoTopicText,
        TopiccardWrapper,
    },
    computed: {
        getTotalTopics() {
            return this.$store.state.USER_INFO_totaltopics;
        }
    },
    async beforeMount() {
        console.clear();
        console.log(this.$store.state);
        let initial_logincheck = await this.$store.dispatch("checkUserLogged");
        if(initial_logincheck.success) {
            this.$store.commit("login", initial_logincheck.logged_user);
            this.loggedUserName = initial_logincheck.logged_user;
        }
        else {
            console.error("USER NICHT EINGELOGGT!");
            this.$router.push("/");
        }

        if(this.$store.getters.getLoggedState)
        {
            await this.getTotals();
        }

        let allStats = await this.$store.dispatch("post", {task: "fetch_all_topic_stats"});
        this.$store.commit("setTopicStats", allStats);
        console.log(this.$store.state);
    },
    methods: {
        async getTotals() {
            let totalsrequest = {task: "get_totals"};
            let totalresult = await this.$store.dispatch("post", totalsrequest);
            if(totalresult.success) {
                this.$store.commit("setTotals", totalresult);
                this.totalTopics = totalresult.totalTopics;
                this.totalVocabs = totalresult.totalVocabs;
            }
            else {
                console.error("TOTALS NICHT GEHOLT!");
            }
        },
    },
};
</script>


<style scoped>
.editsets-card-row,
.editsets-body-row,
.add-vocab-body-row {
    min-height: 80%;
}
</style>