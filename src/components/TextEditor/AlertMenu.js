// 引入 wangEditor
import WangEditor from 'wangeditor'
const { $, DropListMenu } = WangEditor

// 第一，菜单 class ，Button 菜单继承 BtnMenu class
class AlertMenu extends DropListMenu {
    constructor (editor) {
      // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
        const $elem = $(
          '<div class="w-e-menu" data-title="首行缩进"><i class="el-icon-s-unfold"></i></div>'
        )
        // droplist 配置
        const dropListConf = {
            width: 100,
            title: '首行缩进',
            type: 'list',
            list: [
                { $elem: $('<p><i class="el-icon-s-unfold w-e-drop-list-item"></i>增加缩进</p>'), value: '2em' },
                { $elem: $('<p><i class="el-icon-s-fold w-e-drop-list-item"></i>减少缩进</p>'), value: '' }
            ],
            // droplist 每个 item 的点击事件
            clickHandler: (value) => {
                // value 参数即 dropListConf.list 中配置的 value
                this.command(value)
            }
        }
        super($elem, editor, dropListConf)
    }

    command (value) {
        // 设置标题
        // 判断是否有子元素 有一个官方提供的结束节点不准确的Bug
        if (this.editor.selection.getSelectionContainerElem().elems[0].children.length > 0) {
          // 无格式文本父元素是p，要把第一行单独拿出来缩进
          let fir = 0
          // 判断是否进入选区
          var start = false
          // 提前算出<br>标签的个数
          let isAllBr = 0
          // 判断是否全部是<br> 即无格式文本
          let isVali = false
          // 提前算出<br>标签的个数
          for (let e of this.editor.selection.getSelectionContainerElem().elems[0].children) {
            if (e.tagName === 'BR') {
              isAllBr++
            }
          }
          // 如果选区内子元素的个数与<br>元素个数相同即可判断为无格式文本
          if (isAllBr === this.editor.selection.getSelectionContainerElem().elems[0].children.length) isVali = true
          // 对无格式文本进行缩进处理
          if (isVali) {
            for (let e of this.editor.selection.getSelectionContainerElem().elems[0].children) {
              if (e.tagName === "BR") {
                if (value === '2em') {
                  fir += 1
                  if (fir === 1) {
                    this.editor.selection.getSelectionContainerElem().elems[0].style.textIndent = value
                  }
                  // 先把<br>换成span元素并增加缩进 再在span元素前再加上<br> indentP是因为原来用的是P元素
                  const indentP = document.createElement("span")
                  indentP.style.display = "inline-block"
                  indentP.style.width = value
                  indentP.className = 'indentP'
                  const theBr = document.createElement("br")
                  this.editor.selection.getSelectionContainerElem().elems[0].replaceChild(indentP, e)
                  this.editor.selection.getSelectionContainerElem().elems[0].insertBefore(theBr, indentP)
                }
              }
            }
          } else {
            let elseIndex = 0
            // 正常文本 以及无格式文本取消缩进逻辑
            for (let e of this.editor.selection.getSelectionContainerElem().elems[0].children) {
              // 如果是无格式文本
              if (e.className === "indentP") {
                elseIndex++
                if (elseIndex === 1) {
                  this.editor.selection.getSelectionContainerElem().elems[0].style.textIndent = value
                }
                this.editor.selection.getSelectionContainerElem().elems[0].removeChild(e)
                continue
              }
              // 如果是普通文本 选区的开始节点
              if (e === this.editor.selection.getSelectionStartElem().elems[0]) {
                start = true
              }
              // 如果已是选中节点，则开始进行缩进
              if (start) {
                e.style.textIndent = value
              }
              // 选区的结束节点 跳出循环
              if (e === this.editor.selection.getSelectionEndElem().elems[0]) {
                break
              }
            }
          }
        } else {
          this.editor.selection.getSelectionContainerElem().elems[0].style.textIndent = value
        }
    }

    // 删除这段代码会报错
    tryChangeActive () {
        // const reg = /^h/i
        // const cmdValue = this.editor.cmd.queryCommandValue('indent')
        // if (reg.test(cmdValue)) {
        //     // 选区处于标题内，激活菜单
        //     this.active()
        // } else {
        //     // 否则，取消激活
        //     this.unActive()
        // }
        // this.active()
    }
}
export default AlertMenu


