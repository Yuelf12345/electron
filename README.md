# 11-28 项目搭建

- electron-demo 桌面端
- electron-server 服务端
- electron-client 客户端

# 11-28 数据库设计(server端)

- 用户信息表格  (Users)
    user_id  (用户ID)
    username  (用户名)
    password  (密码)
    nickname  (昵称)
    gender  (性别)女 0 男 1
    birthday  (生日)
    avatar  (头像)
    friends  (好友列表，JSON格式)
    blacklist  (黑名单，JSON格式)
    applicationlist  (申请列表，JSON格式)
    rejectlist  (拒绝列表，JSON格式)
    loginTime  (登录时间)
    lastLoginTime  (上次登录时间)
    created_at  (创建时间)
- 好友信息表格  (Friends)
    friend_id  (好友关系ID)
    user_id  (用户ID，外键关联Users表格的user_id字段)
    friends_id  (好友ID,外键关联Users表格的user_id字段)
    friend_nickname  (好友的用户名)
    friend_avatar  (好友的头像)
    created_at  (创建时间)
- 聊天记录表格  (Chats)
    chat_id  (聊天记录ID)
    sender_id (发送者ID，外键关联Users表格的user_id字段)
    receiver_id (接收者ID，外键关联Users表格的user_id字段)
    chat_message  (聊天内容)        // 按序存储
    GroupID  (聊天类型, 外键关联Group表格的group_id字段) null 私聊 id 群聊
    chat_datetime  (聊天时间)
    created_at  (创建时间)
    deleted_at  (删除时间)
    isDel   (是否删除)0 删除 1 未删除 
- 群聊信息表格  (Group) **待设计**
    group_id  (群聊ID)
    group_name  (群聊名称)
    group_avatar  (群聊头像)
    group_members  (群聊成员，JSON格式)
    created_at  (创建时间)
    deleted_at  (删除时间)
    isDel   (是否删除)0 删除 1 未删除 

# 11-28 基础接口连接数据库(server端)

- 登录接口
    POST /login
- 注册接口
    POST /register
- 获取好友接口
    POST /addFriends
- 获取好友列表接口
    GET /addFriends
- 添加好友聊天记录接口
    POST /addChat
- 获取好友聊天记录接口
    GET /getChat

# 11-28 客户端设计(client端)

- 登录页面
    输入用户名和密码，点击登录按钮，跳转到主页面
- 注册页面
    输入用户名和密码，点击注册按钮，跳转到登录页面

# 11-29 服务接口实现(server端)
- 登录接口
    POST /login
    token: 用户登录凭证
    返回用户信息
- 注册接口
    POST /register

- 本地资源映射

# 11-29 客户端接口实现(client端)

- 配置proxy反向代理
- 封装axios
- pinia模块化(user模块)
- MD5加密
- 用户模块
    - 登录实现
    - 注册实现

# 11-30 客户端界面设计(client端)
- 导航栏
- 好友列表
- 聊天界面
- 引入router guard
- slid自定义指令

# 12-1 客户端设计(client端)
- 使用refresh token实现无感登录
- 使用Promise处理刷新token并发情况
- AxiosRequestConfig接口泛型重新定义

# 12-1 服务接口实现(server端)
- token刷新接口

# 12-2 客户端设计(client端)
- 引入socket.io-client库
- 采用中间件模式处理消息发送和接收
- 实现好友列表和好友聊天
- 保存好友聊天记录接口
    POST /addChat(取消)
- 渲染聊天页面

# 12-2 服务接口实现(server端)
- 引入socket.io库
- 实现好友列表和好友聊天
- 实现消息发送和接收

# 12-3 客户端设计(client端)
- 输入框emoji表情实现
- 使用contenteditable Range
- 处理登录页token refreshtoken逻辑

# 12-3 服务接口实现(server端)
- 处理登录页token refreshtoken逻辑

# 12-4 客户端设计(client端)
- 好友聊天记录存储
- 好友窗口切换聊天记录更新

# 12-4 服务端设计(server端)
- 聊天记录查询及更新
- 增加更新使用同一接口
    POST /upDateChat


# 12-5 客户端设计(client端)
- 处理好友消息未读状态

 # 12-6 客户端设计(client端)
- 界面ui设计
- 
 # 12-7 客户端设计(client端)
- 界面ui设计
- 处理聊天记录

# 12-7 服务端设计(server端)
- 新增全部聊天记录接口 
      POST /getAllChat

 # 12-8 客户端设计(client端)
- 处理聊天记录

 # 12-11 客户端设计(client端)
- 用户搜索添加

当用户A给好友B发送消息时，可以将消息记录到数据库的聊天表中。这样，当好友B上线后，服务端可以通过查询数据库，将好友B离线期间的消息推送到好友B的客户端上。

服务端可以设计一个定时任务，定期查询数据库中某个用户离线期间的消息，并通过socket.io将这些消息推送到该用户上线后的客户端上。

具体实现流程如下：

当用户A给好友B发送消息时，将消息体以及发送时间等信息记录到数据库的聊天表中。
当好友B离线时，服务端通过查询数据库中好友B的聊天记录，将好友B离线期间的消息缓存起来。
定时任务执行时，查询数据库中某个用户离线期间的消息，并通过socket.io将这些消息推送到该用户上线后的客户端上。
客户端接收到离线期间的消息后，根据消息发送时间等信息，将其展示在聊天窗口的合适位置。
这样，当好友B上线后，即可接收到用户A发送的离线期间的消息。

# 12-18 桌面端设计(desktop端)
- 处理基本api
- 
# 12-19 服务端设计(serevr端)
- 处理用户接收消息bug
- 处理好友消息未读状态