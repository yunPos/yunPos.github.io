// /*-----------------------------------添加addClass-----------------------------------------*/
// function addClass(obj,className){
//     if(className == ''){
//         obj.className = className;
//     }else{
//         var classArr = obj.className.split(' ');
//         for(var i=0; i<classArr; i++){
//             if(classArr[i] == obj.className){
//                 return;
//             }
//         }
//         obj.className += ' '+className;
//     }
// }
//
// /*-----------------------------------移除removeClass-----------------------------------------*/
// function removeClass(obj,className){
//     if(obj.className != ''){
//         var classArr = obj.className.split(' ');
//         for(var i=0; i<classArr.length; i++){
//             if(classArr[i] == className){
//                 classArr.splice(i,1);
//             }
//         }
//         obj.className = classArr.join('');
//     }
// }
/*-----------------------------------判断是否有某个类Class-----------------------------------------*/
function isClassName(obj,className){
    if(obj.className != ''){
        var classNameS = obj.className.split(' ');
        for(var i=0; i<classNameS.length; i++){
            if(classNameS[i] == className) return true;
        }
    }
}




