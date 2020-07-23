/*var todolist = [{
        id:"1",
        title: '123',
        done: false,
        time: "" 
    },{
        id:"2",
        title: '153',
        done: false,
        time: "07/21" 
    }
];

//存储对象转字符串
localStorage.setItem("todo",JSON.stringify(todolist));

//获取字符串转对象
var data = JSON.parse(localStorage.getItem("todo"));*/

console.log("\n _____  __   __    _  _     ___   \n|_   _| \\ \\ / /   | \\| |   | _ )  \n  | |    \\ V /    | .` |   | _ \\  \n  |_|     \\_/     |_|\\_|   |___/  ");

$(function() {
    var todolist = 0;
    var todofinsh = 0;
    var tododelete = 0;

    load();

    //填写数据
    $(".new-todo").on("keydown",function(event) {
        if(event.keyCode === 13 && $(this).val()!=="") {
            var local = getDate();

            //更新数据

            local.push({
                title: $(this).val(),
                done: false,
                delete:false,
            })

            saveData(local);
            $(this).val("");

            
            //deleteLoad();
            if (!$('#Delete').hasClass('active') /*|| !$('#Finish').hasClass('active')*/) {
                if (!$('#Finish').hasClass('active')) {
                    if ($('#All').hasClass('active')) {
                        load();
                    } else if ($('#Todo').hasClass('active')) {
                        todoLoad();
                    }
                }
            }

        } else if (event.keyCode === 13 && $(this).val()=="") {
            alert("请输入内容");
        }
    });

    //读取数据
    function getDate() {
        var data = localStorage.getItem("todo");

        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    //存储数据
    function saveData(local) {
        localStorage.setItem("todo",JSON.stringify(local));
    }

    //显示全部数据
    function load(){
        var data = getDate();
        todolist = 0;
        todofinsh = 0;

        $(".All-list").empty();
        
        /*if (data !== null ) {
            $(".All-list").append('<li  class="nonetodo" ><div class="view"><label>赶紧输入你的TODO吧</label></div></li>');
        } else if (todolist + todofinsh == 0) {
            $(".All-list").append('<li  class="nonetodo" ><div class="view"><label>赶紧输入你的TODO吧</label></div></li>');
        }*/

        $.each(data, function(i, n) {
            $('.nonetodo').remove();
            if (!n.delete) {
                if (n.done) {
                    $(".All-list").append('<li num ='+ i +'  class=""><div class="view finsh-true"><input class="finsh finsh-black" type="checkbox" checked><label><s></s></label><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></li>');
                    todofinsh++;          
                    $(".All-list").find("s").last().text(n.title);
                    //$(".All-list").find("li").last().fadeIn(300);
                } else {
                    $(".All-list").append('<li num ='+ i +'  class=""><div class="view"><input class="finsh" type="checkbox" ><label></label><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></li>')
                    $(".All-list").find("label").last().text(n.title);
                    //$(".All-list").find("li").last().fadeIn(300);
                    todolist++;
                }
            } else {
                tododelete++;
            }

        })

        if (todolist == 0 && todofinsh == 0) {
            $(".All-list").append('<li  class="nonetodo" ><div class="view"><label>所有的TODO都完成啦</label></div></li>');
        }

        itemNum();

        //删除数据
        $(".close").on("click",function() {
            var data = getDate();

            var index = $(this).parent().parent().attr("num");

            //data.splice(index, 1);
            data[index].delete = true;
            
            $(this).parent().parent().animate({
                left:'250px',
                opacity:'0'
            });
            
            saveData(data);

            setTimeout(function(){load();},500);
        })

        //完成操作
        $(".finsh").on("click", function() {
            var data = getDate();
            // 修改数据
            var index = $(this).parent().parent().attr("num");

            data[index].done = $(this).prop("checked");

            saveData(data);

            //setTimeout(load(),5000);
            load();
        });

        /*if (todofinsh + todolist == 0 )  {
            $(".All-list").append('<li  class="nonetodo" ><div class="view"><label>赶紧输入你的TODO吧</label></div></li>');
        }*/


    }

    //显示已完成数据
    function finishLoad() {
        var data = getDate();
        todolist = 0;
        todofinsh = 0;

        $(".Finish-list").empty();
        

        $.each(data, function(i, n) {
            $('.nonetodo').remove();
            if (!n.delete) {
                if (n.done) {
                    $(".Finish-list").append('<li num ='+ i +' class=""><div class="view finsh-true"><input class="finsh finsh-black" type="checkbox" checked><label><s></s></label><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></li>');
                    $(".Finish-list").find("s").last().text(n.title);
                    todofinsh++;
                } else {
                    todolist++;
            }
        }   
        })

        if (todofinsh == 0) {
            $(".Finish-list").append('<li  class="nonetodo" ><div class="view"><label>还没有完成的TODO哈</label></div></li>');
        }

        itemNum();
        

        //删除数据
        $(".close").on("click",function() {
            var data = getDate();

            var index = $(this).parent().parent().attr("num");

            //data.splice(index, 1);
            data[index].delete = true;

             $(this).parent().parent().animate({
                left:'250px',
                opacity:'0'
            });
            
            saveData(data);

            setTimeout(function(){finishLoad();},500);
            
            /*$(this).parent().parent().empty();
            todofinsh--;
            if (todofinsh == 0) {
                $(".Finish-list").append('<li  class="nonetodo" ><div class="view"><label>还没有完成的TODO哈</label></div></li>');
            }*/

        })

        //完成操作
        $(".finsh").on("click", function() {
            var data = getDate();
            // 修改数据
            var index = $(this).parent().parent().attr("num");

            data[index].done = $(this).prop("checked");

            saveData(data);

            finishLoad();
            /*$(this).parent().parent().empty();
            todofinsh--;
            if (todofinsh == 0) {
                $(".Finish-list").append('<li  class="nonetodo" ><div class="view"><label>还没有完成的TODO哈</label></div></li>');
            }*/
            
        });

    }

    //显示未完成数据
    function todoLoad() {
        var data = getDate();
        todolist = 0;
        todofinsh = 0;

        $(".Todo-list").empty();
        

        $.each(data, function(i, n) {
            $('.nonetodo').remove();
            if (!n.delete) {
                if (!n.done) {
                    $(".Todo-list").append(('<li num ='+ i +' class=""><div class="view"><input class="finsh" type="checkbox" ><label></label><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></li>'));
                    $(".Todo-list").find("label").last().text(n.title);
                    todolist++;
                } else {
                    todofinsh++;
                }
            }
            
        })

        if (todolist == 0) {
            $(".Todo-list").append('<li  class="nonetodo" ><div class="view"><label>所有的TODO都完成啦</label></div></li>');
        }
        itemNum();

        //删除数据
        $(".close").on("click",function() {
            var data = getDate();

            var index = $(this).parent().parent().attr("num");

            //data.splice(index, 1);
            data[index].delete = true;
        
             $(this).parent().parent().animate({
                left:'250px',
                opacity:'0'
            });
            
            saveData(data);

            setTimeout(function(){todoLoad();},500);
            
            /*$(this).parent().parent().empty();
            todolist--;
            if (todolist == 0) {
                $(".Todo-list").append('<li  class="nonetodo" ><div class="view"><label>所有的TODO都完成啦</label></div></li>');
            }*/
        })

        //完成操作
        $(".finsh").on("click", function() {
            var data = getDate();
            // 修改数据
            var index = $(this).parent().parent().attr("num");

            data[index].done = $(this).prop("checked");

            saveData(data);

            todoLoad();
            /*$(this).parent().parent().empty();
            todolist--;
            if (todolist == 0) {
                $(".Todo-list").append('<li  class="nonetodo" ><div class="view"><label>所有的TODO都完成啦</label></div></li>');
            }*/
            
        });
    }

    //显示已删除的数据
    function deleteLoad() {
        var data = getDate();
        tododelete = 0;
        $(".Delete-list").empty();
        

        $.each(data, function(i, n) {
            $('.nonetodo').remove();
            if (n.delete) {
                if (n.done) {
                    $(".Delete-list").append('<li num ='+ i +' class=""><div class="view delete-style finsh-true "><input class="finsh finsh-back" type="checkbox" checked><label><s></s></label><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></li>');
                    $(".Delete-list").find("s").last().text(n.title);
                } else {
                    $(".Delete-list").append(('<li num ='+ i +' class=""><div class="view delete-style "><input class="finsh finsh-back" type="checkbox" ><label></label><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></li>'));
                    $(".Delete-list").find("label").last().text(n.title);
                }

                tododelete++;
            } 
            
        })

        if (tododelete == 0) {
            $(".Delete-list").append('<li  class="nonetodo" ><div class="view"><label>回收站无垃圾</label></div></li>');
        }

        itemNum();

        //删除数据
        $(".close").on("click",function() {
            var data = getDate();

            var index = $(this).parent().parent().attr("num");

            data.splice(index, 1);

             $(this).parent().parent().animate({
                left:'250px',
                opacity:'0'
            });
            $(this).parent().parent().fadeOut(500);
            saveData(data);

            setTimeout(function(){deleteLoad();},500);
            

        })

        //恢复
        $(".finsh").on("click", function() {
            var data = getDate();
            // 修改数据
            var index = $(this).parent().parent().attr("num");

            data[index].delete = false;

            if (data[index].done) {
                todofinsh++;
            } else {
                todolist++;
            }

            saveData(data);

            deleteLoad();

        });
    }

    //点击按钮事件
    $(".ToAll").on("click", function(){
        load();
    });

    $(".ToFinish").on("click", function(){
        finishLoad();
    });

    $(".ToTodo").on("click", function() {
        todoLoad();
    })

    $(".ToDelete").on("click", function() {
        deleteLoad();
    })

    //显示项目数
    function itemNum() {
        var add = todolist + todofinsh;
        $(".showNum").text('共'+ add +'条todo，已完成'+ todofinsh +'条，未完成'+ todolist +'条 ');
    }

    
})

