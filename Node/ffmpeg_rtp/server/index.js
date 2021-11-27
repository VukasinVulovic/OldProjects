const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();

(async() => {
    console.clear();

    const server_process = await spawnFFmpeg('-rtsp_flags listen -i rtsp://127.0.0.1:3000/live.sdp -f ismv -use_wallclock_as_timestamps 1 -rtsp_transport tcp -c:v copy -f rtsp rtsp://127.0.0.1:3000/owo/live.sdp');
    server_process.stdout.pipe(process.stdout);
    server_process.stderr.pipe(process.stderr);
})().catch(console.error);

async function spawnFFmpeg(args='') {
    return new Promise((resolve, reject) => {
        const p = spawn(__dirname + '\\bin\\ffmpeg.exe', args.match(/(?:[^\s"]+|"[^"]*")+/g));
        p.on('error', reject);
        resolve(p)
    });
}