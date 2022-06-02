<div class="cloudy">
  <img src="/images/clouds/cloud1.png" alt="cloud1" class="cloud1" />
  <img src="/images/clouds/cloud2.png" alt="cloud2" class="cloud2" />
  <img src="/images/clouds/cloud3.png" alt="cloud3" class="cloud3" />
</div>

<style>
  div.cloudy {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(#111425, #1e3b70);
    background-attachment: fixed;
    overflow: hidden;
    color: white;
    z-index: 0;
  }

  .cloud1 {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 300px;
    z-index: 9999;
    animation: cloud 390s linear infinite;
  }

  .cloud2 {
    position: absolute;
    top: 50px;
    left: 100px;
    max-width: 400px;
    z-index: 9999;
    animation: cloud 285s linear infinite;
  }

  .cloud3 {
    position: absolute;
    top: 80px;
    left: 0;
    max-width: 500px;
    z-index: 9999;
    animation: cloud 200s linear infinite;
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
