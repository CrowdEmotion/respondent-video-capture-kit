Respondent video capture kit (RVCK)
===========

Description
-----------

Components

 - GUI interface for setup: recording input and log data

 - flash based RTMP encoder: record video

 - API client: upload you to analyzer server

Here is how it works (GUI interface)
------------------------------------

1. Setting connection values in the rvckConfiguration.js file OR use the GUI interface

2. Using a web server, setting document root to the project root, and connect to the domain

    ```
    http://localhost/flash/index.html
    ```

3. If rvckConfiguration object have no values, fill the form

4. Click on "save connection data"

5. CLick on "start recording" and "stop recording" when you finish

6. After clicking on "stop recording", wait until your video is uploaded



