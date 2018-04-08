<template>
  <div class="app-container">
    <fieldset>
      <legend>操作</legend>

      <el-form :inline="true" :model="tQueryData" class="demo-form-inline">
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="onSaveDialogShow()">新增</el-button>
        </el-form-item>
        <el-form-item label="排序">
          <el-select class="query-sort" size="mini" v-model="tQueryData.sortfiled">
            <el-option label="uuid" value="uuid"></el-option>
            <el-option label="pt" value="pubtime"></el-option>
          </el-select>
          <el-select class="query-sort" size="mini" v-model="tQueryData.sort">
            <el-option label="升" value="0"></el-option>
            <el-option label="降" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input class="query-input" size="mini" v-model="tQueryData.title" placeholder="输入标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="文学长度">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.totalcomparetype">
            <el-option label="大于" value="0"></el-option>
            <el-option label="小于" value="1"></el-option>
            <el-option label="全部" value=null></el-option>
          </el-select>
          <el-input-number v-model="tQueryData.timecomparevalue" size="mini" :min="1" :max="50" style="width:100px;"></el-input-number>

        </el-form-item>
        <el-form-item label="前言">
          <el-input class="query-input" size="mini" v-model="tQueryData.preface" placeholder="输入前言" clearable></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input class="query-input" size="mini" v-model="tQueryData.tags" placeholder="输入标签" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.status">
            <el-option label="未发布" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
            <el-option label="全部" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.timepubrange" type="datetimerange" :picker-options="pickerOptions2" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="onQuerySubmit(true)"></el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" plain @click="initQueryData()" icon="el-icon-refresh">清空</el-button>
        </el-form-item>
      </el-form>
    </fieldset>
    <el-table :data="tableData.content" v-loading="tableLoading" border style="width: 100%" size="mini">
      <el-table-column fixed prop="uuid" label="ID" align="center">
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
          <span class="svg-container" @click="modifyTitle(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="前言" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row.preface}} -->
          <span class="svg-container" @click="displayPreface(scope.row.preface)">
            <svg-icon class="iconsize" icon-class="view"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="标签" align="center">
        <template slot-scope="scope">
          <span class="tags" :key="index" v-for="(tag, index) in scope.row.tags"> {{tag}} </span>
          <span class="svg-container" @click="modifyTags(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="siteid" label="上传来源" align="center">
      </el-table-column>
      <el-table-column label="发布状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '0'?'info':'success'">{{ scope.row.status === '0'?'未发布' : '已发布' }}</el-tag>
          <span class="svg-container" @click="modifyStatus(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="pubtime" label="发布时间" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button-group>
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
    <el-dialog title="新增" width="30%" :visible.sync="tDialogSaveVisible">
      <el-form :model="tUpdateData" size="small" :rules="rules" ref="ruleForm">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="tUpdateData.title" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="前言" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.preface" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="标签" :label-width="formLabelWidth" prop="tags">
          <el-input v-model="tUpdateData.tags" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="发布来源" :label-width="formLabelWidth">
          <el-input v-model="tUpdateData.siteid" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="发布状态" :label-width="formLabelWidth">
          <el-select class="query-stauts" size="mini" v-model="tUpdateData.status">
            <el-option label="未发布" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加文学" :label-width="formLabelWidth">
          <el-upload class="upload-demo" ref="upload" :auto-upload="false" action="" :http-request="startUpload" :before-upload="beforeUpload"
            list-type="picture" :on-change="onUploadChange" :limit="1">
            <el-button size="small" type="primary">添加txt文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传txt文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCloseUploadDialog">取 消</el-button>
        <el-button type="primary" @click="onSaveSubmit('ruleForm')" :loading="tLoadingUpdateConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改标签窗口 -->
    <el-dialog title="修改标签" width="30%" :visible.sync="tDialogTagVisible">
      <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+添加标签</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tDialogTagVisible = false">取 消</el-button>
        <el-button type="primary" @click="onModifyTagsSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    query,
    del,
    update,
    upload
  } from '@/api/book'
  export default {
    methods: {
      onUploadChange(f, fl) {
        if (f.name.substring(f.name.length - 3) !== 'txt') {
          this.$refs.upload.clearFiles()
        } else {
          this.hasFile = true
        }
      },
      modifyTitle(scope) {
        this.$prompt('修改标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.title,
          lockScroll: false,
          inputPlaceholder: '请输入标题',
          inputValidator: function(v) {
            v = v || ''
            if (v.trim() === '') {
              return '标题不能为空！'
            }
            if (v.length > 32) {
              return '标题长度不能查过32个字符'
            }
            return true
          }
        }).then(({
          value
        }) => {
          update({
            uuid: scope.row.uuid,
            title: value
          }).then(response => {
            scope.row.title = value
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改标题'
          })
        })
      },
      onModifyTagsSubmit() {
        let d = ''
        if (this.dynamicTags.length > 0) {
          this.dynamicTags.forEach(e => {
            d = d + e + ','
          })
          d = d.substring(0, d.length - 1)
          if (d.length > 45) {
            this.$message({
              type: 'error',
              message: '标签总长度超过45了，请删除一些标签，谢谢！',
              duration: 3 * 1000
            })
            return
          }
        }
        update({
          uuid: this.tUpdateRowUuid,
          tags: d
        }).then(r => {
          this.tDialogTagVisible = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.tableData.content[this.tUpdateRowIndex].tags.length = 0
          this.dynamicTags.forEach(e => {
            this.tableData.content[this.tUpdateRowIndex].tags.push(e)
          })
        })
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },

      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm() {
        const inputValue = this.inputValue
        if (inputValue) {
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      modifyTags(scope) {
        this.tDialogTagVisible = true
        this.tUpdateRowIndex = scope.$index
        this.tUpdateRowUuid = scope.row.uuid
        this.dynamicTags.length = 0
        scope.row.tags.forEach(element => {
          this.dynamicTags.push(element)
        })
      },
      modifyStatus(scope) {
        const d = Math.abs(scope.row.status - 1)
        if (scope.row.status === '1') {
          // 改成未发布
          this.$confirm('确定下架标题为 ' + scope.row.title + ' 的记录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                update({
                  uuid: scope.row.uuid,
                  status: d
                }).then(response => {
                  done()
                  instance.confirmButtonLoading = false
                  scope.row.status = d.toString()
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
              message: '操作成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作！'
            })
          })
        } else {
          // 发布
          this.$confirm('确定发布标题为 ' + scope.row.title + ' 的记录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                update({
                  uuid: scope.row.uuid,
                  status: d
                }).then(response => {
                  done()
                  instance.confirmButtonLoading = false
                  scope.row.status = d.toString()
                  scope.row.pubtime = response.data.pubtime
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
              message: '操作成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作！'
            })
          })
        }
      },
      uploadCustom(data) {
        // console.log(data)
        const formData = new FormData()
        formData.append('file', data.file)
        formData.append('abc', '123')
        upload(formData).then(response => {
          // 文件上传成功后提交数据
          // return true
        }).catch(() => {
          // return false
        })
      },
      uploadonChange(file, fileList) {
        this.tUpdateData.title = file.name.split('.')[0]
      },
      initQueryData() {
        this.tQueryData = {
          page: 1,
          size: 10,
          sort: '0',
          sortfiled: 'uuid',
          title: '',
          preface: '',
          tags: '',
          status: null,
          totalcomparetype: 'null',
          timepubrange: null
        }
      },
      initUpadateData() {
        this.tUpdateData = {
          uuid: null,
          title: '',
          preface: '',
          tags: '',
          siteid: '0',
          status: '0',
          pubtime: null
        }
      },
      onQuerySubmit(first) {
        if (first) {
          this.tQueryData.page = 1
        }
        this.tableLoading = true
        query(this.tQueryData).then(response => {
          if (response.data !== null) {
            this.tableData = response.data
          } else {
            this.tableData = []
          }
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },

      onUpdateDialogShow(scope) {
        this.initUpadateData()
        console.log(scope.row)
        this.tUpdateData.uuid = scope.row.uuid
        this.tUpdateData.title = scope.row.title
        this.tUpdateData.preface = scope.row.preface
        this.tUpdateData.tags = scope.row.tags
        this.tUpdateData.siteid = scope.row.siteid
        this.tUpdateData.status = scope.row.status
        this.tUpdateData.pubtime = scope.row.pubtime
        this.tUpdateRowIndex = scope.$index
        this.tDialogUpdateVisible = true
      },

      onSaveDialogShow() {
        this.initUpadateData()
        this.tDialogSaveVisible = true
      },
      onSaveSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (!this.hasFile) {
              this.$message({
                type: 'error',
                message: '请添加文学文件txt',
                duration: 3 * 1000
              })
            } else {
              this.tLoadingUpdateConfirm = true
              this.$refs.upload.submit()
            }
          }
        })
      },
      beforeUpload(file) {
        this.fd = new FormData()
        this.fd.append('title', this.tUpdateData.title)
        this.fd.append('preface', this.tUpdateData.preface)
        this.fd.append('tags', this.tUpdateData.tags)
        this.fd.append('siteid', this.tUpdateData.siteid)
        this.fd.append('status', this.tUpdateData.status)
        this.fd.append('file', file)
      },
      startUpload() {
        upload(this.fd).then(response => {
          this.tLoadingUpdateConfirm = false
          this.tDialogSaveVisible = false
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.$refs.upload.clearFiles()
        }).catch(() => {
          this.tLoadingUpdateConfirm = false
        })
      },
      onBeforeClose(done) {
        this.$refs.upload.clearFiles()
        done()
      },
      onCloseUploadDialog() {
        this.tDialogSaveVisible = false
        this.tLoadingUpdateConfirm = false
        this.$refs.upload.clearFiles()
      },
      onUpdateSubmit() {
        this.tLoadingUpdateConfirm = true
        update(this.tUpdateData).then(response => {
          this.tLoadingUpdateConfirm = false
          this.tDialogUpdateVisible = false
          this.$set(this.tableData.content, this.tUpdateRowIndex, this.tUpdateData)
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }).catch(() => {
          this.tLoadingUpdateConfirm = false
        })
      },
      onDelete(scope) {
        // this.tableData.content.splice(scope.$index, 1)
        this.$confirm('删除标题为 ' + scope.row.title + ' 的记录？此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              del({
                uuid: scope.row.uuid
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
      },
      displayPreface(preface) {
        this.$alert(preface, '前言详情', {
          confirmButtonText: '确定',
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${action}`
            // })
          }
        })
      }
    },
    created() {
      this.initQueryData()
      this.fetchData()
    },
    filter: {
      formatStutus(val) {
        console.log(val)
      }
    },
    data() {
      return {
        hasFile: false,
        fd: null,
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        upload_url: 'https://www.baidu.com',
        tLoadingUpdateConfirm: false,
        tDialogSaveVisible: false,
        tDialogTagVisible: false,
        tDialogUpdateVisible: false,
        tableLoading: false,
        tQueryData: {},
        tUpdateData: {},
        tUpdateRowIndex: 0,
        formLabelWidth: '120px',
        tableData: [],
        rules: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' },
            { min: 0, max: 32, message: '标题长度必须小于等于32', trigger: 'blur' }
          ],
          tags: [
            { min: 0, max: 32, message: '标题长度必须小于等于45', trigger: 'blur' }
          ]
  
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

  .query-stauts {
    width: 90px;
  }

  .query-input {
    max-width: 120px;
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

  .tags {
    border: 1px solid;
    border-radius: 8px;
    padding: 0px 5px;
    margin: 2px;
    display: inline-block;
  }

  .el-tag+.el-tag {
    margin: 5px 5px 0px 0px;
  }

  .el-tag {
    margin: 5px 5px 0px 0px;
  }

  .button-new-tag {
    margin: 5px 5px 0px 0px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin: 5px 5px 0px 0px;
    vertical-align: bottom;
  }

  .thum {
    width: 80px;
    height: 80px;
  }
</style>
