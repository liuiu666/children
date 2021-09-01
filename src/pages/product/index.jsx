import React from 'react'
import { Table, Button, Space, Popconfirm, Drawer, Form, Col, Row, Input, Select, Radio } from 'antd'
import { handleGetProductList, handleDeleteProductList, handleAddProductList } from './utils/ajaxAction'
import './index.less'

const { Option } = Select;
export default class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      totalPage: 1,
      count: 0,
      currentPage: 1,
      visible: false,
      title: '添加产品',
      id: null
    }
    this.handleGetProductList = handleGetProductList.bind(this);
    this.handleDeleteProductList = handleDeleteProductList.bind(this);
    this.handleAddProductList = handleAddProductList.bind(this);
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
    if (this.state.id) {
      values.id = this.state.id
    }
    this.handleAddProductList(values)

  }

  handleEditProduct(record) {
    this.setState({
      visible: true,
      title: "编辑产品",
      id: record.id
    }, () => {
      this.formRef.setFieldsValue(record)
    })
  }


  renderDrawer() {
    const { visible, title } = this.state
    return (
      <Drawer
        title={title}
        width={500}
        onClose={() => {
          this.setState({
            visible: false
          })
        }}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button
              onClick={() => {
                this.setState({
                  visible: false
                })
              }}
              style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={() => this.handleGetFormData()} type="primary">
              保存
            </Button>
          </div>
        }
      >
        <Form layout="vertical" ref={(ref) => {
          this.formRef = ref
        }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="productName"
                label="产品名称"
                rules={[{ required: true, message: '请输入' }]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="productCode"
                label="产品编码"
                rules={[{ required: true, message: '请输入' }]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="productType"
                label="产品类型"
              >
                <Select placeholder="请输入">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="isDisabled"
                label="是否禁用"
                initialValue={0}
                rules={[{ required: true, message: '请输入' }]}
              >
                <Radio.Group
                  options={[
                    { label: '是', value: 1 },
                    { label: '否', value: 0 },
                  ]}
                  rules={[{ required: true, message: '请输入' }]}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="描述"
                rules={[
                  {
                    required: false,
                    message: '请输入',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    )
  }


  render() {
    return (
      <div className='product-page'>
        <header>
          <h2>产品列表</h2>
          <Button type='primary' onClick={() => {
            this.setState({
              visible: true,
              title: "添加产品",
              id: null
            })
          }}>
            添加产品
          </Button>
        </header>
        <main>
          {this.renderTable()}
        </main>
        {this.renderDrawer()}
      </div>
    )
  }
}


