<template>
    <div class="loading">
        <div class="lds-css ng-scope">
            <div style="width:100%;height:100%" class="lds-eclipse"><div></div></div>
        </div>
    </div>
</template>

<style scoped>
.loading{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    -webkit-justify-content:center; 
    align-items: center;
    -webkit-align-items: center;
}
@keyframes lds-eclipse {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes lds-eclipse {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.lds-eclipse {
  position: relative;
}
.lds-eclipse div {
  position: absolute;
  -webkit-animation: lds-eclipse 1s linear infinite;
  animation: lds-eclipse 1s linear infinite;
  width: 80px;
  height: 80px;
  top: 10px;
  left: 10px;
  border-radius: 50%;
  box-shadow: 0 4px 0 0 white;
  -webkit-transform-origin: 40px 41px;
  transform-origin: 40px 41px;
}
.lds-eclipse {
  width: 100px !important;
  height: 100px !important;
  -webkit-transform: translate(-50px, -50px) scale(1) translate(50px, 50px);
  transform: translate(-50px, -50px) scale(1) translate(50px, 50px);
}
</style></div>