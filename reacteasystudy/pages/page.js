export default function Page(){
    return(
        <>
        <div class="unit-header">
    <h1 class="unit-name">Multimedia Systems</h1>
</div> 
<div class="unit-body">
    <a href="#readings"> 
        <img  class="pdf-icon" src="https://cdn2.iconfinder.com/data/icons/flat-pack-1/64/Document-256.png" alt=""/>
    </a>
        <img class="video-icon" src="https://cdn2.iconfinder.com/data/icons/leto-blue-online-education/64/__book_video_tutorial_training-256.png" alt=""/>
        <h2 id="readings">Reading Materials</h2>
        <video 
        width="320" height="240" controls>
        <source src="https://www.youtube.com/watch?v=hkyzcLkmoBY" type="video/mp4"/>
    </video>
    <h2 id="videos">Related Videos</h2>
</div>
        </>
    )
}