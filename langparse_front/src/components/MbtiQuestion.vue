<template>
  <div>
  <MbtiQuestionStep
    v-for="(question, index) in questions"
    :key="index"
    :question="question"
    v-model="selectedAnswers[index]"
    v-show="index >= currentIndex && index < currentIndex + 3"
    @update:score="value => updateScore(index, value)"
    @update:count="updateCount"
  />
  </div>
</template>

<script>
import MbtiQuestionStep from './MbtiQuestionStep.vue'

export default {
  components: {
    MbtiQuestionStep
  },
  props: {
    questions: {
      type: Array,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedAnswers: Array.from({length: this.questions.length}, () => null), 
    };
  },
  methods: {
    updateScore(index, value) {
      this.$emit('update:score', index, value);
    },
    updateCount(value) {
      this.$emit('update:count', value);
    },
  },
}
</script>