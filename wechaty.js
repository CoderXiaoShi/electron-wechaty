const { Wechaty } = require('wechaty');
const Qrterminal = require('qrcode-terminal')
const { token } = require('./config')

// -------------
console.log('create bot')
const bot = new Wechaty({ 
  name: 'weixinBot',            // 设置了 name 之后只用扫码一次, 下次重启会记住账号的
  puppet: 'wechaty-puppet-service',
  puppetOptions: {
    token
  }
});

// 扫码登陆
bot.on('scan', (qrcode, status) => {
    Qrterminal.generate(qrcode, { small: true })
        const qrImgUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=', 
        encodeURIComponent(qrcode)
    ].join('')
    console.log(qrImgUrl, status)
});

// 登陆成功
bot.on('login', async (user) => {
  console.log('login success: ', user)
});

// 退出登陆
bot.on('logout', () => {
  console.log('logout')
});        

// 接收消息
bot.on('message', async (msg) => {
    console.log('reciveMsg: ', msg.text())
});

bot
  .start()
  .then(() => {
    console.log('开始登陆微信');
  })
  .catch(async function(e) {
    console.log(`初始化失败: ${e}.`)
    await bot.stop()
    process.exit(1)
  });
    
// -------------
