<template>
    <div    class="container-fluid rounded small alert alert-dismissible"
            :class="setType()" role="alert">
        <strong>{{ keyword }}:</strong>
        {{ text }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</template>


<script>
export default {
    props: [
        "alert_type",
        "keyword",
        "text",
    ],
    methods: {
        setType() {
            return "alert-" + this.alert_type;
        }
    },
};
</script>