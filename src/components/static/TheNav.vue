<template>
    <nav class="login-nav bg-primary container-fluid d-flex justify-content-around align-items-center px-5">
        <button class="btn border border-secondary rounded-pill px-3"><a class="text-dark" href="#about">Mehr Infos</a></button>
        <button class="sign-in-btn btn border border-secondary rounded-pill px-3 ms-auto me-4" data-bs-toggle="modal" data-bs-target="#modal_for_signup">Registrieren</button>
        <button class="login-btn btn border border-dark rounded-pill px-3 neutral-btns" data-bs-toggle="modal" data-bs-target="#modal_for_login">Einloggen</button>
    </nav>
</template>

<style scoped>
.login-nav {
    height: 10vh;
    position: sticky;
    top: 0;
}
nav button a {
    text-decoration: none;
}
</style>