var vrtConf = {
    //Configuration for video player
    //'videoType' : 'youtube',
    'videoType' : 'customserver', // use 'youtube' or 'customserver' (Crowd Emotion)
    // List of video to play
    // each element of array contain an object with
    // 'path':  full url of the video
    // 'length': number of second that user can see
    // 'name' :  simple string, used for stream name

    'videoData' : [
         {'path': 'http://domain/namefile1.mp4', 'length': 10, 'name' : 'name 1'}
        ,{'path': 'http://domain/namefile2.mp4', 'length': 10, 'name' : 'name 2'}
        ,{'path': 'http://domain/namefile3.mp4', 'length': 10, 'name' : 'name 3'}
    ],

    'streamDomain' : '',     //Url to stream the recording
    'streamName' : '',                  //name of the streming, used for the final name of the recorded video file
    'apiDomain'  : '',             //Domain to stream, use api.crowdemotion.co.uk OR api-sanbox.crowdemotion.co.uk
    'apiUsername' : '',                    //Username to use the Crowd Emotion API
    'apiPassword' : ''                 //Password to use the Crowd Emotion API


};