
//CUSTOM STYLESHEETS:
import "./assets/style/my-colors.css"
import "./assets/style/bs-overwrite.css";
import "./assets/style/my-styles.css"

//CUSTOM JAVASCRIPT:
// import {post} from "./assets/js/ajax/ajax.js";

//BOOTSTRAP:
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//FONT AWESOME:
import { library } from '@fortawesome/fontawesome-svg-core'; /* import the fontawesome core */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; /* import font awesome icon component */
//----- import specific icons:
import
{ faPlay, faGear, faHome, faPlus, faCaretRight, faCaretLeft, faPen, faTrash }
from '@fortawesome/free-solid-svg-icons';
/* add icons to the library */
library.add(faPlay);
library.add(faGear);
library.add(faHome);
library.add(faPlus);
library.add(faCaretRight);
library.add(faCaretLeft);
library.add(faPen);
library.add(faTrash);

//CUSTOM COMPONENTS:
import TheFooter from "./components/static/TheFooter.vue";
import AlertComp from "./components/dynamic/multiUse/AlertComp.vue";
import TheDashboard from "./components/dynamic/singleUse/TheDashboard.vue";
import TheIndex from "./components/static/TheIndex.vue";
import InterfaceButton from "./components/dynamic/multiUse/InterfaceButton.vue";
import TheEditsets from "./components/dynamic/singleUse/TheEditsets.vue";
import FooterButton from "./components/dynamic/multiUse/FooterButton.vue";
import TopicCardES from './components/dynamic/singleUse/TopicCardES.vue';


//VUE COMPONENTS:
import { createApp } from 'vue';
import App from './App.vue';


//VUE-X
import {createStore} from "vuex";
const store = createStore({
    state() {
        return {
            API                     : "http://localhost/vue_projects/vocabtrainer/backend/main.php",
            LOG_INFO_islogged       : false,
            LOG_INFO_name           : null,
            USER_INFO_totaltopics   : null,
            USER_INFO_totalvocabs   : null,
            USER_topicArray         : [],
            USER_tIdx               : 0,
            USER_vIdx               : 0,
            USER_vocabArray         : [],
        };
    },
    mutations: {
        logout(state) {
            state.LOG_INFO_islogged     = false;
            state.LOG_INFO_name         = null;
            state.USER_INFO_totaltopics = null;
            state.USER_INFO_totalvocabs = null;
            router.push("/");
        },
        login(state, username) {
            state.LOG_INFO_islogged = true;
            state.LOG_INFO_name = username;
        },
        setTotals(state, result) {
            state.USER_INFO_totaltopics = result.totalTopics;
            state.USER_INFO_totalvocabs = result.totalVocabs;
        },
        setTopicStats(state, fetchedTopics) {
            state.USER_topicArray = [...fetchedTopics.topics];
        },
        clearTopicStats(state) {
            state.USER_topicArray.length = 0;
            state.USER_vocabArray.length = 0;
            state.USER_tIdx = 0;
            state.USER_vIdx = 0;
        },
    },
    actions: {
        async post(context, dataobject) {
          let summary = {};
          let req = undefined;
          if(dataobject)
          {
              req = {
                  method: "post",
                  body: JSON.stringify(dataobject),
                  credentials: "include",
                  headers: {
                      "Content-Type": "application/json",
                  },
              };
              //###############################################
              let response = await fetch(context.state.API, req);
              //###############################################
              if(!response.ok) {
                  setTimeout(() => {
                    console.error("IRGENDEIN FEHLER MIT DER REQUEST");
                    //   location.href = "./sites/error.html";
                  }, 1000);
              } else {
                  let resolvedResponse = await response.json();
                  resolvedResponse.success === true ?
                  summary.success = true :
                  summary.success = false;
                  if(!summary.success) {
                    summary.reasonsForInvalid = [];
                    summary.keywordsForInvalid = [];
                    resolvedResponse.reasonsForInvalid.forEach(reason => {
                      summary.reasonsForInvalid.push(reason);
                    });
                    resolvedResponse.keywordsForInvalid.forEach(keyword => {
                      summary.keywordsForInvalid.push(keyword);
                    });
                  }
                  switch(dataobject.task) {
                    case "login_user":
                    case "is_a_user_logged":
                      summary.logged_user = resolvedResponse.logged_user;
                      break;
                    case "get_totals":
                        summary.totalTopics = resolvedResponse.totalTopics;
                        summary.totalVocabs = resolvedResponse.totalVocabs;
                        break;
                    case "fetch_all_topic_stats":
                        summary.topics = resolvedResponse.allTopics;
                        break;
                    default:
                      break;
                  }
              }
          } else {
              // res = await fetch(url);
          }
          
          return summary;
        },
        async checkUserLogged() {
            let checkloggedobject = {task: "is_a_user_logged"};
            let checkloggedresult = await this.dispatch("post", checkloggedobject);
            return checkloggedresult;
        },
    },
    getters: {
        tIndex(state) {
            return state.USER_tIdx;
        },
        getTopicArray(state) {
            return state.USER_topicArray;
        },
        getLoggedState(state) {
            return state.LOG_INFO_islogged;
        },
        getLoggedUsernameState(state) {
            return state.LOG_INFO_name;
        },
        getTopicsCountState(state) {
            return state.USER_INFO_totaltopics;
        },
        getVocabsCountState(state) {
            return state.USER_INFO_totalvocabs;
        },
    },
});

//VUE-ROUTER:
import {createRouter, createWebHistory} from "vue-router";
let router = createRouter({
    history: createWebHistory(),
    routes:
    [
        {
            path: "/",
            component: TheIndex,
        },
        {
            path: "/dashboard",
            component: TheDashboard,
        },
        {
            path: "/dashboard/editsets",
            component: TheEditsets,
        },
    ],
});


let app = createApp(App)
// .component("font-awesome-icon", FontAwesomeIcon)
// .mount('#app');
app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("alert-comp", AlertComp);
app.component("the-footer", TheFooter);
app.component("iface-btn", InterfaceButton);
app.component("edit-sets", TheEditsets);
app.component("footer-btn", FooterButton);
app.component("topic-card-es", TopicCardES);
app.mount("#app");

