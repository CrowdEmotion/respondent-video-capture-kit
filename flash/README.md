# Playcorder - Flash version


CrowdEmotion Playcorder includes two different functionalities:

 - recorder (example: examples/recorder.html) include a GUI interface with the Flash recorder
 - playcorder (example: examples/video_respondent_test.html) include the Flash recorder and a video player


## Recorder Page Description

This page is an example how to record and upload a video.
 
Components:

 - HTML UI for setup: recording input and log events (examples/recorder.html)
 - Flash based RTMP encoder: records video from webcam
 - API client: upload your video to analyzer server

### Here is how it works (UI)

1. Set connection values in the recorderConfiguration.js file

1. Using a web server, set the document root to the project root, and connect to the domain

    ```
    http://localhost/flash/examples/index.html
    ```

1. Click on "save connection data"

1. Click on "start recording" and "stop recording" when you finish

1. After clicking on "stop recording", wait until your video is uploaded


## Playcorder page description

Playcorder include all components to play a video stimuli, record user face and upload a video for analysis.

Components:

 - Flash based RTMP encoder: records video from webcam

 - API client: upload your video to analyzer server
 
 - Video client: player for YouTube videos OR video.js for custom video server

### Example

For a fast implementation, please look at HTML files:
 1. [examples/video_respondent_test.html](./examples/video_respondent_test.html) for streamig normal videos, or
 2. [examples/video_respondent_test_yt.html](./examples/video_respondent_test.html) for streaming YouTube videos

### Implement Playcorder

1. Requirements: Playcorder use the _JQuery_ library, tested on 1.9.1 version.
            1. Download JQuery [here](http://jquery.com/download/)
            2. Include *JQuery* in the *head* of you html page

1. Include the Webproducer, a Flash object for recording video.
            1. Copy the file  ```swf/producer.swf``` in your file system


1. In the *head* of your html page, include all these files:
			1. ```js/vrtk.min.js```
			2. ```js/vrtk.min.css```

1. Include this html code in the *body* of your page
     ```<div id="vrt"></div>```
     
1. Include the following code in the *head* of your page
     ```
     <SCRIPT>
      $(document).ready(function(){
                 var vrt = new Vrt(<<VIDEOTYPE>>,<<VIDEODATA>>,<<STREAM DOMAIN>>,<<STREAM NAME>>,
                         <<API DOMAIN>>,<<API USERNAME>>, <<API PASSWORD>>,<<OPTION>>
                     );
             });
     </SCRIPT>
     ```       
    - `VIDEOTYPE` string: ```youtube``` or ```customserver``` - choose if your video stimuli are hosted by YouTube or custom server

    - `VIDEODATA` array: list of video stimuli. 
        
        Each object must include 3 properties:
            
        - `path` a string with full url of video stimuli, like http://www.youtube.com/watch?v=o9BqrSAHbTc
            
        - `length` integer number of seconds, describe how long the video will be seen by users
            
        - `name` a simple string with name

        - `id`  a numeric or string value, if missing, `id` = `name` ( _not mandatory_ )
            
        Example:
        
        ```
        [
           {'path': 'http://www.youtube.com/watch?v=o9BqrSAHbTc', 'length': 10, 'name' : 'How the sun sees you'},
           {'path': 'http://www.youtube.com/watch?v=IJNR2EpS0jw', 'length': 11, 'name' : 'Dumb Ways to Die'},
           {'path': 'http://www.youtube.com/watch?v=Yfr5ISTSIAM', 'length': 12, 'name' : 'best of Sheldon Cooper'}
        ]
        ```                 
    - `STREAM DOMAIN` string: the URL where to stream the recorder output as a RTMP/Adobe Flash Media Server compatible (ask to [support@crowdemotion.co.uk](mailto:support@crowdemotion.co.uk) for more information if you like to use our servers)
    
    - `STREAM NAME` string: a simple string used as recording name
    
    - `API DOMAIN`, `USERNAME` and `PASSWORD` strings: contain CrowdEmotion API credentials to upload videos for analysis. See API documentation at [http://docs.ceapi1.apiary.io/](http://docs.ceapi1.apiary.io/)
                         
    - `OPTION` object: contains a list of properties
        - `randomOrder` (*true* | *false* - default: *false*): display videos in a random order  
        - `playerCentered` (*true* | *false* - default: *true*): display videos in the center of the screen using the css *position:absolute*
        - `playerWidth` (*integer* - default 640): set the width of the videos
        - `playerHeight` (*integer* - default 400): set the height of the videos
        - `customData` (*true* | *false* | *javascript object* ) (eg: {user_id:user_id}), insert any custom data by users in  js object format
        - `customDataInsertMediaName`  (*true* | *false* - default: *false*) if `true`, insert media name value inside custom data with `media_name` key
        - `customDataInsertMediaId` (*true* | *false* - default: *false*) if `true`, insert media id value inside custom data with `media_id` key
        - `customDataInsertMediaPath`  (*true* | *false* - default: *false*) if `true`, insert media path value inside custom data with `media_path` key
        - `timedOverPlayToEnd` (*true* | *false* - default: *false*) recording will finish at `length` value inside `VIDEODATA` array  (in seconds)
        - `apiSandbox` (*true* | *false* - default: *false*) generate random emotions values instead analyzing video
                             
                    
1. Implement in you code the listeners for the following events:

    - `vrt_event_preview_loaded`:              all objects are loaded
    - `vrt_event_producer_camera_ok`:          the user camera is ok
    - `vrt_event_api_login_fail`:              login to api is failed
    - `vrt_event_producer_camera_muted`:       webcam is waiting for user permission
    - `vrt_event_producer_camera_blocked`:     user block webcam
    - `vrt_event_start_video_session`:         the first video stimuli is played and producer is recording        
    - `vrt_event_video_step_completed`:       one video stimuli is ended and facevideos is uplodead, a `responseId` is received 
    - `vrt_event_user_next_video`:             user is ready for next video              
    - `vrt_event_video_session_complete`:      all video stimuli are played
    - `vrt_event_user_session_complete`:       user finish his session
    - `vrt_event_flash_old`:                   the Flash version included is too old (Flash 11.1.0 is required)
    - `vrt_event_flash_no`:                    there is no Flash included
    - `vrt_event_producer_no_camera_found`:    no camera found
    - `vrt_event_frame_open`:                  use this event to open a frame OR user the `openFrame()` method 
    - `vrt_event_frame_close`:                 triggere by the `closeFrame()` method

    Example ```  $(window.vrt).on('vrt_event_producer_camera_blocked', function () {
                            alert('The webcam is blocked');
                        }); ```
         
1. List of usable methods
    -  `recorderHide()`:                          hide the recorder
    -  `recorderShow()`:                          show the recorder
    -  `openFrame` ( `src`, `options`) :         open a frame with the `src` parameter, use `options.width` and `options.height` to set the frame dimension. 
                                                   Include a close button with `options.showBtnClose` set to `true`. Customize button with `options.cssClass`, `options.btnStyle` and `options.btnText`.
                                                   Set position of the button with `options.btnPosition` set to `top` or `bottom`.
    -  `closeFrame()` :                           close a frame opened with the `openFrame` method

## Code examples
#### Adding custom data
Custom data could be added in two ways
1. using the method _apiClientSaveCustomData()_ 
2. setting the option _customData_ inside vrt object
##### 1. method _apiClientSaveCustomData()_ 
_apiClientSaveCustomData()_ can be used every time a face video is uploaded through the API
```
window.vrt.apiClientSaveCustomData( api_response_id , data_object, callback_function)
```
```api_response_id``` is an integer value provided by CrowdEmotion API after a video upload

```data_object``` is a js script object with custom values, like  ```{user_id:333;user_name:’john’}```

```callback_function``` is the function called at end of _apiClientSaveCustomData()_

##### 2. Options
When the vrt object is created, some options are available
```

var videoData = [{'path': 'http://yt.be/v/7126', 
	'length': 5, 
	'name' : '30 sec 1', 
	id:1}];
var userData = {user_id:12}
var options = {customData: userData,
customDataInsertMediaName: true, 
customDataInsertMediaId: true, 
customDataInsertMediaPath : true };

var vrt = new Vrt(‘youtube’,videoData,streamDomain,streamName,
				apiDomain,apiUsername, apiPassword,options );
```

At end of each video session, _vrt_ object will save the values inside the variable _videoData_ and _userData_ according to the variable _options_

Check the file for an example```/flash/example/video_respondent_test_dev.html```


##NOTES

```vrtk.min.js``` and ```vtk.min.css`` are compressed files that contains all js/css files in these folders:
    - js/APIClient/
    - js/external/
    - js/recorder/
    - js/video/ [^]
    - js/video_respondent_test/
 

