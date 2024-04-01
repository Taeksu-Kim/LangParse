<template>
  <div class="content">
    <div v-if="showIntro">
      <div class="intro">
        <h2>안내사항</h2>
        <ul>
          <li class="intro-item">A와 B 중 더 가까운 것을 고르세요.</li>
          <li class="intro-item">평소 스스로의 실제 행동도 중요하지만, 이러한 행동도 환경의 영향을 받을 수 있습니다. 최근에 실제로 했던 행동이나 환경 속에서 해야했던 결과보다는, 내가 더 순수하게 선호하는 쪽을 고르세요.</li>
          <li class="intro-item">하나를 선택한다는 것이 다른 하나를 배제해야 한다는 것은 아닙니다. 더 가까운 것을 편하게 고르세요.</li>
          <li class="intro-item">결과 화면은 성향이 얼마나 강한지가 아니라, 얼마나 명확하게 구분되는지를 의미합니다.</li>
          <li class="intro-item">예를 들어 T 100%인 경우는 T일 확률이 매우 높다는 것을 의미합니다. T가 강하다는 것을 의미하지는 않습니다.</li>
          <li class="intro-item">그렇기 때문에 T 67%, F가 33%인 사람보다 T 100%, F 0%가 나온 사람의 F가 더 강할 수 있습니다.</li>
          <li class="intro-item">MBTI는 유형을 이분법적으로 나누는 게 아니라 더 선호하는 성향을 분류한 것입니다. 사람은 E/I, N/S, T/F, J/P 8개의 요소를 모두 가지고 있습니다. 성향이 극단적인 건 문제가 있기 때문에 특정 성향이 필요한 상황에서는 그에 맞게 생각, 행동하는 것이 바람직합니다.</li>
        </ul>
      </div>
      <div class="mbti-container">
        <label for="prev-mbti" class="mbti-label">기존 MBTI :</label>
        <select id="prev-mbti" v-model="selectedMbti">
          <option value="모름">모름</option>
          <option value="ISFP">ISFP</option>
          <option value="ISFJ">ISFJ</option>
          <option value="ISTP">ISTP</option>
          <option value="ISTJ">ISTJ</option>
          <option value="INFP">INFP</option>
          <option value="INFJ">INFJ</option>
          <option value="INTP">INTP</option>
          <option value="INTJ">INTJ</option>
          <option value="ESFP">ESFP</option>
          <option value="ESFJ">ESFJ</option>
          <option value="ESTP">ESTP</option>
          <option value="ESTJ">ESTJ</option>
          <option value="ENFP">ENFP</option>
          <option value="ENFJ">ENFJ</option>
          <option value="ENTP">ENTP</option>
          <option value="ENTJ">ENTJ</option>
        </select>
      </div>
      <button class="nav-button" @click="startTest">검사 시작</button>
    </div>
    <div v-else>
      <MbtiQuestion 
        :questions="questions" 
        :currentIndex="currentIndex" 
        @update:score="updateScore" 
        @update:count="updateCount"
        v-if="!mbtiResult"
      />
      <div class="count" v-if="!mbtiResult"> 진행도: {{selectedCount}}/{{questions.length}}</div>
      <button class="nav-button" @click="prevStep" v-if="!mbtiResult">이전</button>
      <button class="nav-button" @click="nextStep" v-if="!mbtiResult">다음</button>
      <button class="nav-button" v-if="!mbtiResult && selectedCount === questions.length" @click="getMbtiResult">결과 보기</button>
      <div v-if="mbtiResult">
        <MbtiChart
          :mbtiResult="mbtiResult"
          :scores="percentScores"
        />
        <h2 class="result">결과: {{ mbtiResult }}</h2>
        <div v-if="mbtiResult" v-html="typeDescriptions[mbtiResult]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MbtiQuestion from './MbtiQuestion.vue'
import MbtiChart from './MbtiChart.vue'
import typeDescriptions from './data/mbtiDescriptions.js';
import axios from 'axios'


export default {
  components: {
    MbtiQuestion,
    MbtiChart,
  },
  data() {
    return {
    questions: [
      'A: 사람들 앞에서 발표나 의견을 얘기하는 것 등 나를 드러내는 것에 대해서 나는 특별히 거부감이 없다. 사실 약간 재밌기도 하다. \nB: 사람들 앞에서 발표나 의견을 얘기하는 것 등 나를 드러내는 것은 필요한 경우가 아니라면 피하고 싶다. 나는 이러한 부분에서 신중한 편이다.',
      'A: 나는 주로 에너지나 자극을 얻기 위해 사람들과 함께 교류하는 것을 선호한다. \nB: 나는 주로 에너지나 자극을 얻기 위해 혼자 시간을 보내는 것을 선호한다.',
      'A: 나는 친하지 않은 사람과도 아이디어와 정보를 가볍게 자주 공유하는 것을 선호한다.  \nB: 나는 친하지 않은 사람에게는 아이디어와 정보를 필요한 범위에서 신중하게 하는 것을 선호한다.',
      'A: 원래의 주제 외에도 떠오르는 생각들이 많다. 이럴 때 원래의 주제에만 집중해야하는 건 제한되는 느낌이라 불편하다. \nB: 꼭 필요하거나 해당되는 게 아닌데 원래의 주제 외에 다른 내용이 나오면 불편하다. 명확하게 필요한 내용에만 집중하는 게 편하다.',
      'A: 만약에 대해서 여러가지 엉뚱한 상상하는 사람을 보면 엉뚱하다고 느끼면서도 나도 이것저것 상상해보는 편이다. \nB: 만약에 대해서 여러가지 상상하는 사람을 보면 나쁘다는 건 아니지만 솔직히 그게 무슨 의미가 있나라고 느끼는 편이다.',
      'A: 어떤 걸 이해해야 할 때 산만할 수도 있지만 그것에 대한 맥락이나 패턴까지 넓혀서 생각하는 편이다. \nB: 어떤 걸 이해해야 할 때 단순할 수도 있지만 명확하게 그것에 자체에 집중해서 생각하는 편이다.',
      'A: 내가 무언가를 결정할 때의 이유는 그게 맞으니까, 따져보니 그게 더 좋으니까에 가깝다. \nB: 내가 무언가를 결정할 때의 이유는 그게 하고 싶으니까, 그걸 더 좋아하니까에 가깝다.',
      'A: 나한테 고민이 있을 때 상황에 대한 자기 의견을 얘기해주는 게 더 좋다. \nB: 나한테 고민이 있을 때 나를 이해해주고 공감해 주는 게 더 좋다.',
      'A: 회의나 토론은 존중도 중요하지만 논리적으로 날카롭게 반박하면서 진행되는 게 더 중요하다고 생각한다. \nB: 회의나 토론은 논리도 중요하지만 서로 존중하고 이해하면서 진행되는 게 더 중요하다고 생각한다.',
      'A: 애매하니까 미리 예상해서 방향을 잡아두는 게 더 마음이 편하다. \nB: 애매하니까 그때가서 확실히 확인하는 게 더 마음 편하다.',
      'A: 그때 가서 상황이 달라지더라도 계획이 없으면 불편하다. 지금 고민해보는 게 마음 편하다. \nB: 그때 가서 상황이 달라질 수 있는 걸 굳이 지금 생각해보는 건 불편하다. 그때 가서 생각해보는 게 더 마음 편하다.',
      'A: 나는 필수적인 게 아닌 것에 대해서도 예상을 안 해보는 게 더 불편하다. 예상해보고 나름대로의 생각을 그때그때 정리해두는 게 편하다. \nB: 나는 꼭 필요한 수준 이상으로 예상하는 건 불편하다. 필요한 만큼만 생각하고, 나머지는 상황에 따라 맞추는 게 더 편하다.'
    ],
     score: [],
     selectedCount: 0,
     currentIndex: 0,
     mbtiResult: null,
     showIntro: true,
     selectedMbti: '모름',
     groupedScores: [],
     percentScores: {},
     typeDescriptions: typeDescriptions,
    };
  },
  created() {
    this.score = Array(this.questions.length).fill(0);
  },
  methods: {
  updateScore(index, value) {
    this.score[index] = value;
    },
    updateCount(value) {
      this.selectedCount += value;
    },
    async submitData() {
      try {
        const baseUrl = process.env.VUE_APP_API_BASE_URL;
        const apiEndpoint = "/result_report";
        const url = `${baseUrl}${apiEndpoint}`;

        const response = await axios.post(url, {
          prev_result: this.selectedMbti,
          cur_result: this.mbtiResult,
          test_result: this.score,
        });
        console.log('Server response:', response.data.message);
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    },
    getMbtiResult() {
      const groupSize = this.score.length / 4;
      const types = ['E', 'N', 'T', 'J'];
      const opposites = ['I', 'S', 'F', 'P'];
      let mbtiType = '';
      let groupedScores = [];
      
      for (let i = 0; i < 4; i++) {
        const group = this.score.slice(i * groupSize, (i + 1) * groupSize);
        const groupSum = group.reduce((a, b) => a + b, 0);
        groupedScores.push(groupSum);
      }

      for(let i = 0; i < groupedScores.length; i++) {
        mbtiType += groupedScores[i] > 0 ? types[i] : opposites[i];
        const percentage = (groupedScores[i] + 3) / 6 * 100;
        this.percentScores[types[i]] = percentage;
        this.percentScores[opposites[i]] = 100 - this.percentScores[types[i]];
      }
      
      this.mbtiResult = mbtiType;

      this.submitData();
    },
    nextStep() {
      if(this.currentIndex < this.questions.length - 3) {
        this.currentIndex += 3;
      }
    },
    prevStep() {
      if(this.currentIndex > 0) {
        this.currentIndex -= 3;
      }
    },
    startTest() {
      this.showIntro = false;
    },
  }
}
</script>

<style scoped>
.content {
  margin-top: 60px; /* 원하는 간격으로 변경하세요 */
}

.count {
  margin-bottom: 40px;
}

.intro-item {
  margin-top: 25px; /* 아래쪽 마진을 원하는 값으로 조정 */
  margin-bottom: 10px; /* 아래쪽 마진을 원하는 값으로 조정 */
}

.result {
  margin-top: 40px;
}

.nav-button {
  background-color: #1c71ff; /* 버튼 배경색 */
  border: none; /* 버튼 테두리 없애기 */
  border-radius: 5px; /* 라운드된 모서리 추가 */
  color: white; /* 글자 색깔 변경 */
  cursor: pointer; /* 마우스 포인터 스타일 변경 */
  font-size: 16px; /* 글꼴 크기 변경 */
  padding: 10px 20px; /* 버튼 내부 여백 설정 */
  text-transform: uppercase; /* 글자를 모두 대문자로 변환 */
  transition: background-color 0.2s ease; /* 배경색 변경 애니메이션 효과 적용 */
  margin-left: 10px; /* 버튼 간의 간격 조절 */
  margin-right: 10px; /* 버튼 간의 간격 조절 */
}

.nav-button:hover {
  background-color: #4a8dff; /* 마우스 호버 시 버튼 배경색 변경 */
}

.mbti-label {
  margin-right: 10px;
}

.mbti-container {
  margin-bottom: 20px;
}

.result {
  margin-bottom: 40px;
}

</style>









