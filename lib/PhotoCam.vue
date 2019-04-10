<template>
    <v-layout row wrap>
        <v-flex xs12>
            <div id="vid_container">
                <video id="video" ref="video" autoplay playsinline class="camera-stream"></video>
            </div>
        </v-flex>

        <v-flex xs12>
            <div class="photo-bar" app
                 absolute
                 color="white"
                 style="opacity: .6"
            >

                <v-btn v-if="currentFacingMode === 'environment'"
                       color="teal"
                       flat
                       @click="ffCamMode"

                >
                    <span>Selfie Cam</span>
                    <v-icon>camera_rear</v-icon>
                </v-btn>

                <v-btn v-if="currentFacingMode === 'user'"
                       color="teal"
                       flat
                       @click="ffCamMode"
                >
                    <span>Front Cam</span>
                    <v-icon>camera_front</v-icon>
                </v-btn>

                <v-btn
                        color="teal"
                        flat
                        @click="takePhoto"
                >
                    <span>Tomar</span>
                    <v-icon>camera</v-icon>
                </v-btn>

                <v-btn
                        color="teal"
                        flat
                        @click="cancelCam"
                >
                    <span>Cancelar</span>
                    <v-icon>cancel</v-icon>
                </v-btn>

            </div>
        </v-flex>

    </v-layout>
</template>

<script>

  export default {
    name: "photo-cam",
    data() {
      return {
        currentFacingMode: 'environment',
        mediaStream: null,
        blobFoto: null
      }
    },
    methods: {
      takePhoto() {
        let vm = this;
        const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
        const imageCapture = new window.ImageCapture(mediaStreamTrack)
        return imageCapture.takePhoto().then(blob => {
          this.blobFoto = blob;
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function() {
            let base64data = reader.result;
            vm.$emit('photo-saved', base64data)
          }
          this.destroyCam();

        })
      },
      ffCamMode() {
        this.currentFacingMode = (this.currentFacingMode === 'environment') ? 'user' : 'environment';
        this.initCam();
      },
      cancelCam(){
        this.destroyCam();
        this.$emit('photo-canceled')
      },
      initCam() {
        this.destroyCam();
        let hdConstraints = {
          audio: false,
          video: {
            facingMode: this.currentFacingMode
          }
        };
        navigator.mediaDevices.getUserMedia(hdConstraints)
          .then(mediaStream => {
            this.mediaStream = mediaStream
            this.$refs.video.srcObject = mediaStream
            this.$refs.video.play()
          })
          .catch(error => console.error('getUserMedia() error:', error))
      },
      destroyCam() {
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach(function (track) {
            track.stop();
          });
        } else {
          console.log('video stram not detected')
        }
      }
    },
    mounted() {


      let vm = this;

      this.$nextTick(function () {

        vm.initCam();
      });

    },
    destroyed() {
      this.destroyCam()
    }
  }
</script>

<style scoped>

    #vid_container {
        box-sizing: border-box;
        height: 100%;
        overflow: hidden;
        width: 100%;
    }
    video { height: 100%;}

    .photo-bar{
        background-color: white;
    }

</style>