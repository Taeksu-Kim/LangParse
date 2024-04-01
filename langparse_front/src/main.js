import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import { createI18n } from 'vue-i18n'
import router from './router'

const messages = {
  en: {
    message: {
      hello: 'Hello world'
    },
    menu: {
        home: 'Home',
        korean_study: 'Korean Study',
        mbti: 'MBTI',
        sel_lang: 'Language',
      },
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    },
    menu: {
        home: 'ホーム',
        korean_study: '韓国語 勉強',
        mbti: 'MBTI',
        sel_lang: '言語',
      },
  },
  ko: {
    message: {
      hello: '안녕하세요, 세상'
    },
    menu: {
      home: '홈',
      korean_study: '한국어 공부',
      mbti: 'MBTI',
      sel_lang: '언어',
    },
  },
}

const i18n = createI18n({
  locale: 'ko', // 기본 언어 설정
  fallbackLocale: 'ko', // 존재하지 않는 언어에 대한 fallback 설정
  messages,
})

createApp(App)
    .use(i18n)
    .use(BootstrapVue3)
    .use(router)
    .mount('#app')