var vrtConf = {
    'videoType' : 'youtube', // use 'youtube' or 'customserver' (Crowd Emotion)
    'videoData' : [
        {'path':  'http://www.youtube.com/watch?v=1Ft5HY-w31Y', 'length': 10, 'name' : 'Chrono test 1', id:1}
        ,{'path': 'http://www.youtube.com/watch?v=lYhtNU869KM', 'length': 10, 'name' : 'Chrono test 2', id:2}
        ,{'path': 'http://www.youtube.com/watch?v=FxmsUSn8uHI', 'length': 10, 'name' : 'Chrono test 2', id:3}
    ],

    'streamDomain' : '',     //Url to stream the recording
    'streamName' : '',                  //name of the streming, used for the final name of the recorded video file
    'apiDomain'  : '',             //Domain to stream, use api.crowdemotion.co.uk OR api-sanbox.crowdemotion.co.uk
    'apiUsername' : '',                    //Username to use the Crowd Emotion API
    'apiPassword' : '',                 //Password to use the Crowd Emotion API
    'recorderID' : 'producer'                       //ID of the html element that contain the recorder


};
