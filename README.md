# todoList

![image-20210626094808144](README.assets/image-20210626094808144.png)

部署地址：https://hengqu4.github.io/todoList/



## Item列表

### 增加Item

点击按钮Add new Item

![image-20210626101252086](README.assets/image-20210626101252086.png)

输入Item的名称和截止日期，点击确定按钮

![image-20210626101228192](README.assets/image-20210626101228192.png)

![image-20210626101237328](README.assets/image-20210626101237328.png)



### 删除Item

点击item右侧的`x`

![image-20210626101200704](README.assets/image-20210626101200704.png)

![image-20210626101212841](README.assets/image-20210626101212841.png)

### 编辑Item

点击item的名称或者截止日期进行修改，即白色区域

![image-20210626101147026](README.assets/image-20210626101147026.png)

### 完成Item

点击item左侧的蓝色小方块

![image-20210626101133602](README.assets/image-20210626101133602.png)

![image-20210626101122856](README.assets/image-20210626101122856.png)

## Item整体操作

### 全部完成

点击顶部操作栏的第一个icon

![image-20210626101343409](README.assets/image-20210626101343409.png)

可以看到所有item呈现完成状态

![image-20210626101410657](README.assets/image-20210626101410657.png)

### 全部取消

再次点击顶部操作栏的第一个icon

![image-20210626101440741](README.assets/image-20210626101440741.png)

将会全部取消

![image-20210626101455702](README.assets/image-20210626101455702.png)

通过js代码判断

```javascript
function judgeCompleteAll(){
  let flag = true;
  for (let item of itemList) {
    if(item.isCompleted == false){
      flag = false;
    }
  }
  return flag;
}
```

如果item没有全部完成，按钮将表现为全部勾选完成；

如果item已经全部完成，按钮将表现为全部取消。

### 清空列表

点击顶部操作栏第二个按钮

![image-20210626102040283](README.assets/image-20210626102040283.png)

将会清空item列表

![image-20210626102048220](README.assets/image-20210626102048220.png)



### 删除已完成

点击顶部操作栏第三个按钮

![image-20210626101856129](README.assets/image-20210626101856129.png)

将会删除已完成的item，在本样例中为2和4

![image-20210626101931018](README.assets/image-20210626101931018.png)

## Item过滤

### All

点击底部栏左侧的第一个按钮，将会显示所有Item，包括已经完成的和正在进行的。

在本例中为1、2、3、4、5。

<img src="README.assets/image-20210626102336588.png" alt="image-20210626102336588" style="zoom:67%;" />

### Completed

点击底部栏左侧的第二个按钮，将会显示所有已经完成的Item。

在本例中为3、4。

<img src="README.assets/image-20210626102433364.png" alt="image-20210626102433364" style="zoom:67%;" />![image-20210626102448962](README.assets/image-20210626102448962.png)

### Active

点击底部栏左侧的第三个按钮，将会显示所有进行中的Item。

在本例中为1、2、5。

<img src="README.assets/image-20210626102511459.png" alt="image-20210626102511459" style="zoom:67%;" />

## Item 排序

### 时间排序

从前文的图片可以看出，程序对item的时间进行了排序。

这更贴近使用者的真实心理情况，即通常情况下更倾向于去做截止日期更前的待办事项。

![image-20210626103012626](README.assets/image-20210626103012626.png)

### 事项排序

同时，使用者更关注于未完成的事项。

如果一个item事项已经被完成，这时将会把它的顺序移到列表后方。

程序的综合排序风格结合了 `时间` 和 `是否完成`  两者进行排序。

在本样例中，事项1和4的时间虽然较前，但是已经完成，所以将被放置到末尾。

![image-20210626103422402](README.assets/image-20210626103422402.png)

## Item风格

### 超时Item

当已经超出事项的截止日期，而该事项仍未被完成，此时需要强调该超时事项item。

程序使用加红日期，以达到强调的效果。

在本样例中，当前时间2021-06-25，均超出事项0和事项3的截止日期。

![image-20210626103913513](README.assets/image-20210626103913513.png)

### 主题风格

在顶部操作栏右上角有3个颜色方框，分别表示了3种不同的主题风格。

初始默认灰色风格。

![image-20210626104120480](README.assets/image-20210626104120480.png)

点击蓝色主题，页面将切换为蓝色主调。

![image-20210626104146604](README.assets/image-20210626104146604.png)

