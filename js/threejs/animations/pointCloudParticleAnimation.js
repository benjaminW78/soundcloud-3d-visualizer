function pointcloudParticleAnimation () {
        particleSystem.geometry.verticesNeedUpdate = true;
        particleSystem.geometry.colorsNeedUpdate = true;

        for (var i=0 ; i<particleSystem.geometry.vertices.length;i++)
        {
            if(player.particulePosition === 'inline'){
                particleSystem.geometry.vertices[i].y=audioSource.streamData[i]*5;
            }
            else{   
                if(player.particulePosition === "rosace"){
                    
                    particleSystem.geometry.vertices[i].z=particleSystem.geometry.vertices[i].originPos.z+((audioSource.streamData[i]*-1));
                }
                else{    
                    particleSystem.geometry.vertices[i].z=(audioSource.streamData[i]*-1)*5;
                }
            }
            particleSystem.geometry.colors[i].setRGB(0,0,0);

           if(audioSource.streamData[i]<100){
                particleSystem.geometry.colors[i].r = 28/250;
                particleSystem.geometry.colors[i].g = (audioSource.streamData[i]+90)/250;
                particleSystem.geometry.colors[i].b = (audioSource.streamData[i]+90)/250;
            }
            else if(audioSource.streamData[i]<160&&audioSource.streamData[i]>=100){
                particleSystem.geometry.colors[i].r= 28/255;
                particleSystem.geometry.colors[i].g= (audioSource.streamData[i]+50)/255;
                particleSystem.geometry.colors[i].b= 28/255;
            }
            else if(audioSource.streamData[i]>=160&& audioSource.streamData[i]<=200){
                particleSystem.geometry.colors[i].r= 255/255;
                particleSystem.geometry.colors[i].g= audioSource.streamData[i]/255;
                particleSystem.geometry.colors[i].b= 28/255;                

            }   
            else if(audioSource.streamData[i]>200){
                particleSystem.geometry.colors[i].r= (audioSource.streamData[i]+50)/255;
                particleSystem.geometry.colors[i].g= 28/255;
                particleSystem.geometry.colors[i].b= 28/255;
            }
        }
    }