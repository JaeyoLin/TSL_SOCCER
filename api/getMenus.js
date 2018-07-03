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
