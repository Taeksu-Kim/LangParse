<template>
  <div class="question-wrapper">
    <div v-html="question.split('\n').join('<br>')"></div>
    <div class="button-wrapper">
      <button class="button" :class="{ selected: localAnswer === 1 }" @click="selectAnswer(1)">A</button>
      <button class="button" :class="{ selected: localAnswer === -1 }" @click="selectAnswer(-1)">B</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      required: true,
    },
    value: { 
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      localAnswer: this.value,
      isAnswered: this.value !== null,
    };
  },
  watch: {
    value(newVal) {
      this.localAnswer = newVal;
    },
  },
  created() { 
    if (this.value !== null) {
      this.$emit('update:count', 1);
    }
  },
  methods: {
    selectAnswer(value) {
      if (this.localAnswer !== value) {
        if (!this.isAnswered) {
          this.$emit('update:count', 1);
          this.isAnswered = true;
        }
        this.localAnswer = value;
        this.$emit('input', this.localAnswer);
        this.$emit('update:score', this.localAnswer);
      }
    },
  },
};
</script>

<style scoped>
.question-wrapper {
  margin-bottom: 60px;
}

.button-wrapper {
  display: flex;
  margin-top: 20px;
}

.button {
  font-size: 20px;
  width: 70px;
  height: 40px;
  margin-right: 60px;
  border: 2px solid rgba(82, 165, 5, 0.3);
  cursor: pointer;
  background: rgba(82, 165, 5, 0.3);
  color: white;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button.selected {
  background: #52a505;
  color: white;
}
</style>