# PlayCorder

### Implement

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


###### Initialization
Include the following code in the tag *head* of your page:
       
```
<SCRIPT>
$(document).ready(function(){
         //Create Playcorder instance
         var vrt = new Vrt(<<OPTIONS>>);
         
         //Implement event listeners
         $(vrt).on('vrt_event_XXXXXX',function(){ // code here});
         $(vrt).on('vrt_event_YYYYYY',function(){ // code here});
         
         //Complete initilization            
         vrt.init();
});
</SCRIPT>
```       
     
the  `<<OPTIONS>>` object attributes are the same of previous paragraph, just add these values:

- `type` string: `youtube` or `custom server` - choose if your video stimuli are hosted by YouTube or your own custom server
- `list` array: list of video stimuli, please follow  instruction on previous paragraph under the `<<VIDEODATA>> ` option
- `streamName` string: a simple string used as recording name
- `apiDomain` string : contain CrowdEmotion API domain to upload videos for analysis. See API documentation at [http://docs.ceapi1.apiary.io/](http://docs.ceapi1.apiary.io/)

Important note: If you include a valid value for `researchToken`, `type` can be set to `null` and `list`  as empty object `{}` (because both `list` and `type` are loaded from the research )

### Load PlayCorder media from API

If the `appToken` and `researchToken` options are specified, media are loaded through the CrowdEmotion API backend [http://api.crowdemotion.co.uk/] 
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
- `vrt_event_skip_or_end_video`:           video stimuli reach the end or skipped by user              
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
	var vrt = new Vrt({ optionstype:"youtube", list:{} ,streamName:"test", streamUrl:"xxxx.com", researchToken:"XXXXXXXXYYYYYYYYY",appToken:"AAAAAAAABBBBBBBBBB",
                apiDomain:"http://api.com',
                debug:true, debugChrono:  true, debugChronoHtml: false, debugEvt:true, debugVImportant:true,
                randomOrder : true, timedOverPlayToEnd:false, continuosPlay:true,
                customData:{user_id:user_id}, customDataInsertMediaName: true, customDataInsertMediaId: true,
                customDataInsertMediaPath : true, responseAtStart: true,
                respondentName: "nnnnnn",
                respondentCustomDataString:  {name:"nnnn", lastname:"mmmm"},
                respondentCustomData : {name1:"myname", lastname1:"mylastname"} });

	//Implement event and method related to PlayCorder
 		$(vrt).on("vrt_event_producer_camera_ok",function()	{ alert("Your webcam is ok") });
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
- `data_object` is a js script object with custom values, like  `{user_id:333;user_name:"john"}`
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

