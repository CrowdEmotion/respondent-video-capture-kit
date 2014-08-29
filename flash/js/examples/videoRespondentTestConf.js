var vrtConf = {
    //Configuration for video player
    'videoType' : 'youtube',                  // use 'youtube' or 'customserver' (Crowd Emotion)
    // List of video to play
    // each element of array contain an object with
    // 'path':  full url of the video
    // 'length': number of second that user can see
    // 'name' :  simple string, used for stream name
    'videoData' : [
        {'path': 'http://www.youtube.com/watch?v=o9BqrSAHbTc', 'length': 10, 'name' : 'How the sun sees you'}
        ,{'path': 'http://www.youtube.com/watch?v=IJNR2EpS0jw', 'length': 11, 'name' : 'Dumb Ways to Die'}
        ,{'path': 'http://www.youtube.com/watch?v=Yfr5ISTSIAM', 'length': 12, 'name' : 'best of Sheldon Cooper'}
    ],
    'videoFullscreen' : false,                // video in fullscreen

    //Custom configuration, please fill all the field
    'streamDomain' : '',     //Url to stream the recording
    'streamName' : '',                  //name of the streming, used for the final name of the recorded video file

    'apiDomain'  : '',             //Domain to stream, use api.crowdemotion.co.uk OR api-sanbox.crowdemotion.co.uk
    'apiUsername' : '',                    //Username to use the Crowd Emotion API
    'apiPassword' : ''                 //Password to use the Crowd Emotion API

};