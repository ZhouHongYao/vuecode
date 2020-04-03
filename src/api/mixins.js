/**
 * @author zhy 2018-07-12
 * @description mixins混入分发
 */
import {
  read
} from "@/api/index";
var i = null;
//教师验证
export const checkTeacher = {
  methods: {
    async changeTeacher(name, type) {
      return new Promise((resolve, reject) => {
        let url = '/admin-api/t-check/';
        if (type && type == 2) {
          url = '/admin-api/t-has/';
        }
        read(url + name).then(rs => {
          var data = rs;
          if (rs.length == 1) {
            return resolve(rs[0])
          } else if (rs.length > 1) {
            let hrl = '<div class="padding-top-20">';
            rs.forEach(item => {
              hrl = hrl + '<label class="el-radio"><input type="radio" name="singleDoorCt" value="' + item.id + '" class="el-radio__input"/>' + item.name + '(' + item.account + ')' + '</label>'
            });
            hrl = hrl + '</div>';
            this.$alert(hrl, {
              dangerouslyUseHTMLString: true,
              title: "确认教师工号",
              confirmButtonText: '确定'
            }).then((rs) => {
              let flag = false;
              var radio = document.getElementsByName("singleDoorCt");
              radio.forEach(item => {
                if (item.checked) {
                  let value = item.value;
                  let arr = data.find(it => {
                    return it.id == value
                  })
                  flag = true
                  return resolve(arr)
                }
              });
              if (!flag) {
                this.$message({
                  message: "请选择工号！",
                  type: "error"
                });
              }
            }).catch(() => {
              return reject({
                'err': ''
              })
            });
          } else {
            return reject({
              'err': ''
            })
          }
        }).catch(() => {
          return reject({
            'err': ''
          })
        });
      })
    },
    //修复enter、blur重复调用
    m_change() {
      let n = new Date().getTime()
      if (i && (n - i) < 1000) {
        i = null
        return true
      } else {
        i = n;
      }
    },
    //通讯作者、工作负责人验证
    check(type) {
      if (this.m_change()) {
        return
      }
      if (!this.value.name || this.value.id) return
      this.changeTeacher(this.value.name, type).then(rs => {
        this.value.id = rs.id;
        this.value.account = rs.account;
      }).catch(() => {
        this.value.id = null;
      });
    },
    // 教师验证
    checkTeacher(name, type) {
      if (this.m_change()) {
        return
      }
      if (!name || this.form.uid) return
      this.changeTeacher(name, type).then(rs => {
        this.form.uid = rs.id;
      }).catch(() => {
        this.form.uid = null;
        if (type !== 2) {
          this.form.name = "";
        }
      });
    },
    //教师列表 验证教师工号(type=2不提示未匹配到)
    checks(name, index, type) {
      if (this.m_change()) {
        return
      }
      if (!name || this.value[index].uid) return
      let url = '/admin-api/t-check/';
      if (type && type == 2) {
        url = '/admin-api/t-has/';
      }
      read(url + name).then(rs => {
        var data = rs;
        if (rs.length == 1) {
          this.value[index].uid = rs[0].id
          this.value[index].account = rs[0].account
        } else if (rs.length > 1) {
          let hrl = '<div class="padding-top-20">';
          rs.forEach(item => {
            hrl = hrl + '<label class="el-radio"><input type="radio" name="DoorCt" value="' + item.id + '" class="el-radio__input"/>' + item.name + '(' + item.account + ')' + '</label>'
          });
          hrl = hrl + '</div>';
          this.$alert(hrl, {
            dangerouslyUseHTMLString: true,
            title: "确认教师工号",
            confirmButtonText: '确定'
          }).then((rs) => {
            let flag = false;
            var radio = document.getElementsByName("DoorCt");
            radio.forEach(item => {
              if (item.checked) {
                flag = true;
                let value = item.value;
                let arr = data.find(it => {
                  return it.id == value
                })
                this.value[index].uid = arr.id
                this.value[index].account = arr.account
              }
            });
            if (!flag) {
              this.$message({
                message: "请选择工号！",
                type: "error"
              });
            }
          }).catch(() => {});
        }
      }).catch(() => {});
    },
    //清除通讯作者/工作负责人
    clear() {
      this.value.id = null;
      this.value.account = null;
    },
    //清除教师
    clear_teaher() {
      this.form.uid = null;
      this.form.account = null;
    },
    //限制数字
    stint(val) {
      return val ? val.replace(/\D/g, "") : null
    }
  }
};

export const checkSelf = {
  methods: {
    // 判断教师填写input是否显示
    non_teacher() {
      if (this.$store.state.user.userinfo.group == 3) {
        return false
      } else {
        return true
      }
    },
    //替换回车符
    Trim(str) {
      return str.toString().replace(/\n|\r\n/g, "<br/>");
    },
    //过滤小数点后两位
    oninput(val) {
      return val ? val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') : null
    },
    /**
     * 判断是否是临时路径
     * @param {*} url
     */
    publicCheckTemp(url) {
      if (url.indexOf("temp") > -1) {
        return true
      } else {
        return false
      }
    },
    /**
     * 鉴权下载 下载链接设置
     * @param {*} file
     * @param {*} name
     */
    publicCheckUrl(file, name) {
      let API_ROOT = process.env.API_ROOT || 'http://a.ez-tech.cn/tjjt/new/api';
      window.open(API_ROOT + '/admin-api/download/' + this.$store.state.user.userinfo.token + '/' + file + '/' + name)
    }
  }
}
