# Respondent Video Capture Kit (RVCK) - Flash version


CrowdEmotion RVCK includes two different functionalities:

 - recorder (example: examples/recorder.html) include a GUI interface with the Flash recorder
 - video respondent test (example: examples/video_respondent_test.html) include the Flash recorder and a video player


## RECORDER Page Description

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


## VIDEO RESPONDENT TEST Page (VRT) description

VRT include all components to play a video stimuli, record user face and upload a video for analysis.

Components:

 - Flash based RTMP encoder: records video from webcam

 - API client: upload your video to analyzer server
 
 - Video client: player for YouTube videos OR video.js for custom video server

### Example

For a fast implementation, please look at HTML file [examples/video_respondent_test.html](./examples/video_respondent_test.html) 
or [examples/video_respondent_test_yt.html](./examples/video_respondent_test.html) (streaming YouTube videos)

### Implement VRT

1. In the head of your page, include all these files:
			```js/vrtk.min.js``` 	 
			```js/vrtk.min.css``` 	 
 
2. Include this html code in the body of your page
     ```<div id="vrt"></div>```
     
3. Include the following code in the head of your page
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
                             
                    
4. Implement in you code the listeners for the following events:

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
         
5. List of usable methods
    -  `recorderHide()`:                          hide the recorder
    -  `recorderShow()`:                          show the recorder
    -  `openFrame` ( `src`, `options`) :         open a frame with the `src` parameter, use `options.width` and `options.height` to set the frame dimension. 
                                                   Include a close button with `options.showBtnClose` set to `true`. Customize button with `options.cssClass`, `options.btnStyle` and `options.btnText`.
                                                   Set position of the button with `options.btnPosition` set to `top` or `bottom`.
    -  `closeFrame()` :                           close a frame opened with the `openFrame` method
     
##NOTE

```vrtk.min.js``` and ```vtk.min.css`` are compressed files that contains all js/css files in these folders:
    - js/APIClient/
    - js/external/
    - js/recorder/
    - js/video/ [^]
    - js/video_respondent_test/
 

