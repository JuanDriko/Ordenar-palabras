<template>
  <div class="container">
    <div v-if="juegoFinalizado">
      <center>
        <h1 class="roboto-bold text-white">Game over</h1>
        <h3 class="text-white">{{ nickname }}</h3>
        <p class="text-white">Score: {{ score }}</p>
        <p class="text-white">Time: {{ formatoTiempo(cronometro) }}</p>
        <div v-if="typeof message === 'string'">
          <img class="imgMessage img-fluid" :src="message" alt="Feedback emoji">
        </div>
        <button type="button" class="btngame mt-5 p-auto" @click="reiniciarJuego">
          <span class="roboto-bold">Restart game</span>
        </button>
      </center> 
    </div>
    <div v-else>
      <div v-if="!juegoIniciado" class="d-flex justify-content-center align-items-center" style="height: 70vh;">
        <center>
          <h2 class="text-white">Conoce tu nivel de inglés</h2>
          <h2 class="text-white">Ordena las palabras en menos de 2 Minutos</h2>
          <h1 class="text-white">Let's Go!</h1>
          <button type="button" class="btngame mt-5 p-auto" @click="iniciarJuego">
            <h1 class="roboto-bold">Start game</h1>
          </button>
        </center>
      </div>
      <div v-else>
        <div class="d-flex justify-content-between mx-5">
          <h1 class="text-white">{{ nickname }}</h1> <br>
          <p class="text-white fs-2">Time: {{ formatoTiempo(cronometro) }}</p> <br>
          <p class="text-white fs-2">Score: {{ score }}</p>
        </div>
        <div v-if="typeof star === 'string'" class="d-flex justify-content-center align-items-center" >
          <img class="imgMessage img-fluid" :src="star" alt="Feedback emoji">
        </div>
        <div>
          <div class="col-12">
            <draggable class="drop-area2" group="letters" :list="selectedLetters" @change="onLetterDropped" item-key="id">
              <template #item="{ element }">
                <div class="square-item">
                  {{ element.letter }}
                </div>
              </template>
            </draggable>
          </div> 
          <div class="col-12"> 
            <draggable class="drop-area" :list="shuffledLetters" group="letters" item-key="id">
              <template #item="{ element }">
                <div class="square-item2">
                  {{ element.letter }}
                </div>
              </template>
            </draggable>
          </div>
          <div class="d-flex justify-content-center">
            <button type="button" class="btngame" @click="skipWord"><h2>Skip Word</h2></button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="correct" class="mensaje-correcto">
      <h1 class="green">Correct</h1>
    </div>
    <div v-if="incorrect" class="mensaje-incorrecto">
      <h1 class="red">Incorrect</h1>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import star0 from "@/assets/img/stars/0.svg";
import star1 from "@/assets/img/stars/1.svg";
import star2 from "@/assets/img/stars/2.svg";
import star3 from "@/assets/img/stars/3.svg";
import star4 from "@/assets/img/stars/4.svg";
import star5 from "@/assets/img/stars/5.svg";
import star6 from "@/assets/img/stars/6.svg";
import star7 from "@/assets/img/stars/7.svg";
import star8 from "@/assets/img/stars/8.svg";
import star9 from "@/assets/img/stars/9.svg";
import star10 from "@/assets/img/stars/10.svg";
import emogi1 from "@/assets/img/emogis/emogis_bajo.png";
import emogi2 from "@/assets/img/emogis/emogis_medio.png";
import emogi3 from "@/assets/img/emogis/emogis_alto.png";
import emogi4 from "@/assets/img/emogis/emogis_superior.png";

export default {
  name: "DragLetters",
  components: { draggable },
  data() {
    return {
      words: [
        { id: 1, word: "BASIC" }, { id: 2, word: "CHILL" }, { id: 3, word: "AWESOME" },
        { id: 4, word: "MEH" }, { id: 5, word: "HANGRY" }, { id: 6, word: "LIT" },
        { id: 7, word: "BAE" }, { id: 8, word: "SQUAD" }, { id: 9, word: "YOLO" },
        { id: 10, word: "OMG" }, { id: 11, word: "CRUSH" }, { id: 12, word: "MATCH" },
        { id: 13, word: "LOW-KEY" }, { id: 14, word: "TEA" }, { id: 15, word: "AESTHETIC" },
        { id: 16, word: "FACTS" }, { id: 17, word: "RANDOM" }, { id: 18, word: "VIBES" },
        { id: 19, word: "SAVAGE" }, { id: 20, word: "FIT" }, { id: 21, word: "FIRE" },
        { id: 22, word: "TBH" }, { id: 23, word: "FLEX" }, { id: 24, word: "CRINGE" },
        { id: 25, word: "CAP" }
      ],
      correct: null,
      incorrect: null,
      juegoIniciado: false,
      juegoFinalizado: false,
      cronometro: 0,
      intervalo: null,
      word: null,
      wordId: null,
      selectedLetters: [],
      shuffledLetters: [],
      score: 0,
      scoreFinal: 1000,
      usedWordIds: [],
      nickname: ''
    };
  },
  mounted() {
    const storedNickname = localStorage.getItem("userNickname");
    if (storedNickname) {
      this.nickname = storedNickname;
    }
  },
  computed: {
    message() {
      if (this.score <= 200) return emogi1;
      else if (this.score <= 500) return emogi2;
      else if (this.score <= 800) return emogi3;
      else return emogi4;
    },
    star() {
      if (this.score === 0) return star0;
      else if (this.score === 100) return star1;
      else if (this.score === 200) return star2;
      else if (this.score === 300) return star3;
      else if (this.score === 400) return star4;
      else if (this.score === 500) return star5;
      else if (this.score === 600) return star6;
      else if (this.score === 700) return star7;
      else if (this.score === 800) return star8;
      else if (this.score === 900) return star9;
      else return star10;
    },
  },
  methods: {
    iniciarJuego() {
      this.juegoIniciado = true;
      this.cronometro = 0;
      this.score = 0;
      this.iniciarCronometro();
      this.getNextWord();
    },
    iniciarCronometro() {
      this.intervalo = setInterval(() => {
        this.cronometro++;
        if (this.cronometro >= 120) this.finalizarJuego();
      }, 1000);
    },
    getNextWord() {
      const availableWords = this.words.filter(w => !this.usedWordIds.includes(w.id));
      if (availableWords.length === 0) return this.finalizarJuego();
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      const selectedWord = availableWords[randomIndex];
      this.word = selectedWord.word;
      this.wordId = selectedWord.id;
      this.usedWordIds.push(this.wordId);
      this.shuffleLetters(this.word);
    },
    shuffleLetters(word) {
      this.shuffledLetters = this.shuffleArray([...word].map((letter, index) => ({ id: index, letter })));
      this.selectedLetters = [];
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    onLetterDropped() {
      const formedWord = this.selectedLetters.map(l => l.letter).join('');
      if (formedWord === this.word) {
        this.score += 100;
        this.correct = true;
        this.incorrect = false;

        if (this.score >= this.scoreFinal) {
          this.finalizarJuego();
        }

        setTimeout(() => {
          this.correct = false;
          this.getNextWord();
        }, 1000);
      } else if (formedWord.length === this.word.length) {
        this.incorrect = true;
        this.correct = false;

        setTimeout(() => {
          this.incorrect = false;
          this.shuffleLetters(this.word);
          this.selectedLetters = [];
        }, 1000);
      }
    },
    skipWord() {
      this.getNextWord();
    },
    finalizarJuego() {
      clearInterval(this.intervalo);
      this.juegoFinalizado = true;
    },
    reiniciarJuego() {
      this.juegoFinalizado = false;
      this.juegoIniciado = false;
      this.cronometro = 0;
      this.score = 0;
      this.usedWordIds = [];
    },
    formatoTiempo(segundos) {
      return `${String(Math.floor(segundos / 60)).padStart(2, '0')}:${String(segundos % 60).padStart(2, '0')}`;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.btngame{
  background-color: #CDAA39;
  color: #002C52;
  padding: 0.5rem 2rem 0.5rem 2rem;
  border-radius: 5rem;
}
.square-item2 {
  background: linear-gradient(90deg, rgba(190,150,53,1) 35%, rgba(213,200,108,1) 78%, rgba(190,150,53,1) 95%);
  color: #002C52;    
  margin: 0.3rem;    
  border: 3px solid #B8862A;
  border-radius: 3px;
  width: 3rem; 
  height: 3rem;    
  display: flex;           
  align-items: center;     
  justify-content: center;   
  font-size: 2rem;
  font-weight: bold;          
  line-height: 3rem;      
}
.square-item {
  background: white;
  color: #002C52;    
  margin: 0.3rem;    
  border: 3px solid #B8862A;
  border-radius: 3px;
  width: 3rem; 
  height: 3rem;    
  display: flex;           
  align-items: center;     
  justify-content: center;   
  font-size: 2rem;
  font-weight: bold;          
  line-height: 3rem;      
}
.drop-area {
  min-height: 15rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;   
  overflow: hidden;      
}
.drop-area2 {
  background-color: #002C52;
  min-height: 15rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;   
  overflow: hidden;      
}
.mensaje-correcto {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(83, 219, 83, 0.8);
  color: white;
  font-size: 3rem;
  font-weight: bold;
  z-index: 9999;
  text-align: center;
}
.mensaje-incorrecto {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(212, 86, 64, 0.8);
  color: white;
  font-size: 3rem;
  font-weight: bold;
  z-index: 9999;
  text-align: center;
}
.imgMessage{
  width: 25rem;
}
</style>