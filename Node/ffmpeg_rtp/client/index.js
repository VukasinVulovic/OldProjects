const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();

(async() => {
    console.clear();

    const client_process = await spawnFFmpeg('-y -rtbufsize 100M -f gdigrab -framerate 15 -probesize 10M -draw_mouse 1 -i desktop -c:v libx264 -r 30 -preset ultrafast -tune zerolatency -crf 25 -pix_fmt yuv420p -f mp4 out.mp4'); //rtsp -rtsp_transport tcp rtsp://127.0.0.1:3000/live.sdp
    client_process.stdout.pipe(process.stdout);
    client_process.stderr.pipe(process.stderr);
})().catch(console.error);

async function spawnFFmpeg(args='') {
    return new Promise((resolve, reject) => {
        const p = spawn(__dirname + '\\bin\\ffmpeg.exe', args.match(/(?:[^\s"]+|"[^"]*")+/g));
        p.on('error', reject);
        resolve(p)
    });
}