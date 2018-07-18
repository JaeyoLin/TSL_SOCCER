import moment from 'moment-timezone';

/**
 * getMenus
 * 取得 json 底下所有檔案及賠率
 *
 */
const getMenus = () => {
  return new Promise((resolve, reject) => {
    const isServer = typeof window === 'undefined';
    if (isServer) {
      const fs = eval('require("fs")');
      const appRoot = eval('require("app-root-path")');

      let menus = [];

      if (fs.existsSync(`${appRoot}/json/`)) {
        fs.readdir(`${appRoot}/json/`, (err, files) => {
          if (err) {
            reject({
              err,
            });
          }

          if (files && files.length) {
            files.forEach(file => {
              let obj = {};
              obj = JSON.parse(
                fs.readFileSync(`${appRoot}/json/${file}`, 'utf8')
              );

              menus.push(obj);
            });
          }

          // 依照日期、編號排序
          menus.sort(
            (a, b) => new Date(a.date) - new Date(b.date) || a.code - b.code
          );

          // 開賽後兩個小時就不顯示
          menus = menus.filter(a => {
            return (
              moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm') <
              moment(a.date)
                .tz('Asia/Taipei')
                .add(2, 'h')
                .format('YYYY-MM-DD HH:mm')
            );
          });

          resolve({
            data: menus,
          });
        });
      } else {
        resolve({
          data: menus,
        });
      }
    }
  });
};

export default getMenus;
