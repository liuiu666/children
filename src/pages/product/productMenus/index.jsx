import React from 'react'
import { MinusCircleOutlined, CheckCircleOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { handleGetDataList, handleDeleteDataItem, handleAddDataList } from './utils/ajaxAction'
import RenderContent from '@/components/render-content'
import RenderHeader from '@/components/render-header'
import { Table, Space, Popconfirm, Tag } from 'antd'
import renderAddMenus from './renderAddMenus'
import RenderTable from './renderTable'
import './index.less'


export default class ResourceManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      totalPage: 1,
      count: 0,
      currentPage: 1,
      visible: false,
      title: '添加资源',
      dataItemId: null
    }
    this.handleGetDataList = handleGetDataList.bind(this);
    this.handleDeleteDataItem = handleDeleteDataItem.bind(this);
    this.handleAddDataList = handleAddDataList.bind(this);

    this.renderAddMenus = renderAddMenus.bind(this)
  }

  componentDidMount() {
    // 获取产品列表
    this.handleGetDataList()
  }


  renderTable() {
    const columns = [
      {
        title: '产品编码',
        dataIndex: 'productCode',
        key: 'productCode',
      },
      {
        title: 'JS地址',
        dataIndex: 'source',
        key: 'sourceJs',
        render: (text, record) => {
          let resource = { js: [], css: [] };
          try {
            resource = JSON.parse(text)
          } catch (error) {
            console.error(error)
          }
          const option = {
            0: { icon: <CheckCircleOutlined />, color: "success" },
            1: { icon: <MinusCircleOutlined />, color: "default" },
          }
          return <div className='table-js-css'>{resource.css.map((item, index) => <Tag key={index} {...option[record.isDisabled]}>{item}</Tag>)}</div>
        }
      },
      {
        title: 'CSS地址',
        dataIndex: 'source',
        key: 'sourceCss',
        render: (text, record) => {
          let resource = { js: [], css: [] };
          try {
            resource = JSON.parse(text)
          } catch (error) {
            console.error(error)
          }
          const option = {
            0: { icon: <CheckCircleOutlined />, color: "success" },
            1: { icon: <MinusCircleOutlined />, color: "default" },
          }
          return <div className='table-js-css'>{resource.css.map((item, index) => <Tag key={index} {...option[record.isDisabled]}>{item}</Tag>)}</div>
        }
      },
      {
        title: '创建人',
        dataIndex: 'owner',
        key: 'owner',
      },
      {
        title: '是否禁用',
        dataIndex: 'isDisabled',
        key: 'isDisabled',
        render: (text, record) => {
          const option = {
            0: { icon: <CheckCircleOutlined />, color: "success" },
            1: { icon: <MinusCircleOutlined />, color: "default" },
          }
          return <Tag {...option[text]} >{text === 0 ? '已启用' : '已禁用'}</Tag>
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const option = {
            0: { icon: <PauseCircleOutlined />, color: "error" },
            1: { icon: <PlayCircleOutlined />, color: "processing" },
          }
          return (
            <Space size="middle">
              <a onClick={() => this.handleAddDataList({
                id: record.id,
                isDisabled: record.isDisabled ? 0 : 1
              })}>
                <Tag {...option[record.isDisabled]} >{record.isDisabled === 0 ? '禁用' : '启用'}</Tag>
              </a>
              <a onClick={() => this.handleEditData(record)}>编辑</a>
              <Popconfirm
                title="您确定要删除吗?"
                onConfirm={() => this.handleDeleteDataItem(record.id)}
                okText="是"
                cancelText="否"
              >
                <a>删除</a>
              </Popconfirm>
            </Space>
          )
        }
      },
    ];
    return <Table rowKey='id' columns={columns} dataSource={this.state.dataSource} pagination={
      {
        showQuickJumper: true,
        total: this.state.count,
        defaultCurrent: this.state.currentPage,
        onChange: (page, pageSize) => {
          this.setState({ currentPage: page }, () => {
            this.handleGetDataList()
          })
        }
      }
    } />
  }

  async handleGetFormData() {
    const values = await this.formRef.validateFields()
    const source = JSON.stringify(values)
    const { productCode } = this.props.location.query
    let request = {
      productCode,
      source: source,
      owner: "lin",
      //  isDisabled: 1
    }
    if (this.state.dataItemId) {
      request.id = this.state.dataItemId
    }
    this.handleAddDataList(request)
  }

  handleEditData(record) {
    this.setState({
      visible: true,
      title: "编辑资源",
      dataItemId: record.id
    }, () => {
      let resource = { js: [], css: [] };
      try {
        resource = JSON.parse(record.source)
      } catch (error) {
        console.error(error)
      }
      this.formRef.setFieldsValue(resource)
    })
  }



  render() {
    return (
      <div className='product-menus'>
        <RenderHeader title='菜单管理' backUrl='/product' />
        <main className='content'>
          <RenderTable />
          {this.renderAddMenus()}
        </main>
      </div >
    )
  }
}



