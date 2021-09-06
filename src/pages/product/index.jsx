import React from 'react'
import { Table, Space, Popconfirm, Tag } from 'antd'
import { handleGetProductList, handleDeleteProductList, handleAddProductList } from './utils/ajaxAction'
import { MinusCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import RenderContent from '@/components/render-content'
import RenderHeader from '@/components/render-header'
import renderDrawer from './renderDrawer'
import './index.less'

export default class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      totalPage: 1,
      count: 0,
      currentPage: 1,
      keyWord: null,
      visible: false,
      title: '添加产品',
      dataItemId: null
    }
    this.handleGetProductList = handleGetProductList.bind(this);
    this.handleDeleteProductList = handleDeleteProductList.bind(this);
    this.handleAddProductList = handleAddProductList.bind(this);
    this.renderDrawer = renderDrawer.bind(this)
  }

  componentDidMount() {
    // 获取产品列表
    this.handleGetProductList()
  }


  renderTable() {
    const columns = [
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: '产品编码',
        dataIndex: 'productCode',
        key: 'productCode',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
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
        render: (text, record) => (
          <Space size="middle">
            <a onClick={() => window.sysPush(`/product/resourceManagement?productCode=${record.productCode}`)} >资源管理</a>
            <a onClick={() => this.handleEditProduct(record)}>编辑</a>
            <Popconfirm
              title="您确定要删除吗?"
              onConfirm={() => this.handleDeleteProductList(record.id)}
              okText="是"
              cancelText="否"
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        ),
      },
    ];
    return <Table rowKey='id' columns={columns} dataSource={this.state.dataSource} pagination={
      {
        showQuickJumper: true,
        total: this.state.count,
        defaultCurrent: this.state.currentPage,
        onChange: (page, pageSize) => {
          this.setState({ currentPage: page }, () => {
            this.handleGetProductList()
          })
        }
      }
    } />
  }

  async handleGetFormData() {
    let values = await this.formRef.validateFields()
    if (this.state.dataItemId) {
      values.id = this.state.dataItemId
    }
    this.handleAddProductList(values)
  }

  handleEditProduct(record) {
    this.setState({
      visible: true,
      title: "编辑产品",
      dataItemId: record.id
    }, () => {
      this.formRef.setFieldsValue(record)
    })
  }



  render() {
    return (
      <div className='product-page'>
        <RenderHeader title='产品管理' />
        <RenderContent
          renderLeft={[{
            key: 1,
            title: '新增产品',
            onClick: () => {
              this.formRef?.resetFields()
              this.setState({
                dataItemId: null,
                visible: true
              })
            }
          }]}
          rightOption={{
            placeholder: '搜索产品名称',
            onSearch: (value) => {
              this.setState({
                keyWord: value
              }, () => {
                this.handleGetProductList()
              })
            }
          }}
        >
          {this.renderTable()}
        </RenderContent>
        {this.renderDrawer()}
      </div >
    )
  }
}



