<template>
  <div class="app-container">
    <fieldset>
      <legend>操作</legend>

      <el-form :inline="true" :model="tQueryData" class="demo-form-inline" :rules="rulesQuery" ref="rulesQueryForm">
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="onSaveDialogShow()">新增</el-button>
        </el-form-item>
        <el-form-item label="标题">
          <el-input class="query-input" size="mini" v-model="tQueryData.title" placeholder="输入标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input class="query-input" size="mini" v-model="tQueryData.content" placeholder="输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.status">
            <el-option label="未发布" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告类型">
          <el-select class="query-type" size="mini" v-model="tQueryData.type">
            <el-option label="公告内容" value="0"></el-option>
            <el-option label="标题跳转" value="1"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站点ID" prop="siteid">
          <el-input class="query-input" size="mini" v-model="tQueryData.siteid" placeholder="站点ID" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-refresh" @click="onQueryAllSubmit()">刷新站点ID</el-button>
        </el-form-item> -->
        <el-form-item label="创建时间">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.createtimerange[0]" type="datetime" placeholder="选择开始日期时间">
          </el-date-picker> -
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.createtimerange[1]" type="datetime" placeholder="选择结束日期时间">
          </el-date-picker>
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
      <!-- <el-table-column fixed prop="id" label="ID" align="center">
      </el-table-column> -->
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
          <span class="svg-container" @click="modifyTitle(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="标题链接" align="center">
        <template slot-scope="scope">
          {{scope.row.url}}
          <span v-if="scope.row.url !== null && scope.row.url !== ''" class="svg-container" @click="modifyUrl(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row.preface}} -->
          <span v-if="scope.row.url === null || scope.row.url === ''" class="svg-container" @click="displayContent(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="pr" align="center">
        <template slot-scope="scope">
          {{scope.row.pr}}
          <span class="svg-container" @click="modifyPr(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="siteids" label="发布站点" align="center">
        <template slot-scope="scope">
          {{scope.row.siteids}}
          <span class="svg-container" @click="modifySiteids(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="发布状态" align="center">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status === 0?'info':'success'">{{ scope.row.status === 0?'未启用' : '已启用' }}</el-tag> -->
          <div @click="modifyStatus(scope)">
            <el-switch v-model=" scope.row.status == '1' " active-color="#13ce66">
            </el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{tg(scope.row.createtime)}}
        </template>
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

    <!-- 新增公告 -->
    <el-dialog title="新增公告" width="80%" :visible.sync="tDialogSaveVisible" :before-close="onSaveDialogClose" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="tUpdateData" size="small" :rules="rulesForSave" ref="ruleFormForSave">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="tUpdateData.title" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio-group v-model="noticeType" size="small">
            <el-radio label="1" border>标题跳转</el-radio>
            <el-radio label="2" border>公告内容</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="noticeType==='1'" label="标题链接" :label-width="formLabelWidth" prop="url">
          <el-input v-model="tUpdateData.url" auto-complete="off" placeholder="请输入标题链接" clearable></el-input>
        </el-form-item>
        <el-form-item v-show="noticeType==='2'" label="内容" :label-width="formLabelWidth">
          <tinymce :height="300" v-model="tUpdateData.content"></tinymce>
        </el-form-item>
        <el-form-item label="发布状态" :label-width="formLabelWidth">
          <el-select class="query-stauts" size="mini" v-model="tUpdateData.status">
            <el-option label="未发布" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布站点" :label-width="formLabelWidth" prop="siteids">
          <el-input v-model="tUpdateData.siteids" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="pr">
          <el-input v-model="tUpdateData.pr" auto-complete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCloseUploadDialog('ruleFormForSave')">取 消</el-button>
        <el-button type="primary" @click="onSaveSubmit('ruleFormForSave')" :loading="tLoadingUpdateConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 内容预览窗口 -->
    <el-dialog :title="preScope==null?'':preScope.row.title" :visible.sync="preDialogVisible" width="80%">
      <tinymce :height="300" v-model="preContent"></tinymce>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onUpdateContentSubmit" :loading="UpdateContentSubmitLoading">提交修改</el-button>
      </span>
    </el-dialog>
  </div>


</template>

<script>
  import {
    query,
    queryAll,
    del,
    update,
    add
  } from '@/api/notice'
  import timeago from 'timeago.js'
  import Tinymce from '@/components/Tinymce'
  export default {
    components: {
      Tinymce
    },
    methods: {
      onUpdateContentSubmit() {
        this.UpdateContentSubmitLoading = true
        update({
          id: this.preScope.row.id,
          content: this.preContent
        }).then(r => {
          this.UpdateContentSubmitLoading = false
          this.preDialogVisible = false
          this.preScope.row.content = this.preContent
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
        }).catch(() => {
          this.UpdateContentSubmitLoading = false
        })
      },
      resetSaveFields() {
        const saveForm = 'ruleFormForSave'
        if (this.$refs[saveForm]) {
          this.$refs[saveForm].resetFields()
          this.tUpdateData.content = ''
        }
      },
      onCloseUploadDialog(fn) {
        this.tDialogSaveVisible = false
        this.resetSaveFields()
      },
      onSaveDialogClose(done) {
        done()
        this.resetSaveFields()
      },
      initUpdateData() {
        this.tUpdateData = {
          id: null,
          title: '',
          url: '',
          content: '',
          pr: '0',
          siteids: '0',
          status: '0',
          createtime: null
        }
      },
      tg(time) {
        if (time !== null) {
          return timeago(null, 'zh_CN').format(time)
        }
        return '未发布'
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
            id: scope.row.id,
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
            message: '取消操作！'
          })
        })
      },
      modifyUrl(scope) {
        this.$prompt('修改标题链接', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.url,
          lockScroll: false,
          inputPlaceholder: '请输入标题链接',
          inputValidator: function(v) {
            v = v || ''
            if (!/^(http|https):\/\/[\s\S]*[^/]$/.test(v)) {
              return '链接格式错误，必须http或https开头'
            }
            return true
          }
        }).then(({
          value
        }) => {
          update({
            id: scope.row.id,
            url: value
          }).then(response => {
            scope.row.url = value
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作！'
          })
        })
      },
      modifyPr(scope) {
        this.$prompt('修改排序', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.pr.toString(),
          lockScroll: false,
          inputPlaceholder: '请输入标题',
          inputValidator: function(v) {
            v = v || ''
            if (!/^\d+$/.test(v)) {
              return '只能输入整数'
            }
            return true
          }
        }).then(({
          value
        }) => {
          update({
            id: scope.row.id,
            pr: value
          }).then(response => {
            scope.row.pr = value
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作！'
          })
        })
      },
      modifySiteids(scope) {
        this.$prompt('修改发布站点', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: scope.row.siteids,
          lockScroll: false,
          inputPlaceholder: '请输入发布站点',
          inputValidator: function(v) {
            v = v || ''
            if (v === '0') {
              return true
            }
            if (!/^[,]([1-9]\d+[,]?)+[,]$/.test(v)) {
              return '格式错误！示例格式：,11,22,33, 或0'
            }
            return true
          }
        }).then(({
          value
        }) => {
          update({
            id: scope.row.id,
            siteids: value
          }).then(response => {
            scope.row.siteids = value
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作！'
          })
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
                  id: scope.row.id,
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
                  id: scope.row.id,
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
      initQueryData() {
        this.tQueryData = {
          page: 1,
          size: 10,
          sort: '1',
          sortfiled: 'createtime',
          title: '',
          content: '',
          siteid: '0',
          status: 'null',
          type: 'null',
          createtimerange: ['', '']
        }
      },
      onQuerySubmit(first) {
        if (first) {
          this.tQueryData.page = 1
        }
        this.$refs['rulesQueryForm'].validate((valid) => {
          if (valid) {
            this.loadData()
          }
        })
      },
      loadData() {
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
      onQueryAllSubmit() {
        queryAll().then(response => {

        }).catch(() => {

        })
      },
      onSaveDialogShow() {
        this.initUpdateData()
        this.tDialogSaveVisible = true
      },
      onSaveSubmit(fn) {
        this.$refs[fn].validate((valid) => {
          if (valid) {
            this.tLoadingUpdateConfirm = true
            add(this.tUpdateData).then(response => {
              this.tLoadingUpdateConfirm = false
              this.tDialogSaveVisible = false
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.onQuerySubmit(true)
            }).catch(() => {
              this.tLoadingUpdateConfirm = false
            })
          }
        })
      },
      onDelete(scope) {
        // this.tableData.content.splice(scope.$index, 1)
        this.$confirm('公告标题为【' + scope.row.title + '】的记录？此操作将永久删除该记录, 是否继续?', '提示', {
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
      },
      displayContent(s) {
        this.preScope = s
        this.preContent = s.row.content
        this.preDialogVisible = true
      }
    },
    created() {
      this.initQueryData()
    },
    mounted() {
      this.fetchData()
    },
    filter: {
      formatStutus(val) {
        console.log(val)
      }
    },
    watch: {
      noticeType: function(newValue, oldValue) {
        // if (newValue === '1') {
        //   this.tUpdateData.content = ''
        // }
      //  this.resetSaveFields()
      }
    },
    data() {
      const validateTitle = (rule, v, callback) => {
        v = v || ''
        if (v === '' || v.length > 32) {
          callback(new Error('标题不能为空，且必须小于等于32位'))
        }
        callback()
      }
      const validateUrl = (rule, v, callback) => {
        if (this.noticeType === '2') {
          callback()
        }
        v = v || ''
        if (!/^(http|https):\/\/[\s\S]*[^/]$/.test(v)) {
          callback(new Error('链接格式错误，必须http或https开头'))
        }
        callback()
      }
      const validateSiteids = (rule, v, callback) => {
        v = v || ''
        if (v === '0') {
          callback()
        }
        if (!/^[,]([1-9]\d+[,]?)+[,]$/.test(v)) {
          callback(new Error('格式错误！示例格式：,11,22,33, 或0'))
        }
        callback()
      }
      const validatePr = (rule, v, callback) => {
        v = v || ''
        if (!/^\d+$/.test(v)) {
          callback(new Error('只能aaaa输入整数'))
        }
        callback()
      }
      const siteidValidator = (rule, v, callback) => {
        v = v || ''
        if (v === '') {
          callback()
        }
        if (!/^\d+$/.test(v)) {
          callback(new Error('只能输入整数'))
        }
        callback()
      }
      return {
        noticeType: '1',
        UpdateContentSubmitLoading: false,
        preDialogVisible: false,
        preContent: '',
        preScope: {
          row: {
            content: []
          }
        },
        tUpdateTag: {
          content: ''
        },
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
        rulesForSave: {
          title: {
            validator: validateTitle
          },
          url: {
            validator: validateUrl
          },
          siteids: {
            validator: validateSiteids,
            trigger: 'change'
          },
          pr: {
            validator: validatePr
          }

        },
        rulesQuery: {
          siteid: {
            validator: siteidValidator,
            trigger: 'change'
          }
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

  .query-type {
    width: 100px;
  }

  .query-input {
    max-width: 200px;
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
