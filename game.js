/*
** Create by Hoffy on 2018/8/19
*/
(function (win) {
    var box=null;
    function Game (maps ) {
        this.maps=maps;
    }
    //游戏开始
    Game.prototype.start=function () {
            this.maps.inite();
            box=$('.box div');
            fnkeydown();
    }
    //点击键盘移动
    function  fnkeydown (  ) {
        $ ( document ).keydown ( function ( e ) {
            var key = e.which;
            switch ( key ) {
                //方向键上或者w
                case 87:
                case 38:
                    move ( - 12 );
                    break;
                //方向键下或者s
                case 83:
                case 40:
                    move ( 12 );
                    break;
                //方向键左或者a
                case 65:
                case 37:
                    move ( - 1 );
                    break;
                //方向键右或者d
                case 68:
                case 39:
                    move ( 1 );
                    break;
            }
                      setTimeout(iswin,500); //按键之后调判断是否过关
        } )
    }

        //移动函数
    function move ( step ) {
            var now = this.maps.position;//获取玩家现在的位置是数值
            var nowPosi = box.eq ( now );//玩家现在的位置
            var nextPosi = box.eq ( now + step );//玩家要去的下一个地方
            var boxPosi = box.eq ( now + step * 2 );//箱子要去的下一个地方
            if ( (! nextPosi.hasClass ( 'type4' )) && ( nextPosi.hasClass ( 'type1' ) || nextPosi.hasClass ( 'type2' ) ) ) { //自然移动
                //这一步和下一步判断是否有type4的原因是普通路径会变成有type4的路径，这时候就会出现问题
                nowPosi.removeClass ( "pusher" ); //移除玩家原位置
                nextPosi.addClass ( "pusher" );//取得新位置
                this.maps.position = now + step;//增加position值
            } else if ( ( nextPosi.hasClass ( 'type4' ) ) && ( ! boxPosi.hasClass ( 'type4' ) ) && ( ! boxPosi.hasClass ( 'type3' ) ) ) {
                //推箱子
                //如果玩家下个位置是箱子,并且箱子的下个位置不是箱子或墙,则移动.
                nextPosi.removeClass ( 'type4' ); //移动箱子
                boxPosi.addClass ( 'type4' );
                nowPosi.removeClass ( "pusher" );//移动玩家
                nextPosi.addClass ( "pusher" ).addClass ( "type2" );//本来是type4 移除之后，这里没有class了，要变成普通路径
                this.maps.position = now + step;//增加position值
            }
        }

        //判断胜利
                function iswin (  ) {
                    console.log ( $ ( ".type1 .type4" ) );
                    if($('.type1.type4').length==this.maps.goal){
                            confirm('通关成功');
                            this.maps.level=this.maps.level+1;
                            if(this.maps.level==9){
                                alert('他们一起过上了美好的生活');
                                return false;
                            }
                            this.maps.inite();
                            box=$('.box div');
                    }
                }

    win.Game=Game;
}(window));