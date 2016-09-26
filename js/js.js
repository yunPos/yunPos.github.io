window.onload = function(){
    // document.documentElement.style.overflowY = 'hidden';
    // document.documentElement.style.overflowX = 'hidden';
    // document.documentElement.style.webkitTouchCallout='none';  //WebView__禁用长按出现选择框、放大镜
    window.ontouchstart = function(ev) {
        var ev = ev || event;
        ev.preventDefault();
    };
    var diningTableSizeItem = document.getElementById('dining-table-size-item');
    var diningTableList = document.getElementById('dining-table-list');
    var aDiningTableItem = diningTableList.getElementsByClassName('dining-table-item');  //获取桌台集合
    var aCreateWall = diningTableList.getElementsByClassName('create-wall');    //获取墙集合
    var oAdminBtn = document.getElementById('admin-btn'); //获取设置按钮
    var oMain = document.getElementById('main'); //获取地板
    var oNav = document.getElementsByTagName('nav')[0];  //获取nav元素
    var oFooter = document.getElementsByTagName('footer')[0]  //获取footer元素
    var oModality  //预先定义模态变量
    var swithModality = false;  //模态开关
    var swithDrag = true;   //是否能拖拽开关
    var swithMenu = true;  //右键开关
    var swithRight = false;  //文档右键与桌台右键开关
    var aDiningTableItemTopWidth = []   //用于存放桌台top与宽的比值
    var aDiningTableItemLeftWidth = [] ;  //用于存放桌台left与宽的比值
    var aWallTopWidth = [];   //用于存放墙top与宽的比值
    var aWallLeftWidth = [];  //用于存放墙left与宽的比值
    var aWallWidth = [];   //用于存放墙的宽
    var aWallHeight = [];   //用于存放墙的高
    var navH = oNav.offsetHeight;  //存放nav的高
    var footerH = oFooter.offsetHeight; //存放footer的高


    /*-----------------------------------右键菜单功能-----------------------------------------*/
    oMain.oncontextmenu = function(){
        rightMenu(undefined,data.documentRight,0)
        return false; //阻止浏览器右键的默认行为
    };
    /*-----------------------------------手机长按功能-----------------------------------*/
    // oMain.addEventListener('touchstart',function(ev){
    //     var ev = ev || event;
    //     var longPress = setTimeout(function(){
    //         rightMenu(undefined,data.documentRight,0)
    //     },10)
    //     alert(111)
    //     ev.preventDefault();
    // })

    function rightMenu(ev,data,pid,_this) {
        removeRightMenu(undefined);
        if(swithMenu){
            ev = ev || event;
            try{
                var disX = ev.changedTouches[0].clientX;
                var disY = ev.changedTouches[0].clientY;
            }catch (e){
                var disX = ev.clientX;
                var disY = ev.clientY;
            }
            var oRightMenuBox = document.createElement('div');
            oRightMenuBox.setAttribute("id","rightMenuBox");
            document.body.appendChild(oRightMenuBox);
            oRightMenuBox.style.left = disX + 'px';
            oRightMenuBox.style.top = disY + 'px';
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
                this.style.background = '#eee';
                this.children[1].style.display = 'block';
            }
            aLi[i].onmouseout = function () {
                this.style.background = '#fff';
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
                        case 4: createWall(clientX,clientY,n);    //横墙
                            break;
                        case 5: createWall(clientX,clientY,n)   //竖墙
                            break;
                        case 6: console.log(n);
                            break;
                        case 7: changeBackground(this);
                            break;
                        case 8: console.log(n);
                            break;
                        case 1000: removeDiningTab(undefined,_this);
                            break;
                        case 1001: console.log(n);
                            break;
                        case 1002: console.log(n);
                            break;
                        case 10000: removeWall(undefined,_this);
                            break;
                        default:console.log('正在努力添加中……')
                    }
                    removeRightMenu(n);
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
        var diningTableArr = []; //用于暂存桌台元素集合
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
        }else if(diningTableListChildNum > 1){
            diningTableArr.length = 0;
            for(var i=0; i<diningTableListChild.length; i++){
                if(isClassName(diningTableListChild[i],'dining-table-item')){
                    diningTableArr.push(diningTableListChild[i]);
                }
            }
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
        drag(createDiningTable,'mousedown','mousemove','mouseup',undefined)
        drag(createDiningTable,'touchstart','touchmove','touchend',undefined)
    }

    /*-----------------------------------获取桌台高宽与left、top的比值-----------------------------------------*/
    function ratio(objs){
        var aDiningTableItemTopWidthNew = [];
        var aDiningTableItemLeftWidthNew = [];
        for(var i=0; i<objs.length; i++){
            aDiningTableItemTopWidthNew.push(objs[i].offsetTop / objs[i].offsetWidth);
            aDiningTableItemLeftWidthNew.push(objs[i].offsetLeft / objs[i].offsetWidth);
        }
        aDiningTableItemTopWidth = aDiningTableItemTopWidthNew;
        aDiningTableItemLeftWidth = aDiningTableItemLeftWidthNew;
        // console.log('tw'+aDiningTableItemTopWidth + '   lw'+aDiningTableItemLeftWidth +'桌台')
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
    var createWallArr = [];    //保存墙元素的集合
    function createWall(clientX,clientY,n){
        var createWall = document.createElement('div');
        createWall.setAttribute('class','create-wall');
        switch(n){
            case 4:crossWall();
                break;
            case 5:verticalWall();
                break;
            case 6: console.log(n);
                break;
            default:console.log('正在努力添加中……')
        }

        function crossWall(){
            createWall.style.cssText += ';width:'+diningTableSizeItem.offsetWidth+'px; height:'+diningTableSizeItem.offsetWidth  / 20+'px; top:'+clientY+'px; left:'+clientX+'px;';
            createWall.style.top = clientY-navH + 'px';
        }
        function verticalWall(){
            createWall.style.cssText += ';width:'+diningTableSizeItem.offsetWidth  / 20+'px; height:'+diningTableSizeItem.offsetWidth+'px; top:'+clientY+'px; left:'+clientX+'px;';
            createWall.style.top = clientY-navH + 'px';
        }
        diningTableList.appendChild(createWall);
        var diningTableListChild = diningTableList.children;
        for(var i=0; i<diningTableListChild.length; i++){
            if(isClassName(diningTableListChild[i],'create-wall')){
                drag(diningTableListChild[i],'mousedown','mousemove','mouseup',n)
                drag(diningTableListChild[i],'touchstart','touchmove','touchend',n)
                createWallArr.push(diningTableListChild[i]);
            }
        }
        //获取原始的比值
        ratioWallAll(createWallArr)
        // 移除墙
        wallRight(createWallArr)
    }

    /*-----------------------------------墙右键-----------------------------------------*/
    function wallRight(){
        for(var i=0; i<aCreateWall.length; i++){
            aCreateWall[i].oncontextmenu = function(ev){
                var ev = ev || event;
                rightMenu(undefined,data.wallRight,0,this)
                ev.cancelBubble = true;
                return false; //阻止浏览器右键的默认行为

            }
        }
    }

    function removeWall(ev,_this){
        var ev = ev || event;
        ev.cancelBubble = true;
        diningTableList.removeChild(_this)
    }

    /*-----------------------------------上传背景-----------------------------------------*/
    function changeBackground(_this){
        var oH5 = _this.getElementsByTagName('h5')[0];
        var oFile = document.createElement('input');
        var aInput = _this.getElementsByTagName('input');
        // oFile.value = '上传图片';
        oFile.setAttribute("type","file");
        oFile.setAttribute("accept","image/*;capture=camera");
        oFile.style.cssText += '; position:absolute; left:25px; top:0; z-index:2; width:100px; opacity:0; ';
        oH5.style.zIndex = 1;
        if(aInput.length > 0){
            for(var i=0; i<aInput.length; i++){
                _this.removeChild(aInput[i]);
            }
        }
        _this.appendChild(oFile)
        _this.style.position = 'relative';
        // aInput[0].click();
        // console.log()
        // return aInput[0].onclick();

    }


    /*-----------------------------------$设置缩放 + 调用高-----------------------------------------*/
    var oZoom = document.getElementById('zoom');
    var viewBtn = document.getElementById('viewBtn');
    var swithViewToggle = true;
    viewBtn.addEventListener("click",viewToggle);
    // viewBtn.onclick = viewToggle
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
        for(var i=0; i<aCreateWall.length; i++){
            var diningTableSizeItemWidth = aWallWidth[i]*diningTableSizeItem.offsetWidth * zoomValue;
            var diningTableSizeItemHeight = aWallHeight[i]*diningTableSizeItem.offsetWidth * zoomValue;
            var diningTableSizeItemLeft = aWallLeftWidth[i]*diningTableSizeItemWidth;
            var diningTableSizeItemTop = aWallTopWidth[i]*diningTableSizeItemWidth;
            aCreateWall[i].style.cssText += ';left:'+ diningTableSizeItemLeft +'px; top:'+ diningTableSizeItemTop +'px; width:'+diningTableSizeItemWidth+'px; height:'+diningTableSizeItemHeight+'px;'
        }
    }

    //
    //
    //
    /*-----------------------------------取消右键菜单功能-----------------------------------------*/
    document.onclick = function(){
        removeRightMenu(undefined)
    };
    function removeRightMenu(n){
        var oRightMenuBox = document.getElementById('rightMenuBox');
        if(n == '7') return 0;
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
        // 相应获取nav的高
        navH = oNav.offsetHeight;
        footerH = oFooter.offsetHeight;
        //坐标变化
        // console.log( aDiningTableItemTopWidth )
        for(var i=0; i<aDiningTableItem.length; i++){
            var aDiningTableItemWidthNew = aDiningTableItem[i].offsetWidth;
            aDiningTableItem[i].style.cssText+=';left:'+aDiningTableItemLeftWidth[i] * aDiningTableItemWidthNew+'px;top:'+aDiningTableItemTopWidth[i] * aDiningTableItemWidthNew+'px';
        }
        for(var i=0; i<aCreateWall.length; i++){
            var diningTableSizeItemWidth = aWallWidth[i]*diningTableSizeItem.offsetWidth;
            var diningTableSizeItemHeight = aWallHeight[i]*diningTableSizeItem.offsetWidth;
            var diningTableSizeItemLeft = aWallLeftWidth[i]*diningTableSizeItemWidth;
            var diningTableSizeItemTop = aWallTopWidth[i]*diningTableSizeItemWidth;
            aCreateWall[i].style.cssText += ';left:'+ diningTableSizeItemLeft +'px; top:'+ diningTableSizeItemTop +'px; width:'+diningTableSizeItemWidth+'px; height:'+diningTableSizeItemHeight+'px;'
        }
    }


    /*-----------------------------------获取墙高宽与left、top的比值-----------------------------------------*/
    function ratioWallAll(objs){
        var aWallHeightNew = [];   //用于存放墙的高与桌台高的比值
        var aWallWidthNew = [];   //用于存放墙的宽与桌台宽的比值
        var aWallTopWidthNew = [];   //用于存放墙top与宽的比值
        var aWallLeftWidthNew = [];   //用于存放墙left与宽的比值
        var num = 0;
        for(var i=0; i<objs.length; i++){
            aWallTopWidthNew.push(objs[i].offsetTop / objs[i].offsetWidth);
            aWallLeftWidthNew.push(objs[i].offsetLeft / objs[i].offsetWidth);
            aWallHeightNew.push(objs[i].offsetHeight / diningTableSizeItem.offsetWidth);
            aWallWidthNew.push(objs[i].offsetWidth / diningTableSizeItem.offsetWidth);
            console.log(num + '--' + aWallTopWidthNew[i] + '  ' + aWallLeftWidthNew[i] + '   ' + aWallHeightNew[i] + '  '+aWallWidthNew[i])
        }
        aWallTopWidth = aWallTopWidthNew;
        aWallLeftWidth = aWallLeftWidthNew;
        aWallWidth = aWallWidthNew;
        aWallHeight = aWallHeightNew;
    }

    /*------------------------------------$拖拽-----------------------------------------*/
    function drag(obj,ev1,ev2,ev3,n) {
        obj.addEventListener(ev1,function(ev) {
            obj.style.zIndex = 1111111111111;
            var ev = ev || event;
            ev.preventDefault();
            try{
                var disX = ev.changedTouches[0].clientX - this.offsetLeft;
                var disY = ev.changedTouches[0].clientY- this.offsetTop;
            }catch (e){
                var disX = ev.clientX - this.offsetLeft;
                var disY = ev.clientY - this.offsetTop;
            }
            var h = obj.offsetHeight;
            var w = obj.offsetWidth;
            var clientY = ev.clientY;
            var clientX = ev.clientX;
            if ( obj.setCapture ) {
                obj.setCapture();
            }
            var wallSizeWH = 3;
            if(isClassName(obj,"create-wall")){
                if( n == '4'){
                    var diffX = Number(obj.offsetLeft) + Number(w) - Number(clientX);
                    if(diffX < 10 && diffX >0) {
                        wallSizeWH = 1;
                        swithDrag = false;
                    };
                }else{
                    var diffY = Number(obj.offsetTop) + Number(h) + Number(navH) - Number(clientY);
                    if(diffY < 10 && diffY >0){
                        wallSizeWH = 2;
                        swithDrag = false;
                    }
                }
                document.addEventListener(ev2,dragSize);
            }

            if(swithDrag){
                document.addEventListener(ev2,moveIng)
            }

            document.addEventListener(ev3,moveEnd)
            //
            //此处的数值需要改改改
            //
            //
            function dragSize(ev){
                var ev = ev || event;
                var hChange = h + ev.clientY - clientY;
                var wChange = w + ev.clientX - clientX;

                if(wallSizeWH == 1){
                    if(obj.offsetWidth < 20){
                        wChange = 20;
                    }
                    if(obj.offsetHeight < 6){
                        hChange = 6;
                    }
                    obj.style.cssText += ';width:'+wChange+'px;'
                }
                if(wallSizeWH == 2){
                    if(obj.offsetWidth < 6){
                        wChange = 6;
                    }
                    if(obj.offsetHeight < 20){
                        hChange = 20;
                    }
                    obj.style.cssText += ';height:'+hChange+'px;';
                }
            }
            function moveIng(ev) {
                var ev = ev || event;
                try{
                    obj.style.left = ev.changedTouches[0].clientX - disX + 'px';
                    obj.style.top = ev.changedTouches[0].clientY - disY + 'px';
                }catch(e){
                    obj.style.left = ev.clientX - disX + 'px';
                    obj.style.top = ev.clientY - disY + 'px';
                }
                //拖拽完之后重新获取墙坐标
                // ratioWall(aCreateWall);
            }
            function moveEnd() {
                if(swithDrag){
                    document.removeEventListener(ev2,moveIng);
                }else{
                    document.removeEventListener(ev2,dragSize);
                    swithDrag = true;
                }
                document.removeEventListener(ev3,moveEnd);
                obj.style.zIndex = 1;

                //拖拽完之后重新获取桌台坐标
                ratio(aDiningTableItem);

                //拖拽完之后重新获取墙的宽高，left、top值
                ratioWallAll(aCreateWall);

                //释放全局捕获 releaseCapture();
                if ( obj.releaseCapture ) {
                    obj.releaseCapture();
                }
            }
            return false;
        })
    }
}














