<template>

    <div id="container" class="floating" >
      <img src="../assets/fatHarry.png" >

      <br>
      <label id="msg" >{{ text }}</label>
    </div>
  
  </template>
  
  <script>
  export default {
      name: "NotFound",
      props: {
          text:
          {
            type: String,
            required: true
          },
  
      },
  };
  
  </script>
  
  <style>
  #container{
    text-align: center;
    margin-top:7%;
  }

@keyframes glow {
  from {
    text-shadow: 0 0 20px #fff, 0 0 30px #856330e7, 0 0 40px #965b38ab, 0 0 50prgb(161, 100, 49)a6, 0 0 60px #885423, 0 0 70px #a57315, 0 0 80px #bd771c;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff4800, 0 0 40px #52190b, 0 0 50px #99793d, 0 0 60px #4d372a, 0 0 70px #573100;

  }
}

#msg
{
  font-family: "Harry Potter";
  font-size: 1.7vw;
  color: #37713f;
}

#msg:hover
{
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;

}



  </style>