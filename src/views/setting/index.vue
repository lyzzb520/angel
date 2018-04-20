<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <el-collapse>
      <el-collapse-item name="1">
        <template slot="title">
          <i class="el-icon-menu"></i> 修改密码
        </template>
        <el-form :inline="true" size="mini" :model="resetPwdForm" :rules="rules" ref="resetPwdForm" label-width="100px" class="demo-resetPwdForm">
          <el-form-item label="旧密码" prop="oldpwd">
            <el-input v-model="resetPwdForm.oldpwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpwd">
            <el-input v-model="resetPwdForm.newpwd"></el-input>
          </el-form-item>
          <el-form-item label="重复新密码" prop="renewpwd">
            <el-input v-model="resetPwdForm.renewpwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('resetPwdForm')">修改</el-button>
            <el-button @click="resetForm('resetPwdForm')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <i class="el-icon-menu"></i> 其他设置
        </template>
        <el-form size="mini" :inline="false" label-position="right" :model="settingForm" :rules="rules2" ref="settingForm" label-width="250px"
          class="demo-settingForm">
          <el-form-item  prop="a2_play_domain">
            <template slot="label">
              A2视频播放地址
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A2视频播放地址">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a2_play_domain"></el-input>
          </el-form-item>

          <el-form-item  prop="a2_m3u8_name">
            <template slot="label">
              A2视频M3U8文件名
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A2视频M3U8文件名">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a2_m3u8_name"></el-input>
          </el-form-item>

          <el-form-item prop="a2_pic_domain">
            <template slot="label">
              A2视频截图访问地址
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A2视频截图访问地址">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a2_pic_domain"></el-input>
          </el-form-item>

          <el-form-item prop="a2_pic_name">
            <template slot="label">
              A2视频截图文件名
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A2视频截图文件名">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a2_pic_name"></el-input>
          </el-form-item>

          <el-form-item prop="a2_gettask">
            <template slot="label">
              A2获取全部视频记录的地址
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A2获取全部视频记录的地址">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a2_gettask"></el-input>
          </el-form-item>

          <el-form-item prop="a2_gettaskbyid">
            <template slot="label">
              A2获取单个视频记录的地址
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A2获取单个视频记录的地址">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a2_gettaskbyid"></el-input>
          </el-form-item>

          <el-form-item prop="a2_remove">
            <template slot="label">
              A2删除全部视频记录的地址
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A2删除全部视频记录的地址">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a2_remove"></el-input>
          </el-form-item>

          <el-form-item prop="a2_removebyid">
            <template slot="label">
              A2删除单个视频记录的地址
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A2删除单个视频记录的地址">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a2_removebyid"></el-input>
          </el-form-item>

          <hr>

          <el-form-item prop="pub_video">
            <template slot="label">
              视频发布间隔时间（小时）
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="视频发布间隔时间（小时）">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.pub_video"></el-input>
          </el-form-item>
          <el-form-item prop="pub_book">
            <template slot="label">
              文学发布间隔时间（小时）
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="文学发布间隔时间（小时）">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.pub_book"></el-input>
          </el-form-item>
          <el-form-item prop="pub_pic">
            <template slot="label">
              图库发布间隔时间（小时）
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="图库发布间隔时间（小时）">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.pub_pic"></el-input>
          </el-form-item>

          <hr>

          <el-form-item prop="a2_apikey">
            <template slot="label">
              A1请求A2的接口密钥
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A1请求A2的接口密钥">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a2_apikey"></el-input>
          </el-form-item>
          <el-form-item prop="apikey4a2">
            <template slot="label">
              A2请求A1的接口密钥
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A2请求A1的接口密钥">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.apikey4a2"></el-input>
          </el-form-item>
          <el-form-item prop="apikey4c">
            <template slot="label">
              C端请求A1的接口密钥
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="C端请求A1的接口密钥">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.apikey4c"></el-input>
          </el-form-item>

          <hr>

          <el-form-item prop="a1_book_domain">
            <template slot="label">
              A1文学访问地址
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A1文学访问地址">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a1_book_domain"></el-input>
          </el-form-item>
          <el-form-item prop="a1_pic_domain">
            <template slot="label">
              A1图库访问地址
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A1图库访问地址">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a1_pic_domain"></el-input>
          </el-form-item>
          <el-form-item prop="a1_admin_domain">
            <template slot="label">
              A1后台访问地址
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A1后台访问地址">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a1_admin_domain"></el-input>
          </el-form-item>
          <el-form-item label="A1后台入口映射：" prop="a1_path_manager">
            <template slot="label">
              A1后台访问路径
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A1后台入口映射：">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a1_path_manager"></el-input>
          </el-form-item>
          <el-form-item prop="a1_path_upload">
            <template slot="label">
              A1文学与图库资源访问路径
              <el-popover ref="popover-url-online" placement="top-start" title="温馨提示" trigger="hover" content="A1文学与图库资源访问路径">
              </el-popover>
              <i class="el-icon-question icon-zhb" v-popover:popover-url-online></i>
            </template>
            <el-input v-model="settingForm.a1_path_upload"></el-input>
          </el-form-item>
          <el-form-item label="操作">
            <!-- <el-button type="primary" @click="querySettingForm">读取</el-button> -->
            <el-button type="primary" @click="submitSettingForm('settingForm')">修改</el-button>
            <!-- <el-button @click="resetForm('settingForm')">清空</el-button> -->
          </el-form-item>
        </el-form>
      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  import {
    resetpwd, updateSetting, getSetting
  } from '@/api/setting'
  export default {
    name: 'dashboard',
    // computed: {
    //   ...mapGetters([
    //     'name',
    //     'roles'
    //   ])
    // }
    data() {
      const pwdValidator = (rule, value, callback) => {
        value = value || ''
        if (value.length < 6 || value.length > 12) {
          callback(new Error('只能是6~12位字符'))
        } else {
          callback()
        }
      }
      const validator_reg_str = (rule, value, callback) => {
        value = value || ''
        if (!/^[a-zA-Z_\-0-9]+$/.test(value)) {
          callback(new Error('只能包含大小写字母和_'))
        } else {
          callback()
        }
      }
  
      const validator_reg_link = (rule, value, callback) => {
        value = value || ''
        if (!/^(http|https):\/\/[\s\S]*$/.test(value)) {
          callback(new Error('必须是有效的链接'))
        } else {
          callback()
        }
      }
      const validator_reg_domain = (rule, value, callback) => {
        value = value || ''
        if (!/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(value)) {
          callback(new Error('必须是有效的域名'))
        } else {
          callback()
        }
      }
      const validator_reg_int = (rule, value, callback) => {
        value = value || ''
        if (!/^\d+$/.test(value)) {
          callback(new Error('只能输入整数'))
        } else {
          callback()
        }
      }
      return {
        resetPwdForm: {
          oldpwd: '',
          newpwd: '',
          renewpwd: ''
        },
        settingForm: {
          a2_apikey: '',
          a2_gettask: '',
          a2_gettaskbyid: '',
          a2_remove: '',
          a2_removebyid: '',
          a2_play_domain: '',
          a2_pic_domain: '',
          a2_m3u8_name: '',
          a2_pic_name: '',
          apikey4a2: '',
          apikey4c: '',
          a1_book_domain: '',
          a1_pic_domain: '',
          a1_admin_domain: '',
          a1_path_manager: '',
          a1_path_upload: ''
        },
        rules2: {
          a2_apikey: {
            validator: validator_reg_str
          },
          a2_gettask: {
            validator: validator_reg_link
          },
          a2_gettaskbyid: {
            validator: validator_reg_link
          },
          a2_remove: {
            validator: validator_reg_link
          },
          a2_removebyid: {
            validator: validator_reg_link
          },
          a2_play_domain: {
            validator: validator_reg_link
          },
          a2_pic_domain: {
            validator: validator_reg_link
          },
          a2_m3u8_name: {
            required: true, message: '不能为空'
          },
          a2_pic_name: {
            required: true, message: '不能为空'
          },
          apikey4a2: {
            validator: validator_reg_str
          },
          apikey4c: {
            validator: validator_reg_str
          },
          a1_book_domain: {
            validator: validator_reg_link
          },
          a1_pic_domain: {
            validator: validator_reg_link
          },
          a1_admin_domain: {
            validator: validator_reg_domain
          },
          a1_path_manager: {
            validator: validator_reg_str
          },
          a1_path_upload: {
            validator: validator_reg_str
          },
          pub_video: {
            validator: validator_reg_int
          },
          pub_book: {
            validator: validator_reg_int
          },
          pub_pic: {
            validator: validator_reg_int
          }
        },
        rules: {
          oldpwd: {
            validator: pwdValidator
          },
          newpwd: {
            validator: pwdValidator
          },
          renewpwd: {
            validator: pwdValidator
          }
        }
      }
    },
    created() {
      this.querySettingForm()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          }
          if (this.resetPwdForm.newpwd !== this.resetPwdForm.renewpwd) {
            this.$message.error('两次密码不一致，请重新输入')
            return false
          }
          resetpwd(this.resetPwdForm).then(response => {
            this.$alert('新密码为：' + this.resetPwdForm.newpwd + '，请点击重新登录重新验证！', '温馨提示', {
              confirmButtonText: '重新登录',
              type: 'warning',
              callback: action => {
                this.$store.dispatch('LogOut').then(() => {
                  location.reload() // 为了重新实例化vue-router对象 避免bug
                })
              }
            })
          })
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      submitSettingForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          }
  
          updateSetting(this.settingForm).then(response => {
            this.$alert('修改成功！', '温馨提示', {
              type: 'success'
            })
          })
        })
      },
      querySettingForm() {
        getSetting().then(response => {
          this.settingForm = response.data
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" >
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .el-collapse-item__content {
    background: #f3f3f3;
    padding: 15px;
  }

  .el-form--label-top .el-form-item__label {
    padding: 0px;
  }
  .icon-zhb {
    color: #b7b2b2;
    cursor: pointer;
  }
</style>
