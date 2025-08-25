扫码登录案例 通过qrcode依赖包生成二维码用来登录

注意更改index.js中的局域网ip

```javascript
  const code = await qrcode.toDataURL(`http://xxx:3000/static/mandate.html?userId=${userId}`)
```
