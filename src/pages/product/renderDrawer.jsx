import { Button, Drawer, Form, Col, Row, Input, Select, Radio } from 'antd'
const { Option } = Select;

export default function renderDrawer() {
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
              <Input placeholder="请输入" disabled={title === '编辑产品'} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="productType"
              label="产品类型"
            >
              <Select placeholder="请输入" allowClear>
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
