<template>
  <div class="app-container">
    <fieldset>
      <legend>操作</legend>

      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="onSaveDialogShow()">新增</el-button>
        </el-form-item>
        <!-- <el-form-item label="排序" hidden>
          <el-select class="query-sort" size="mini" v-model="tQueryData.sortfiled">
            <el-option label="id" value="id"></el-option>
            <el-option label="ct" value="createtime"></el-option>
          </el-select>
          <el-select class="query-sort" size="mini" v-model="tQueryData.sort">
            <el-option label="升" value="0"></el-option>
            <el-option label="降" value="1"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="站名">
          <el-input size="mini" v-model="tQueryData.name" placeholder="输入站名" clearable></el-input>
        </el-form-item>
        <el-form-item label="域名">
          <el-input size="mini" v-model="tQueryData.domain" placeholder="输入域名" clearable></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-input size="mini" v-model="tQueryData.ip" placeholder="输入IP" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="onQuerySubmit(true)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" plain @click="initQueryData()" icon="el-icon-refresh">清空</el-button>
        </el-form-item>
      </el-form>
    </fieldset>
    <el-table :data="tableData.content" v-loading="tableLoading" border style="width: 100%" size="mini">
      <el-table-column fixed prop="id" label="B站ID" width="150" align="center">
      </el-table-column>
      <el-table-column label="站名" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
          <span class="svg-container" @click="modifyName(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="主域名" align="center">
        <template slot-scope="scope">
          {{scope.row.domain}}
          <span class="svg-container" @click="modifyDomain(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="服务器IP" align="center">
        <template slot-scope="scope">
          {{scope.row.ip}}
          <span class="svg-container" @click="modifyIp(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="访问秘钥" align="center">
        <template slot-scope="scope">
          {{scope.row.apikey}}
          <span class="svg-container" @click="modifyApikey(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" align="center">
        <template slot-scope="scope">
          {{scope.row.createtime}}<br>{{tg(scope.row.createtime)}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <!-- <el-button @click="onUpdateDialogShow(scope)" type="primary" size="mini" icon="el-icon-edit-outline"></el-button> -->
            <el-button @click="onDelete(scope)" type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <div class="p">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tQueryData.page"
        :page-sizes="[10, 20, 30, 50, 100, 200, 300, 400]" :page-size="tQueryData.size" layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalElements">
      </el-pagination>
    </div>

    <!-- 添加 -->
    <el-dialog title="新增" width="30%" :visible.sync="tDialogSaveVisible" :before-close="onSaveDialogClose">
      <el-form :model="tUpdateData" size="small" :rules="rules" ref="ruleForm" >
        <el-form-item label="站点ID" :label-width="formLabelWidth" prop="id">
          <el-input v-model="tUpdateData.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="站名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="tUpdateData.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="主域名" :label-width="formLabelWidth" prop="domain">
          <el-input v-model="tUpdateData.domain" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务器IP" :label-width="formLabelWidth" prop="ip">
          <el-input v-model="tUpdateData.ip" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="访问秘钥" :label-width="formLabelWidth" prop="apikey">
          <el-input v-model="tUpdateData.apikey" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCloseUploadDialog('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="onSaveSubmit('ruleForm')" :loading="tLoadingUpdateConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    query,
    del,
    update,
    add
  } from '@/api/site'
  import timeago from 'timeago.js'
  export default {
    methods: {
      tg(time) {
        if (time !== null) {
          return timeago(null, 'zh_CN').format(time)
        }
        return '未发布'
      },
      resetSaveFields() {
        const saveForm = 'ruleForm'
        if (this.$refs[saveForm]) {
          this.$refs[saveForm].resetFields()
        }
      },
      onCloseUploadDialog(fn) {
        this.tDialogSaveVisible = false
        this.resetSaveFields()
      },
      onSaveDialogClose(done) {
        this.resetSaveFields()
        done()
      },
      modifyName(scope) {
        this.$prompt('修改站名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.name,
          lockScroll: false,
          inputPlaceholder: '请输入站名',
          inputType: 'text',
          inputValidator: function(v) {
            v = v || ''
            if (v.trim() === '') {
              return '站名不能为空！'
            }
            if (v.length > 32) {
              return '站名长度不能查过32个字符'
            }
            return true
          }
        }).then(({
          value
        }) => {
          update({
            id: scope.row.id,
            name: value
          }).then(response => {
            scope.row.name = value
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改站名'
          })
        })
      },
      modifyDomain(scope) {
        this.$prompt('修改域名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.domain,
          lockScroll: false,
          inputPlaceholder: '请输入域名',
          inputType: 'text',
          inputValidator: function(v) {
            v = v || ''
            if (!/^(?!http|https)(?!:\/\/)[\s\S]*[^/]$/.test(v)) {
              return '必须是有效的域名'
            }
            if (v.length > 45) {
              return '域名长度必须小于等于45'
            }
            return true
          }
        }).then(({
          value
        }) => {
          update({
            id: scope.row.id,
            domain: value
          }).then(response => {
            scope.row.domain = value
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改域名'
          })
        })
      },
      modifyIp(scope) {
        this.$prompt('修改IP', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.ip,
          lockScroll: false,
          inputPlaceholder: '请输入合法IP',
          inputPattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
          inputErrorMessage: '请输入合法IP'
        }).then(({
          value
        }) => {
          update({
            id: scope.row.id,
            ip: value
          }).then(response => {
            scope.row.ip = value
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改IP'
          })
        })
      },
      modifyApikey(scope) {
        this.$prompt('修改apikey', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.apikey,
          lockScroll: false,
          inputPlaceholder: '请输入apikey',
          inputType: 'text',
          inputValidator: function(v) {
            v = v || ''
            if (!/^[a-zA-Z_\-0-9]+$/.test(v)) {
              return 'apikey只能保护数字、大小写字母和下划线'
            }
            if (v.length > 32) {
              return '域名长度必须小于等于32'
            }
            return true
          }
        }).then(({
          value
        }) => {
          update({
            id: scope.row.id,
            apikey: value
          }).then(response => {
            scope.row.apikey = value
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改apikey'
          })
        })
      },
      initQueryData() {
        this.tQueryData = {
          sort: '1',
          sortfiled: 'createtime',
          name: '',
          domain: '',
          ip: '',
          page: 1,
          size: 10
        }
      },
      initUpadateData() {
        this.tUpdateData = {
          id: null,
          name: null,
          domain: null,
          ip: null,
          apikey: null,
          createtime: null
        }
      },
      timest() {
        return Date.parse(new Date()).toString().substr(0, 10)
      },
      onQuerySubmit(first) {
        if (first) {
          this.tQueryData.page = 1
        }
        this.tableLoading = true
        query(this.tQueryData).then(response => {
          this.tableData = response.data
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      onSaveDialogShow() {
        this.initUpadateData()
        this.tDialogSaveVisible = true
      },
      onSaveSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.tLoadingUpdateConfirm = true
            add(this.tUpdateData).then(response => {
              this.tLoadingUpdateConfirm = false
              this.tDialogSaveVisible = false
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
            }).catch(() => {
              this.tLoadingUpdateConfirm = false
            })
          }
        })
      },
      onDelete(scope) {
        // this.tableData.content.splice(scope.$index, 1)
        this.$confirm('删除站名为【' + scope.row.name + '】的记录？此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              del({
                id: scope.row.id
              }).then(response => {
                done()
                instance.confirmButtonLoading = false
                this.tableData.content.splice(scope.$index, 1)
                this.tableData.totalElements -= 1
              }).catch(() => {
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleSizeChange(val) {
        this.tQueryData.size = val
        this.onQuerySubmit(true)
      },
      handleCurrentChange(val) {
        this.tQueryData.page = val
        this.onQuerySubmit()
      },
      fetchData() {
        this.onQuerySubmit()
      }
    },
    created() {
      this.initQueryData()
      this.fetchData()
    },
    data() {
      const validateId = (rule, value, callback) => {
        value = value || ''
        if (!/^\d+$/.test(value)) {
          callback(new Error('只能输入整数'))
        }
        if (value.length > 10) {
          callback(new Error('站点Id长度必须小于等于10'))
        }
        callback()
      }
      const validateName = (rule, v, callback) => {
        v = v || ''
        if (v === '' || v.length > 16) {
          callback(new Error('站名不能为空，且必须小于16位'))
        }
        callback()
      }
      const validateKey = (rule, v, callback) => {
        v = v || ''
        if (!/^[a-zA-Z_\-0-9]+$/.test(v)) {
          callback(new Error('秘钥只能包含数字大小写字母和_'))
        }
        if (v.length > 32) {
          callback(new Error('秘钥长度必须小于等于32位'))
        }
        callback()
      }
      const validateDomain = (rule, value, callback) => {
        value = value || ''
        if (!/^(?!http|https)(?!:\/\/)[\s\S]*[^/]$/.test(value)) {
          callback(new Error('域名格式错误！'))
        }
        if (value.length > 45) {
          callback(new Error('域名长度必须小于等于45'))
        }
        callback()
      }
      const validateIp = (rule, value, callback) => {
        value = value || ''
        if (!/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/.test(
          value)) {
          callback(new Error('IP格式错误！'))
        }
        if (value.length > 45) {
          callback(new Error('IP长度必须小于等于15'))
        }
        callback()
      }
      return {
        tLoadingUpdateConfirm: false,
        tDialogSaveVisible: false,
        tDialogUpdateVisible: false,
        tableLoading: false,
        tQueryData: {},
        tUpdateData: {},
        tUpdateRowIndex: 0,
        formLabelWidth: '120px',
        tableData: [],
        rules: {
          id: [{
            validator: validateId,
            trigger: 'blur'
          }],
          name: [{
            validator: validateName,
            trigger: 'blur'
          }],
          domain: [{
            validator: validateDomain,
            trigger: 'blur'
          }],
          ip: [{
            validator: validateIp,
            trigger: 'blur'
          }],
          apikey: [{
            validator: validateKey,
            trigger: 'blur'
          }]

        }
      }
    }
  }

</script>
<style scoped>
  .p {
    padding: 10px;
  }

  fieldset {
    border: 1px solid #ebeef5;
    margin-bottom: 10px;
    display: block;
    font-size: 12px;
    padding: 0.1em 1.1em 0.525em;
  }

  .query-sort {
    width: 60px;
  }

  .demo-form-inline .el-form-item {
    margin-bottom: 0px;
  }

  .el-button--mini,
  .el-button--mini.is-round {
    padding: 5px 10px;
  }

  .iconsize {
    font-size: 14px;
    cursor: pointer;
  }

</style>
