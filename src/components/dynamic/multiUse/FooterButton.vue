<template>
    <div class="d-flex flex-column justify-content-start align-items-center border border-dark w-auto">

        <p class="text-secondary mb-1"><strong>{{ buttonLabel }}</strong></p>

        <iface-btn
        :btnColor="btnColor"
        :icon="icon"
        :isSingleButton="false"
        :xl_button="xl_button"></iface-btn>
    </div>
</template>


<script>
export default {
    props: [
        "buttonLabel",
        "btnColor",
        "icon",
        "xl_button",
    ],
};
</script>