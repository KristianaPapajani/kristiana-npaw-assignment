import NpawPlugin from 'https://esm.sh/npaw-plugin';

// Initialize the Video.js player
let player = videojs('videoPlayer');

// Initialize Npaw Plugin
let npawPlugin = new NpawPlugin('powerce');

// Initialize Npaw Params
let params = {'username': 'kristiana'}

function loadAdapter(configUrl) {
    fetch(configUrl)
        .then(_ => {
            npawPlugin.registerAdapter(player, configUrl, params);
        })
        .catch(error => {
            console.error('There was a problem with fetching the adapter json:', error);
        });
}

document.getElementById('bpsButton').addEventListener('click', () => {
    loadAdapter('adapter.json');
});

document.getElementById('mbpsButton').addEventListener('click', () => {
    loadAdapter('adapter-mbps.json');
});

player.ready(function() {
    player.on('error', function(e) {
        console.error('Video.js error:', e);
    });

    // Load default adapter
    loadAdapter('adapter.json');
});
