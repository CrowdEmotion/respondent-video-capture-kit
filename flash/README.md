# PlayCorder - Flash version


CrowdEmotion PlayCorder includes two different functionalities:

 - recorder (example: examples/recorder.html) include a GUI interface with the Flash recorder
 - playcorder (example: examples/video_respondent_test.html) include the Flash recorder and a video player (video.js)


## Recorder Page Description

This page explains how embed PlayCorder to record and upload a video.
 
Components:

 - HTML UI for setup: recording input and log events (examples/recorder.html)
 - Flash based RTMP encoder: records video from webcam
 - API client: upload your video to analyzer server

### How It Works (UI)

1. Set connection values in the recorderConfiguration.js file
2. Using a web server, set the document root to the project root, and connect to the domain
```
http://localhost/flash/examples/index.html
```
3. Click on "save connection data"
4. Click on "start recording" and "stop recording" when you finish
5. After clicking on "stop recording", wait until your video is uploaded


## PlayCorder Page Description

PlayCorder include all the components required to play a video stimuli, record the user and upload a video for analysis.

Components:

- Flash based RTMP encoder: records video from webcam
- API client: upload your video to analyzer server
- Video client: player for YouTube videos OR video.js for custom video server


### Example

For a quick implementation, please look at HTML files:

1. [examples/playcorder.html](./examples/playcorder.html) loading data from API
1. [examples/video_respondent_test.html](./examples/video_respondent_test.html) for streamig normal videos, or
1. [examples/video_respondent_test_yt.html](./examples/video_respondent_test.html) for streaming YouTube videos


### Implement PlayCorder

1. Requirements: PlayCorder use the _JQuery_ library, tested on 1.9.1 version:
  1. Download JQuery [here](http://jquery.com/download/)
  2. Include *JQuery* in the *head* of you html page
1. Include the Webproducer, a Flash object for recording video:
  - Copy the file  `swf/producer.swf` in your file system
1. In the *head* of your html page, include all these files:
  1. `js/vrtk.min.js`
  2. `js/vrtk.min.css`
1. Include this html code in the *body* of your page: `<div id="vrt"></div>`
1. Initialize PlayCorder


#### PlayCorder Initialization

PlayCorder can be initializated in two ways: using multiple parameters or one Javascript object.


###### Multiple parameters (deprecated)

Include the following code in the *head* of your page:

```
<SCRIPT>
$(document).ready(function(){
         var vrt = new Vrt(<<VIDEOTYPE>>,<<VIDEODATA>>,<<STREAM DOMAIN>>,<<STREAM NAME>>,
                 <<API DOMAIN>>,<<API USERNAME>>, <<API PASSWORD>>,<<OPTIONS>>
             );
     });
</SCRIPT>      
```

`<<VIDEOTYPE>>` string: youtube or customserver - choose if your video stimuli are hosted by YouTube or custom server

`<<VIDEODATA>>` array: list of video stimuli. 
        
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
                  
- `<<STREAM DOMAIN>>` string: the URL where to stream the recorder output as a RTMP/Adobe Flash Media Server compatible (ask to [support@crowdemotion.co.uk](mailto:support@crowdemotion.co.uk) for more information if you wish to use our servers)

- `<<STREAM NAME>>` string: a simple string used as recording name

- `<<API DOMAIN>>`, `USERNAME` and `PASSWORD` strings: contain CrowdEmotion API credentials to upload videos for analysis. See API documentation at [http://docs.ceapi1.apiary.io/](http://docs.ceapi1.apiary.io/)
                     
- `<<OPTIONS>>` object: contains a list of properties:
    - `randomOrder` (*true* | *false* - default: *false*): display videos in a random order  
    - `playerCentered` (*true* | *false* - default: *true*): display videos in the center of the screen using the css *position:absolute*
    - `playerWidth` (*integer* - default 640): set the width of the videos
    - `playerHeight` (*integer* - default 400): set the height of the videos
    - `customData` (*true* | *false* | *Javascript object* ) (eg: {user_id:user_id}), insert any custom data by users in  js object format
    - `customDataInsertMediaName`  (*true* | *false* - default: *false*) if `true`, insert media name value inside custom data with `media_name` key
    - `customDataInsertMediaId` (*true* | *false* - default: *false*) if `true`, insert media id value inside custom data with `media_id` key
    - `customDataInsertMediaPath`  (*true* | *false* - default: *false*) if `true`, insert media path value inside custom data with `media_path` key
    - `timedOverPlayToEnd` (*true* | *false* - default: *false*) recording will finish at `length` value inside `VIDEODATA` array  (in seconds)
    - `apiSandbox` (*true* | *false* - default: *false*) generate random emotions values instead analyzing video
    - `researchToken` string: a random string bind to your research on CrowdEmotion system
    - `appToken` string: a random string bind to your user on CrowdEmotion system
    - `responseAtStart` boolean: you response id is generated before the start of video stimuli
    - `respondentName` string: save a string data before the start of video session
    - `respondentCustomDataString` Javascript object: save a js object as string before the start of video session
    - `respondentCustomData` : Javascript object: save a js object before the start of video session


###### One Javascript object as single parameter (suggested way)
Include the following code in the tag *head* of your page:
       
```
<SCRIPT>
$(document).ready(function(){
         var vrt = new Vrt(<<OPTIONS>>);
</SCRIPT>
```       
     
the  `<<OPTIONS>>` object attributes are the same of previous paragraph, just add these values:

- `type` string: `youtube` or `custom server` - choose if your video stimuli are hosted by YouTube or your own custom server
- `list` array: list of video stimuli, please follow  instruction on previous paragraph under the `<<VIDEODATA>> ` option
- `streamName` string: a simple string used as recording name
- `apiDomain` string : contain CrowdEmotion API domain to upload videos for analysis. See API documentation at [http://docs.ceapi1.apiary.io/](http://docs.ceapi1.apiary.io/)


### Load PlayCorder media from API

If the `appToken` and `researchToken` options are implemented, media are loaded through the CrowdEmotion API backend [http://api.crowdemotion.co.uk/] 
To upload media, just follow these steps:

1. Signup at [https://api.crowdemotion.co.uk/#/signup] and wait for confirmation of your account
2. Login at [https://api.crowdemotion.co.uk/#/login] 
3. Create a project [https://api.crowdemotion.co.uk/#/project] and check `Ready`
4. Create the media [https://api.crowdemotion.co.uk/#/media] and assign them to your project 

                    
### Implement in you code the listeners for the following events:

- `vrt_event_preview_loaded`:              all objects are loaded
- `vrt_event_producer_camera_ok`:          the user camera is ok
- `vrt_event_api_login_fail`:              login to api is failed
- `vrt_event_producer_camera_muted`:       webcam is waiting for user permission
- `vrt_event_producer_camera_blocked`:     user block webcam
- `vrt_event_start_video_session`:         the first video stimuli is played and producer is recording        
- `vrt_event_video_step_completed`:        one video stimuli is ended and facevideos is uplodead, a `responseId` is received 
- `vrt_event_user_next_video`:             user is ready for next video              
- `vrt_event_video_session_complete`:      all video stimuli are played
- `vrt_event_user_session_complete`:       user finish his session
- `vrt_event_flash_old`:                   the Flash version included is too old (Flash 11.1.0 is required)
- `vrt_event_flash_no`:                    there is no Flash included
- `vrt_event_producer_no_camera_found`:    no camera found
- `vrt_event_frame_open`:                  use this event to open a frame OR user the `openFrame()` method 
- `vrt_event_frame_close`:                 triggere by the `closeFrame()` method
- `vrt_event_create_response`:             if the option `responseAtStart` is `true`, this event will send you the response id before the video play

Example:

```
$(window.vrt).on('vrt_event_producer_camera_blocked', function () {
                        alert('The webcam is blocked');
                    });
```


### Available methods

-  `recorderHide()`:                         hide the recorder
-  `recorderShow()`:                         show the recorder
-  `openFrame` ( `src`, `options`) :         open a frame with the `src` parameter, use `options.width` and `options.height` to set the frame dimension. 
                                             include a close button with `options.showBtnClose` set to `true`. Customize button with `options.cssClass`, `options.btnStyle` and `options.btnText`.
                                             set the position of the button with `options.btnPosition` set to `top` or `bottom`.
-  `closeFrame()` :                          close the frame opened with the `openFrame` method


## Code examples

#### Initialization Example
```
(document).ready(function(){
	//create PlayCorder object
	var vrt = new Vrt({ optionstype:’youtube’, list:{} ,streamName:’test’, streamUrl:’xxxx.com’, researchToken:’XXXXXXXXYYYYYYYYY’,appToken:’AAAAAAAABBBBBBBBBB’,
                apiDomain:’http://api.com',
                debug:true, debugChrono:  true, debugChronoHtml: false, debugEvt:true, debugVImportant:true,
                randomOrder : true, timedOverPlayToEnd:false, continuosPlay:true,
                customData:{user_id:user_id}, customDataInsertMediaName: true, customDataInsertMediaId: true,
                customDataInsertMediaPath : true, responseAtStart: true,
                respondentName: ’nnnnnn’,
                respondentCustomDataString:  {name:’nnnn’, lastname:’mmmm’},
                respondentCustomData : {name1:’myname’, lastname1:’mylastname’} });

	//Implement event and method related to PlayCorder
 		$(vrt).on(‘vrt_event_producer_camera_ok’,function()	{ alert(‘Your webcam is ok’) });
	//...insert code here 
	//PlayCorder start
	vrt.init();
});
```

#### Adding custom data

PlayCorder has 2 type of custom data:
1. custom data for every `response`, saved before or after every video
2. custom data for every `respondent`, saved once during the session (`respondent` is a group of responses tied to one user, one project and its related media)

##### Response custom data

Custom data could be added in two ways:
1. using the method _apiClientSaveCustomData()_ 
2. setting the option _customData_ inside vrt object

###### `apiClientSaveCustomData()` method

`apiClientSaveCustomData()` can be used every time a face video is uploaded through the API:

`window.vrt.apiClientSaveCustomData( api_response_id , data_object, callback_function)`

- `api_response_id` is an integer value provided by CrowdEmotion API after a video upload
- `data_object` is a js script object with custom values, like  `{user_id:333;user_name:’john’}`
- `callback_function` is the function called at end of _apiClientSaveCustomData()_

###### Respondent custom data

To implement `respondent` custom data just add the options `respondentName` , `respondentCustomDataString`, `respondentCustomData` to PlayCorder initialization.


##NOTES

`vrtk.min.js` and `vtk.min.css`` are compressed files that contains all js/css files in these folders:

- js/APIClient/
- js/external/
- js/recorder/
- js/video/ [^]
- js/video_respondent_test/

