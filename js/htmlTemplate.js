/*-----------------------------------右键菜单结构-----------------------------------------*/
function rightMenuHtml(data,pid){
    var childs = dataControl.getChildById(data,pid);
    var html = "<ul>";
    childs.forEach(function(item){
        var hasChild = dataControl.hasChilds(data,item.id);
        var hasType = item.type ? item.type : false;
        var classNames = hasChild ? "" : "NoMoreIcon";
        html += `
            <li class="right_menuList ${classNames}" data-type="${hasType}">
                <h5 class="">${item.title}<span class=""></span></h5>
                ${rightMenuHtml(data,item.id)}
            </li>
        `;
    })
    html += '</ul>';
    return html;
}

/*-----------------------------------添加桌台-----------------------------------------*/
function voidDiningTableHTML(){
    var html = `
        <p class="tableNumVoid">001</p>
        <p class="tableForNumVoid">四人桌</p>
    `
    return html;
}

// function  DiningTableIngHTML(){  //
//     var html = `
//         <p class="tableNumIng">001</p>
//         <p class="tableForNumIng">四人桌</p>
//         <p class="moneyIng">$125</p>
//         <p class="timeIng">10:10</p>
//     `
//     return html;
// }






















