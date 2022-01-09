class Food{
    constructor(){
        this.database = firebase.database()
        this.image=loadImage("Images/Milk.png");
        this.foodStock = this.database.ref('food');
        foodStock.on("value",readStock);
        this.lastfed;
    }

    display(){
        var x=0, y=-10;

        if(this.foodStock !== 0){
           for(var i = 0;i<this.foodStock;i++){
               if(i%10==0){
                   x = -10
                   y = y+125
               }
               image(this.image,x,y,125,125);
               x = x+50
           }
        }
    } 
}