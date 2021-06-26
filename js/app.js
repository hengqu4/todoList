// 表单
let itemList = [];
let itemListStorage = [];
// 是否全部完成
let isCompleteAll = false;
// 展示表单
let itemShowList = [];
// 是否展示已完成的item
let isShowComplete = true;
// 是否展示进行中的item
let isShowActive = true;
// 展示的item数量
let showCount = 0;
// 当前编辑的item
let editingItem = null;
let searchWords = '';

function $(id) {
  return document.getElementById(id);
}

// item重加载
function reload() {
  itemShowList = [];
  showCount = 0;
  let tmpList = [];
  // 搜索
  if(searchWords.length>0){
    for (let item of itemList) {
      if(item.name.search(searchWords)!=-1){
        tmpList.push(item);
      }
    }
  }else{tmpList = itemList}
  
  // 计算count
  for (let item of tmpList) {
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
  $('search-button').onclick = searchItem;
  $('style-1').onclick = styleCheck1;
  $('style-2').onclick = styleCheck2;
  $('style-3').onclick = styleCheck3;
};
// 搜索栏
function searchItem(){
  searchWords = $('search-input').value;
  reload();
}

// 背景风格
function styleCheck1(){
  var root = document.querySelector(':root');
  root.setAttribute('style', '--color: #7f8c8d');
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
// 判断item是否超时
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

// 判断item是否全部完成
function judgeCompleteAll(){
  let flag = true;
  for (let item of itemList) {
    if(item.isCompleted == false){
      flag = false;
    }
  }
  return flag;
}
// item全部完成
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

// item全部删除
function clearItem(){
  itemList = [];
  reload();
}

// item删除已完成
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

// 打开item表单
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
