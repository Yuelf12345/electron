<template>
  <main ref="container" class="container">
    <section class="form">
      <div class="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
          />
        </svg>
      </div>
      <h1 class="form__title">Log in to your Account</h1>
      <p class="form__description">
        Welcome back! Please, enter your information
      </p>

      <form action="" onsubmit="return false">
        <label class="form-control__label">Email</label>
        <input type="email" class="form-control" />

        <label class="form-control__label">Password</label>
        <div class="password-field">
          <input
            type="password"
            class="form-control"
            minlength="4"
            id="password"
            ref="password"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </div>
        <div class="password__settings">
          <label class="password__settings__remember">
            <input type="checkbox" />
            <span class="custom__checkbox">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </span>
            Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>
        <button @click="login" class="form__submit" ref="submit">Log In</button>
      </form>
      <p class="form__footer">
        Don't have an account?<br />
        <a href="#">Create an account</a>
      </p>
    </section>
    <section class="form__animation">
      <div ref="ball">
        <div class="ball">
          <div ref="face" class="face">
            <div class="ball__eyes">
              <div class="eye_wrap" v-for="i in 2" :key="i">
                <span class="eye" ref="eyes"></span>
              </div>
            </div>
            <div class="ball__mouth"></div>
          </div>
        </div>
      </div>
      <div class="ball__shadow"></div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";

const container = ref<any>(null);
const password = ref<any>(null);
const face = ref<any>(null);
const ball = ref<any>(null);
const submit = ref<any>(null);
const eyes = ref<any[]>([]);
const login = () => {
  console.log("login");
};
onMounted(() => {
  const handleMouseMove = (event: any) => {
    if (
      !document.querySelector("#password:is(:focus)") &&
      !document.querySelector("#password:is(:user-invalid)")
    ) {
      for (let eye of eyes.value) {
        const x = eye.getBoundingClientRect().left + 10;
        const y = eye.getBoundingClientRect().top + 10;
        const rad = Math.atan2(event.pageX - x, event.pageY - y);
        const rot = rad * (180 / Math.PI) * -1 + 180;
        eye.style.transform = `rotate(${rot}deg)`;
      }
    }
  };

  const handleFocusPassword = () => {
    face.value.style.transform = "translateX(30px)";
    for (let eye of eyes.value) {
      eye.style.transform = `rotate(100deg)`;
    }
  };

  const handleFocusOutPassword = (event: any) => {
    face.value.style.transform = "translateX(0)";
    if (event.target.checkValidity()) {
      ball.value.classList.toggle("sad");
    } else {
      ball.value.classList.toggle("sad");
      for (let eye of eyes.value) {
        eye.style.transform = `rotate(215deg)`;
      }
    }
  };

  container.value.addEventListener("mousemove", (event: any) =>
    handleMouseMove(event)
  );
  password.value.addEventListener("focus", () => handleFocusPassword());
  password.value.addEventListener("focusout", (event: any) =>
    handleFocusOutPassword(event)
  );

  submit.value.addEventListener("mouseover", () =>
    ball.value.classList.toggle("look_at")
  );
  submit.value.addEventListener("mouseout", () =>
    ball.value.classList.toggle("look_at")
  );
});
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,400;0,500;0,600;0,700;1,100&display=swap");

:root {
  font-family: "Poppins", sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: #000;
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  background: #fff;
  padding: 0;
  margin: 0;
}

main {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 24px;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form {
  padding-right: 24px;
}

.form__title {
  text-align: center;
  color: #030712;
  font-weight: 600;
  font-size: 30px;
  margin: 0 0 8px;
}

.form__description {
  color: #374151;
  text-align: center;
  margin: 0 0 32px;
}

.form__animation {
  background-color: #f7f8fa;
  border-radius: 24px;
  overflow: hidden;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
}

.logo svg {
  width: 24px;
  height: 24px;
}

form {
  width: 100%;
  max-width: 420px;
}

.form-control__label {
  display: block;
  margin: 14px 0 4px;
  color: #0d0c22;
  font-weight: 500;
}

.form-control {
  height: 52px;
  display: block;
  width: 100%;
  border: 1px solid #6b7280;
  padding: 18px 20px;
  transition: outline 200ms ease, box-shadow 200ms ease;
  border-radius: 12px;
  outline: none;
  background-color: #fff;
  color: #0d0c22;
  margin-bottom: 28px;
  font-size: 16px;
}

.form-control:focus {
  border-color: #0d0c22;
  box-shadow: 0 0 0 4px rgb(0 0 0 / 10%);
}

.form-control:user-invalid {
  border-color: #dc2626;
}

.form-control:user-invalid:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 4px rgb(220, 38, 38, 0.1);
}

.password-field {
  position: relative;
}

.password-field svg {
  position: absolute;
  width: 24px;
  height: 24px;
  right: 13px;
  top: 13px;
}

.form__submit {
  height: 52px;
  width: 100%;
  display: block;
  background: #0d0c22;
  border-radius: 100px;
  border: none;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
}

.form__submit:hover {
  box-shadow: 0 -1px 10px rgba(13, 12, 34, 0.3);
}

.password__settings {
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
}

.password__settings__remember {
  font-size: 14px;
  color: #0d0c22;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.password__settings__remember input {
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
}

.custom__checkbox {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid #6b7280;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

.custom__checkbox svg {
  transform: scale(0);
  width: 16px;
  height: 16px;
}

input:focus + .custom__checkbox {
  border-color: #0d0c22;
  box-shadow: 0 0 0 4px rgb(0 0 0 / 10%);
}

input:checked + .custom__checkbox svg {
  transform: scale(1);
}

a {
  font-size: 14px;
  color: #0875e4;
  font-weight: 500;
  text-decoration: none;
}

.form__footer {
  font-size: 14px;
  text-align: center;
  margin: 32px 0 0;
}

.ball {
  width: 300px;
  height: 300px;
  padding: 1px;
  border-radius: 100%;
  background: #0875e4;
  animation: bounce 3s ease-out forwards;
  transform: translateY(calc(-50vh - 116px));
}

@keyframes bounce {
  5% {
    height: 300px;
    width: 300px;
  }
  10% {
    height: 300px;
    width: 280px;
  }
  15% {
    height: 280px;
    width: 320px;
    transform: translateY(0);
  }
  20% {
    height: 300px;
    width: 320px;
  }
  25% {
    transform: translateY(-200px);
  }
  30% {
    height: 300px;
    width: 300px;
  }
  35% {
    height: 300px;
    width: 280px;
  }
  40% {
    height: 280px;
    width: 320px;
    transform: translateY(0);
  }
  45% {
    height: 300px;
    width: 320px;
  }
  50% {
    transform: translateY(-160);
  }
  55% {
    height: 300px;
    width: 300px;
  }
  60% {
    height: 300px;
    width: 280px;
  }
  65% {
    height: 280px;
    width: 320px;
    transform: translateY(0);
  }
  70% {
    height: 300px;
    width: 320px;
  }
  75% {
    transform: translateY(-60px);
  }
  80% {
    height: 300px;
    width: 280px;
  }
  85% {
    height: 280px;
    width: 320px;
    transform: translateY(-20px);
  }
  90% {
    height: 300px;
    width: 320px;
  }
  100% {
    transform: translateY(0);
  }
}

.ball__eyes {
  display: flex;
  gap: 60px;
  margin-top: 50px;
  justify-content: center;
}

.eye {
  background: #fff;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  padding: 3px;
  display: block;
}

.eye:before {
  content: "";
  width: 15px;
  height: 15px;
  background: #000;
  border-radius: 100%;
  display: block;
}

.ball__mouth {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: #000;
  margin: 10px auto;
  clip-path: polygon(100% 50%, 100% 100%, 0 100%, 0 50%);
  transition: 0.3s;
}

.eye_wrap {
  overflow: hidden;
  animation: blink 5s infinite;
  width: 30px;
  height: 30px;
  transition: 0.3s;
}

#face,
#ball {
  transition: 0.3s;
}

#ball.sad .eye_wrap:first-child {
  clip-path: polygon(67% 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 0% 50%);
}

#ball.sad .eye_wrap:last-child {
  clip-path: polygon(0 0, 43% 0, 100% 50%, 100% 100%, 0 100%, 0% 50%);
}

#ball.sad .ball__mouth {
  transform: scaleY(-1.05);
}

#ball.sad {
  animation: shake 1.5s;
}

@keyframes shake {
  0% {
    transform: rotateY(0);
  }
  25% {
    transform: rotateY(-15deg);
  }
  50% {
    transform: rotateY(15deg);
  }
  100% {
    transform: rotateY(0);
  }
}

@keyframes blink {
  0%,
  100% {
    transform: scale(1, 0.05);
  }
  5%,
  95% {
    transform: scale(1, 1);
  }
}

.ball__shadow {
  background: rgb(0 0 0 / 5%);
  box-shadow: 0 0 10px rgb(0 0 0 / 6%);
  height: 20px;
  width: 240px;
  border-radius: 50%;
  transform: scale(0.1);
  animation: shrink 3s forwards;
}

@keyframes shrink {
  5%,
  25%,
  50%,
  75% {
    transform: scale(0.1);
  }
  15%,
  40%,
  65%,
  100% {
    transform: scale(1.1);
  }
}

#ball.look_at {
  transform: rotate(-17deg);
}

@media (max-width: 768px) {
  .form__animation {
    position: fixed;
    background: none;
    right: 0;
    bottom: 0;
  }

  .form__title {
    font-size: 28px;
  }

  .ball {
    width: 100px;
    height: 100px;
    animation: roll_out 1s ease-out forwards;
    transform: translate(103px, 0);
  }

  @keyframes roll_out {
    0% {
      transform: translate(103px, 0) rotate(0);
    }
    100% {
      transform: translate(0, 0) rotate(-360deg);
    }
  }

  .ball__eyes {
    gap: 12px;
    margin-top: 24px;
  }

  .ball__mouth {
    width: 20px;
    height: 20px;
    margin: -1px auto;
  }

  .eye,
  .eye_wrap {
    width: 20px;
    height: 20px;
  }
  .eye:before {
    width: 10px;
    height: 10px;
  }

  .ball__shadow {
    display: none;
  }

  main {
    display: block;
    padding: 40px 16px;
  }

  .form {
    padding: 0;
    height: 100%;
  }

  .form__description {
    margin-bottom: 16px;
  }

  #face {
    transform: none !important;
  }
}
</style>