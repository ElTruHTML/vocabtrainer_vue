<template>
    <the-footer></the-footer>
    <main class="container-md me-auto ms-5 ps-5 pt-5 pb-2 border border-danger d-flex flex-column justify-content-start align-items-start" id="content-logged-user">
        <h1 class="text-secondary mb-5" id="logged-page-headline">Vokabelbox von {{ loggedUserName }}</h1>
        <div class="py-2 d-flex justify-content-start align-items-center bg-primary">
            <iface-btn
            btnColor="btn-green-bg"
            icon="fa-solid fa-play"
            :isSingleButton="true"
            :xl_button="true"
            ></iface-btn>
            <p class="text-secondary my-auto"><strong>Lernmodus starten</strong></p>
        </div>
        <div class="py-2 mb-5 d-flex justify-content-start align-items-center">
            <iface-btn
            @click="$router.push('/dashboard/editsets')"
            btnColor="neutral-btns"
            icon="fa-solid fa-gear"
            :isSingleButton="true"
            :xl_button="true"
            ></iface-btn>
            <p class="text-secondary my-auto"><strong>Sets bearbeiten</strong></p>
        </div>
        <div class="d-flex justify-content-start align-items-center py-2">
            <p class="text-secondary my-auto me-3"><strong>Du hast insgesamt</strong></p>
            <div class="d-flex justify-content-center align-items-center border border-dark rounded sum-indicator py-1 px-5 me-3">
                <p class="text-dark my-auto" id="total-topics-indicator">{{ totalTopics }}</p>
            </div>
            <p class="text-secondary my-auto"><strong>Themen</strong></p>
        </div>
        <div class="d-flex justify-content-start align-items-center py-2">
            <p class="text-secondary my-auto me-3"><strong>Du hast insgesamt</strong></p>
            <div class="d-flex justify-content-center align-items-center border border-dark rounded sum-indicator py-1 px-5 me-3">
                <p class="text-dark my-auto" id="total-vocabs-indicator">{{ totalVocabs }}</p>
            </div>
            <p class="text-secondary my-auto"><strong>Vokabeln</strong></p>
        </div>
        <div class="d-flex justify-content-start align-items-center mt-auto mb-5">
            <button @click="logout" class="btn border border-secondary rounded-pill me-3 px-3" id="btn-logout">Ausloggen</button>
            <button class="btn border border-dark rounded-pill px-3 btn-delete-account" id="btn-delete-account">Account löschen</button>
        </div>
    </main>

    
    <div class="position-absolute top-0 start-0 vh-100 vw-100 popup_delete_backdrop popup-hidden" id="popup_delete_backdrop"></div>
    <div class="position-absolute top-50 start-50 popup_delete_topic popup-hidden vocab-card rounded-3 px-4 py-3 d-flex flex-column justify-content-start align-items-start" id="popup_delete_topic">
        
        <h3 class="mb-5">Thema löschen</h3>
        
        <p>Sicher, dass du das Thema <strong></strong> löschen willst?</p>
        <p class="mb-auto">Damit gehen <strong></strong> Vokabeln ebenfalls verloren</p>
        
        
        <div class="container-fluid d-flex justify-content-start align-items-center final-button-container mb-3">
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            loggedUserName  : "",
            totalTopics     : null,
            totalVocabs     : null,
        };
    },
    async beforeMount() {
        console.log(this.$store.state);
        let initial_logincheck = await this.$store.dispatch("checkUserLogged");
        if(initial_logincheck.success) {
            this.$store.commit("login", initial_logincheck.logged_user);
            this.loggedUserName = initial_logincheck.logged_user;
        }
        else {
            console.error("USER NICHT EINGELOGGT!");
        }
        if(this.$store.getters.getLoggedState)
        {
            await this.getTotals();
        }
        else {
            this.$router.push("/");
        }
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
        async logout() {
            let logoutrequest = {task: "logout_user"};
            let logoutresult = await this.$store.dispatch("post", logoutrequest);
            console.table(logoutresult);
            if(logoutresult.success) {
                this.$store.commit("setTotals", logoutresult);
                this.totalTopics    = null;
                this.totalVocabs    = null;
                this.loggedUserName = "";
                this.$store.commit("logout");
                this.$store.commit("clearTopicStats");
                // this.$router.push("/");
            }
            else {
                console.error("TOTALS NICHT GEHOLT!");
            }
        },

    },
};
</script>



<style scoped>

.sum-indicator {
    background-color: var(--hr-color);
}
.btn-delete-account {
    background-color: var(--delete-btn-bg);
}
.btn-delete-account:hover {
    background-color: var(--delete-btn-bg);
}
.popup_delete_topic {
    z-index: 10;
    width: clamp(200px, 40vw, 500px);
    min-height: 300px;
    transition: all .3s ease;
}
.popup_delete_backdrop {
    z-index: 7;
    background-color: rgba(0, 0, 0, 0.767);
    transition: all .3s ease;
}
.popup_delete_topic.popup-shown,
.popup_delete_backdrop.popup-shown {
    pointer-events: auto;
    opacity: 1;
}
.popup_delete_topic.popup-hidden,
.popup_delete_backdrop.popup-hidden {
    pointer-events: none;
    opacity: 0;
}
.popup_delete_topic.popup-hidden {
    transform: translate(-50%, -60%);
}
.popup_delete_topic.popup-shown {
    transform: translate(-50%, -50%);
}
</style>