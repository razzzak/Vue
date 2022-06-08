<template>
  <div :class="[$style.wrp]">
    <div @click="onClick(current - 1)">-</div>
    <div
      v-for="i in amount"
      :key="i"
      :class="{ [$style.active]: current === i }"
      @click="onClick(i)"
    >
      {{ i }}
    </div>
    <div @click="onClick(current + 1)">+</div>
  </div>
</template>

<script>
export default {
  name: "paginationModule",
  props: {
    length: Number,
    elementsOnPage: Number,
    current: Number,
  },
  computed: {
    amount() {
      return Math.ceil(this.length / this.elementsOnPage);
    },
  },
  methods: {
    onClick(p) {
      if (p < 1 || p > this.amount) {
        return;
      }
      this.$emit("changePage", p);
    },
  },
  beforeUpdate() {
    if (this.amount < this.current) {
      this.onClick(this.current - 1);
    }
  },
};
</script>

<style module lang="scss">
.wrp {
  display: flex;
  & > div {
    padding: 10px;
    &:not(.active) {
      cursor: pointer;
    }
    &.active {
      background: #ccc;
    }
  }
}
</style>