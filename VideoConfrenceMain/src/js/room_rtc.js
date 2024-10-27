const App_id="66b9ff7d9d374f2b8810842f87bb877c"

let uid=sessionStorage.getItem('uid')
if(!uid){
    uid=String(Math.floor(Math.random()*1000)) // if no uid create a random uid
    sessionStorage.setItem('uid',uid)
}

let token=null;
let client;

// custom room creation
const queryString=window.location.search;
const urlParams=new URLSearchParams(queryString)
let roomId=urlParams.get('room')

if(!roomId){
    roomId='main'
}
let displayName=localStorage.getItem("display_name")
if(!displayName){
    window.location="lobby.html"
}

let localTracks=[]
let remoteUsers={} // id with  url

let localScreenTracks;
let sharingScreen=false;


let joinRoomInit=async()=>{
    client=AgoraRTC.createClient({mode:'rtc',codec:'vp8'})
    await client.join(App_id,roomId,token,uid)

    client.on("user-published",handleUserPublished)
    client.on("user-left",handleUserLeft)

    joinStream()
}

// Camera Audio Join
let joinStream=async()=>{
    localTracks=await AgoraRTC.createMicrophoneAndCameraTracks({},{encoderConfig:{
        width:{min:640,ideal:1920,max:1920},
        height:{min:480,ideal:1000,max:1000}
    }}) // audio , video
    let player=` <div class="video__container" id="user-container-${uid}">
                        <div class="video-player" id="user-${uid}"></div>
                    </div>`
    document.getElementById('streams__container').insertAdjacentHTML('beforeend',player);
    document.getElementById(`user-container-${uid}`).addEventListener('click',expandVideoFrame)


    localTracks[1].play(`user-${uid}`)
    await client.publish([localTracks[0],localTracks[1]])
}

let switchToCamera=async()=>{
    let player=` <div class="video__container" id="user-container-${uid}">
                        <div class="video-player" id="user-${uid}"></div>
                    </div>`
    displayFrame.insertAdjacentHTML('beforeend',player);

    await localTracks[0].setMuted(true);
    await localTracks[1].setMuted(true);

    document.getElementById("mic-btn").classList.remove("active")
    document.getElementById("screen-btn").classList.remove("active")

    localTracks[1].play(`user-${uid}`)
    await client.publish([localTracks[1]]) // audio already published

}

// user Add

let handleUserPublished=async(user,mediaType)=>{
    remoteUsers[user.uid]=user

    await client.subscribe(user,mediaType)

    let player=document.getElementById(`user-container-${user.uid}`)
    if(player===null){
        player=` <div class="video__container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"></div>
                    </div>`
        document.getElementById('streams__container').insertAdjacentHTML('beforeend',player);
        document.getElementById(`user-container-${user.uid}`).addEventListener('click',expandVideoFrame)


    }

    // adjust height at start
    if(displayFrame.style.display){
        let videoframe=document.getElementById(`user-container-${user.uid}`)
        videoframe.style.height="100px";
        videoframe.style.width="100px";

    }

    if(mediaType==="video"){
        user.videoTrack.play(`user-${user.uid}`)
    }
    if(mediaType==='audio'){
        user.audioTrack.play()
    }
}

let handleUserLeft=async(user)=>{
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove();

    if(userIdInDisplayFrame===`user-container-${user.uid}`){
        displayFrame.style.display=null
        let videoFrames=document.getElementsByClassName("video__container")
        for(let i=0;videoFrames.length>i;i++){
            videoFrames[i].style.height="300px"
            videoFrames[i].style.width="300px"

          }
    }
}

// Camera and mic setup
let toggleMic=async(e)=>{
    let button=e.currentTarget
    
    if(localTracks[0].muted){
        await localTracks[0].setMuted(false)
        button.classList.add('active')
    }else{
        await localTracks[0].setMuted(true)
        button.classList.remove('active')
    }
}

let toggleCamera=async(e)=>{
    let button=e.currentTarget
    
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        button.classList.add('active')
    }else{
        await localTracks[1].setMuted(true)
        button.classList.remove('active')
    }
}

let toggleScreen=async(e)=>{
    let screenButton=e.currentTarget;
    let cameraBuuton=document.getElementById('camera-btn')
    if(!sharingScreen){
        sharingScreen=true;
        screenButton.classList.add("active")
        cameraBuuton.classList.remove("active")
        cameraBuuton.style.display="none"

        localScreenTracks=await AgoraRTC.createScreenVideoTrack();
        displayFrame.style.display="block"

        let  player=` <div class="video__container" id="user-container-${uid}">
                        <div class="video-player" id="user-${uid}"></div>
                    </div>`
        document.getElementById(`user-container-${uid}`).remove()
        displayFrame.insertAdjacentHTML("beforeend",player)
        document.getElementById(`user-container-${uid}`).addEventListener("click",expandVideoFrame);

        userIdInDisplayFrame=`user-container-${uid}`

        localScreenTracks.play(`user-${uid}`)

        await client.unpublish([localTracks[1]])
        await client.publish([localScreenTracks])

        let videoFrames=document.getElementsByClassName("video__container")
        for(let i=0;videoFrames.length>i;i++){
            if(videoFrames[i].id!=userIdInDisplayFrame){
              videoFrames[i].style.height="100px"
              videoFrames[i].style.width="100px"
            }
          }
    }else{
        sharingScreen=false;
        cameraBuuton.style.display="block"
        document.getElementById(`user-container-${uid}`).remove();
        await client.unpublish([localScreenTracks])
        switchToCamera()
    }
}

document.getElementById("camera-btn").addEventListener("click",toggleCamera)
document.getElementById("mic-btn").addEventListener("click",toggleMic)
document.getElementById("screen-btn").addEventListener("click",toggleScreen)



joinRoomInit()