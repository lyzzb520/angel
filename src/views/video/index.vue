<template>
  <div class="app-container">
    <fieldset>
      <legend>操作</legend>

      <el-form :inline="true" :model="tQueryData" class="demo-form-inline" :rules="rulesQuery" ref="rulesQueryForm">
        <el-form-item>
          <a class="el-button el-button--primary el-button--mini" href="upload/index.html" target="_blank"><i class="el-icon-plus"></i> 上传视频</a>
        </el-form-item>
        <el-form-item label="标题">
          <el-input class="query-input" size="mini" v-model="tQueryData.title" placeholder="输入标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="时长">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.timecomparetype">
            <el-option label="大于" value="0"></el-option>
            <el-option label="小于" value="1"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
          <el-input-number v-model="tQueryData.timecomparevalue" size="mini" :min="1" style="width:100px;"></el-input-number>
          <el-select class="query-stauts" size="mini" v-model="tQueryData.timecomparelength">
            <el-option label="小时" value="0"></el-option>
            <el-option label="分钟" value="1"></el-option>
            <el-option label="秒" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-input class="query-input" size="mini" v-model="tQueryData.tags" placeholder="输入标签" clearable></el-input>
        </el-form-item>
        <el-form-item label="来源站点" prop="siteid">
          <el-input class="query-input" size="mini" v-model="tQueryData.siteid" placeholder="输入站点" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="query-stauts" size="mini" v-model="tQueryData.status">
            <el-option label="未发布" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
            <el-option label="全部" value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.timepubrange[0]" type="datetime" placeholder="选择开始日期时间">
          </el-date-picker> -
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.timepubrange[1]" type="datetime" placeholder="选择结束日期时间">
          </el-date-picker>
          <!-- <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" v-model="tQueryData.timepubrange" type="datetimerange" :picker-options="pickerOptions2"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker> -->
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
      <!-- <el-table-column fixed prop="uuid" label="ID" align="center">
      </el-table-column> -->
      <el-table-column label="缩略图" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.picurl" class="thum">
          <!-- <img src="http://n.sinaimg.cn/news/transform/w150h150/20180301/EnOr-fwnpcns6146309.jpg" class="thum"> -->
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
          <span class="svg-container" @click="modifyTitle(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="时长" align="center">
        <template slot-scope="scope">
          {{timeStamp(scope.row.time) }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="rPath" label="在A2的相对路径" align="center">
      </el-table-column> -->
      <el-table-column prop="a2Id" label="在A2的主键" align="center">
      </el-table-column>
      <el-table-column label="标签" align="center">
        <template slot-scope="scope">
          <span :key="index" class="tags" v-for="(tag, index) in scope.row.tags"> {{tag}} </span>
          <span class="svg-container" @click="modifyTags(scope)">
            <svg-icon class="iconsize" icon-class="edit"></svg-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="siteid" label="上传来源" align="center">
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
      <el-table-column prop="pubtime" label="发布时间" align="center">
        <template slot-scope="scope">
          {{scope.row.pubtime}}<br>{{tg(scope.row.pubtime)}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click="onView(scope)" type="primary" icon="el-icon-view" size="mini"></el-button>
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

    <!-- 修改标签窗口 -->
    <el-dialog title="修改标签" width="30%" :visible.sync="tDialogTagVisible">
      <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
      <el-form :model="tUpdateTag" size="small" :rules="rulesruleTagForm" ref="ruleTagForm">
        <el-form-item prop="content">
          <el-input v-model="tUpdateTag.content" auto-complete="off" style="display:none;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tDialogTagVisible = false">取 消</el-button>
        <el-button type="primary" @click="onModifyTagsSubmit('ruleTagForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="preScope==null?'':preScope.row.title" :visible.sync="preDialogVisiable" width="50%">
      <iframe :src="videoSrc" frameborder="0" width="100%" height="400px"></iframe>
      <!-- <div style="width:100%;height:300px;background:green;"></div> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="preDialogVisiable = false">确 定</el-button>
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
  } from '@/api/video'
  import timeago from 'timeago.js'
  export default {
    computed: {
      videoSrc() {
        if (this.preScope) {
          return this.preSrc + this.preScope.row.videourl
        } else {
          return this.preSrc
        }
      }
    },
    methods: {
      onView(scope) {
        this.preScope = scope
        this.preDialogVisiable = true
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
          inputType: 'text',
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
      onModifyTagsSubmit(fn) {
        this.$refs[fn].validate((valid) => {
          if (valid) {
            update({
              uuid: this.tUpdateRowUuid,
              tags: this.tUpdateTag.content
            }).then(r => {
              this.tDialogTagVisible = false
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.tableData.content[this.tUpdateRowIndex].tags = []
              this.dynamicTags.forEach(e => {
                this.tableData.content[this.tUpdateRowIndex].tags.push(e)
              })
            })
          }
        })
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        this.reloadTagsUpdate()
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
        this.reloadTagsUpdate()
      },
      modifyTags(scope) {
        this.tDialogTagVisible = true
        this.tUpdateRowIndex = scope.$index
        this.tUpdateRowUuid = scope.row.uuid
        this.dynamicTags.length = 0
        if (scope.row.tags !== null) {
          scope.row.tags.forEach(element => {
            this.dynamicTags.push(element)
          })
          this.reloadTagsUpdate()
        }
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
              message: '已成功取消!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
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
              message: '已成功发布!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        }
      },
      reloadTagsUpdate() {
        let d = ''
        if (this.dynamicTags.length > 0) {
          this.dynamicTags.forEach(e => {
            d = d + e + ','
          })
          this.tUpdateTag.content = d.substring(0, d.length - 1)
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
        this.tUpdateData.title = file.name
      },
      initQueryData() {
        this.tQueryData = {
          page: 1,
          size: 10,
          sort: '1',
          sortfiled: 'pubtime',
          uuid: null,
          title: '',
          time: 1,
          tags: '',
          timecomparetype: 'null',
          timecomparelength: '1',
          status: 'null',
          siteid: null,
          timepubrange: ['', ''],
          timecomparevalue: 10
        }
      },
      initUpadateData() {
        this.tUpdateData = {
          uuid: null,
          title: '',
          tags: '',
          siteid: '',
          status: '',
          pubtime: null
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
          this.tableData = response.data == null ? [] : response.data
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
        this.tLoadingUpdateConfirm = true
        update(this.tUpdateData).then(response => {
          this.tLoadingUpdateConfirm = false
          this.tDialogSaveVisible = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        }).catch(() => {
          this.tLoadingUpdateConfirm = false
        })
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
        this.$confirm('删除视频标题为【 ' + scope.row.title + '】 的记录？此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              del({
                uuid: scope.row.uuid,
                a2id: scope.row.a2Id
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
        this.onQuerySubmit(true)
      },
      timeStamp(second_time) {
        let h = 0
        let i = 0
        let s = parseInt(second_time)
        if (s > 60) {
          i = parseInt(s / 60)
          s = parseInt(s % 60)
          if (i > 60) {
            h = parseInt(i / 60)
            i = parseInt(i % 60)
          }
        }
        // 补零
        const zero = function(v) {
          return (v >> 0) < 10 ? '0' + v : v
        }
        return [zero(h), zero(i), zero(s)].join(':')
      }
    },
    created() {
      this.initQueryData()
    },
    mounted() {
      this.fetchData()
    },
    data() {
      const validateTags = (rule, v, callback) => {
        v = v || ''
        if (v === '') {
          callback()
        }
        if (v.length > 45) {
          callback(new Error('标签长度必须小于等于45位,请删除一些标签'))
        }
        callback()
      }
      const siteidValidator = (rule, value, callback) => {
        value = value || ''
        if (value === '') {
          callback()
        }
        if (!/^\d+$/.test(value)) {
          callback(new Error('只能输入整数'))
        }
        callback()
      }
      return {
        preSrc: 'ckplayer/index.html?_=',
        preScope: null,
        preDialogVisiable: false,
        tUpdateTag: {
          content: ''
        },
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        tDialogTagVisible: false,
        tLoadingUpdateConfirm: false,
        tDialogSaveVisible: false,
        tDialogUpdateVisible: false,
        tableLoading: false,
        tQueryData: {
          timepubrange: ['', '']
        },
        tUpdateData: {},
        tUpdateRowIndex: 0,
        tUpdateRowUuid: 0,
        formLabelWidth: '120px',
        tableData: [],
        rulesruleTagForm: {
          content: [{
            validator: validateTags,
            trigger: 'change'
          }]
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
    width: 85px;
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
