<template>
    <button
    class="interface-buttons border rounded-circle border-dark position-relative"
    :class="[btnColor, {'me-3': isSingleButton}, {'mx-3': margin_x}, {'p-4': xl_button}, {'p-3': md_button}]">
        <font-awesome-icon :icon="icon" :size="iconsize"/>
    </button>
</template>



<script>

export default {
    props: [
        "btnColor",
        "icon",
        "isSingleButton",
        "margin_x",
        "xl_button",
        "md_button",
        "iconsize",
    ],
};
</script>



<style scoped>
.interface-buttons {
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: 50%;
    box-shadow: 2px 2px 10px -1px #333;
}
.interface-buttons::before {
    content: "";
    position: absolute;
    top: 8%;
    left: 5%;
    width: 60%;
    height: 30%;
    background-color: rgba(255, 255, 255, 0.233);
    border-radius: 100%;
    transform: translate(0, 0) rotate(-30deg);
    transition: transform .2s, height .2s;
    z-index: 2;
}
.interface-buttons::after {
    content: "";
    position: absolute;
    top: 60%;
    left: 5%;
    width: 40%;
    height: 20%;
    background-color: rgba(255, 255, 255, 0.233);
    border-radius: 100%;
    transform: translate(0, 0) rotate(50deg);
    transition: transform .2s;
    z-index: 2;
}
.interface-buttons:hover::before {
    transform: scale(.8) rotate(-30deg);
}
.interface-buttons:hover::after {
    transform: scale(.8) rotate(50deg);
}
.not-clickable-btn {
    background-color: var(--not-clickable-btn-bg);
}
.btn-green-bg {
    background-color: var(--green-btn-bg);
}
.btn-blue-bg {
    background-color: var(--blue-btn-bg);
}
.btn-red-bg {
    background-color: var(--red-btn-bg);
}
.btn-orange-bg {
    background-color: var(--orange-btn-bg);
}

</style>