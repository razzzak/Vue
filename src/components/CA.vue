<template>
  <div class="calc">
    <div class="calc-body">
      <input
        type="text"
        class="calc-input"
        placeholder="Введите первое число"
        v-model.number="operand1"
      />
      <input
        type="text"
        class="calc-input"
        placeholder="Введите второе число"
        v-model.number="operand2"
      />
      <div class="btn-wrapper">
        <button class="btn-operation btn" @click="add()">+</button>
        <button class="btn-operation btn" @click="subtract()">-</button>
        <button class="btn-operation btn" @click="multiply()">*</button>
        <button class="btn-operation btn" @click="divide()">/</button>
        <button class="btn-operation btn" @click="exponet()">**</button>
        <button class="btn-operation btn" @click="integerDivide()">%</button>
      </div>
    </div>
    <span class="result"> Результат: {{ result }}</span>
  </div>
</template>

<script>
export default {
  name: "CalcApp",
  props: {
    msg: String,
  },
  data() {
    return {
      result: "",
      operand1: "",
      operand2: "",
    };
  },
  methods: {
    clearInputs() {
      this.operand1 = "";
      this.operand2 = "";
    },
    add() {
      this.result = this.operand1 + this.operand2;
      this.clearInputs();
    },
    subtract() {
      this.result = this.operand1 - this.operand2;
      this.clearInputs();
    },
    multiply() {
      this.result = this.operand1 * this.operand2;
      this.clearInputs();
    },
    divide() {
      if (this.operand2 === 0) {
        alert("На ноль делить нельзя");
      } else {
        this.result = this.operand1 / this.operand2;
      }
      this.clearInputs();
    },
    exponet() {
      this.result = this.operand1 ** this.operand2;
      this.clearInputs();
    },
    integerDivide() {
      this.result = Math.floor(this.operand1 / this.operand2);
      this.clearInputs();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.calc {
  margin: 0 auto;
  max-width: 300px;
}
.calc-body {
  margin-inline: auto;
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.calc-input {
  padding: 8px;
  text-align: center;
}
.result {
  display: block;
  font-size: 16px;
  text-transform: uppercase;
  text-align: left;
}
.btn-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 18px;
}
.btn {
  height: 50px;
  width: 50px;
  font-size: 16px;
  color: #fff;
  border: 0;
  cursor: pointer;
  font-weight: 700;
}
.btn-num {
  background-color: #42b983;
}
.btn-operation {
  background-color: rgb(180, 165, 159);
}
.btn-num:hover {
  background-color: rgb(159, 184, 159);
}
.btn-operation:hover {
  background-color: rgb(0, 0, 0);
}
.btn-accent {
  width: 50%;
  text-transform: uppercase;
  background-color: rgb(0, 0, 0);
}
.btn-accent:hover {
  background-color: #a88989;
}
</style>
