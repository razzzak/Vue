<template>
  <div class="payments">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Category</th>
          <th>Value</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(payment, i) in payments" :key="i">
          <td>{{ elNumber + i + 1 }}</td>
          <td>{{ payment.date }}</td>
          <td>{{ payment.category }}</td>
          <td>{{ payment.value }}</td>
          <td>
            <svg
              @click="onMenuOpen($event, payment, elNumber + i + 1)"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
              />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
    <p>Total: {{ getFPV }}</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "paymentsList",
  props: {
    payments: {
      type: Array,
      default: () => [],
    },
    elementsOnPage: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters(["getFullPaymentValue"]),
    elNumber() {
      if (this.currentPage > 1) {
        return this.elementsOnPage * this.currentPage - this.elementsOnPage;
      }
      return 0;
    },
    getFPV() {
      return this.getFullPaymentValue;
    },
  },
  methods: {
    ...mapMutations(["removeDataFromPaymentsList"]),
    onMenuOpen(event, payment, id) {
      if (id) {
        payment.id = id;
      }
      const items = [
        {
          text: "Edit",
          action: () => {
            this.editItem(payment);
          },
        },
        {
          text: "Remove",
          action: () => {
            this.deleteItem(payment);
          },
        },
      ];
      this.$dropdownMenu.open({ event, items });
    },
    editItem(item) {
      this.$modal.show("editpayment", {
        title: "Edit payment",
        component: "formPaymentAdd",
        props: {
          item,
        },
      });
    },
    deleteItem(payment) {
      this.removeDataFromPaymentsList(payment);
      this.$dropdownMenu.close();
    },
  },
};
</script>

<style scoped lang="scss">
table {
  width: 100%;
  border-spacing: 0;
}
th,
td {
  border-bottom: 1px solid #ced4da;
}
th {
  padding: 20px 0;
}
td {
  padding: 10px 0;
  svg {
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    &:hover {
      opacity: 0.4;
    }
  }
}
</style>