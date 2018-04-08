<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <el-collapse>
      <el-collapse-item name="1">
        <template slot="title">
          <span class="svg-container"><svg-icon icon-class="pwd"></svg-icon></span> 密码设置123
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
      <el-collapse-item title="其他设置" name="2">
        <el-form size="mini" :inline="true" label-position="top" :model="settingForm" :rules="rules2" ref="settingForm" label-width="100px"
          class="demo-settingForm">
          <el-form-item label="访问A2的key：" prop="a2_apikey">
            <el-input v-model="settingForm.a2_apikey"></el-input>
          </el-form-item>
          <el-form-item label="查询全部视频记录：" prop="a2_gettask">
            <el-input v-model="settingForm.a2_gettask"></el-input>
          </el-form-item>
          <el-form-item label="查询指定视频记录：" prop="a2_gettaskbyid">
            <el-input v-model="settingForm.a2_gettaskbyid"></el-input>
          </el-form-item>
          <el-form-item label="删除全部记录和文件：" prop="a2_remove">
            <el-input v-model="settingForm.a2_remove"></el-input>
          </el-form-item>
          <el-form-item label="删除指定记录和文件：" prop="a2_removebyid">
            <el-input v-model="settingForm.a2_removebyid"></el-input>
          </el-form-item>
          <el-form-item label="视频播放的域名，来自云转码播放域名，同d4：" prop="a2_play_domain">
            <el-input v-model="settingForm.a2_play_domain"></el-input>
          </el-form-item>
          <el-form-item label="截图访问的域名，来自云转码图片域名，同d4：" prop="a2_pic_domain">
            <el-input v-model="settingForm.a2_pic_domain"></el-input>
          </el-form-item>
          <el-form-item label="默认播放列表文件名index.m3u8：" prop="a2_m3u8_name">
            <el-input v-model="settingForm.a2_m3u8_name"></el-input>
          </el-form-item>
          <el-form-item label="默认截图文件名1.jpg：" prop="a2_pic_name">
            <el-input v-model="settingForm.a2_pic_name"></el-input>
          </el-form-item>
          <el-form-item label="提供给A2访问的key：" prop="apikey4a2">
            <el-input v-model="settingForm.apikey4a2"></el-input>
          </el-form-item>
          <el-form-item label="提供给C端访问的key：" prop="apikey4c">
            <el-input v-model="settingForm.apikey4c"></el-input>
          </el-form-item>
          <el-form-item label="文学资源txt访问的域名，同d2：" prop="a1_book_domain">
            <el-input v-model="settingForm.a1_book_domain"></el-input>
          </el-form-item>
          <el-form-item label="图库资源访问的域名，同d2：" prop="a1_pic_domain">
            <el-input v-model="settingForm.a1_pic_domain"></el-input>
          </el-form-item>
          <el-form-item label="限制A1后台访问域名，同d1：" prop="a1_admin_domain">
            <el-input v-model="settingForm.a1_admin_domain"></el-input>
          </el-form-item>
          <el-form-item label="A1后台入口映射：" prop="a1_path_manager">
            <el-input v-model="settingForm.a1_path_manager"></el-input>
          </el-form-item>
          <el-form-item label="A1上传的静态资源映射：" prop="a1_path_upload">
            <el-input v-model="settingForm.a1_path_upload"></el-input>
          </el-form-item>
          <el-form-item label="操作">
            <el-button type="primary" @click="querySettingForm">读取</el-button>
            <el-button type="primary" @click="submitSettingForm('settingForm')">修改</el-button>
            <el-button @click="resetForm('settingForm')">清空</el-button>
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
            required: true,
            message: '请输入 a2_apikey',
            trigger: 'blur'
          },
          a2_gettask: {
            required: true,
            message: '请输入 a2_gettask',
            trigger: 'blur'
          },
          a2_gettaskbyid: {
            required: true,
            message: '请输入 a2_gettaskbyid',
            trigger: 'blur'
          },
          a2_remove: {
            required: true,
            message: '请输入 a2_remove',
            trigger: 'blur'
          },
          a2_removebyid: {
            required: true,
            message: '请输入 a2_removebyid',
            trigger: 'blur'
          },
          a2_play_domain: {
            required: true,
            message: '请输入 a2_play_domain',
            trigger: 'blur'
          },
          a2_pic_domain: {
            required: true,
            message: '请输入 a2_pic_domain',
            trigger: 'blur'
          },
          a2_m3u8_name: {
            required: true,
            message: '请输入 a2_m3u8_name',
            trigger: 'blur'
          },
          a2_pic_name: {
            required: true,
            message: '请输入 apia2_pic_namekey',
            trigger: 'blur'
          },
          apikey4a2: {
            required: true,
            message: '请输入 apikey4a2',
            trigger: 'blur'
          },
          apikey4c: {
            required: true,
            message: '请输入 apikey4c',
            trigger: 'blur'
          },
          a1_book_domain: {
            required: true,
            message: '请输入 a1_book_domain',
            trigger: 'blur'
          },
          a1_pic_domain: {
            required: true,
            message: '请输入 a1_pic_domain',
            trigger: 'blur'
          },
          a1_admin_domain: {
            required: true,
            message: '请输入 a1_admin_domain',
            trigger: 'blur'
          },
          a1_manager_path: {
            required: true,
            message: '请输入 a1_manager_path',
            trigger: 'blur'
          },
          a1_upload_path: {
            required: true,
            message: '请输入 a1_upload_path',
            trigger: 'blur'
          }
        },
        rules: {
          oldpwd: [{
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
          ],
          newpwd: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
          ],
          renewpwd: [{
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
          ]
        }
      }
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
</style>
