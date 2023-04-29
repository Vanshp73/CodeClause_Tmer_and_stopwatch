$(".stopwatch-btn").click(function () {
    
    $(".outer-wrapper > div").slideUp();
    
    $(".stopwatch").slideDown();
    
    $(".type").html("Stopwatch");
});

$(".back-btn").click(function () {
    
    $(".outer-wrapper > div").slideUp();
    
    $(".clock").slideDown();
    
    $(".type").html("Stopwatch");
});

$(".timer-btn").click(function () {
    
    $(".outer-wrapper > div").slideUp();
    
    $(".timer").slideDown();
   
    $(".type").html("Stopwatch");
});

const addTrailingZero = (num) => {
    return num < 10 ? "0" + num : num;
};

const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours > 12 ? "PM" : "AM";
    let otherampm = hours > 12 ? "AM" : "PM";

    
    hours = hours % 12 || 12;

    
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);
};


updateTime();


setInterval(updateTime, 1000);


let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliSeconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

const stopwatch = () => {

    stopwatchMiliSeconds++;

    if (stopwatchMiliSeconds === 100) {
        
        stopwatchSeconds++;
        stopwatchMiliSeconds = 0;
    }

    if (stopwatchSeconds === 60) {
        
        stopwatchMinutes++;
        stopwatchSeconds = 0;
    }

    if (stopwatchMinutes === 60) {
        
        stopwatchHours++;
        stopwatchMinutes = 0;
    }

    
    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
};


const startStopwatch = () => {
    if (!stopwatchRunning) {
       
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
};


const stopStopwatch = () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
};


const resetStopwatch = () => {
   
    clearInterval(stopwatchInterval);
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliSeconds = 0;
    stopwatchRunning = false;
    laps = 0;

  
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html("");
};


$(".start-stopwatch").click(function () {
    startStopwatch();
   
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
});

$(".reset-stopwatch").click(function () {
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
});

$(".lap-stopwatch").click(function () {
  
    laps++;
    
    $(".lap").removeClass("active");
    $(".laps").prepend(
        `<div class="lap active">
        <p>lap ${laps}</p>
        <p>
        ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinutes)}:
        ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(stopwatchMiliSeconds)} 
        </p> 
    </div> `
    );
});



let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliSeconds = 0,
    timerInterval;

const getTime = () => {
    time = prompt("Enter time in minutes");
    
    time = time*60;
  
    setTime();
};

const setTime = () => {
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = Math.floor(time % 60);

   
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliSeconds));
};

const timer = () => {
    timerMiliSeconds--;

    if (timerMiliSeconds === -1) {
        timerMiliSeconds = 99;
        timerSeconds--;
    }

    if (timerSeconds === -1) {
        timerSeconds = 59;
        timerMinutes--;
    }

    if (timerMinutes === -1) {
        timerMinutes = 59;
        timerHours--;
    }

    
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliSeconds));

  
    timeUp();
};

const startTimer = () => {
   
    if(
        (timerHours === 0) & (timerMinutes === 0) &&
        timerSeconds === 0 &&
        timerMiliSeconds === 0
    ){
        
        getTime();
    } else{
      
        timerInterval = setInterval(timer, 10);
        $(".start-timer").hide();
        $(".stop-time").show();
    }
};

const stopTimer = () => {
    clearInterval(timerInterval);
    $(".start-timer").show();
    $(".stop-time").hide();
};

const resetTimer = () => {
    stopTimer();
    time = 0;
    setTime();
};


const timeUp = () => {
    if(
        timerHours === 0 &&
        timerMinutes === 0 &&
        timerSeconds === 0 &&
        timerMiliSeconds === 0
    ) {
        resetTimer();
        alert("Time's up");
    }
};

$(".start-timer").click(function () {
    startTimer();
});

$(".stop-timer").click(function () {
    stopTimer();
});

$(".reset-timer").click(function () {
    resetTimer(); 
});
