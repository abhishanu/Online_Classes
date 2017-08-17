import { Component,OnInit} from '@angular/core';

declare var $:any;

@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
   styleUrls: ['./image-slider.component.css']
})
export class ImageSlider implements OnInit 
{
  //array to store all images to slow in slode
  public images:Array<any>=[];
  public images2:Array<any>=[];
  //total no of images to display
  private totalSlides:any;
  //var to store left and right Icons image path
  private LeftIcon:any;
  private RightIcon:any;
  //counter var to hide righr icon
  public counter:any=0;
  //images animation time
  public sliderTimer:any=800;

  public imageCount:any;

  ngOnInit(){
      this.imageCount=0;
     $('.leftArrow').css('display','none');
      //get slider images
      this.images.push("assets/images/img1.png");
      this.images.push("assets/images/img2.png");
      this.images.push("assets/images/img4.jpg");
      this.images.push("assets/images/img5.jpg");
      

      //get slider2 images
      this.images2.push("assets/images/img3.png");
      this.images.push("assets/images/img6.jpg");
      //get slider arrow images
      this.LeftIcon="assets/images/left-arrow.png";
      this.RightIcon="assets/images/right-arrow.png";
      this.totalSlides=this.images.length;
  }
  constructor(){}

  public mouseLaeveImage(event){
      console.log("MouseLeave "+event.currentTarget.name);
  }

  public mouseOverImage(event){
      console.log("MouseOver "+event.currentTarget.name);
  }

  public clickOnImage(event){
     console.log("Image clicked "+event.currentTarget.name);
  }

  public slideLeft(){
      var that=this;
      that.totalSlides--;
      that.counter++;
       //$('.rightArrow').animate({'margin-left':'-=300px'},0);
      $('#slides').animate({'margin-left':'+=300px'},this.sliderTimer ,function(){
          $('.leftArrow').css('display','block');
            if(that.totalSlides===1){
                $('.rightArrow').css('display','none');
                
                that.totalSlides=that.images.length;
            }
           
      }); 
  }

    public slideRight(){
       //instance of refrence var
       var that=this;
      
      that.counter--;
      $('#slides').animate({'margin-left':'-=300px'},this.sliderTimer ,function(){
          $('.rightArrow').css('display','block');
          if(that.counter===0){
               $('.leftArrow').css('display','none');
          }
      });
       
  }

} 