<template>
    <div class="vocab-card topiccard rounded-3">
        <div class="row container-fluid border border-danger body m-0 p-0">
            <div class="col-2 border border-black d-flex flex-column justify-content-end align-items-center">
                <iface-btn
                class="mb-2"
                btnColor="btn-blue-bg"
                icon="fa-solid fa-plus"
                :isSingleButton="false"
                :md_button="true"></iface-btn>

                <iface-btn
                iconsize="xs"
                btnColor="btn-orange-bg"
                icon="fa-solid fa-pen"
                :isSingleButton="false"
                :md_button="true"></iface-btn>

                <iface-btn
                iconsize="xs"
                class="my-2"
                btnColor="btn-red-bg"
                icon="fa-solid fa-trash"
                :isSingleButton="false"
                :md_button="true"></iface-btn>

            </div>
            <div class="col-8 border border-white d-flex justify-content-center align-items-center p-2">
                <p>{{ topicName }}</p>
            </div>
            <div class="col-2 border border-black d-flex flex-column justify-content-around align-items-center">
                <div class="level-indicator rounded-circle p-2 lvl-indi4"></div>
                <div class="level-indicator rounded-circle p-2 lvl-indi3"></div>
                <div class="level-indicator rounded-circle p-2 lvl-indi2"></div>
                <div class="level-indicator rounded-circle p-2 lvl-indi1"></div>
                <div class="level-indicator rounded-circle p-2 lvl-indi0"></div>
            </div>
        </div>
        <div class="container-fluid border border-warning footer m-0 p-0 d-flex justify-content-between align-items-center">
            <p class="small ps-1 my-auto">Vokabelkarten: <span></span></p>
            <p class="small pe-1 my-auto"><span class="current-topic-indicator"></span>/<span class="total-topics-indicator"></span></p>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        topicName() {
            return this.$store.getters.getTopicArray[this.$store.getters.tIndex].name;
        }
    },
};
</script>

<style scoped>
.topiccard .btn-orange-bg svg{
    transform: scale(.1);
}
.vocab-card {
    background-color: var(--card-bg);
    box-shadow: 10px 10px 30px 5px #3333336c;
}
.vocab-card button {
    border: 1px solid black;
}
.level-indicator {
    border: 1px solid #333;
    background-color: transparent;
}
.lvl-indi4.set-lvl {
    background-color: var(--lvl4);
}
.lvl-indi3.set-lvl {
    background-color: var(--lvl3);
}
.lvl-indi2.set-lvl {
    background-color: var(--lvl2);
}
.lvl-indi1.set-lvl {
    background-color: var(--lvl1);
}
.lvl-indi0.set-lvl {
    background-color: var(--lvl0);
}
.topiccard {
    height: 100%;
    width: 100%;
}
.vocabcard .header {
    height: 10%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}
.topiccard .body{
    height: 90%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}
.topiccard .footer {
    height: 10%;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}
</style>