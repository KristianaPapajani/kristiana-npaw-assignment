# Kristiana NPAW assignment solutions

This repo includes the solutions to both Part 1 and Part 2 of the assignment, each one being in the appropriate folder.
The second part includes a Bonus feature to allow users to customize interval and time range but the default its still 10 seconds and 6 hours.

To run this locally and avoid any CORS issues you can run a local server using http-server inside the root folder:
```
npm install -g http-server
```
```
http-server
```

BONUS: To make it easy to view the UI so you dont have to run it locally, I have hosted both the video and chart pages and logic in AWS with a public URL to view. You can view at:
- http://kristiana-npaw-assignment.s3-website.us-east-2.amazonaws.com/  -> video player
- http://kristiana-npaw-assignment.s3-website.us-east-2.amazonaws.com/chart  -> chart

# Part 1

This folder includes the code and screenshots to demonstrate the video player with the NPAW plug in intergrated and the ability to switch between the bits and Mbps adapter from the user.
It demonstrates that we send /start, /jointime, /ping data to NPAW

- index.html -> video player and buttons UI
- video-script.js -> JS logic to initiate the NPAW instance, plugin analytics to the video, load the adapter, switch between adapters.
- adapter.json -> bits adapter
- adapter-mbps -> Mbps adapter
- main.m3u8 -> video file
- video sending analytics Mbps.png -> screenshot of Dev tools showing /Ping events sent with Mbps
- video sending analytics bits.png -> screenshot of Dev tools showing /init, /start, /joinTime events and /ping events sent with bits

# Part 2

This folder includes the solution to the second part which shows the API request, builds a page to view the Play data in a graph for the past 6 hours, for my IP address and it refreshes every 10 seconds.

BONUS: I added two filters to allow the user to change the Refresh interval and the Time range to 6 hours, 24 hours or the past week if they want to.

- chart.html -> the UI for the graph with default to 6 hours and 10 seconds refresh and filters
- chart-script.js -> JS code to show API request and call the NPAW API with the right token and parameters, get the data, populate the graph, refresh the data automatically, update filters based on user input if needed
- graph last 6 hours plays from IP.png -> screenshot showing successful GET api requests to NPAW
- API-request.md -> API request url
