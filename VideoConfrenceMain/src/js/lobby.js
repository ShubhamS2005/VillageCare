let form=document.getElementById("lobby__form")

let displayName=localStorage.getItem("display_name")

if(displayName){
    form.name.value=displayName;
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let inviteCode=e.target.room.value;
    localStorage.setItem("display_name",e.target.name.value)
    if(!inviteCode){
        inviteCode=String(Math.floor(Math.random()*10000))
    }
    window.location=`room?room=${inviteCode}`
})