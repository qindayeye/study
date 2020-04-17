
window.οnlοad=function(){
    document.body.ontouchmove=function(e){
        e.preventDefault();
    };
    document.getElementById('clickButton').οnclick=function(e){
        e.preventDefault();
        document.getElementById('clickButton').style.display="none";
        document.getElementById('close').style.display='block';
        var isShow=document.getElementById('productUrl').style.display;
        console.log(isShow);
        if(isShow=='none'){
            document.getElementById('productUrl').style.display='block';
        }else{
            document.getElementById('productUrl').style.display='none';
        }
        document.getElementById('videoContainer').style.width="30%";
        document.getElementById('videoContainer').style.height="70px";
        document.getElementById('videoContainer').style.position="absolute";
        document.getElementById('videoContainer').style.left="200px";
        document.getElementById('videoContainer').style.top="50px";
        document.getElementById('videoContainer').style.zIndex="999";
        document.getElementById('video').removeAttribute('controls');
        document.getElementById('close').οnclick=function(e){
            document.getElementById('videoContainer').ontouchstart=null;
            e.preventDefault();
            document.getElementById('productUrl').style.display='none';
            document.getElementById('videoContainer').style.width="100%";
            document.getElementById('videoContainer').style.height="200px";
            document.getElementById('videoContainer').style.position="absolute";
            document.getElementById('videoContainer').style.left="0";
            document.getElementById('videoContainer').style.top="0";
            document.getElementById('videoContainer').style.zIndex="999";
            document.getElementById('clickButton').style.display='block';
            document.getElementById('video').setAttribute('controls','');
            document.getElementById('close').style.display='none';
          
        }
        document.getElementById('videoContainer').ontouchstart=function(e){
            var vc=document.getElementById('videoContainer');
            var e=e || window.event;
            console.log(e);
            var vdX=e.touches[0].clientX-vc.offsetLeft;
            var vdY=e.touches[0].clientY-vc.offsetTop;
            console.log(vdX);
            console.log(vdY);
            document.ontouchmove=function(e){
               
                console.log(e);
                var e=e||window.event;
                var left=e.touches[0].clientX-vdX;
                var top=e.touches[0].clientY-vdY;
                vc.style.left=left+'px';
                vc.style.top=top+'px';
    
            }
            document.ontouchend=function(){
                document.ontouchmove=null;
            }
                
        }
        
      
    }
}