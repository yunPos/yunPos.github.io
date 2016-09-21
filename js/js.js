window.onload = function(){
    // document.documentElement.style.overflowY = 'hidden';
    // document.documentElement.style.overflowX = 'hidden';
    var diningTableSizeItem = document.getElementById('dining-table-size-item');
    var diningTableList = document.getElementById('dining-table-list');
    var aDiningTableItem = diningTableList.getElementsByClassName('dining-table-item');
    var oAdminBtn = document.getElementById('admin-btn'); //获取设置按钮
    var oModality  //预先定义模态变量
    var swithModality = false;
    var swithMenu = true;  //右键开关
    var swithRight = false;  //文档右键与桌台右键开关
    var aDiningTableItemTopWidth = []   //用于存放left与宽的比值
    var aDiningTableItemLeftWidth = [] ;  //用于存放top与宽的比值


    /*-----------------------------------右键菜单功能-----------------------------------------*/
    document.oncontextmenu = function(){
        rightMenu(undefined,data.documentRight,0)
        return false; //阻止浏览器右键的默认行为
    };
    function rightMenu(ev,data,pid,_this) {
        removeRightMenu();
        if(swithMenu){
            ev = ev || event;
            var disX = ev.clientX;
            var disY = ev.clientY;
            var oRightMenuBox = document.createElement('div');
            oRightMenuBox.setAttribute("id","rightMenuBox");
            document.body.appendChild(oRightMenuBox);
            oRightMenuBox.style.left = disX + 'px';
            oRightMenuBox.style.top = disY + 'px';
            // var data = data;
            oRightMenuBox.innerHTML = rightMenuHtml(data,pid);
        }
        var oRightMenuBoxEl = document.getElementById('rightMenuBox');
        var aLi = oRightMenuBoxEl.getElementsByTagName('li');
        rightMenuHover(aLi);
        rightMenuClick(aLi,_this);
        swithMenu = false;
    }
    /*-----------------------------------右键菜单hover-----------------------------------------*/
    function rightMenuHover(aLi){
        for(var i=0; i<aLi.length; i++) {
            aLi[i].onmouseover = function () {
                this.style.background = '#ddd';
                this.children[1].style.display = 'block';
            }
            aLi[i].onmouseout = function () {
                this.style.background = '#eee';
                this.children[1].style.display = 'none';
            }
        }
    }
    /*-----------------------------------右键菜单click-----------------------------------------*/
    function rightMenuClick(aLi,_this){
        for(var i=0; i<aLi.length; i++) {
            aLi[i].onclick = function(ev){
                var ev = ev || event;
                var clientX = ev.clientX;
                var clientY = ev.clientY;
                if(this.getAttribute("data-type") == 'false'){
                    for(var i=0; i<aLi.length; i++){
                        aLi[i].style.background = 'none';
                        aLi[i].children[1].style.display = 'none';
                    }
                    this.style.background = '#ddd';
                    this.children[1].style.display = 'block';
                    ev.cancelBubble = true;
                }else{
                    var n = parseInt(this.getAttribute("data-type"));
                    switch(n){
                        case 1: createDiningTable(n);
                            break;
                        case 2: createDiningTable(n);
                            break;
                        case 3: console.log(n);
                            break;
                        case 4: createWall(clientX,clientY,n);
                            break;
                        case 5: console.log(n);
                            break;
                        case 6: console.log(n);
                            break;
                        case 7: console.log(n);
                            break;
                        case 8: console.log(n);
                            break;
                        case 1000: removeDiningTab(undefined,_this);
                            break;
                        case 1001: console.log(n);
                            break;
                        case 1002: console.log(n);
                            break;
                        default:console.log('正在努力添加中……')
                    }
                    removeRightMenu();
                }
            }
        }
    }
    /*-----------------------------------新建桌台-----------------------------------------*/
    function createDiningTable(n){
        var createDiningTable = document.createElement('div');
        createDiningTable.setAttribute('class','dining-table-item ');
        switch(n){
            case 1:createDiningTable.setAttribute('class','dining-table-round dining-table-item');
                break;
            case 2:
                break;
            case 3: console.log(n);
                break;
            default:console.log('正在努力添加中……')
        }
        createDiningTable.innerHTML = voidDiningTableHTML();  //create-wall
        diningTableList.appendChild(createDiningTable);
        var diningTableArr = []; //获取桌台元素集合
        var diningTableListChild = diningTableList.children;  //获取地板上的所有元素，桌台、墙、收银台
        var diningTableListChildNum = 0; //暂存桌台的个数

        //新建桌台时的默认位置
        for(var i=0; i<diningTableListChild.length; i++){
            if(isClassName(diningTableListChild[i],'dining-table-item')){
                diningTableListChildNum ++;
                diningTableArr.push(diningTableListChild[i]);
            }
        }
        console.log(diningTableArr.length + 'aaaa')
        if(diningTableListChildNum == 1){
            if(isClassName(diningTableArr[0],'dining-table-item')){
                diningTableArr[0].style.cssText = 'top:'+diningTableSizeItem.offsetWidth / 3+'px; left:'+diningTableSizeItem.offsetWidth / 3+'px;'
            }
            diningTableArr.length = 1;
            console.log(diningTableArr.length + 'bbbbb')
        }else if(diningTableListChildNum > 1){
            diningTableArr.length = 0;
            console.log(diningTableArr.length + 'ccccc11111111')
            for(var i=0; i<diningTableListChild.length; i++){
                if(isClassName(diningTableListChild[i],'dining-table-item')){
                    diningTableArr.push(diningTableListChild[i]);
                }
            }
            console.log(diningTableArr.length + 'ccccc')
            var diningTableChild = diningTableArr;  /*获取桌台集合*/ console.log(diningTableArr)
            var previousIndex = diningTableChild.length - 2;
            var previousTop = diningTableChild[previousIndex].offsetTop;  console.log(previousTop)
            var previousLeft = diningTableChild[previousIndex].offsetLeft;  console.log(previousLeft)
            var currentLeft = previousLeft + diningTableChild[previousIndex].offsetWidth + 10;
            diningTableChild[diningTableChild.length - 1].style.cssText = 'left:'+currentLeft+'px; top:'+previousTop+'px';
            console.log( diningTableChild[diningTableChild.length - 1].style.cssText )
        }

        setHeight(zoomValue); //要先设置高宽然后才能获取高宽与left、top的比值，不然获取的值会有偏差

        ratio(diningTableArr)

        DiningTableRight();  //桌台右键

        //拖拽执行
        drag(createDiningTable,'mousedown','mousemove','mouseup')
        drag(createDiningTable,'touchstart','touchmove','touchend')
    }

    /*-----------------------------------获取高宽与left、top的比值-----------------------------------------*/
    function ratio(objs){
        var aDiningTableItemTopWidthNew = [];
        var aDiningTableItemLeftWidthNew = [];
        for(var i=0; i<objs.length; i++){
            aDiningTableItemTopWidthNew.push(objs[i].offsetTop / objs[i].offsetWidth);
            aDiningTableItemLeftWidthNew.push(objs[i].offsetLeft / objs[i].offsetWidth);
        }
        aDiningTableItemTopWidth = aDiningTableItemTopWidthNew;
        aDiningTableItemLeftWidth = aDiningTableItemLeftWidthNew;
    }

    /*-----------------------------------桌台右键-----------------------------------------*/
    function DiningTableRight(){
        for(var i=0; i<aDiningTableItem.length; i++){
            aDiningTableItem[i].oncontextmenu = function(ev){
                var ev = ev || event;
                rightMenu(undefined,data.diningTableRight,0,this)
                ev.cancelBubble = true;
                return false; //阻止浏览器右键的默认行为

            }
        }
    }
    /*-----------------------------------移除桌台-----------------------------------------*/
    function removeDiningTab(ev,_this){
        var ev = ev || event;
        ev.cancelBubble = true;
        diningTableList.removeChild(_this)
    }

    /*-----------------------------------新建墙-----------------------------------------*/

    function createWall(clientX,clientY,n){
        var createWall = document.createElement('div');
        createWall.setAttribute('class','create-wall');
        var navH = document.getElementsByTagName('nav')[0].offsetHeight;
        // console.log(navH)
        switch(n){
            case 4:
                break;
            case 5:
                break;
            case 6: console.log(n);
                break;
            default:console.log('正在努力添加中……')
        }
        createWall.style.cssText += ';width:'+diningTableSizeItem.offsetWidth / 20+'px; height:'+diningTableSizeItem.offsetWidth+'px; top:'+clientY+'px; left:'+clientX+'px;';
        createWall.style.top = clientY-navH + 'px';
        diningTableList.appendChild(createWall);
        var diningTableListChild = diningTableList.children;
        // Proportion()
        for(var i=0; i<diningTableListChild.length; i++){
            if(isClassName(diningTableListChild[i],'create-wall')){
                drag(diningTableListChild[i],'mousedown','mousemove','mouseup')
                drag(diningTableListChild[i],'touchstart','touchmove','touchend')
            }
        }
    }

    /*-----------------------------------$设置高 + 缩放-----------------------------------------*/
    var oZoom = document.getElementById('zoom');
    var viewBtn = document.getElementById('viewBtn');
    var swithViewToggle = true;
    // viewBtn.addEventListener("onclick",viewToggle);
    viewBtn.onclick = viewToggle
    function viewToggle(){
        if(swithViewToggle){
            oZoom.style.display = 'inline-block';
            swithViewToggle = false;
        }else{
            oZoom.style.display = 'none';
            swithViewToggle = true;
        }
    }

    var zoomValue = 1;  //原始桌台大小
    var zoomABtn = oZoom.children;
    for(var i=0; i<zoomABtn.length; i++){
        zoomABtn[i].onclick = function(){
            var n = parseInt(this.getAttribute('data-zoom'));

            switch(n){
                case 0://放大
                    zoomValue += 0.2;
                    break;
                case 1://缩小
                    zoomValue -= 0.2;
                    break;
                // case 2://全景
                //     panorama();
                //     break;
                case 3://原始
                    zoomValue = 1;
                    break;
            }
            setHeight(zoomValue)
        }
    }
    //点击缩放之后重新设置宽高，left、top值
    function setHeight(zoomValue){
        var diningTableSizeItemWidth = diningTableSizeItem.offsetWidth * zoomValue;
        for(var i=0; i<aDiningTableItem.length; i++){
            aDiningTableItem[i].style.cssText +=';width:'+diningTableSizeItemWidth+'px;height:'+diningTableSizeItemWidth+'px;';
            aDiningTableItem[i].style.fontSize = diningTableSizeItemWidth / 10 + 'px';   //设置桌台字体大小
        }
        for(var i=0; i<aDiningTableItem.length; i++){
            var aDiningTableItemWidthNew = aDiningTableItem[i].offsetWidth;
            aDiningTableItem[i].style.cssText+=';left:'+aDiningTableItemLeftWidth[i] * aDiningTableItemWidthNew+'px;top:'+aDiningTableItemTopWidth[i] * aDiningTableItemWidthNew+'px';
        }
    }

    /*-----------------------------------取消右键菜单功能-----------------------------------------*/
    document.onclick = removeRightMenu;
    function removeRightMenu(){
        var oRightMenuBox = document.getElementById('rightMenuBox');
        if(oRightMenuBox){
            document.body.removeChild(oRightMenuBox);
        }
        swithMenu = true;
    }

    /*-----------------------------------设置功能-----------------------------------------*/
    oAdminBtn.onclick = function(){
        swithModality = true;
        oModality = document.createElement('div');
        oModality.setAttribute("id","modality");
        document.body.appendChild(oModality);
        var admin = '<div id="adminBox">' +
            '<h2 id="adminTitle"><a href="javascript:;"></a>奥琦玮云POS</h2>' +
            '<div class="adminContainer fix">' +
                '<ul class="adminList">' +
                    '<li><a href="javascript:;">关于云PSO</a></li>' +
                    '<li><a href="javascript:;">我的餐厅</a></li>' +
                    '<li><a href="javascript:;">打印机和KDS</a></li>' +
                    '<li><a href="javascript:;">菜单档案</a></li>' +
                    '<li><a href="javascript:;">员工</a></li>' +
                    '<li><a href="javascript:;">桌台</a></li>' +
                    '<li><a href="javascript:;">单据</a></li>' +
                    '<li><a href="javascript:;">支付</a></li>' +
                    '<li><a href="javascript:;">对接</a></li>' +
                    '<li><a href="javascript:;">授权</a></li>' +
                    '<li><a href="javascript:;">服务器</a></li>' +
                    '<li><a href="javascript:;">退出</a></li>' +
                '</ul>' +
                '<div class="adminInfo">' +
                    '<h6>系统信息</h6>' +
                    '<ul>' +
                        '<li><span>软件版本</span><span>v1.1</span></li>' +
                        '<li><span>IOS版本</span><span>v1.1</span></li>' +
                        '<li><span>设备名称</span><span>v1.1</span></li>' +
                        '<li><span>IP 地址</span><span>v1.1</span></li>' +
                        '<li><span>Wi-Fi 热点名称</span><span>v1.1</span></li>' +
                        '<li><span>设备连接到Internet</span><span>v1.1</span></li>' +
                        '<li><span>服务器地址</span><span>v1.1</span></li>' +
                        '<li><span>存储空间</span><span>v1.1</span></li>' +
                        '<li><span>上一次备份时间</span><span>v1.1</span></li>' +
                        '<li><span>在线帮助</span><span>v1.1</span></li>' +
                 '</ul>' +
                '</div>' +
            '</div>' +
            '</div>';
        oModality.innerHTML = admin;
        modalityCenter();
    }
    /*-----------------------------------弹出层居中功能-----------------------------------------*/
    function modalityCenter(){
        var oAdminBox =  document.getElementById('adminBox');  //获取弹出层
        var oAdminBoxW = oAdminBox.offsetWidth;
        var oAdminBoxH = oAdminBox.offsetHeight;
        var oModalityW = oModality.offsetWidth;
        var oModalityH = oModality.offsetHeight;
        oAdminBox.style.cssText +=';left:'+(oModalityW-oAdminBoxW)/2+'px;top:'+(oModalityH-oAdminBoxH)/2+'px;';
    }


    /*-----------------------------------桌台自适应-----------------------------------------*/
    window.onresize = function(){
        // 如果有模态就执行居中
        if(swithModality)modalityCenter();
        // 设置高
        setHeight(zoomValue);
        //坐标变化
        // console.log( aDiningTableItemTopWidth )
        for(var i=0; i<aDiningTableItem.length; i++){
            var aDiningTableItemWidthNew = aDiningTableItem[i].offsetWidth;
            aDiningTableItem[i].style.cssText+=';left:'+aDiningTableItemLeftWidth[i] * aDiningTableItemWidthNew+'px;top:'+aDiningTableItemTopWidth[i] * aDiningTableItemWidthNew+'px';
        }
    }

    /*------------------------------------$拖拽-----------------------------------------*/
    function drag(obj,ev1,ev2,ev3) {
        obj.addEventListener(ev1,function(ev) {
            obj.style.zIndex = 1111111111111;
            var ev = ev || event;
            try{
                var disX = ev.changedTouches[0].clientX - this.offsetLeft;
                var disY = ev.changedTouches[0].clientY- this.offsetTop;
            }catch (e){
                var disX = ev.clientX - this.offsetLeft;
                var disY = ev.clientY - this.offsetTop;
            }

            if ( obj.setCapture ) {
                obj.setCapture();
            }
            document.addEventListener(ev2,moveIng)
            document.addEventListener(ev3,moveEnd)
            function moveIng(ev) {
                var ev = ev || event;
                try{
                    obj.style.left = ev.changedTouches[0].clientX - disX + 'px';
                    obj.style.top = ev.changedTouches[0].clientY - disY + 'px';
                }catch(e){
                    obj.style.left = ev.clientX - disX + 'px';
                    obj.style.top = ev.clientY - disY + 'px';
                }

                //拖拽完之后重新获取坐标
                ratio(aDiningTableItem);
            }
            function moveEnd() {
                document.removeEventListener(ev2,moveIng);
                document.removeEventListener(ev3,moveEnd);
                obj.style.zIndex = 1;
                //释放全局捕获 releaseCapture();
                if ( obj.releaseCapture ) {
                    obj.releaseCapture();
                }
            }
            return false;
        })
    }
}














