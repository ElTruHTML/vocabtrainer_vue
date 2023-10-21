<template>
    <div class="topic-slider-wrapper w-100 border border-dark d-flex justify-content-center align-items-center">
        <div class="border border-danger slider-arrow-wrapper d-flex justify-content-center align-items-center">
            <iface-btn
            btnColor="neutral-btns"
            icon="fa-solid fa-caret-left"
            :isSingleButton="false"
            :md_button="true"
            :sm_size="true"></iface-btn>
        </div>
        <div class="border border-white slider-card-wrapper">
            <!-- <div class="hidden-wrapper border border-info d-flex justify-content-start align-items-center"> -->
                <!-- HIER KOMMEN ALLE KARTEN REIN! -->
            <!-- </div> -->
            <topic-card-es></topic-card-es>
        </div>
        <div class="border border-danger slider-arrow-wrapper d-flex justify-content-center align-items-center">
            <iface-btn
            btnColor="neutral-btns"
            icon="fa-solid fa-caret-right"
            :isSingleButton="false"
            :md_button="true"></iface-btn>
        </div>
    </div>
</template>


<script>
export default {
    mounted() {
        console.log("MOUNTED TOPICCARDWRAPPER");
        console.table(this.topicArray);
    },
};
</script>

<style scoped>
.editsets-header-row
.add-vocab-header-row {
    height: 10%;
}
.editsets-card-row,
.editsets-body-row,
.add-vocab-body-row {
    min-height: 80%;
}
.editsets-button-row
.add-vocab-button-row {
    height: 10%;
}
.topic-slider-wrapper,
.vocab-slider-wrapper {
    height: clamp(200px, 30vh, 300px);
}
.slider-arrow-wrapper {
    width: 10%;
}
.slider-card-wrapper {
    width: 80%;
    height: 100%;
}

</style>