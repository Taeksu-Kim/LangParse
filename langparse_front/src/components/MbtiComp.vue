<template>
<div class="container"> 
  <div class="sidebar flex-shrink-0 p-3 bg-white"> 
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-5 fw-semibold">MBTI</span>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <router-link :to="{ name: 'defaultMBTI' }" class="btn btn-toggle align-items-center rounded collapsed">
          MBTI 소개
        </router-link>
        <div class="collapse" id="home-collapse" style="">
        </div>
      </li>
      <li class="mb-1">
        <router-link :to="{ name: 'test' }" class="btn btn-toggle align-items-center rounded collapsed">
          간단 검사
        </router-link>
        <div class="collapse" id="home-collapse" style="">
        </div>
      </li>
      <li class="mb-1">
        <router-link :to="'/MBTI/types'" class="btn btn-toggle align-items-center rounded collapsed">
          유형 살펴보기
        </router-link>
        <div class="collapse" id="home-collapse" style="">
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#alphabet-collapse" aria-expanded="false">
          알파뱃 의미
        </button>
        <div class="collapse" id="alphabet-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li class="list-items-center"><router-link :to="{ name: 'alphabetMeaning', params: { meaning: 'I / E' }}" class="link-dark rounded">- I / E</router-link></li>
            <li class="list-items-center"><router-link :to="{ name: 'alphabetMeaning', params: { meaning: 'S / N' }}" class="link-dark rounded">- S / N</router-link></li>
            <li class="list-items-center"><router-link :to="{ name: 'alphabetMeaning', params: { meaning: 'F / T' }}" class="link-dark rounded">- F / T</router-link></li>
            <li class="list-items-center"><router-link :to="{ name: 'alphabetMeaning', params: { meaning: 'P / J' }}" class="link-dark rounded">- P / J</router-link></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#function-collapse" aria-expanded="false">
          8 기능
        </button>
        <div class="collapse" id="function-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li class="list-items-center"><router-link :to="{ name: 'cogFuncIntro' }" class="link-dark rounded">8 기능이란?</router-link></li>
            <li class="list-items-center"><router-link :to="{ name: 'cogFuncRoles' }" class="link-dark rounded">기능별 역할</router-link></li>
            <li class="list-items-center"><router-link :to="{ name: 'cogFuncTypes' }" class="link-dark rounded">유형별 8기능</router-link></li>
          </ul>
        </div>
      </li>
      <!--
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
          MBTI 챗봇
        </button>
        <div class="collapse" id="home-collapse" style="">
        </div>
      </li>
      -->
    </ul>
  </div>
  <div class="main-content">
    <div class="lowered-header long-text">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'MbtiComp'
}
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  display: flex;
}

.sidebar {
  width: 200px;
}

.main-content {
  flex-grow: 1;
}

.long-text {
  word-wrap: break-word;
}

.active {
  background-color: #ddd; /* add your preferred styling for the active button here */
}

.lowered-header {
  margin-top: 0px; /* Adjust this value to position your text */
  line-height: 1.8; 
}

.list-items-center {
  padding-left: 30px;
}

</style>