/*
** Create by Hoffy on 2018/8/19
*/
/*var level=0;*/
var maps=new Map(0);
var game=new Game(maps);
game.start();

$('#selctDiv').on('click',function(){
    var level=$('#selctVal').val();
    var maps=new Map(level);
    var game=new Game(maps);
    game.start();
});
