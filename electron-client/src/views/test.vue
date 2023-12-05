<template>
  <div ref="element" @focusin="handleFocus" @focusout="handleBlur" contenteditable="true">聚焦元素</div>
</template>

<script>
export default {
  data() {
    return {
      isFocused: false,
    };
  },
  methods: {
    handleFocus() {
      this.isFocused = true;
      console.log(1);
    },
    handleBlur() {
      this.isFocused = false;
      console.log(2);
    },
  },
};
</script>