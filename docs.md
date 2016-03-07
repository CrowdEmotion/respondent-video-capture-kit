# PlayCorder

### Implement

1. Include CDN Hosted version of MeMo Embed in your page including CSS and Javascript resources
	1. jQuery 1.9.1+:
 	https://code.jquery.com/jquery-1.9.1.min.js
	1. MeMo Embed code: https://cdn.crowdemotion.co.uk/playcorder/v3/vrtk-v3.all.js
	1. MeMo Embed CSS: https://cdn.crowdemotion.co.uk/playcorder/v3/vrtk-v3.min.css
	1. See the code: https://github.com/CrowdEmotion/respondent-video-capture-kit/blob/master/examples/demo1.html#L6-L9
1. Add the following markup elements to your HTML structure:
	1. minimal markup https://github.com/CrowdEmotion/respondent-video-capture-kit/blob/master/examples/demo1.html#L549
	1. option markup with example buttons https://github.com/CrowdEmotion/respondent-video-capture-kit/blob/master/examples/demo1.html#L540-L550
1. Use the following Javascript code to configure and activate the MeMo Embed:
	1. Be sure to substitute appToken and projectKey with the ones you collected in the previous steps
	1. Check carefully how event handlers are attached to the MeMo Embed and to the DOM elements because that is where most of your customization takes place to change the user workflow
	1. During tests it is very important to leave apiSandbox parameter to true in order to avoid wasting paid viewers during development 
	1. The proposed Javascript code should be executed when the markup elements are already in place (in the DOM of the page)
	1. See the code: https://github.com/CrowdEmotion/respondent-video-capture-kit/blob/master/examples/demo1.html#L56-L280
1. If you are going to use MeMo Embed default configuration for video recording and not your servers, write to to us at support@crodemotion.co.uk about which domains you wish whitelisted else MeMo Embed will not work.
1. MeMo Embed runs only on pages that implement a secure transport (HTTPS protocol) - this is a requirement of browsers/web standards, not of MeMo Embed.



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
- `researchToken`: a `string` value that load the media list
- `appToken`: an auth `string` value
- `streamName`: a `string` value to prepend before each string
- `apiSandbox`: a `boolean` value, set to false for facevideo analysis


                    
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
- `vrt_event_browser_old`:                 this error is trigger when the browser is IE 9 or older


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
	var vrt = new Vrt({
                    researchToken: ‘XXXXXX’,
                    appToken: ‘YYYYYY’,
                    streamName: ‘ce-demo1_’,
                    apiSandbox: true,
                    debug: true,
                    respondentCustomData: {user_video_behavior: vb},
                    playerCentered: false,
                    recorderCentered: false,
                    playerHorizontallyCentered: true,
                    recorderHorizontallyCentered: true,
                    fullscreen: false,
                    randomOrder: false,
                    savePlatform: true,
                    recordingAudio: false //temporary fix
                });

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

###### External page integration

Every research could integrate and outgoing url. To use this option
- Go to [Maker](api.crowdemotion.co.uk)
- Insert a valid URL inside the “outgoing url” option in your research
- Add to your javascript code this snippet

```
$(window.vrt).on(‘vrt_event_preview_loaded’, function () {
                        var url = vrt.researchOutUrl; 
                        var urlOriginal = vrt.researchOutUrlOriginal;
                        //insert you code here for redirect
                    });
```

Also, it's possible for an outgoing url to change dynamically according to url parameters of your PlayCorder page. This could be useful if you integrate an external page as surveys.
  
How to: If your *entry page* include any query parameters, and your *outgoing url* include the same query parameters inside curly brackets,
The values between curly brackets will be changed with query values from entry url.

Example:

*Entry page*: http://yousite.com/index.html?**id=100**&**value=AAA**
*Outgoing Url*: http://newsite.com/index.htm?user={**id**}&number={**value**}

The values for outgoing Url will be: 
- vrt.researchOutUrl:  http://newsite.com/index.htm?**user=100&number=AAA**
- vrt.researchOutUrlOriginal:  http://newsite.com/index.htm?user={id}&number={value} - no changes
   
  
   
   


