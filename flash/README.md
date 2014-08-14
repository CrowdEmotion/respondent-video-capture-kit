Respondent video capture kit - flash version  (RVCK)
===========

To use the RVCK, we include two different pages

 - recorder page (recorder.html)                                include a GUI interface with the flash recorder
 - video respondent test (video_respondent_test.html)           include the flash recorder and video player



RECORDER page Description
-----------

Components

 - GUI interface for setup: recording input and log data

 - flash based RTMP encoder: record video

 - API client: upload you to analyzer server

Here is how it works (GUI interface)
------------------------------------

1. Setting connection values in the recorderConfiguration.js file OR use the GUI interface

2. Using a web server, setting document root to the project root, and connect to the domain

    ```
    http://localhost/flash/index.html
    ```

3. If recorderConfiguration object have no values, fill the form

4. Click on "save connection data"

5. CLick on "start recording" and "stop recording" when you finish

6. After clicking on "stop recording", wait until your video is uploaded


VIDEO RESPONDENT TEST page description
------------------
Components

 - flash based RTMP encoder: record video

 - API client: upload you to analyzer server
 
 - Video client: player for youtube videos OR custom server video, use videojs 

