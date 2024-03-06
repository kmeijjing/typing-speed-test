const words = "There was once a very rich merchant, who had six children, three sons, and three daughters; being a man of sense, he spared no cost for their education, but gave them all kinds of masters. His daughters were extremely handsome, especially the youngest; when she was little, every body admired her, and called her The little Beauty; so that, as she grew up, she still went by the name of Beauty, which made her sisters very jealous. The youngest, as she was handsome, was also better than her sisters. The two eldest had a great deal of pride, because they were rich. They gave themselves ridiculous airs, and would not visit other merchants' daughters, nor keep company with any but persons of quality. They went out every day upon parties of pleasure, balls, plays, concerts, etc. and laughed at their youngest sister, because she spent the greatest part of her time in reading good books. As it was known that they were to have great fortunes, several eminent merchants made their addresses to them; but the two eldest said they would never marry, unless they could meet with a Duke, or an Earl at least. Beauty very civilly thanked them that courted her, and told them she was too young yet to marry, but chose to stay with her father a few years longer.";


const typingTextItem = document.getElementById('typing-text');
const textInput = document.getElementById('text-input');
const typingedWordValue = document.getElementById('word-count__value');
const typingedCharValue = document.getElementById('char-count__value');
const accuracyPercentValue = document.getElementById('accuracy-percent__value');
const cpmValue = document.getElementById('cpm__value');
const wpmValue = document.getElementById('wpm__value');
let currentCharPosition = 1;
let timer = false;
let leftSeconds = 60;
let typingedWordsNumber = 0;
let accuracy = 0;
let row = 0;

function displayText() {
  let textIdx = 0;
  words.split(' ').forEach((word) => {
    let wordContainer = document.createElement('div');
    typingTextItem.appendChild(wordContainer);
    const wordChar = word.split('');
    wordChar.forEach((char, idx) => {
      let wordDiv = document.createElement('div');
      wordDiv.innerText = char;
      textIdx++;
      wordDiv.setAttribute("id", "char" + (textIdx));
      wordContainer.appendChild(wordDiv);
    })
    let wordDiv = document.createElement('div');
    wordDiv.innerText = ' ';
    wordDiv.setAttribute("class", "spacer");
    textIdx++;
    wordDiv.setAttribute("id", "char" + textIdx);
    wordContainer.appendChild(wordDiv);
  });
}

window.onload = () => {
  typingedWordValue.innerText = typingedWordsNumber;
  typingedCharValue.innerText = 0;
  accuracyPercentValue.innerText = 100;
  
  displayText();
  const firstWordChar = document.getElementById("char1");
  firstWordChar.classList.add("focus");
  textInput.focus();
  progress(100);
};

window.addEventListener("click", () => {
  textInput.focus()
});

textInput.addEventListener("input", (event) => {
  const isBackspace = event.inputType === 'deleteContentBackward';
  let currentChar = document.getElementById(`char${currentCharPosition}`);

  if (!timer && !isBackspace) {
    timer = true;
    startTimer();
  }

  // backspace 일 때,
  if (isBackspace) {
    if (currentCharPosition > 1) {
      currentChar.classList.remove('focus');
      currentChar.classList.remove('passed');
      currentChar.classList.remove('failed');
      currentCharPosition--;
      document.getElementById(`char${currentCharPosition}`).classList.add('focus');
      document.getElementById(`char${currentCharPosition}`).classList.remove('passed');
      document.getElementById(`char${currentCharPosition}`).classList.remove('failed');
    }
  } else {
    // 문자 검사
    const inputChar = event.data;
    if (!!inputChar) {
      if (currentChar.innerText === '' && inputChar === ' ') {
        // word
        typingedWordsNumber++;
        typingedWordValue.innerText = typingedWordsNumber;
  
        // character
        typingedCharValue.innerText = currentCharPosition;
  
        // 정확도 계산
        const successfulChar = document.getElementsByClassName("passed").length;
        const failedChar = document.getElementsByClassName("failed").length;
        accuracy = Math.round(successfulChar / (successfulChar + failedChar) * 100)
        accuracyPercentValue.innerText = accuracy;

        // 줄바꿈
        if (document.getElementById(`char${currentCharPosition}`).offsetTop !== document.getElementById(`char${currentCharPosition + 1}`).offsetTop) {
          row++;
          typingTextItem.style.top = `-${65 * row}px`;
        }

        typingSuccess();
      } else if (inputChar === currentChar.innerText) {
        typingSuccess();
      } else {
        typingFailed();
      }
  
      currentChar.classList.remove('focus');
      currentCharPosition++;
      document.getElementById(`char${currentCharPosition}`).classList.add('focus');
  
      if (currentCharPosition > words.length) {
        currentCharPosition = 1;
        displayText();
      }
  
      function typingFailed() {
        currentChar.classList.add('failed');
      }
      function typingSuccess() {
        currentChar.classList.add('passed');
      }
    }
  }
});


function startTimeWatch() {

}

function stopTimeWatch() {
  
}

const leftBar = document.getElementById('left-bar');
const rightBar = document.getElementById('right-bar');
const per = document.getElementById('left-seconds__value');
function progress(value) {
  per.innerHTML= 60;
  if (value <= 50) {
    const degree = 18*value/5;
    rightBar.style.transform = "rotate("+degree+"deg)";
    leftBar.style.transform = "rotate(0deg)";
  } else {
    const degree = 18*(value-50)/5;
    rightBar.style.transform = "rotate(180deg)";
    leftBar.style.transform = "rotate("+degree+"deg)";
  }
}


function startTimer() { 
  if (timer) { 
    leftSeconds--; 
    progress(100*leftSeconds/60);
    if (leftSeconds < 10) { 
      leftSeconds = "0" + leftSeconds; 
    } 
    per.innerHTML = leftSeconds; 
    if (leftSeconds === '00') {
      clearTimeout();
      endTimer();
    } else {
      setTimeout(startTimer, 1000);
    }
  } 
}

const modal = document.getElementById('modal');
function endTimer() {

  cpmValue.innerText = currentCharPosition;
  const wpm = typingedWordsNumber / 5;
  wpmValue.innerText = wpm;
  modal.classList.add('show');
}

const closeButton = document.getElementById('close-btn');
closeButton.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.classList.add('hide');
  window.location.reload();
});

const reloadButton = document.getElementById('reload-btn');
reloadButton.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.classList.add('hide');
  window.location.reload();
});

