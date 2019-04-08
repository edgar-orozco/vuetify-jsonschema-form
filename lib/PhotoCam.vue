<template>
    <v-layout>
        <v-flex>
            <div id="vid_container">
                <video id="video" ref="video" autoplay playsinline class="camera-stream"></video>
                <div id="video_overlay">
                </div>
            </div>

        </v-flex>

        <v-flex>
            <v-bottom-nav app
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

            </v-bottom-nav>
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
        const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
        const imageCapture = new window.ImageCapture(mediaStreamTrack)
        return imageCapture.takePhoto().then(blob => {
          this.blobFoto = blob;
          this.destroyCam();

          console.log(blob);
        })
      },
      ffCamMode() {
        this.currentFacingMode = (this.currentFacingMode === 'environment') ? 'user' : 'environment';
        this.initCam();
      },
      cancelCam(){
        this.destroyCam();
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
        position: fixed;
        top: 0;
        left: 0;
        bottom: 50px;
    }


</style>