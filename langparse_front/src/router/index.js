import { createRouter, createWebHistory } from 'vue-router';

import KoreanStudy from '../components/KoreanStudy.vue';
import MbtiComp from '../components/MbtiComp.vue';
import TestContainer from '../components/TestContainer.vue';
import MbtiTypes from '../components/MbtiTypes.vue';
import MbtiIntro  from '../components/MbtiIntro.vue'
import AlphabetMeanings from "@/components/AlphabetMeanings.vue"
import CogFuncIntro from '@/components/CogFuncIntro';
import CogFuncRoles from '@/components/CogFuncRoles';
import CogFuncTypes from '@/components/CogFuncTypes';

const routes = [
  { path: '/KoreanStudy', component: KoreanStudy },
  {
    path: '/MBTI',
    component: MbtiComp,
    children: [
      { path: '', component: MbtiIntro, name: 'defaultMBTI' },
      { path: 'test', component: TestContainer, name: 'test' },
      { path: 'types/:type?', component: MbtiTypes, props: true, name: 'types' },
      { path: "alphabet/:meaning", component: AlphabetMeanings, props: true, name: "alphabetMeaning" },
      { path: '8-functions/intro', component: CogFuncIntro, name: 'cogFuncIntro' },
      { path: '8-functions/roles', component: CogFuncRoles, name: 'cogFuncRoles' },
      { path: '8-functions/types', component: CogFuncTypes, name: 'cogFuncTypes' },
    ],
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;