/*简便代码*/
var query = document.querySelector.bind(document);
var queryAll = document.querySelectorAll.bind(document);
var fromId = document.getElementById.bind(document);

/*彩蛋*/
console.log("\n _____  __   __    _  _     ___   \n|_   _| \\ \\ / /   | \\| |   | _ )  \n  | |    \\ V /    | .` |   | _ \\  \n  |_|     \\_/     |_|\\_|   |___/  ");

/*用到的dom*/
var AllList = query(".All-list");           //所有todo的清单
var FinishList = query(".Finish-list");           //完成todo的清单
var TodoList = query(".Todo-list");           //所有todo的清单
var DeleteList = query(".Delete-list");           //所有todo的清单

var showNum = query(".showNum");          //显示数目

/*数字记录*/
var todolistNum = 0;           
var todofinsh = 0;
var tododelete = 0;

//跳转页面
query(".ToAll").addEventListener("click", togo );     //转至allList
query(".ToFinish").addEventListener("click", togo );     //转至finishList
query(".ToTodo").addEventListener("click", togo );     //转至todoList
query(".ToDelete").addEventListener("click", togo );     //转至deleteList

function togo() {
    var togoClick = queryAll(".nav-tabs li");


    for (i = 0 ; i < togoClick.length ; i++ ) {         //删除active项

        var classValDelete = togoClick[i].getAttribute("class");
        classValDelete = classValDelete.replace(" active","");
        togoClick[i].setAttribute("class",classValDelete);

    }

    this.className += ' active';

    var togoShow = queryAll(".tab-pane");


    for (i = 0 ; i < togoShow.length ; i++ ) {      //删除active项
        var classVal = togoShow[i].getAttribute("class");
        classVal = classVal.replace(" active","");

        togoShow[i].setAttribute("class",classVal);
    }

    query(this.children[0].getAttribute('href')).className += " active";


}

/*监听*/
query(".ToAll").addEventListener("click", load);     //转至allList
query(".ToFinish").addEventListener("click", finishLoad);     //转至finishList
query(".ToTodo").addEventListener("click", todoLoad);     //转至todoList
query(".ToDelete").addEventListener("click", deleteLoad);     //转至deleteList

load();     //开局调用

/*回车输入*/
query(".new-todo").addEventListener('keyup',function(e) {
    if(e.keyCode === 13 && this.value !=="") {

        //提取数据
        var local = getDate();

        //更新数据
        local.push({
            title: this.value,
            done: false,
            delete:false,
        })

        saveData(local);

        this.value = "";

        //页面加载  
        judge();

    } else if (e.keyCode === 13 && this.value =="") {
        alert("请输入内容");
    }

})

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

//显示项目数
function itemNum() {
    var add = todolistNum + todofinsh;
    showNum.innerText = '共'+ add +'条todo，已完成'+ todofinsh +'条，未完成'+ todolistNum +'条 ';
}

//删除todo 即转移至回收站的
function todeleteFalse() {
    var close = queryAll(".close");                //删除按钮
    for(var i = 0; i < close.length; i++ ) {
	    close[i].addEventListener('click',function() {
            var data = getDate();

            var index = this.parentNode.parentNode.getAttribute("num");

            data[index].delete = true;
            
            saveData(data);

            judge();

        });    
    };
} 
 
//完成todo 
function tofinish() {
    var finish = queryAll(".finsh");                 //完成按钮
    for(var i = 0; i < finish.length; i++ ) {
	    finish[i].addEventListener('click',function() {
            var data = getDate();

            var index = this.parentNode.parentNode.getAttribute("num");

            data[index].done = this.checked;
            
            saveData(data);

            judge();

        });    
    };
} 
 
//判断刷新
function judge() {
    if (fromId('Delete').getAttribute("class") == "tab-pane active") {
        deleteLoad();
    } else if (fromId('Finish').getAttribute("class") == "tab-pane active") {
        finishLoad();
    } else if (fromId('All').getAttribute("class") == "tab-pane active") {
        load();
    } else if (fromId('Todo').getAttribute("class") == "tab-pane active" ) {
        todoLoad();
    }
}   

//清空
function clean() {
    AllList.innerHTML = "";
    TodoList.innerHTML = "";
    FinishList.innerHTML = "";
    DeleteList.innerHTML = "";

}

//显示全部数据
function load(){
    var data = getDate();
    todolistNum = 0;
    todofinsh = 0;

    clean();

    data.forEach( function(n , i) {         //遍历数据添加list
        queryAll(".nonetodo").innerHTML = "";
        if (!n.delete) {
            if (n.done) {
                AllList.innerHTML += `
                    <li num ='${i}'  class="">
                        <div class="view finsh-true">
                            <input class="finsh finsh-black" type="checkbox" checked>
                            <label><s class="all-finish-item"></s></label>
                            <button type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </li>
                `;

                var temporary = queryAll(".all-finish-item")[queryAll(".all-finish-item").length-1];
                temporary.innerText = n.title;
                todofinsh++;       

            } else {
                AllList.innerHTML += `
                    <li num ='${i}'  class="">
                        <div class="view"><input class="finsh" type="checkbox" >
                            <label class = "all-todo-item"></label>
                            <button type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </li>   
                `;

                var temporary = queryAll(".all-todo-item")[queryAll(".all-todo-item").length-1];
                temporary.innerText = n.title;

                todolistNum++;
            }
        } else {
            tododelete++;
        }

    })

    if (todolistNum == 0 && todofinsh == 0) {       //显示无list图
        AllList.innerHTML += `
        <li  class="nonetodo" >
            <div class="view">
                <label>所有的TODO都完成啦</label>
            </div>
        </li>
        `
    }

    itemNum();      //显示脚标


    //删除数据
    todeleteFalse();

    //完成操作
    tofinish();

}

//显示todo数据
function todoLoad(){
    var data = getDate();
    todolistNum = 0;
    todofinsh = 0;

    clean();

    data.forEach( function(n , i) {
        queryAll(".nonetodo").innerHTML = "";
        if (!n.delete) {
            if (n.done) {

                todofinsh++;

            } else {
                TodoList.innerHTML += `
                    <li num ='${i}'  class="">
                        <div class="view"><input class="finsh" type="checkbox" >
                            <label class = "todo-item"></label>
                            <button type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </li>   
                `;

                var temporary = queryAll(".todo-item")[queryAll(".todo-item").length-1];
                temporary.innerText = n.title;
                todolistNum++;
            }
        } 

    })

    if (todolistNum == 0) {
        TodoList.innerHTML += `
        <li  class="nonetodo" >
            <div class="view">
                <label>所有的TODO都完成啦</label>
            </div>
        </li>
        `
    }

    itemNum();


    //删除数据
    todeleteFalse();

    //完成操作
    tofinish();

}

//显示已完成数据
function finishLoad(){
    var data = getDate();
    todolistNum = 0;
    todofinsh = 0;

    clean();

    data.forEach( function(n , i) {
        queryAll(".nonetodo").innerHTML = "";
        if (!n.delete) {
            if (n.done) {

                FinishList.innerHTML += `
                    <li num ='${i}'  class="">
                        <div class="view finsh-true">
                            <input class="finsh finsh-black" type="checkbox" checked>
                            <label><s class="finish-todo-item"></s></label>
                            <button type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </li>
                `;

                var temporary = queryAll(".finish-todo-item")[queryAll(".finish-todo-item").length-1];
                temporary.innerText = n.title;
                todofinsh++;

            } else {
                todolistNum++;
            }
                
        } 

    })

    if (todofinsh == 0) {
        FinishList.innerHTML += `
        <li  class="nonetodo" >
            <div class="view">
                <label>还没有完成的todo噢</label>
            </div>
        </li>
        `
    }

    itemNum();


    //删除数据
    todeleteFalse();

    //完成操作
    tofinish();

}

//显示已删除的数据
function deleteLoad() {
    var data = getDate();
    tododelete = 0;
    clean() ;

    data.forEach( function(n , i) {
        queryAll(".nonetodo").innerHTML = "";

        if (n.delete) {
            if (n.done) {

                DeleteList.innerHTML += `
                <li num ='${i}'  class="">
                    <div class="view delete-style finsh-true ">
                        <input class="finsh finsh-back" type="checkbox" checked>
                        <label><s class="delete-finish-item"></s></label>
                        <button type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </li>
                `;

                var temporary = queryAll(".delete-finish-item")[queryAll(".delete-finish-item").length-1];
                temporary.innerText = n.title;

            } else {
                DeleteList.innerHTML += `
                <li num ='${i}'  class="">
                    <div class="view delete-style">
                        <input class="finsh finsh-back" type="checkbox">
                        <label class="delete-todo-item"></label>
                        <button type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </li>
                `;

                var temporary = queryAll(".delete-todo-item")[queryAll(".delete-todo-item").length-1];
                temporary.innerText = n.title;
                
            }

            tododelete++;
        } 

    })

    itemNum();

    if (tododelete == 0) {
        DeleteList.innerHTML += `
        <li  class="nonetodo" >
            <div class="view">
                <label>回收站暂无todo</label>
            </div>
        </li>
        `
    }

    itemNum();

    //删除数据
    var close = queryAll(".close");                //删除按钮
    for(var i = 0; i < close.length; i++ ) {
	    close[i].addEventListener('click',function() {
            var data = getDate();

            var index = this.parentNode.parentNode.getAttribute("num");

            data.splice(index, 1);
            
            saveData(data);

            judge();

        });    
    };

    //恢复
    var finishBack = queryAll(".finsh-back");                 //完成按钮
    for(var i = 0; i < finishBack.length; i++ ) {
	    finishBack[i].addEventListener('click',function() {
            var data = getDate();

            var index = this.parentNode.parentNode.getAttribute("num");

            data[index].delete = false;

            if (data[index].done) {
                todofinsh++;
            } else {
                todolistNum++;
            }
            
            saveData(data);

            judge();

        });    
    };

}

