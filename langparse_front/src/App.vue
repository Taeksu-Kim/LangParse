<template>

  <nav class="navbar navbar-expand-lg bg-success">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">LangParse</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">{{ $t('menu.home') }}</a>
          </li>
          <li class="nav-item">
            <router-link to="/KoreanStudy" class="nav-link">{{ $t('menu.korean_study') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/MBTI" class="nav-link">{{ $t('menu.mbti') }}</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ $t('menu.sel_lang') }}
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" @click="changeLanguage('ko')">한국어</a></li>
              <li><a class="dropdown-item" href="#" @click="changeLanguage('ja')">日本語</a></li>
              <li><a class="dropdown-item" href="#" @click="changeLanguage('en')">English</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />

</template>

<script>
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      api_result: null,
    }
  },
  methods: {
    getApi () {
      axios.get('http://13.209.44.135:8000/hello')
        .then(response => {
          this.api_result = response.data
        })
        .catch(error => {
          console.error(error)
        })
    },
      changeLanguage(lang) {
        this.$i18n.locale = lang;
        this.$forceUpdate();
    },
  }
}
</script>

<style scoped>
  .navbar {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #52a505 !important;
  }

  .navbar-brand, .nav-link {
    color: white;
    font-family: 'Roboto', sans-serif;
  }

  /* active status */
  .router-link-active {
    background-color: #6EA4BF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .nav-link:hover,
  .nav-item:hover .nav-link {
    color: white;
    background-color: #6EA4BF;
  }

  .nav-link {
    display: inline-block;
    width: 120px;
    text-align: center;
  }

  .nav-item {
    margin-right: 50px;
  }

  .navbar-brand {
    margin-right: 50px;
  }
</style>