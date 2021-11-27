let main_socket0 = new WebSocket('ws://localhost:433');

main_socket0.onopen = () => {
  main_socket0.send('!video_list');
}

main_socket0.onmessage = (d) => {
  handleVideos(JSON.parse(d.data));
}

function handleVideos(video_list) {
  video_list.videos.forEach(video => {
    grab('wrapper', 'class')[0].innerHTML += 
      `<div class="tile">
          <div class="tile-text">
          <video src="${location.href}videos/src/${video}" class="video_preview" controls></video>  
          <h4><b>${video_list.metadata[video].title}</b></h4> 
          </div>
      </div>`;
  });
}