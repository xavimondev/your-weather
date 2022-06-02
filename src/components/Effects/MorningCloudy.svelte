<div class="cloudy">
  <img src="/images/clouds/cloud1.png" alt="cloud1" class="cloud1" />
  <img src="/images/clouds/cloud1.png" alt="cloud2" class="cloud2" />
</div>

<style>
  div.cloudy {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(315deg, #73adcc 0%, #4a8db4 74%);
    background-attachment: fixed;
    overflow: hidden;
    color: white;
    z-index: 0;
  }

  .cloud1 {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 230px;
    z-index: 9999;
    animation: cloud 300s linear infinite;
  }

  .cloud2 {
    position: absolute;
    top: 90px;
    left: 0;
    max-width: 300px;
    z-index: 9999;
    animation: cloud 290s linear infinite;
  }

  @keyframes cloud {
    0% {
      transform: translateX(-100);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>
