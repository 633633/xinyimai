// 音乐播放器
class MusicPlayer {
  constructor(data = {
      musicSrc: "./9719f38d70ab597be9fcdafca2ed77ee.mp3",
      // musicImgSrc: "./music.jpg",
      effectColor: "#ffffff"
  }) {
      this._requestID = null;
      // 特效单体
      this._effectEntity = new Entity();
      this._effectEntity.addComp(new MusicBtnSingleComp({
          callback: () => {
              this._effectEntity.getComp("MusicBtnSingleComp").isRotate = !this._effectEntity.getComp("MusicBtnSingleComp").isRotate;
              !this._effectEntity.getComp("MusicSingleComp").isReady &&(this._effectEntity.getComp("MusicSingleComp").isReady = true);
              this._effectEntity.getComp("MusicSingleComp").isPlay = !this._effectEntity.getComp("MusicSingleComp").isPlay;

              if(!this._effectEntity.getComp("MusicSingleComp").isPlay) {
                  cancelAnimationFrame(this._requestID);
              } else {
                  this._requestID = requestAnimationFrame(this._renderFrame.bind(this));
              }
          }
      }));
      this._effectEntity.addComp(new MusicSingleComp({
          musicSrc: data.musicSrc
      }));
      this._effectEntity.addComp(new MusicEffectSingleComp({
          effectColor: data.effectColor
      }))
  }

  _renderFrame() {
      this._requestID = requestAnimationFrame(this._renderFrame.bind(this));

      this._effectEntity.getComp("MusicEffectSingleComp").byteFrequencyDate = this._effectEntity.getComp("MusicSingleComp").byteFrequencyDate;
  }
}

// 单体
class Entity {
  constructor() {
      this._compMap = new Map();
  }

  addComp(comp) {
      this._compMap.set(comp.name, comp);
  }

  getComp(compName) {
      return this._compMap.get(compName);
  }
}

// 音乐按钮
class MusicBtnSingleComp {
  constructor(data) {
      this.name = "MusicBtnSingleComp";
      this._isRotate = false;
      this._musicBtnDom = document.querySelector(".my-music-btn");
      this._musicBtnDom.addEventListener("click", data.callback);
  }

  set isRotate(value) {
      if (value) {
          this._musicBtnDom.classList.remove("rotate");
      } else {
          this._musicBtnDom.classList.add("rotate");
      }
      this._isRotate = value;
  }

  get isRotate() {
      return this._isRotate;
  }
}

// 音乐
class MusicSingleComp {
  constructor(data) {
      this.name = "MusicSingleComp";
      this._fftSize = 512;

      this._myAudioDom = document.createElement("audio");
      this._myAudioDom.rossOrigin= "anonymous";
      this._myAudioDom.src = data.musicSrc;
      this._myAudioDom.loop = true;

      this._isReady = false;
      this._isPlay = false;
      this._analyser = null;
      this._dataArray = [];
  }

  set isReady(value) {
      if (value) {
          const ctx = new window.AudioContext();
          this._analyser = ctx.createAnalyser();
          this._analyser.fftSize = this._fftSize;
          const source = ctx.createMediaElementSource(this._myAudioDom);
          source.connect(this._analyser);
          this._analyser.connect(ctx.destination);
          const bufferLength = this._analyser.frequencyBinCount;
          this._dataArray = new Uint8Array(bufferLength);
      }
      this._isReady = value;
  }

  get isReady() {
      return this._isReady;
  }

  set isPlay(value) {
      if (value) {
          this._myAudioDom.play();
      } else {
          this._myAudioDom.pause();
      }
      this._isPlay = value;
  }

  get isPlay() {
      return this._isPlay;
  }

  get byteFrequencyDate() {
      this._analyser.getByteFrequencyData(this._dataArray);
      return this._dataArray.slice(0, 120);
  }
}

// 音乐特效
class MusicEffectSingleComp {
  constructor(data) {
      this.name = "MusicEffectSingleComp";
      this._effectColor = data.effectColor;
      this._canvasDom = document.querySelector(".my-canvas");
      this._canvasDom.width = 400;
      this._canvasDom.height = 400;
      this._ctx = this._canvasDom.getContext("2d");
      this._byteFrequencyData;
      this._randomData = Uint8Array.from(new Uint8Array(120), (v,k) => k);
      this._randomData.sort(() => Math.random() - 0.5);
      this.byteFrequencyDate = new Uint8Array(120).fill(0);
  }

  set byteFrequencyDate(value) {
      this._byteFrequencyData = value;
      const bData = [];
      this._randomData.forEach(value => {
          bData.push(this._byteFrequencyData[value]);
      })

      const angle = Math.PI * 2 / bData.length;
      this._ctx.clearRect(0, 0, this._canvasDom.width, this._canvasDom.height);
      this._ctx.fillStyle = this._effectColor;
      this._ctx.save();
      this._ctx.translate(this._canvasDom.width / 2, this._canvasDom.height / 2);
      bData.forEach((value, index) => {
          this._ctx.save();
          this._ctx.rotate(angle * index);
          this._ctx.beginPath();
          const h = value / 256 * 60;
          this._ctx.roundRect(-4, 140, 4, (h < 4) ? 4 : h, 4);
          // 若上行的 roundRect 存在兼容性问题可以更换为下面注释的代码
          // this._ctx.fillRect(-4, 140,  4, (h < 4) ? 4 : h);
          this._ctx.fill();
          this._ctx.restore();
      });
      this._ctx.restore();
  }
}

new MusicPlayer();