
CREATE TABLE IF NOT EXISTS `sys_users` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_code` varchar(255) DEFAULT NULL,
  `user_name` varchar(250) NOT NULL COMMENT '用户名',
  `nick_name` varchar(250) DEFAULT NULL COMMENT '用户昵称',
  `app_name` varchar(250) DEFAULT NULL COMMENT '所属应用',
  `pass_word` varchar(200) DEFAULT NULL COMMENT '密码',
  `is_sys_admin` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否是超级管理员，1是0否',
  `email` varchar(250) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(15) DEFAULT NULL COMMENT '电话',
  `avatar` varchar(250) DEFAULT NULL COMMENT '头像地址',
  `tenant_code` varchar(50) DEFAULT NULL COMMENT '所属租户',
  `payload` longtext COMMENT '扩展信息，用于存储客户系统冗余信息',
  `is_ext` tinyint(1) DEFAULT '0' COMMENT '是否为第三方用户',
  `ext_name` varchar(50) DEFAULT NULL COMMENT '第三方登录系统名称',
  `status` int(10) unsigned DEFAULT '0' COMMENT '状态',
  `created_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='用户表';


CREATE TABLE IF NOT EXISTS `sys_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '角色名称',
  `role_code` varchar(50) NOT NULL COMMENT '角色代码',
  `tenant_code` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '所属租户',
  `created_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='角色表';


CREATE TABLE IF NOT EXISTS`sys_tenants` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tenant_code` varchar(50) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '租户代码',
  `tenant_name` varchar(225) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '租户名',
  `is_ext` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否是第三方登录，0否1是',
  `ext_name` varchar(50) DEFAULT NULL COMMENT '第三方扩展名',
  `created_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='租户表。';

CREATE TABLE IF NOT EXISTS `sys_tickets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` bigint(20) unsigned DEFAULT NULL,
  `ticket` varchar(50) NOT NULL COMMENT '票据字符串',
  `expired` datetime DEFAULT NULL COMMENT '有效期',
  `created_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='登录凭证表';


CREATE TABLE IF NOT EXISTS `sys_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `product_code` varchar(60) NOT NULL COMMENT '产品code',
  `owner` varchar(80) DEFAULT NULL COMMENT '用户id',
  `product_name` varchar(120) DEFAULT NULL COMMENT '产品名称',
  `product_type` varchar(120) DEFAULT NULL COMMENT '产品类型：咨询页面、用户后台、管理后台\n',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `is_disabled` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否禁用',
  `created_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='产品表';

CREATE TABLE IF NOT EXISTS `sys_resource` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_code` varchar(60) NOT NULL COMMENT '产品code',
  `resource_type` varchar(40) NOT NULL COMMENT '资源类型 （默认菜单menuConfig 菜单类型menu  接口资源api  自定义custom 静态资源resource）',
  `resource_name` varchar(100) DEFAULT NULL COMMENT '资源名称',
  `parent_id` int(20) DEFAULT NULL COMMENT '父节点',
  `hide_header_path` varchar(255) DEFAULT NULL COMMENT '不显示头部菜单的路由',
  `hide_side_path` varchar(255) DEFAULT NULL COMMENT '不显示左导航的路由',
  `product_type` varchar(120) DEFAULT NULL COMMENT '资源所属的产品类型，多个使用英文逗号,分割，目前有frontWeb,userConsole,adminConsole这3种',
  `resource_api_path` varchar(255) DEFAULT NULL COMMENT 'api接口路径',
  `api_target_domain` varchar(255) DEFAULT NULL COMMENT 'api转发目前域名',
  `api_type` varchar(40) DEFAULT NULL COMMENT 'api类型(查询，更新，新增，删除)',
  `request_type` varchar(40) DEFAULT NULL COMMENT 'get post delete put',
  `tenant_code` varchar(255) DEFAULT NULL COMMENT '租户code',
  `resource_menu_path` varchar(255) DEFAULT NULL COMMENT '菜单路径',
  `resource_menu_path_type` varchar(40) DEFAULT 'left' COMMENT '当资源类型为menu菜单时，此字段用于区别左侧还是顶部菜单',
  `resource_menu_sort_id` bigint(20) NOT NULL DEFAULT '1' COMMENT '当资源类型为menu菜单时，此字段用于标志菜单的顺序',
  `resource_menu_icon` varchar(255) DEFAULT NULL COMMENT '菜单icon',
  `created_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='资源表';

