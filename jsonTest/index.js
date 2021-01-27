    let data =new Object(), object = new Object();
var i=0, prop="";
     function readFile() {
document.getElementById('button').style.display="none";
           var selectedFile = document.getElementById('inputFile').files[0];
           var reader = new FileReader
           reader.readAsText(selectedFile,"utf-8");

  reader.onload = function() {
    var FileContent=reader.result;

    data = JSON.parse(FileContent);
     let container = document.getElementById('container');
    createTree(container, data);
  };}
    function createTree(container, obj) {
      console.log('createTree');
      document.getElementById('container').innerHTML = "";
        document.getElementById('root').style.display="none";
      document.getElementById('but').style.display="none";
    document.getElementById('inputText').style.display="none";
      if(isEmpty()){
        console.log('null');
        document.getElementById('button').style.display="block";
      }
      else{
        console.log('else');
        document.getElementById('root').style.display="block";
      container.append(createTreeDom(obj));
 }
    }

function newTree(){
console.log('tree');
if(document.getElementById('inputText').value=="")
     alert('Пустое значение');
    else
{
  if(prop=='root'){
    console.log('prop=root');
  data[document.getElementById('inputText').value]="";}
  else{
        console.log('prop'+prop);
        console.log(data);
    if(data.hasOwnProperty(prop)){
      if(typeof data[prop]=='object')
        data[prop][document.getElementById('inputText').value]="";
        else{
          let obj = new Object();
      obj[document.getElementById('inputText').value]="";
      data[prop]=obj;
}
}
else
{
    var map = new Map(Object.entries(data));
    for (var [key, value] of map) {
      console.log(map.get(key));
      console.log(map.get(key).hasOwnProperty(prop));
      if(map.get(key).hasOwnProperty(prop))  {
        if(typeof data[key][prop]=='object')
        data[key][prop][document.getElementById('inputText').value]="";
        else{
let obj = new Object();
      obj[document.getElementById('inputText').value]="";
              data[key][prop]=obj;}
    }
  }
}
  }
document.getElementById('but').style.display="none";
    document.getElementById('inputText').style.display="none";
    console.log(data);

createTree(container,data);}
}
function create(){
  console.log('create');
  document.getElementById('inputText').value="";
  document.getElementById('button').style.display="none";
  document.getElementById('but').style.display="block";
    document.getElementById('inputText').style.display="block";

}

function deleteProp(){
console.log('delete');
console.log(prop);
if(data.hasOwnProperty(prop))
delete data[prop];
else
{
    var map = new Map(Object.entries(data));
    for (var [key, value] of map) {
      console.log(map.get(key));
      console.log(map.get(key).hasOwnProperty(prop));
      if(map.get(key).hasOwnProperty(prop)) delete data[key][prop];
      else{
            var map1 = new Map(Object.entries(map.get(key)));
    for (var [key1, value1] of map1) {
      console.log(map1.get(key1));
      console.log(map1.get(key1).hasOwnProperty(prop));
      if(map1.get(key1).hasOwnProperty(prop)) delete data[key][key1][prop];
      }
    }
}
}
console.log(data);
createTree(container,data);
}

    function createTreeDom(obj) {
      // если нет дочерних элементов, то вызов возвращает undefined
      // и элемент <ul> не будет создан
      if (!Object.keys(obj).length) return;

      let ul = document.createElement('ul');

      for (let key in obj) {
        let li = document.createElement('li');
        li.innerHTML = key;

let but1 =document.createElement('button');
        but1.innerHTML="-";
        but1.id='but'+i;
        but1.style.margin="0 10px 0 10px";
but1.addEventListener("click", function(){prop=key;});
        but1.addEventListener("click", deleteProp);
        i=i+1;
li.append(but1);


let but2 =document.createElement('button');
        but2.innerHTML="+";
         but2.id='but'+i;
but2.addEventListener("click", function(){prop=key;console.log(prop);});
        but2.addEventListener("click", create);

li.append(but2);
        let childrenUl = createTreeDom(obj[key]);
        if (childrenUl) {
          li.append(childrenUl);
        }

        ul.append(li);
          
      }
      return ul;
    }
    function isEmpty(){
  for (var i in data) {
        if (data.hasOwnProperty(i)) {
           return false;
        }
    }
    return true;
    }
function save(){
  console.log(data);
  
  if(!isEmpty()){
    // написать запись в файл
    var mime_type = "text/json";

        var blob = new Blob([JSON.stringify(data)], {type: mime_type});

        var dlink = document.createElement('a');
        dlink.download = "newJson.json";
        dlink.href = window.URL.createObjectURL(blob);
        dlink.onclick = function(e) {
            // revokeObjectURL needs a delay to work properly
            var that = this;
            setTimeout(function() {
                window.URL.revokeObjectURL(that.href);
            }, 1500);
        };

        dlink.click();
        dlink.remove();
}
else
  alert('Дерево отсутствует!');
}
   
