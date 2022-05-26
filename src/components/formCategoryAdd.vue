<template>
  <form @submit.prevent="addCategoryData">
    <fieldset>
      <legend>Add new category</legend>
      <input type="text" v-model="category" placeholder="New category name" />
    </fieldset>
    <br />
    <button class="btn">Add category <span>+</span></button>
  </form>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "formCategoryAdd",
  data() {
    return {
      category: "",
    };
  },
  computed: {
    ...mapGetters(["getCategoryList", "getCategoriesLoaded"]),
    categoryList() {
      return this.getCategoryList;
    },
    categoriesLoaded() {
      return this.getCategoriesLoaded;
    },
  },
  methods: {
    ...mapMutations(["addDataToCategoryList"]),
    addCategoryData() {
      const data = this.category;
      let flag = this.categoryList.findIndex(
        (val) => val.toUpperCase() == data.toUpperCase()
      );
      if (flag < 0 && data != "") {
        this.addDataToCategoryList(data);
      }
      this.category = "";
    },
  },
  async created() {
    if (!this.categoriesLoaded) {
      await this.$store.dispatch("fetchCategoryList");
    }
  },
};
</script>

<style scoped lang="scss">
form {
  max-width: 384px;
  text-align: right;
  div {
    display: flex;
    margin-bottom: 10px;
  }
  fieldset {
    border-color: #ffffff;
    border-style: solid;
    border-width: 1px;
    box-shadow: 0px 0px 15px rgba(222, 222, 222, 0.5);
    legend {
      font-size: 12px;
    }
  }
}
input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  & + input {
    margin-left: 10px;
  }
}
select {
  display: block;
  width: 100%;
  padding: 0.594rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>