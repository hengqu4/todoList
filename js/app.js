// 全局变量
let itemList = [];
let itemListStorage = [];
let isCompleteAll = false;
let itemShowList = [];
let isShowComplete = true;
let isShowActive = true;
let showCount = 0;
let editingItem = null;

function $(id) {
    return document.getElementById(id);
}

// item重加载
function reload() {
  itemShowList = [];
  showCount = 0;
  for (let item of itemList) {
    if(isShowComplete == true && item.isCompleted == true){
      itemShowList.push(item);
      showCount +=1;
    }
    if(isShowActive == true && item.isCompleted == false){
      itemShowList.push(item);
      showCount +=1;
    }
  }
  // 排序
  itemShowList.sort(function(a, b){
    let a_y = parseInt(a.date.substring(0, 4));
    let a_m = parseInt(a.date.substring(5, 7));
    let a_d = parseInt(a.date.substring(8, 10));
    let b_y = parseInt(b.date.substring(0, 4));
    let b_m = parseInt(b.date.substring(5, 7));
    let b_d = parseInt(b.date.substring(8, 10));
    let a_com = a.isCompleted;
    let b_com = b.isCompleted;
    if(a_com == b_com) {
      // return a_cre - b_cre;
      if(a_y < b_y) {
        return -1;
      } else if(a_y == b_y && a_m < b_m) {
        return -1;
      } else if(a_y == b_y && a_m == b_m && a_d < b_d) {
        return -1;
      }
      if(a_y == b_y  && a_m == b_m && a_d == b_d) {
        return 0;
      }
    }
    else if(a_com == false) return -1;
    else return 1;
  });

  $('item-container').innerHTML='';
  for (let item of itemShowList) {
    let itemDiv = document.createElement("div");
    itemDiv.item = item;
    itemDiv.className = "item";

    let completeDiv = document.createElement("div");
    completeDiv.className = "item-complete";
    completeDiv.innerHTML = "√"
    completeDiv.onclick = () => {
      completeItem(item)
    };
    itemDiv.appendChild(completeDiv)

    let nameDiv = document.createElement("div");
    nameDiv.className = "item-name";
    nameDiv.innerHTML = item.name
    
    nameDiv.onclick = () => { 
      editItem(item);
    };
    itemDiv.appendChild(nameDiv);

    let dateDiv = document.createElement("div");
    dateDiv.className = "item-date";
    dateDiv.innerHTML = item.date;
    if(judgeTimeout(item.date) == true){
      item.isTimeout = true;
      dateDiv.className += ' '+'timeout';
    }
    dateDiv.onclick = () => { 
      editItem(item);
    };
    itemDiv.appendChild(dateDiv);

    let deleteDiv = document.createElement("div");
    deleteDiv.className = "item-delete";
    deleteDiv.innerHTML = "×"
    
    deleteDiv.onclick = () => { 
      deleteItem(item);
    };
    itemDiv.appendChild(deleteDiv);

    if(item.isCompleted) {
      itemDiv.className += ' '+'completed';
      completeDiv.className += ' '+'completed';
      nameDiv.className += ' '+'line';
      dateDiv.className += ' '+'line';
    }
    $('item-container').appendChild(itemDiv);
  }

  $('item-count').innerHTML= showCount + ' item left';
  isCompleteAll = judgeCompleteAll();
  if(isCompleteAll == true){
    $('complete-all-button').color='rgb(231, 225, 225)';
  }else{
    $('complete-all-button').color='rgb(100, 99, 99)';
  }
  
  itemListStorage = [];
  for(let item of itemList) {
    let itemString = JSON.stringify(item);
    itemListStorage.push(itemString);
  }
  localStorage.setItem("TodoList", JSON.stringify(itemListStorage));
}

window.onload = function() {
  // 读取当前的itemList
  itemListStorage = JSON.parse(localStorage.getItem("TodoList"));
  if(itemListStorage) {
    for(let item of itemListStorage) {
      let itemObj = JSON.parse(item);
      itemList.push(itemObj);
    }
  }
  reload();
  // 绑定事件
  
  $('form-submit').onclick = submitForm;
  $('form-cancel').onclick = cancelForm;
  $('complete-all-button').onclick = completeAllItem;
  $('clear-button').onclick = clearItem;
  $('broom-button').onclick = broomItem;
  $('add-button').onclick = addItem;
  $('show-all-button').onclick = showAll;
  $('show-complete-button').onclick = showComplete;
  $('show-active-button').onclick = showActive;
  $('style-1').onclick = styleCheck1;
  $('style-2').onclick = styleCheck2;
  $('style-3').onclick = styleCheck3;
};
// 背景风格
function styleCheck1(){
  var root = document.querySelector(':root');
  root.setAttribute('style', '--color: #ced6e0');
}
function styleCheck2(){
  var root = document.querySelector(':root');
  root.setAttribute('style', '--color: #ea8685');
}
function styleCheck3(){
  var root = document.querySelector(':root');
  root.setAttribute('style', '--color: #48dbfb');
}
// 过滤效果
function showAll(){
  isShowComplete = true;
  isShowActive = true;
  reload();
}
function showComplete(){
  isShowComplete = true;
  isShowActive = false;
  reload();
}
function showActive(){
  isShowComplete = false;
  isShowActive = true;
  reload();
}
function judgeTimeout(date){
  let flag = false;
  let now = new Date();
  let now_y = now.getFullYear();
  let now_m = now.getMonth()+1;
  let now_d = now.getDate();
  
  let y = parseInt(date.substring(0, 4));
  let m = parseInt(date.substring(5, 7));
  let d = parseInt(date.substring(8, 10));
  if(now_y > y) {
    flag = true;
  } else if(now_y == y && now_m > m) {
    flag = true;
  } else if(now_y == y && now_m == m && now_d > d) {
    flag = true;
  }
  return flag;
}
function judgeCompleteAll(){
  let flag = true;
  for (let item of itemList) {
    if(item.isCompleted == false){
      flag = false;
    }
  }
  return flag;
}
function completeAllItem(){
  if(isCompleteAll == true){
    for (let item of itemList) {
      item.isCompleted = false;
    }
  }else{
    for (let item of itemList) {
      item.isCompleted = true;
    }
  }
  reload();
}
function clearItem(){
  itemList = [];
  reload();
}
function broomItem(){
  let tmpList = []
  for (let item of itemList) {
    if(item.isCompleted == false){
      tmpList.push(item)
    }
  }
  itemList = tmpList;
  reload();

}
// 完成单条todo Item
function completeItem(item){
  item.isCompleted = !item.isCompleted;
  reload();
}

// 编辑todo Item
function editItem(item){
  $("form-div").classList.remove("hidden");
  $('form-operation').innerHTML = 'Edit Item'
  $('name-input').value = item.name;
  $('date-input').value = item.date;
  $("name-input").focus();
  editingItem = item;
}

// 删除todo Item
function deleteItem(item){
  let index = itemList.indexOf(item);
  itemList.splice(index, 1);
  reload();
}

// 打开表单
function addItem(){
  $("add-button").classList.add("clicked");
  $("form-div").classList.remove("hidden");
  $('form-operation').innerHTML = 'Add Item';
  $('name-input').value = '';
  $("name-input").focus();
}

// 提交表单 submit form
function submitForm(){
  let name = $('name-input').value;
  let date = $('date-input').value;
  if(date == '' || date == '') {
    alert('请输入待办事项的名称、截止日期！');
  } else {
    if($('form-operation').innerHTML == 'Add Item'){
      let item = new Item(name, date);
      itemList.push(item);
    }
    else{
      editingItem.date = date;
    }
    reload();
  }
  $("form-div").classList.add("hidden");
}

// 关闭表单
function cancelForm(){
  $("form-div").classList.add("hidden");
}
