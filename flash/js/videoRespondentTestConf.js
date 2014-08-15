var vrtConf = {
    //Configuration for video player
    'videoType' : 'youtube',                  // use 'youtube' or 'ceserver' (Crowd Emotion)
    // List of video to play
    // each element of array contain an object with
    // 'path':  full url of the video
    // 'length': number of second that user can see
    // 'name' :  sinple string, used for
    // 'width' : set to 0 or width of videos
    // 'height' : set to 0 or height of videos
    'videoData' : [
        {'path': '', 'length': '', 'name' : '','width' : '', 'height' : ''}
    ],
    'videoFullscreen' : false,                // video in fullscreen

    //Custom configuration, please fill all the field
    'streamDomain' : '', //Url to stream the recording
    'streamName' : '',                  //name of the streming, used for the final name of the recorded video file

    'apiUsername' : '',                    //Username to use the Crowd Emotion API
    'apiPassword' : '',                 //Password to use the Crowd Emotion API


    //Default configuration element
    'recorderID' : 'producer',                       //ID of the html element that contain the recorder
    'apiDomain'  : 'api-sandbox.crowdemotion.co.uk'  //Domain to stream, use api.crowdemotion.co.uk OR api-sanbox.crowdemotion.co.uk

};