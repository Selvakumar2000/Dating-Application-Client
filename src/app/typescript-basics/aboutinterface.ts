interface Car
{
    color:string;
    model:string;
    topSpeed:number
    prize?:number //optional
}

const car1:Car= //it must implement all the props of Car
{
    color:'red',
    model:'BMW',
    topSpeed:1500
}

const car2:Car= //it must implement all the props of Car
{
    color:'red',
    model:'BMW',
    topSpeed:1500,
    prize:10000
}