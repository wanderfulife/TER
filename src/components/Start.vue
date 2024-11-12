<template>
  <div class="app-container">
    <!-- Progress Bar -->
    <div v-if="currentStep === 'survey'" class="progress-bar">
      <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>

    <div class="content-container">
      <!-- Enqueteur Input Step -->
      <div v-if="currentStep === 'enqueteur'">
        <h2>Prénom enqueteur :</h2>
        <input class="form-control" type="text" v-model="enqueteur" />
        <button
          v-if="enqueteur && !isEnqueteurSaved"
          @click="setEnqueteur"
          class="btn-next"
        >
          Suivant
        </button>
      </div>

      <!-- Start Survey Step -->
      <div v-else-if="currentStep === 'start'" class="start-survey-container">
        <h2>{{ startMessage }}</h2>
        <button @click="startSurvey" class="btn-next">
          COMMENCER QUESTIONNAIRE
        </button>
      </div>

      <!-- Survey Questions Step -->
      <div v-else-if="currentStep === 'survey' && !isSurveyComplete">
        <div class="question-container" v-if="currentQuestion">
          <h2>{{ currentQuestion.text }}</h2>

          <!-- Standard options -->
          <div
            v-if="
              !currentQuestion.freeText && !currentQuestion.usesCommuneSelector
            "
          >
            <div v-for="(option, index) in currentQuestionOptions" :key="index">
              <button
                v-if="!option.hidden"
                @click="selectAnswer(option)"
                class="btn-option"
              >
                {{ option.text }}
              </button>
            </div>
          </div>

          <!-- Free Text Questions -->
          <div v-if="currentQuestion.freeText">
            <!-- Single input for Q2 -->
            <div
              v-if="currentQuestion.id === 'Q2'"
              class="train-input-container"
            >
              <input
                v-model="freeTextAnswer"
                class="form-control train-input"
                type="text"
                :placeholder="'Votre réponse'"
              />
              <button
                @click="handleFreeTextAnswer"
                class="btn-next train-button"
                :disabled="!freeTextAnswer.trim()"
              >
                Suivant
              </button>
            </div>

            <!-- Multiple inputs for Q4-Q8 -->
            <div v-else-if="currentQuestion.id === 'Q4'" class="mobile-questions-container">
              <div v-for="q in ['Q4', 'Q5', 'Q6', 'Q7', 'Q8']" :key="q" class="mobile-input-group">
                <h2 v-if="q !== 'Q4'">{{ getQuestionText(q) }}</h2>
                <input
                  v-model="multiAnswers[q]"
                  class="mobile-input"
                  type="number"
                  min="0"
                />
              </div>
              <button @click="handleMultiAnswers" class="mobile-btn-next">
                Terminer
              </button>
              <button @click="previousQuestion" class="mobile-btn-return">
                Retour
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Survey Complete Step -->
      <div v-else-if="isSurveyComplete" class="survey-complete">
        <h2>Merci pour votre réponse et bonne journée.</h2>
        <button @click="resetSurvey" class="btn-next">
          Nouveau questionnaire
        </button>
      </div>

      <!-- Logo -->
      <img class="logo" src="../assets/Alycelogo.webp" alt="Logo Alyce" />
    </div>

    <!-- Footer -->
    <div class="footer">
      <AdminDashboard :questions="questions" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { questions } from "./surveyQuestions.js";
import AdminDashboard from "./AdminDashboard.vue";

// Refs
const persistentQ1 = ref(null);
const persistentQ2 = ref(null);
const docCount = ref(0);
const currentStep = ref("enqueteur");
const startDate = ref("");
const enqueteur = ref("");
const currentQuestionIndex = ref(0);
const answers = ref({});
const freeTextAnswer = ref("");
const questionPath = ref(["Q1"]);
const isEnqueteurSaved = ref(false);
const isSurveyComplete = ref(false);
const multiAnswers = ref({
  Q4: "",
  Q5: "",
  Q6: "",
  Q7: "",
  Q8: "",
});
// Firestore refs
const surveyCollectionRef = collection(db, "TER");
const counterDocRef = doc(db, "counterTER", "surveyCounter");

// Add these computed properties and methods
const areMultiAnswersValid = computed(() => {
  return ["Q4", "Q5", "Q6", "Q7", "Q8"].every(
    (q) => multiAnswers.value[q] !== "" && multiAnswers.value[q] >= 0
  );
});

const getQuestionText = (questionId) => {
  return questions.find((q) => q.id === questionId)?.text || "";
};

const handleMultiAnswers = () => {
  // Save all answers
  Object.entries(multiAnswers.value).forEach(([questionId, answer]) => {
    answers.value[questionId] = answer;
  });
  finishSurvey();
};

const currentQuestion = computed(() => {
  if (
    currentQuestionIndex.value >= 0 &&
    currentQuestionIndex.value < questions.length
  ) {
    const question = questions[currentQuestionIndex.value];

    // Handle dynamic text
    const text =
      typeof question.text === "function"
        ? question.text(answers.value)
        : question.text;

    // Handle dynamic options
    const options =
      typeof question.options === "function"
        ? question.options(answers.value)
        : question.options;

    // Debug logging for all questions
    console.log(
      `Question ${question.id} detected. Current answers:`,
      answers.value
    );
    console.log(`${question.id} text after evaluation:`, text);
    console.log(`${question.id} options after evaluation:`, options);

    return {
      ...question,
      text,
      options,
    };
  }
  return null;
});

// Methods

const startMessage = computed(() => {
  return "Bonjour, Vous allez démarrer le questionnaire";
});

const currentQuestionOptions = computed(() => {
  if (
    currentQuestion.value &&
    typeof currentQuestion.value.options === "function"
  ) {
    return currentQuestion.value.options(answers.value);
  }
  return currentQuestion.value?.options || [];
});

const canGoBack = computed(() => questionPath.value.length > 1);

const isLastQuestion = computed(
  () => currentQuestionIndex.value === questions.length - 1
);

const progress = computed(() => {
  if (currentStep.value !== "survey") return 0;
  if (isSurveyComplete.value) return 100;
  const totalQuestions = questions.length;
  const currentQuestionNumber = currentQuestionIndex.value + 1;
  const isLastOrEnding =
    isLastQuestion.value ||
    currentQuestion.value?.options?.some((option) => option.next === "end");
  return isLastOrEnding
    ? 100
    : Math.min(Math.round((currentQuestionNumber / totalQuestions) * 100), 99);
});

const setEnqueteur = () => {
  if (enqueteur.value.trim() !== "") {
    currentStep.value = persistentQ1.value ? "start" : "survey";
    currentQuestionIndex.value =
      persistentQ1.value && persistentQ2.value ? 2 : 0;
    isEnqueteurSaved.value = true;
  }
};

// Update startSurvey in Start.vue
const startSurvey = () => {
  startDate.value = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  currentStep.value = "survey";
  // Change this line to check for persistentQ2
  currentQuestionIndex.value = persistentQ1.value && persistentQ2.value ? 2 : 1;
  isSurveyComplete.value = false;
};

// Add this near the top of the <script setup> section
const logAnswers = () => {
  console.log("Current answers:", JSON.parse(JSON.stringify(answers.value)));
};

const selectAnswer = (option) => {
  if (currentQuestion.value) {
    answers.value[currentQuestion.value.id] = option.id;
    if (currentQuestion.value.id === "Q1") {
      persistentQ1.value = option.id;
      currentStep.value = "start";
    } else if (option.next === "end") {
      finishSurvey();
    } else {
      nextQuestion(option.next);
    }
  }
};

// Update handleFreeTextAnswer in Start.vue
const handleFreeTextAnswer = () => {
  if (currentQuestion.value) {
    answers.value[currentQuestion.value.id] = freeTextAnswer.value;
    if (currentQuestion.value.id === "Q2") {
      persistentQ2.value = freeTextAnswer.value;
    }
    if (currentQuestion.value.next === "end") {
      finishSurvey();
    } else {
      nextQuestion();
    }
    freeTextAnswer.value = ""; // Reset the free text answer
  }
};

const nextQuestion = (forcedNextId = null) => {
  let nextQuestionId = forcedNextId;
  if (!nextQuestionId && currentQuestion.value) {
    if (typeof currentQuestion.value.next === "function") {
      nextQuestionId = currentQuestion.value.next(answers.value);
    } else {
      nextQuestionId = currentQuestion.value.next;
    }
  }

  if (nextQuestionId === "end") {
    finishSurvey();
  } else if (nextQuestionId) {
    const nextIndex = questions.findIndex((q) => q.id === nextQuestionId);
    if (nextIndex !== -1) {
      currentQuestionIndex.value = nextIndex;
      questionPath.value.push(nextQuestionId);
      freeTextAnswer.value = "";

      // Execute onEnter function if it exists
      const nextQuestion = questions[nextIndex];
      if (typeof nextQuestion.onEnter === "function") {
        nextQuestion.onEnter(answers.value);
      }
    }
  }
};

const previousQuestion = () => {
  if (canGoBack.value) {
    questionPath.value.pop();
    const previousQuestionId =
      questionPath.value[questionPath.value.length - 1];
    const previousIndex = questions.findIndex(
      (q) => q.id === previousQuestionId
    );
    if (previousIndex !== -1) {
      currentQuestionIndex.value = previousIndex;
      delete answers.value[questions[currentQuestionIndex.value].id];
      freeTextAnswer.value = "";
    }
  }
};

// Update finishSurvey function in Start.vue
const finishSurvey = async () => {
  isSurveyComplete.value = true;
  const now = new Date();
  logAnswers(); // Log all answers before saving to Firebase

  const uniqueId = await getNextId();

  let surveyData = {
    ID_questionnaire: uniqueId,
    HEURE_DEBUT: startDate.value,
    DATE: now.toLocaleDateString("fr-FR").replace(/\//g, "-"),
    JOUR: now.toLocaleDateString("fr-FR", { weekday: "long" }),
    ENQUETEUR: enqueteur.value,
    HEURE_FIN: now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    PORT_ID_ORIGIN: answers.value.PORT_ID_ORIGIN || "",
    PORT_ID_DESTINATION: answers.value.PORT_ID_DESTINATION || "",
  };

  // Include all answers in the survey data
  Object.keys(answers.value).forEach((key) => {
    surveyData[key] = answers.value[key];
  });

  console.log("Survey data to be saved:", surveyData);

  try {
    await addDoc(surveyCollectionRef, surveyData);
    console.log("Survey data saved successfully");
  } catch (error) {
    console.error("Error saving survey data:", error);
  }
};

// Update resetSurvey function
const resetSurvey = () => {
  isSurveyComplete.value = false; // First set this to false
  currentStep.value = "start";
  startDate.value = "";
  answers.value = {
    Q1: persistentQ1.value,
    Q2: persistentQ2.value,
  };
  // Reset multiAnswers
  multiAnswers.value = {
    Q4: "",
    Q5: "",
    Q6: "",
    Q7: "",
    Q8: "",
  };
  currentQuestionIndex.value = 2;
};

const getDocCount = async () => {
  try {
    const querySnapshot = await getDocs(surveyCollectionRef);
    docCount.value = querySnapshot.size;
  } catch (error) {
    console.error("Error getting document count:", error);
  }
};

const getNextId = async () => {
  const counterDoc = await getDoc(counterDocRef);
  let counter = 1;

  if (counterDoc.exists()) {
    counter = counterDoc.data().value + 1;
  }

  await setDoc(counterDocRef, { value: counter });

  return `TER-${counter.toString().padStart(6, "0")}`;
};
</script>

<style>
/* Base styles */
body {
  background-color: #2a3b63;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #2a3b63;
  color: white;
}

/* Content area */
.content-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 0;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: auto;
}

.start-survey-container {
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100%;
  margin-bottom: 5%;
}

.question-container {
  width: 100%;
  margin-bottom: 30px;
}

h2 {
  text-align: center;
  width: 100%;
}

.form-control {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid white;
  background-color: #333;
  color: white;
  font-size: 16px;
  margin-bottom: 15px;
  box-sizing: border-box;
  outline: none;
}

.btn-next,
.btn-return,
.btn-option {
  width: 100%;
  max-width: 400px;
  color: white;
  padding: 15px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-next {
  background-color: green;
}

.btn-return {
  background-color: grey;
  margin-top: 30px;
}

.btn-option {
  background-color: #4a5a83;
  text-align: left;
}

.logo {
  max-width: 25%;
  height: auto;
  margin-top: 40px;
  margin-bottom: 20px;
}

.footer {
  background: linear-gradient(to right, #4c4faf, #3f51b5);
  padding: 20px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out;
}

@media screen and (max-width: 768px) {
  .question-container {
    margin-bottom: 20px;
  }

  .btn-return {
    margin-top: 20px;
  }

  .logo {
    margin-top: 30px;
  }
}

@media screen and (max-width: 480px) {
  .form-control {
    max-width: 100%;
  }
}

.mobile-questions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
  padding: 0 20px;
}

.mobile-input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.mobile-input-group h2 {
  color: white;
  font-size: 20px;
  margin: 0;
}

.mobile-input {
  width: 100%;
  height: 44px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  padding: 0 12px;
  text-align: center;
}

.mobile-btn-next {
  width: 100%;
  background: green;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  margin-top: 24px;
}

.mobile-btn-return {
  width: 100%;
  background: #666;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  margin-top: 8px;
}
</style>