import { Form, Input, Button, Drawer } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 2 },
  },
};
export default function renderDrawer() {
  const { visible, title } = this.state
  return (
    <Drawer
      className='resource-drawer'
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
      <Form layout="vertical" ref={(ref) => { this.formRef = ref }} {...formItemLayoutWithOutLabel}>
        <Form.List
          name="js"
          initialValue={[""]}
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(new Error('至少添加一条数据'));
                }
              },
            },
          ]}

        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? 'JS资源' : ''}
                  required={false}
                  key={field.key}
                  className={fields.length <= 1 ? 'form-list' : ''}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入JS资源",
                      },
                      {
                        validator: async (_, names) => {
                          if (names?.indexOf('.js') === -1) {
                            return Promise.reject(new Error('请输入正确格式的js资源'));
                          }
                        },
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="请输入JS资源" style={{ width: '90%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '90%', marginBottom: "24px" }}
                  icon={<PlusOutlined />}
                >
                  新增JS资源
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List
          name="css"
          initialValue={[""]}
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(new Error('至少添加一条数据'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => <>
            {fields.map((field, index) => (
              <Form.Item
                label={index === 0 ? 'CSS资源' : ''}
                required={false}
                key={field.key}
                className={fields.length <= 1 ? 'form-list' : ''}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入CSS资源",
                    },
                    {
                      validator: async (_, names) => {
                        if (names?.indexOf('.css') === -1) {
                          return Promise.reject(new Error('请输入正确格式的css资源'));
                        }
                      },
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="请输入CSS资源" style={{ width: '90%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '90%' }}
                icon={<PlusOutlined />}
              >
                新增CSS资源
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>}
        </Form.List>
      </Form>
    </Drawer>
  )
}
