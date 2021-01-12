<template>
  <div id="app">
    <img alt="BMA" height="150" src="./assets/bma-logo.jpeg">
    <h1>Breast men association</h1>
    <small>Created by <a href="https://twitter.com/mozartted" target="_blank">mozart</a> while listening to Future</small>
    <p>Oya, Enter your details, generate your ID card, and bounce...</p>

    <b-container>
        <b-row class="row mt-3"> 
          <b-col>
            <form>
              <b-input-group size="lg" class="mt-3" prepend="Name">
                <b-form-input @change="addName"></b-form-input>
              </b-input-group>
              <b-input-group size="lg" class="mt-3" prepend="Position">
                <b-form-input @change="addPosition"></b-form-input>
              </b-input-group>
              <b-input-group size="lg" class="mt-3" prepend="branch">
                <b-form-input @change="addBranch"></b-form-input>
              </b-input-group>
              <b-form-file
                v-model="file"
                class="mt-3"
                :state="Boolean(file)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
              <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>
            </form>
          </b-col>
          <b-col>
            <canvas ref="cvn" id="bma-canvas" width="600" height="400"></canvas>
            <button class="btn btn-block btn-success mt-4" @click="downloadImage">DOWNLOAD ID</button>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import BMA from "./assets/BMA.png"
export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
  data: function () {
    return {
      canvasRef: null,
      canvas: null,
      file: null,
      x: 0,
      y: 0
    }
  },
  methods: {
    addName(name){
      this.canvas.font = "20px Calibri";
      this.canvas.fillText(name, 100, 180)
    },

    addPosition(positon){
      this.canvas.font = "20px Calibri";
      this.canvas.fillText(positon, 120, 224)
    },

    addBranch(name){
      this.canvas.font = "20px Calibri";
      this.canvas.fillText(name, 120, 265)
    },


/* Canvas Donwload */
    download(canvas, filename) {
      /// create an "off-screen" anchor tag
      var lnk = document.createElement('a'), e;

      /// the key here is to set the download attribute of the a tag
      lnk.download = filename;

      /// convert canvas content to data-uri for link. When download
      /// attribute is set the content pointed to by link will be
      /// pushed as "download" in HTML5 capable browsers
      lnk.href = canvas.toDataURL("image/png;base64");

      /// create a "fake" click-event to trigger the download
      if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
                        0, 0, 0, 0, 0, false, false, false,
                        false, 0, null);

        lnk.dispatchEvent(e);
      } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
      }
    },

    downloadImage(){
      this.download(this.canvasRef, "BMA_ID.png")
    },
    // addPassport(name){
    //   this.canvas.font = "20px Calibri";
      
    // },
    func(){
       let c = this.$refs.cvn;
       this.canvasRef = this.$refs['cvn'];
        this.canvas = c.getContext("2d");
        let background = new Image();
        background.src= BMA
        // function writeMessage(canvas, message) {
        //   var context = canvas.getContext('2d');
        //   // context.clearRect(0, 0, canvas.width, canvas.height);
        //   // context.font = '18pt Calibri';
        //   // context.fillStyle = 'black';
        //   // context.fillText(message, 10, 25);
        // }

        background.onload = function(){
          this.canvas.drawImage(background, 0, 0, 600, 400)
          this.canvas.font = "20px Calibri";
          this.canvas.fillText(Math.floor(Math.random() * (50000 - 20000 + 1)) + 20000, 110, 308)
        }.bind(this)
        // function getMousePos(canvas, evt) {
        //   var rect = canvas.getBoundingClientRect();
        //   return {
        //     x: evt.clientX - rect.left,
        //     y: evt.clientY - rect.top
        //   };
        // }

        // this.canvas.addEventListener('mousemove', function(evt) {
        //     var mousePos = getMousePos(this.canvas, evt);
        //     var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        //     // writeMessage(this.canvas, message);
        //     console.log(message)
        // }.bind(this), false);
    }
  },
  watch: {
    file(newFile){
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        // convert image file to base64 string
        // preview.src = reader.result;
        let background = new Image();
        background.src= reader.result

        background.onload = function(){
          this.canvas.drawImage(background, 385, 140, 190, 200)
        }.bind(this)
        // this.canvas.
      }.bind(this), false);

      reader.readAsDataURL(newFile)
    }
  },
  mounted(){
    this.func()
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
