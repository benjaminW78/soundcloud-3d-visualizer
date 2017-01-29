/*********************************************************************************
*SOUNDCLOUD CLASS
*********************************************************************************/
/**
 * Makes a request to the Soundcloud API and returns the JSON data.
 */

var SoundCloudAudioSource = function(player) {
    var self = this;
    var analyser;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext);
    analyser = audioCtx.createAnalyser();
    var source = audioCtx.createMediaElementSource(player);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    this.sampleAudioStream = function() {
        analyser.getByteFrequencyData(self.streamData);
        // calculate an overall volume value
        var total = 0;
        for (var i = 0; i < particleCount; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
            total += self.streamData[i];
        }
        self.volume = total;
    };
    // setInterval(sampleAudioStream, 20);
    // // public properties and methods
    this.volume = 0;
    this.streamData = new Uint8Array(particleCount);
    this.playStream = function(streamUrl) {
        // get the input stream from the audio element
        player.addEventListener('ended', function(){
            self.directStream('coasting');
        });
        player.setAttribute('src', streamUrl);
        player.play();
    }
};
var SoundcloudLoader = function(player,uiUpdater) {
    var self = this;
    var client_id = "42ab05e4323be426e3128b784ba36c95"; // to get an ID go to http://developers.soundcloud.com/
    this.sound = {};
    this.streamUrl = "";
    this.errorMessage = "";
    this.player = player;
    // this.uiUpdater = uiUpdater;

    /**
     * Loads the JSON stream data object from the URL of the track (as given in the location bar of the browser when browsing Soundcloud),
     * and on success it calls the callback passed to it (for example, used to then send the stream_url to the audiosource object).
     * @param track_url
     * @param callback
     */
    this.loadStream = function(track_url, successCallback, errorCallback) {
        SC.initialize({
            client_id: client_id
        });
        SC.get('/resolve', { url: track_url ,allow_redirects:false}, function(sound) {
            if (sound.errors) {
                self.errorMessage = "";
                for (var i = 0; i < sound.errors.length; i++) {
                    self.errorMessage += sound.errors[i].error_message + '<br>';
                }
                self.errorMessage += 'Make sure the URL has the correct format: https://soundcloud.com/user/title-of-the-track';
                errorCallback();
            } else {

                if(sound.kind=="playlist"){
                    self.sound = sound;
                    self.streamPlaylistIndex = 0;
                    self.streamUrl = function(){
                        return sound.tracks[self.streamPlaylistIndex].stream_url + '?client_id=' + client_id+"&allow_redirects=false";
                    }
                    successCallback();
                }else{
                    self.sound = sound;
                    self.streamUrl = function(){ return sound.stream_url + '?client_id=' + client_id+"&allow_redirects=false"; };

                    successCallback();
                }
            }
        });
    };



    this.directStream = function(direction){
        if(direction=='toggle'){
            if (this.player.paused) {
                this.player.play();
            } else {
                this.player.pause();
            }
        }
        else if(this.sound.kind=="playlist"){
            if(direction=='coasting') {
                this.streamPlaylistIndex++;
            }else if(direction=='forward') {
                if(this.streamPlaylistIndex>=this.sound.track_count-1) this.streamPlaylistIndex = 0;
                else this.streamPlaylistIndex++;
            }else{
                if(this.streamPlaylistIndex<=0) this.streamPlaylistIndex = this.sound.track_count-1;
                else this.streamPlaylistIndex--;
            }
            if(this.streamPlaylistIndex>=0 && this.streamPlaylistIndex<=this.sound.track_count-1) {
               this.player.setAttribute('src',this.streamUrl());
               this.uiUpdater.update(this);
               console.log(this.player)
               this.player.play();
            }
        }
    }


};