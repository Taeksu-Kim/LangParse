<template>
  <div>
    <h1>MBTI 유형 살펴보기</h1>
    <div class="container">
      <div class="row mb-2">
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ISFP')">ISFP</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ISFJ')">ISFJ</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ISTP')">ISTP</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ISTJ')">ISTJ</button></div>
      </div>
      <div class="row mb-2">
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('INFP')">INFP</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('INFJ')">INFJ</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('INTP')">INTP</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('INTJ')">INTJ</button></div>
      </div>
      <div class="row mb-2">
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ESFP')">ESFP</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ESFJ')">ESFJ</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ESTP')">ESTP</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ESTJ')">ESTJ</button></div>
      </div>
      <div class="row mb-2">
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ENFP')">ENFP</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ENFJ')">ENFJ</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ENTP')">ENTP</button></div>
        <div class="col"><button class="btn btn-block btn-custom" @click="selectType('ENTJ')">ENTJ</button></div>
      </div>
    </div>
    <div v-if="selectedType">
      <h2>{{ selectedType }}</h2>
      <div v-html="typeDescriptions[selectedType]"></div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import typeDescriptions from './data/mbtiDescriptions.js';

export default {
  name: 'MbtiTypes',
  props: ['type'],
  setup(props) {
    const route = useRoute();
    const selectedType = ref(props.type || null);
    
    watch(() => route.params.type, newType => {
      selectedType.value = newType;
    });
    
    const selectType = (type) => {
      selectedType.value = type;
    };
    
    return {
      selectedType,
      typeDescriptions,
      selectType,
    };
  },
};
</script>

<style scoped>
.btn-custom {
  background-color: #52a505;
  color: white;
  cursor: pointer;
  width: 100px; /* Fixed height */
}
</style>